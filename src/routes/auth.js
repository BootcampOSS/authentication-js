const router = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/User');

// Sign up a new user
router.post('/signup', async (req, res, next) => {
  // This route expects the body parameters:
  //  - email: username's email
  //  - password: username's password
  const { email, password } = req.body;

  try {
    // Make sure there isn't an existing account in our database
    const existingAccount = await User.getByEmail(email);
    if (existingAccount) {
      // Conflict: the resource already exists (HTTP 409)
      const err = new Error(`Username ${email} is already taken.`);
      err.status = 409;
      err.clientMessage = 'That username is already taken.';
      return next(err);
    }
    const user = await User.create(email, password);

    // Success: generate a JSON web token and respond with the JWT
    return res.json({ token: generateToken(user.id) });
  } catch (e) {
    console.log(e);
    return next(new Error(e));
  }
});

// Log in an existing user/* Log in an existing user */
router.post('/login', async (req, res, next) => {
  // This route expects the body parameters:
  //  - email: username's email
  //  - password: username's password
  const { email, password } = req.body;

  try {
    // Get the account for this email address
    const user = await User.getByEmail(email);
    if (user) {
      const verifiedPassword = await user.comparePassword(password);
      if (verifiedPassword) {
        return res.json({ token: generateToken(user.id) });
      }
    }
  } catch (e) {
    return next(new Error(e));
  }

  // Unauthorized (HTTP 401)
  const err = new Error(`Username or password for ${email} doesn't match.`);
  err.status = 401;
  err.clientMessage = "Username and password don't match.";
  return next(err);
});

// Generates a signed JWT that encodes a user ID
// This function requires:
//  - userId: account to include in the token
function generateToken(userId) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // This key expires in 1 hour,
      data: { userId },
    },
    config.jwtSecret
  );
}

module.exports = router;
