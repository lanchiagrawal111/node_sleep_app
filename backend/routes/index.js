const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controllers/indexController');
const { setQuestion, updateQuestion, getQuestion } = require('../controllers/questionController');
const { saveUserResponse } = require('../controllers/userResponseController')


router.post('/signin', signIn);
router.post('/signup', signUp);

//for questions
router.post('/question', setQuestion);
router.put('/question/:questionId', updateQuestion);
router.get('/questions/:questionId', getQuestion)

//for userResponse
router.post('/onboarding', saveUserResponse);

module.exports = router;