const prisma = require("../importPrisma");

module.exports = {
    verifyEmail: async(email)=>{
     return await prisma.createUser.findUnique({
            where: {
              email,
            },
          });
    },
    newUser: async (email, hashedPassword, admin) =>{
        await prisma.createUser.create({
            data: {
              email,
              password: hashedPassword,
              admin,
            },
          });
    },
    getUsers: async (userQuery) =>{
       return await prisma.createUser.findMany(userQuery);
    },

    deleteUsers: async (id) =>{
        await prisma.createUser.delete({
            where: {
              id: id,
            },
          });
    },

    editUser: async(newDataUser, id) =>{
        await prisma.createUser.update({
            where: { id: id },
            data: newDataUser,
          });
    },

    editPassword: async(updatePassword , id) => {
        await prisma.createUser.update({
            where: { id: id },
            data: { password: updatePassword },
          });
    }
}