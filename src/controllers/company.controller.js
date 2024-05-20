const Company = require('../models/company.model');
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