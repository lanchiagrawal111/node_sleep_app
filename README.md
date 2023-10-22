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

### POST /question
Description: Retrieve information about [describe the resource].
Request:
- Parameters: [list request parameters]
Response:
- Example response JSON schema: [include schema or link to schema]
