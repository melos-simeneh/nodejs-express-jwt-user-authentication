const express = require("express");
const router = express.Router();
const authenticateJWT = require("../utils/authJWT");
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user management API
 */

/**
 * @swagger
 *  /api/register:
 *    post:
 *      summary: Register a new user
 *      description: Register a user by providing a username and password. The password will be hashed for security.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user
 *                  example: "melos"
 *                password:
 *                  type: string
 *                  description: The password of the user (should be at least 6 characters)
 *                  example: "Password1234"
 *              required:
 *                - username
 *                - password
 *      responses:
 *        201:
 *          description: User registered successfully
 *        400:
 *          description: Invalid input data (e.g., missing fields or weak password)
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 *  /api/login:
 *    post:
 *      summary: Log in a user and get a JWT token
 *      description: Authenticate a user and issue a JWT token that will be used for further authenticated requests.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user
 *                  example: "melos"
 *                password:
 *                  type: string
 *                  description: The password of the user
 *                  example: "Password1234"
 *              required:
 *                - username
 *                - password
 *      responses:
 *        200:
 *          description: JWT token generated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: The JWT token for authenticating further requests
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *        400:
 *          description: Invalid credentials (wrong username or password)
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 *  /api/users:
 *    get:
 *      summary: Get all users (Authenticated route)
 *      description: Fetch the list of all users. Requires a valid JWT token for authentication.
 *      tags: [Users]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: List of all users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    username:
 *                      type: string
 *                    password:
 *                      type: string
 *                    example:
 *                      username: "john_doe"
 *                      password: "$2a$10$..."
 *        401:
 *          description: Unauthorized (JWT token is missing or invalid)
 */
router.get("/users", authenticateJWT, userController.getUsers);

/**
 * @swagger
 *  /api/users/{username}:
 *    get:
 *      summary: Get a single user by username (Authenticated route)
 *      description: Fetch a single user's details by providing their username. Requires a valid JWT token.
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          description: The username of the user to retrieve
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: User found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *        404:
 *          description: User not found
 *        401:
 *          description: Unauthorized (JWT token is missing or invalid)
 */
router.get(
  "/users/:username",
  authenticateJWT,
  userController.getUserByUsername
);

/**
 * @swagger
 *  /api/users/{username}:
 *    put:
 *      summary: Update a user's password (Authenticated route)
 *      description: Allows an authenticated user to update their password.
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          description: The username of the user whose password is to be updated
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  description: The new password (must be hashed)
 *                  example: "newSecurePassword123"
 *              required:
 *                - password
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: Password updated successfully
 *        400:
 *          description: Invalid input (e.g., password too weak)
 *        404:
 *          description: User not found
 *        401:
 *          description: Unauthorized (JWT token is missing or invalid)
 */
router.put("/users/:username", authenticateJWT, userController.updateUser);

/**
 * @swagger
 *  /api/users/{username}:
 *    delete:
 *      summary: Delete a user (Authenticated route)
 *      description: Allows an authenticated user to delete their account.
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          description: The username of the user to delete
 *          schema:
 *            type: string
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        404:
 *          description: User not found
 *        401:
 *          description: Unauthorized (JWT token is missing or invalid)
 */
router.delete("/users/:username", authenticateJWT, userController.deleteUser);

module.exports = router;
