const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const companyController = require('../controllers/company.controller');

router.route('/prospects')
    .get(asyncHandler(companyController.getCompanyProspects));

router.route('/user/status')
    .post(asyncHandler(companyController.updateCompanyProspectStatus));

module.exports = router;