const Question = require('../models/questions')

// API endpoint to create a new question
const setQuestion = (req, res) => {
  const { content, options, nextQuestionId } = req.body;

  // Create a new question based on the request data
  if(content && options){
  const newQuestion = new Question({
    content,
    options,
    nextQuestion: nextQuestionId, // Set the reference to the next question
  });

  newQuestion
    .save()
    .then((createdQuestion) => {
      res.status(201).json(createdQuestion); // Return the created question
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
  }else{
    return res.status(400).send({ message: "Invalid Input, Add Option and question"})
  }  
};


// API endpoint to update a question by ID
const updateQuestion = (req, res) => {
  const { content, options, nextQuestionId } = req.body;

  // Find the question by ID
  Question.findById(req.params.questionId)
    .then((question) => {
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }

      // Update the question properties
      question.content = content || question.content;
      question.options = options || question.options;
      question.nextQuestion = nextQuestionId || question.nextQuestion;

      // Save the updated question
      question
        .save()
        .then((updatedQuestion) => {
          res.status(201).json(updatedQuestion); // Return the updated question
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// API endpoints for questions
const getQuestion =  (req, res) => {
  // Fetch a single question by ID
  Question.findById(req.params.questionId)
    .then((question) => {
      if (question) {
        return res.status(200).send({ question: question.content, options: question.options})
      } else {
        res.status(404).json({ message: 'Question not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}




module.exports = {
  setQuestion,
  updateQuestion,
  getQuestion
}