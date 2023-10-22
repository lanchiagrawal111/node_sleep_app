const UserResponse = require('../models/userResponses')
const Question = require('../models/questions')

// API endpoint to submit user answers
const saveUserResponse = async (req, res) => {

  if(!req.body.question || !req.body.selectedOption || !req.body.user_id){
    return res.status(400).send({message:"Bad Request"})
  }else{

  const questionId = req.body.question
  const selectedOption = req.body.selectedOption
  
  // Create a UserResponse document to store the answer
  const userResponse = new UserResponse({
    user: req.body.user_id,
    question: questionId,
    selectedOption: selectedOption,
  });

  try {
    const savedUserResponse = await userResponse.save();

    const question = await getQuestionById(savedUserResponse.question);
    if (question.nextQuestion) {
      res.status(201).json({
        userResponse: savedUserResponse,
        nextQuestionId: question.nextQuestion
      });
    } else {
      res.status(404).json({ message: 'No Question Available' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }  
}

const getQuestionById = async (questionId) => {
  return await Question.findById(questionId).select('nextQuestion').exec();
};

module.exports = {
  saveUserResponse
}

