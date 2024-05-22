const User = require('../models/user.model');
const CompanyProspect = require('../models/company.prospect.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, isValidToken, decode } = require('../utils/token');
const { getCompanyIdByCNPJ } = require("./company.controller")
const { currentDateTime } = require("../utils/common")
const { transferMail } = require("../utils/common")
const { ADMIN_EMAIL } = require("../utils/secrets")
exports.signup = async (req, res) => {
    const { firstName, lastName, email, companyRole, callPhone, company, cnpj, site, message } = req.body;

    let userData = {
        firstName, 
        lastName,
        email,
        companyRole,
        role: "user",
        status: "pending",
        company_id: 0,
        created_at: currentDateTime(),
    }

    // Fetch maching CNPJ
    await getCompanyIdByCNPJ(cnpj).then(data => {
        userData = {...userData, company_id: data};
    });

    User.create( userData, (err, userRes) => {
        if (err) {
            res.status(500).send({
                status: "user error",
                message: err.message
            });
        } else {

            const companyProspectData = {
                user_id: userRes.userId,
                callPhone,
                company,
                cnpj,
                site,
                message,
                created_at: currentDateTime(),
            }


            CompanyProspect.create(companyProspectData, async (err, companyRes) => {
                if (err) {
                    res.status(500).send({
                        status: "company error",
                        message: err.message
                    });
                } else {
                    
                    await transferMail(email, ADMIN_EMAIL, "Hi Support Team", message);

                    res.status(201).send({
                        status: "success",
                        data: {
                            ...userRes,
                            ...companyRes
                        }
                    });
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {

            if( data.status !== "approved" ){
                
                let errorMsg = data.status == "pending" ? "The request is still in Pending !" : "The request has been Rejected !"

                res.status(500).send({
                    status: 'error',
                    message: errorMsg
                });

                return;
            } 

            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    accessToken: token,
                    user: data
                });
                return;
            }

            res.status(401).send({
                status: 'error',
                message: 'Incorrect User Information'
            });
        }
    });

}

exports.getCurrentUser  = (req, res) => {
    
    const accessToken = req.headers.authorization?.split(' ')[1]; // Bearer Token
    try {
        if (!accessToken || !isValidToken(accessToken)) {
          return res.status(401).json({ error: 'Invalid or expired token' });
        }
    
        // Verify the token
        const decoded = decode(accessToken);
    
        User.getUserData(decoded.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        status: 'error',
                        message: err.kind
                    });
                    return;
                }

                res.status(500).send({
                    status: 'error',
                    message: err.message
                }); 
                return;
            } else {
                
                if (!data) {
                    return res.status(404).json({ error: 'User not found' });
                  }
          
                  res.status(200).send({
                      status: 'success',
                      user: data
                  });
            }
        })    
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}