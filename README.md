#Creating my To-do List Api:
 These API helps to manage tasks thereby allowing users to get a personal task managing account, create a task with due date and getting notified when the task due time is around the corner.

Tools Used includes: 
  1. languages: Javascript server side (Node.js)
  2. Frameworks: Express.js
  3. Database: MongoDB mongoose
  3. Packages: mongoose, validator for DB and schema Management . bcryptjs and crypto for password management and hashing. JsonWebToken for user authentication and authorization and a lot more..

Features include;
  1. User Register/Login Using JsonWebToken
  2. Creating, Reading, Updating and Deleting task
  3. Task schema include  title, description, dueDate, status, priority, tags
  4. Mark task as complete and query for all completed tasks
  5. Email notification of due tasks
  More to be added

Routes available in the api:
USER:
  1. Register route
  2. Login route
  3. Update password route
  4. Forgot password and reset password routes
  5. Get all Users route (Restricted to only admin)
  6. Get user profile route
  7. Update user profile route
  8. Delete user profile route

TASK:
  1. Get All task route
  2. Get a particular task route
  3. Update a task route
  4. Delete a task route 
  5. Mark task as complete route
  6. Get All completed tasks 

