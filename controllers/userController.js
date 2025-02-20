const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = []; // In-memory "database"
const secretKey = "melos_your_secret_key";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      status: "FAILURE",
      message: "Username already taken",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { username, password: hashedPassword };
  users.push(user);
  res.status(201).json({
    status: "SUCCESS",
    message: "User registered successfully",
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: "FAILURE",
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "1h",
  });
  res.json({
    status: "SUCCESS",
    message: "Login successful",
    data: { token },
  });
};

const getUsers = (req, res) => {
  res.json({
    status: "SUCCESS",
    message: "Users retrieved successfully",
    data: users,
  });
};

const getUserByUsername = (req, res) => {
  const user = users.find((u) => u.username === req.params.username);
  if (!user) {
    return res.status(404).json({
      status: "FAILURE",
      message: "User not found",
    });
  }
  res.json({
    status: "SUCCESS",
    message: "User retrieved successfully",
    data: user,
  });
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({
      status: "FAILURE",
      message: "User not found",
    });
  }

  user.password = await bcrypt.hash(password, 10);
  res.json({
    status: "SUCCESS",
    message: "Password updated successfully",
  });
};

const deleteUser = (req, res) => {
  const { username } = req.params;
  const index = users.findIndex((u) => u.username === username);
  if (index === -1) {
    return res.status(404).json({
      status: "FAILURE",
      message: "User not found",
    });
  }

  users.splice(index, 1);
  res.json({
    status: "SUCCESS",
    message: "User deleted successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
};
