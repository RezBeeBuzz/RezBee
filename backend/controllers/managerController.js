require('dotenv').config();
const Manager = require('../models/Manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = async (req, res) => {
  const { email } = req.body;
  try {
    const manager = await Manager.findOne({ email });
    if (manager) return res.status(400).json({ message: 'Manager already exists' });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // const msg = {
    //   to: email,
    //   from: 'your-email@example.com',
    //   subject: 'Verification Code',
    //   text: `Your verification code is ${verificationCode}`,
    // };
    // await sgMail.send(msg);

    // Save the code and email to your DB, this is a simplified example
    req.session.email = email;
    req.session.verificationCode = verificationCode;

    res.status(200).json({ message: 'Verification code sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(400).json({ message: 'Manager does not exist' });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
