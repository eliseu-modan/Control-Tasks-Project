const bcrypt = require("bcryptjs");
const RegisterRepository = require("../../repositories/RegisterRepository")


class RegisterService{
  constructor(passwordHasher) {
    this.passwordHasher = passwordHasher;
  }
     async register(email, password, admin) {
    const existingUser = await RegisterRepository.verifyEmail(email)
     if (existingUser) {
        return res.status(401).json({ message: "Este email já está em uso." });
      }
      const hashedPassword = await this.passwordHasher.hashPassword(password)
      if (!hashedPassword) {
        throw new Error("implemente o método");
      }
      const newUser = await RegisterRepository.newUser(email, hashedPassword, admin)
      return newUser
}

}

module.exports = RegisterService
