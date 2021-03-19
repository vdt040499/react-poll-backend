const User = require("../models/user.model");

exports.signup = async (req, res) => {
  try {

    const user = await User.findOne({ username: req.body.username });
    const { username, password } = req.body;

    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const _user = new User({
      username,
      password,
    });

    await _user.save();

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (err) {
    return res.status(500).json({
      error: err
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
