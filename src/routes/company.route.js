const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const companyController = require('../controllers/company.controller');
const { trash: deleteValidate, update: updateValidator } = require('../validators/company');

router.route('/list')
    .get(asyncHandler(companyController.getCompanies));

router.route('/delete')
    .post(deleteValidate, asyncHandler(companyController.deleteCompany));

router.route('/update')
    .post(updateValidator, asyncHandler(companyController.updateCompany));

router.route('/create')
    .post(updateValidator, asyncHandler(companyController.createCompany));

router.route('/prospects')
    .get(asyncHandler(companyController.getCompanyProspects));

router.route('/prospects/delete')
    .post(asyncHandler(companyController.deleteCompanyProspects));


router.route('/user/status')
    .post(asyncHandler(companyController.updateCompanyProspectStatus));

module.exports = router;