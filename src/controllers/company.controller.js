const CompanyProspect = require('../models/company.prospect.model');
const CompanyModel = require('../models/company.model');
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

exports.updateCompanyProspectStatus = (req, res) =>{
    const {user_id, cnpj, status} = req.body;
    
    // Check Company if it has been registered
    CompanyModel.getCompanyIdByCNPJ(cnpj,(err, companyId) => {
        if(!companyId){
            res.status(404).send({
                status: 'error',
                message: "The company has not been registered yet, Please contact company"
            });
            return;
        } else{
            // If the company is registered then process approve.
            CompanyProspect.updateCompanyProspectStatus({user_id, status, companyId},(err) => {
                if (err) {
                    res.status(500).send({
                        status: 'error',
                        message: err.message
                    });
                    return;
                } else {
                    res.status(200).send({
                        status: 'success',
                    });
                }
            })
        }
    });
}