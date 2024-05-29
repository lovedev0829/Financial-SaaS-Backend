const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userCtrl = require('../controllers/user.controller');
const uploadCtrl = require('../controllers/upload.controller');
const { create: createValidate, update: updateValidate} = require('../validators/user');

router.route('/list/:company_id')
    .get(asyncHandler(userCtrl.getCompanyEmployees));

router.route('/delete')
    .post(asyncHandler(userCtrl.deleteEmployee));

router.route('/upload/avatar')
    .post(asyncHandler(uploadCtrl.upload));

router.route('/upload/avatar/:image')
    .get(asyncHandler(uploadCtrl.getUploadedImage));
    
router.route('/create')
    .post(createValidate, asyncHandler(userCtrl.createEmployee));

router.route('/update')
    .post(updateValidate, asyncHandler(userCtrl.updateEmpoyee));
    
module.exports = router;