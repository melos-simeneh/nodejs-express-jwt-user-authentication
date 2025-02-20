# User Authentication API using NodeJS and Express with JWT

This is a simple user authentication API built using Node.js with JWT (JSON Web Token) for login and password hashing with bcryptjs. The API provides functionality to register, login, update, retrieve, and delete users.

## Features

- **Register a new user** with a unique username and password.
- **Login** with a username and password to receive a JWT token.
- **Retrieve a list of all users** or a specific user by their username.
- **Update a user's password.**
- **Delete a user** by their username.

## Prerequisites

- Node.js (v14+)
- pm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/melos-simeneh/nodejs-express-jwt-user-authentication.git
cd nodejs-express-jwt-user-authentication
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Running the Application

Run the following command to start the app:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000). You can access the API docs at [http://localhost:3000/docs](http://localhost:3000/docs).

## API Endpoints

### 1. Register User

- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:

    ```json
    {
    "username": "your_username",
    "password": "your_password"
    }
    ```

- **Response**:

    **Success**:

    ```json

        {
        "status": "SUCCESS",
        "message": "User registered successfully"
        }
    ```

    **Failure** (if username already taken):

    ```json

    {
    "status": "FAILURE",
    "message": "Username already taken"
    }
    ```

### 2. Login User

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:

    ```json
    {
    "username": "your_username",
    "password": "your_password"
    }
    ```

- **Response**:

    **Success**:

    ```json
        {
        "status": "SUCCESS",
        "message": "Login successful",
        "data": {
            "token": "your_jwt_token"
        }
        }
    ```

    **Failure** (invalid credentials):

    ```json
        {
        "status": "FAILURE",
        "message": "Invalid credentials"
        }
    ```

### 3. Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Response**:

    **Success**:

    ```json
    {
    "status": "SUCCESS",
    "message": "Users retrieved successfully",
    "data": [
        {
        "username": "user1",
        "password": "hashed_password"
        },
        {
        "username": "user2",
        "password": "hashed_password"
        }
    ]
    }
    ```

### 4. Get User by Username

- **URL**: `/users/:username`
- **Method**: GET
- **Response**:

    **Success**:

    ```json
    {
    "status": "SUCCESS",
    "message": "User retrieved successfully",
    "data": {
        "username": "user1",
        "password": "hashed_password"
    }
    }
    ```

    **Failure** (user not found):

    ```json
    {
    "status": "FAILURE",
    "message": "User not found"
    }
    ```

### 5. Update User Password

- **URL**: `/users/:username`
- **Method**: `PUT`
- **Request Body**:

    ```json
    {
    "password": "new_password"
    }
    ```

- **Response**:

    **Success**:

    ```json
    {
    "status": "SUCCESS",
    "message": "Password updated successfully"
    }
    ```

    **Failure** (user not found):

    ```json
    {
    "status": "FAILURE",
    "message": "User not found"
    }
    ```

### 6. Delete User

- **URL**: `/users/:username`
- **Method**: `DELETE`
- **Response**:

    **Success**:

    ```json
    {
    "status": "SUCCESS",
    "message": "User deleted successfully"
    }
    ```

    **Failure** (user not found):

    ```json
    {
    "status": "FAILURE",
    "message": "User not found"
    }
    ```

## Technologies Used

- **Node.js**
- **Express.js**
- **bcryptjs** (for password hashing)
- **jsonwebtoken** (for JWT-based authentication)

## Thank You

Thank you for checking out this User authentication API! I hope this project helps you in building and managing your own APIs. If you have any feedback, questions, or suggestions, feel free to open an issue or reach out!
