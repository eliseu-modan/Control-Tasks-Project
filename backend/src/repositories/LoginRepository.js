// AuthRepository.js
const prisma = require('../importPrisma');

const AuthRepository = {
  findUserByEmail: async (email) => {
    try {
      return await prisma.createUser.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por email no banco de dados:", error);
      throw error;
    }
  },

  findUserById: async (userId) => {
    try {
      return await prisma.createUser.findUnique({
        where: { id: userId },
        select: { admin: true },
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por ID no banco de dados:", error);
      throw error;
    }
  }
};

module.exports = AuthRepository;
