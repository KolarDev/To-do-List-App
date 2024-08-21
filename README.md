### Creating my To-do List Api:

## Todo-List API

## Overview

 These API helps to manage tasks thereby allowing users to get a personal task managing account, create a task with due date and getting notified when the task due time is around the corner.

## Tools Used includes: 
  1. **languages:** Javascript server side (Node.js)
  2. **Frameworks:** Express.js
  3. **Database:** MongoDB mongoose
  3. **Packages:** mongoose, validator for DB and schema Management . bcryptjs and crypto for password management and hashing. JsonWebToken for user authentication and authorization and a lot more..

## Features include:
  - User Register/Login Using JsonWebToken
  - Creating, Reading, Updating and Deleting task
  - Task schema include  title, description, dueDate, status, priority, tags
  - Mark task as complete and query for all completed tasks
  - Email notification of due tasks
  More to be added

## Routes available in the API:
# User:
  - Register route
  - Login route
  - Update password route
  - Forgot password and reset password routes
  - Get all Users route (Restricted to only admin)
  - Get user profile route
  - Update user profile route
  - Delete user profile route

# Task:
  - Get All task route
  - Get a particular task route
  - Update a task route
  - Delete a task route 
  - Mark task as complete route
  - Get All completed tasks 

