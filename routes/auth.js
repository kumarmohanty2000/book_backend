const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // res.json("bhvhvgyvghb")
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
      if (!email || !password) {
          return res.status(400).json({ error: "All fields are required" })
      }
      if (!email.includes("@")) {
          return res.status(400).json({ error: "Please enter a valid email" })
      }
      const user = await User.findOne({ email });

      console.log(user)
      if (!user) {
          res.status(400).json({ error: "User Not Found" })
      }

      const doMatch = await bcrypt.compare(password, user.password)
      console.log(doMatch)


      if (doMatch) {
          const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
              expiresIn: '7d'
          })

          res.status(201).json({ token, success : "Login Successfully" })
      }
      else {
          res.status(404).json({ error: 'Email And Password Not Found' })
      }

  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;