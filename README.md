# Node Sleep App

The Node Sleep App is a simple web application designed to help users track and manage their sleep patterns. It allows users to log their sleep hours, view statistics, and set goals for a better night's sleep.

## Data Schemas

```
User Schema:
The `Users` schema is a Mongoose model for managing users in application. Each document in the `users` collection represents a user.

      - `username` (string): User's name
      - `password` (string): User's Password
  
Question Schema:
The `questions` schema is a Mongoose model for managing questions in application. Each document in the `questions` collection represents a single question.
 
      - `content` (String): The text content of the question.
      - `options` (Array of Strings): An array of strings representing the options or choices for the question.
      - `nextQuestion` (ObjectID): A reference to the next question in the sequence. It is linked to the 'Question' model.
          
UserResponse Schema:
The `UserResponses` schema is a Mongoose model for managing user responses in application. Each document in the `UserResponses` collection represents a user's response to a question.

      - `user` (ObjectID): A reference to the user who provided the response. It is linked to the 'User' model.
      - `question` (ObjectID): A reference to the question to which the user responded. It is linked to the 'Question' model.
      - `selectedOption` (Array of Strings): An array of strings representing the selected options or choices by the user for the question.
```

## API Endpoints

### Set Questions

- POST /question
  - Description: Set Question or create the Question
    - Request Body:
    
       ```
        body = {
         "content": "That's a great goal. How long have you been struggling with your sleep?",
         "options": ["less than 2 weeks", "2 to 8 weeks", "more than 8 weeks"],
         "nextQuestionId" : "6534e88727fbf1a9f1efaaa1"  ***I'd of next question, we can leave it blank and update it later***
       }
       
       ```
    - Response:
      
       ```
        {
          "content": "That's a great goal. How long have you been struggling with your sleep?",
          "options": [
              "less than 2 weeks",
              "2 to 8 weeks",
              "more than 8 weeks"
          ],
          "nextQuestion": "6534e88727fbf1a9f1efaaa1",
          "_id": "653511127673be89bcab948d",
          "__v": 0
         }
       
        ```
      - Api:
   
       ```
        const setQuestion = (req, res) => {
              const { content, options, nextQuestionId } = req.body;
              // Create a new question based on the request dat
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
        
       ```
### Update Question (Generally for updating nextQuestionId)

- PUT /question/:questionId
  - Description: Update a Question
    - Request Parameters:
      
       ```
       Id of a Question ( 653511127673be89bcab948d )
       /question/653511127673be89bcab948d
       
       ```
    - Request Body:
    
       ```
        body = {
         "content": "That's a great goal. How long have you been struggling with your sleep?",
         "options": ["less than 2 weeks", "2 to 8 weeks", "more than 8 weeks"],
         "nextQuestionId" : "6534e88727fbf1a9f1efaaa1"
       }
       
       ```
    - Response:
      
       ```
        {
          "content": "That's a great goal. How long have you been struggling with your sleep?",
          "options": [
              "less than 2 weeks",
              "2 to 8 weeks",
              "more than 8 weeks"
          ],
          "nextQuestion": "6534e88727fbf1a9f1efaaa1",
          "_id": "653511127673be89bcab948d",
          "__v": 0
         }
       
        ```
      - Api:
   
       ```
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
        
       ```

### Get Question With Id

- GET /questions/:questionId
  - Description: Retrieve a Question from Question Id
    - Request Parameters:
      
       ```
       Id of a Question (653511127673be89bcab948d)
       questions/653511127673be89bcab948d
       
       ```
    - Response:
      
       ```
        {
          "question": "That's a great goal. How long have you been struggling with your sleep?",
          "options": [
              "less than 2 weeks",
              "2 to 8 weeks",
              "more than 8 weeks"
          ]
         }
       
        ```
      - Api:
   
       ```
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
        
       ```

### Store User Response on Submit and fetch a next question 

- POST /onboarding
  - Description: Store User Response on Submit and fetch a next question to be shown to the user
    - Request Body:
    
       ```
        body = {  
                "question": "653511127673be89bcab948d",
                "selectedOption" : ["less than 2 weeks"],
                "user_id": "6533df596ff1839dabf6c18d"
            }
       
       ```
    - Response:
      
       ```
        {
                      
             "userResponse": {
                    "user": "6533df596ff1839dabf6c18d",
                    "question": "653511127673be89bcab948d",
                    "selectedOption": [
                        "less than 2 weeks"
                    ],
                    "_id": "653525a27673be89bcab9493",
                    "__v": 0
                },
             "nextQuestionId": "6534bdbafe809cef9f3cc356"

         }
       
        ```
      - Api:
   
       ```
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
        
       ```
       



