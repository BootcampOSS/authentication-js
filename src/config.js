// Load environment variables from `.env` file.
// A sample configuration file is included: .env.example
const envFound = require('dotenv').config();

if (!envFound) {
  console.log(
    '⚠️  No .env file for Typographic found: this file contains' +
      'your Stripe API key and other secrets.\nTry copying .env.example to .env' +
      '(and make sure to include your own keys!)'
  );
  process.exit(0);
}

module.exports = {
  // Server port
  port: process.env.PORT || 3000,
  // Configuration for Knex
  database: {
    client: 'sqlite3',
    connection: {
      filename: './typographic.sqlite',
    },
    // Use `null` for any default values in SQLite
    useNullAsDefault: true,
  },
  // Secret for generating JSON web tokens: this can be any very long random string
  jwtSecret: process.env.JWT_SECRET,
};
