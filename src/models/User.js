const bcrypt = require('bcryptjs');

// The number of rounds to use when hashing a password with bcrypt
const NUM_ROUNDS = 12;
const users = {};

class User {
  // Create a new User instance
  constructor(opts) {
    this.id = opts.id;
    this.email = opts.email;
    this.password = opts.password;
  }

  static async getByEmail(email) {
    try {
      const user = users[email];
      if (!user) {
        return null;
      }
      return new User(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async create(email, password) {
    // Make sure we've included a password field
    if (!email || !password) {
      throw new Error('Missing a required parameter: email, password');
    }

    const id = Buffer.from(Math.random().toString()).toString('base64').substring(0, 8);

    // Hash the password using bcrypt before saving it
    const hashed = await bcrypt.hash(password, NUM_ROUNDS);

    const user = {
      id,
      email,
      password: hashed,
    };

    users[email] = user;

    return new User(user);
  }

  // Compare the given password to the stored hash using bcrypt
  async comparePassword(password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
  }
}

module.exports = User;
