const CompanyProspect = require('../models/company.prospect.model');
const Company = require('../models/company.model');

const { transferMail } = require('../utils/common');
const { ADMIN_EMAIL } = require('../utils/secrets');
const { generateToken } = require('../utils/token');
const User = require('../models/user.model');

exports.getCompanyIdByCNPJ = (cnpj) =>{
     return new Promise((resolve, reject) => {
        Company.getCompanyIdByCNPJ( cnpj, (err, company_id) => {
            if (err) {
                reject(err)
            } else {
                resolve(company_id)
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
    const {user_id, cnpj, status, email, company_role} = req.body;
    
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
                       const host = req.headers.host;
                       await transferConfirmRegistration(host, email, user_id);
                       Company.updateCompanyRole({company_role, companyId }, () => {})
                    }
                    res.status(200).send({
                        status: 'success',
                    });
                }
            })
        }
    });
}

const transferConfirmRegistration  = async (host, email, user_id) => {
    const token = generateToken(user_id);
    const title = "Hi, Welcome to Financial SaaS platform"
    const message = ` You can complete registeration by clicking the below link
                      http://159.65.220.226/api/auth/confirm/register?token=${token}
                      Best regards
                      from Financial SaaS team
    `;
    console.log(message);
    await transferMail(email, ADMIN_EMAIL, title, message);
}

exports.getCompanies = (req, res) => {
    Company.getCompanies((err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            res.status(200).send({
                status: 'success',
                companies: data
            });
            return;
        }
    });
}


exports.deleteCompany = (req, res) => {

    const { selectedIds } = req.body;
    Company.deleteCompany(selectedIds, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            res.status(200).send({
                status: 'success',
                companies: data
            });
            return;
        }
    });
}

exports.deleteCompanyProspects = (req, res) => {

    const { selectedIds } = req.body;
    
    User.deleteEmployee(selectedIds, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            CompanyProspect.deleteCompanyProspects(selectedIds, (err, data) => {
                if(err){
                    res.status(500).send({
                        status: 'error',
                        message: err
                    });
                    return;
                } else{
                    res.status(200).send({
                        status: 'success',
                        companies: data
                    });
                    return;
                }
            });
        }
    })
}

exports.updateCompany = (req, res) => {
    const params = req.body;

    Company.updateCompany(params, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            res.status(200).send({
                status: 'success',
                companies: data
            });
            return;
        }
    });
}

exports.createCompany = (req, res) => {
    const params = req.body;
    Company.createCompany(params, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            res.status(200).send({
                status: 'success',
                companies: data
            });
            return;
        }
    });
}