const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controllers/indexController');
const { setQuestion, updateQuestion } = require('../controllers/questionController');


router.post('/signin', signIn);
router.post('/signup', signUp);

//for questions
router.post('/question', setQuestion);
router.put('/question/:questionId', updateQuestion);

module.exports = router;