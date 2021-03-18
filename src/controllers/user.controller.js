const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { email, password } = req.body;

  if (user) {
    return res.status(400).json({
      message: "User already registered",
    });
  } else {
    const _user = new User({
      email,
      password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created successfully",
        });
      }
    });
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  } else {
    if (user.authenticate(req.body.password)) {
    }
  }
};
