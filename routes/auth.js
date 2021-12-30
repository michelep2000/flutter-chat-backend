//path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post('/new', [
    check('name', 'The name can\'t be empty').not().isEmpty(),
    check('email', 'The email has to be a real one').isEmail(),
    check('password', 'The password can\'t be empty').not().isEmpty(),
    validateFields
], newUser);

router.post('/', [
    check('email', 'The email has to be a real one').isEmail(),
    check('password', 'The password can\'t be empty').not().isEmpty(),
    validateFields
], login);

router.get('/renew-token', validateJWT, renewToken)


module.exports = router;