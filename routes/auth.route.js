const express = require('express');

const router = express.Router();

const {
    showLogin,
    showSignup,
    signup,
    login,
    logout
} = require('../controller/auth.controller.js');


router.get('/signup',showSignup);
router.post('/signup',signup);

router.get('/login',showLogin);
router.post('/login',login);


router.get('/logout', logout);

module.exports = router;