const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require('express-validator');

// Middleware for validating request data (example using express-validator)
const validateUser = [
];

// Create user handler
const createUser = asyncHandler(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, secondName, mobile, password } = req.body;

  // Check if user already exists
  const findUser = await User.findOne({ email }).maxTimeMS(40000);
  if (findUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  // Create new user
  const newUser = await User.create({
    email,
    firstName,
    secondName,
    mobile,
    password // Ensure you hash passwords before saving in production
  });

  // Return success response
  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      secondName: newUser.secondName,
      mobile: newUser.mobile,
    }
  });
});

module.exports = {
  createUser,
  validateUser // Export validation middleware for use in routes
};
