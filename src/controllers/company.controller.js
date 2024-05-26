const CompanyProspect = require('../models/company.prospect.model');
const Company = require('../models/company.model');

const { transferMail } = require('../utils/common');
const { ADMIN_EMAIL } = require('../utils/secrets');

exports.getCompanyIdByCNPJ = (cnpj) =>{
     return new Promise((resolve, reject) => {
        Company.getCompanyIdByCNPJ( cnpj, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    });
}

exports.getCompanyProspects = (req, res) =>{
    CompanyProspect.getCompanyProspects((err, data) => {
        if (err) {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        } else {
            res.status(200).send({
                status: 'success',
                users: data
            });
        }
    })
}

exports.updateCompanyProspectStatus =  (req, res) =>{
    const {user_id, cnpj, status, email} = req.body;
    
    // Check Company if it has been registered
    Company.getCompanyIdByCNPJ(cnpj,(err, companyId) => {
        if(!companyId && status === "approved"){
            res.status(404).send({
                status: 'error',
                message: "The company has not been registered yet, Please contact company"
            });
            return;
        } else{

            // If the company is registered then process approve.
            CompanyProspect.updateCompanyProspectStatus({user_id, status, companyId}, async (err) => {
                if (err) {
                    res.status(500).send({
                        status: 'error',
                        message: err.message
                    });
                    return;
                } else {

                    if(status == "approved"){
                        const message = "You are Approved!";
                        await transferMail(ADMIN_EMAIL, email, "Hi Thank you for reaching out us!", message);
                    } else if(status == "rejected") {
                        const message = "Sorry You are rejected!";
                        await transferMail(ADMIN_EMAIL, email, "Hi Thank you for reaching out us!", message);
                    }
                    res.status(200).send({
                        status: 'success',
                    });
                }
            })
        }
    });
}