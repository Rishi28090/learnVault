const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

// GET: Show signup form
exports.showSignup = (req, res) => {
  res.render('auth/signup');
};

// GET: Show login form
exports.showLogin = (req, res) => {
  res.render('auth/login');
};

// POST: Signup new user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'Email already exists');
      return res.redirect('/signup');
    }

    await User.create({ name, email, password });

    req.flash('success_msg', 'Signup successful! Please login');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/signup');
  }
};

// POST: Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // ✅ Fix: capital User, not user

    if (!user || !(await user.comparePassword(password))) {
      req.flash('error_msg', 'Invalid credentials');
      return res.redirect('/login');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Something went wrong');
    res.redirect('/login');
  }
};

// GET: Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
