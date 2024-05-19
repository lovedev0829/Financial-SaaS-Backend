const User = require('../models/user.model');
const CompanyProspect = require('../models/company.prospect.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstName, lastName, email, companyRole, callPhone, company, cnpj, site, message } = req.body;

    const userData = {
        firstName, 
        lastName,
        email,
        companyRole,
        role: "admin",
        status: "pending",
        created_at: Date.now(),
    }

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
                created_at: Date.now(),
            }

            console.log(companyProspectData);
            
            CompanyProspect.create(companyProspectData, (err, companyRes) => {
                if (err) {
                    res.status(500).send({
                        status: "company error",
                        message: err.message
                    });
                } else {
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
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}