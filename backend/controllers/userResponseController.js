const UserResponse = require('../models/userResponses')

// API endpoint to submit user answers
const saveUserResponse = (req, res) => {

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

  userResponse
    .save()
    .then((savedAnswer) => {
      return res.status(200).send({ message: "Saved Successfully", data: savedAnswer })
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  }  
}

module.exports = {
  saveUserResponse
}
