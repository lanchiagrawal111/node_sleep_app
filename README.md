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

# Lists
- POST /question
  - Description: Set Question or create the Question
        -Request Parameters:
    
       ```
        body = {
         "content": "That's a great goal. How long have you been struggling with your sleep?",
         "options": ["less than 2 weeks", "2 to 8 weeks", "more than 8 weeks"],
         "nextQuestionId" : "6534e88727fbf1a9f1efaaa1"  ***I'd of next question, we can leave it blank and update it later***
       }
       
       ```
       -Response:
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
  
       ```
        const setQuestion = (req, res) => {
        const { content, options, nextQuestionId } = req.body;
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


