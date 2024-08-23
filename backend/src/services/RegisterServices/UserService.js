const bcrypt = require("bcryptjs");
const RegisterRepository = require("../../repositories/RegisterRepository")


module.exports = {
    getUsers: async (search) =>{
        let userQuery = {
            select: {
              id: true,
              email: true,
              admin: true,
            },
          };
      
          if (typeof search === "string" && search.trim() !== "") {
            userQuery = {
              ...userQuery,
              where: {
                email: {
                  contains: search,
                },
              },
            };
          }
           
        const getUsersData = await RegisterRepository.getUsers(userQuery)
        return getUsersData

    },

    deleteUsers: async (id) =>{
      await RegisterRepository.deleteUsers(id)
    },

    editUser: async(newDataUser, id) =>{
     await RegisterRepository.editUser(newDataUser, id)
    },

    editPassword: async (newPassword, password, id) =>{
       const updatePassword =  newPassword.password = await bcrypt.hash(password, 10);
        await RegisterRepository.editPassword(updatePassword, id)

    }
}