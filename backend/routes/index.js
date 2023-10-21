const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controllers/indexController');


router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;