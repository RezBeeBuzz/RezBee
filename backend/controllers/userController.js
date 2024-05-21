require('dotenv').config();
const User = require('../models/User');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.signup = async (req, res) => {
  const { phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const verification = await twilioClient.verify.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({ to: phone_number, channel: 'sms' });

    res.status(200).json({ message: 'Verification code sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { phone_number, code } = req.body;
  try {
    const verificationCheck = await twilioClient.verify.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({ to: phone_number, code });

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone_number });
      if (!user) {
        user = new User({ phone_number });
        await user.save();
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
