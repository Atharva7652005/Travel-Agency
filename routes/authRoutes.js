const express = require('express');
const router = express.Router();
const { getLogin, postLogin, getSignup, postSignup, logout } = require('../controllers/authController');

router.route('/login')
    .get(getLogin)
    .post(postLogin);

router.route('/signup')
    .get(getSignup)
    .post(postSignup);

router.get('/logout', logout);

module.exports = router;
