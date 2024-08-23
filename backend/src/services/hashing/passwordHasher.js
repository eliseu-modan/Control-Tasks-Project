class PasswordHasher {
    async hashPassword(password) {
      throw new Error("Método não implementado");
    }
  
    async comparePassword(password, hashedPassword) {
      throw new Error("Método não implementado");
    }
  }
  
  module.exports = PasswordHasher;
  