const userModel = require('../db/models/user.model');
const userServices = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword
    });

    const token = await user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};
