const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

module.exports = {
  hashPassword,
  comparePassword
};