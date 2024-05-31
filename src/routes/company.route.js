const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const companyController = require('../controllers/company.controller');
const { create: createValidate, trash: deleteValidate, update: updateValidator } = require('../validators/company');
const authentication = require('../middlewares/authentication');

router.route('/list')
    .get(authentication, asyncHandler(companyController.getCompanies));

router.route('/delete')
    .post(authentication, deleteValidate, asyncHandler(companyController.deleteCompany));

router.route('/update')
    .post(authentication, updateValidator, asyncHandler(companyController.updateCompany));

router.route('/create')
    .post(authentication, createValidate, asyncHandler(companyController.createCompany));

router.route('/prospects')
    .get(asyncHandler(companyController.getCompanyProspects));

router.route('/prospects/delete')
    .post(authentication, asyncHandler(companyController.deleteCompanyProspects));


router.route('/user/status')
    .post(authentication, asyncHandler(companyController.updateCompanyProspectStatus));

module.exports = router;