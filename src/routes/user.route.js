const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userCtrl = require('../controllers/user.controller');
const uploadCtrl = require('../controllers/upload.controller');
const { create: createValidate, update: updateValidate} = require('../validators/user');
const authentication = require('../middlewares/authentication');

router.route('/list/:company_id')
    .get(authentication, asyncHandler(userCtrl.getCompanyEmployees));

router.route('/delete')
    .post(authentication, asyncHandler(userCtrl.deleteEmployee));

router.route('/upload/avatar')
    .post(authentication, asyncHandler(uploadCtrl.upload));

router.route('/upload/avatar/:image')
    .get(authentication, asyncHandler(uploadCtrl.getUploadedImage));
    
router.route('/create')
    .post(authentication, createValidate, asyncHandler(userCtrl.createEmployee));

router.route('/update')
    .post(authentication, updateValidate, asyncHandler(userCtrl.updateEmpoyee));
    
module.exports = router;