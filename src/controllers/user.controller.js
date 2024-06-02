const User = require('../models/user.model');
const { transferMail, removeFile } = require('../utils/common');
const { generateToken } = require('../service/auth');
const { CLIENT_HOST } = require('../utils/secrets')

exports.getCompanyEmployees = async (req, res) => {
    const { company_id } = req.params;
    
    User.getCompanyEmployees(company_id, (err, data) => {
        if(err) {
            res.status(500).json({
                status: "error",
                message: err
            })
        } else {
            res.status(200).json({
                status: "success",
                users: data
            })
        }
    });
};

exports.deleteEmployee = async (req, res) => {

    const { selectedIds } = req.body;
    const ids = selectedIds.split(',');

    await ids.map(id => {
        User.findUserByID(id, async (err, data)=> {
            if(data){
                const uploadFilePath = `uploads/${data?.avatar}`
                await removeFile(uploadFilePath);
            }
        });
    });

    User.deleteEmployee(selectedIds, async (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: err
            });
            return;
        } else{
            res.status(200).send({
                status: 'success',
                users: data
            });
            return;
        }
    });
}


exports.createEmployee = async (req, res) => {

    const { email, company_id, masterEmail } = req.body
    const params = req.body

    User.findEmployeeByEmail({ email, company_id }, (err, data) => {
        if(data){
            res.status(500).send({
                status: 'error',
                message: `A user with email address '${data?.email}' already exits`
            });
        } else {
            
            User.createEmployee( params, async (err, data)=> {
                if(err) {
                    
                    res.status(500).send({
                        status: 'error',
                        message: err
                    });

                } else {
                    
                    const token = generateToken(data?.userId);
                    const title = "Hi, You are invited SaaS platform!"
                    const message = `You can complete registration by clicking the below link!
                        ${CLIENT_HOST}/auth/confirm/register?token=${token}
                        Best regards
                    `;

                    console.log(message)
                    
                    await transferMail(masterEmail, email, title, message);
                    res.status(200).send({
                        status: 'success',
                        employee: data
                    });
                    
                }
            });
        }
    })
};


exports.updateEmpoyee = async (req, res) => {
    const { email, company_id, id } = req.body
    const params = req.body

    User.findEmployeeByEmail({ email, company_id, id }, async (err, data) => {
        if(data){
            res.status(500).send({
                status: 'error',
                message: `A user with email address '${data?.email}' already exits`
            });
        } else {

            if(req.body?.avatar){
                User.findUserByID(id, async (err, data)=> {
                    if(data){
                        const uploadFilePath = `uploads/${data?.avatar}`
                        await removeFile(uploadFilePath);
                    }
                });
            }
            
            User.updateEmployee( params, async (err, data)=> {
                if(err) {
                    res.status(500).send({
                        status: 'error',
                        message: err
                    });
                } else {
                    res.status(200).send({
                        status: 'success',
                        employee: data
                    }); 
                }
            });
        }
    })
};