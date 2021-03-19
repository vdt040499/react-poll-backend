const jwt = require('jsonwebtoken');

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
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({
        message: "User not exists",
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(400).json({
        message: "Wrong password",
      })
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: 'Login successfully',
      user: {
        _id: user._id,
        username: user.username,
        token: token
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString()
    })
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({
      message: 'Signout successfully'
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    });
  }
}
