const bcrypt = require("bcryptjs");
const PasswordHasher = require("./passwordHasher");

class BcryptPasswordHasher extends PasswordHasher {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = BcryptPasswordHasher;
