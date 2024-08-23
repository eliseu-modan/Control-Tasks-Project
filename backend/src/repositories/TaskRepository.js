const prisma = require('../importPrisma'); 
module.exports = {
  create: async (dataTasks) => {
    try {
      await prisma.createMessages.create({
        data: dataTasks,
      });
    } catch (error) {
      console.error("Erro ao criar a tarefa no banco de dados:", error);
      throw error;
    }
  },
  
  findTasks: async (filter, orderBy) => {
    try {
      return await prisma.createMessages.findMany({
        where: filter,
        orderBy,
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas no banco de dados:", error);
      throw error;
    }
  },

  countTasks: async (filter) => {
    try {
      return await prisma.createMessages.count({
        where: filter,
      });
    } catch (error) {
      console.error("Erro ao contar tarefas no banco de dados:", error);
      throw error;
    }
  },

  findTasksById: async (ids) => {
    try {
      return await prisma.createMessages.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          id: true,
          currentTask: true,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar tarefas por ID no banco de dados:", error);
      throw error;
    }
  },

  updateOrderTask: async (id, data) => {
    try {
      return await prisma.createMessages.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (error) {
      console.error("Erro ao atualizar tarefa no banco de dados:", error);
      throw error;
    }
  },

  deleteTask : async(id)=>{
const deletetask = await prisma.createMessages.delete({
      where: {
        id: id,
      },
    });
  },

  concluidedTask : async(ids) =>{
    await prisma.createMessages.update({
      where: { id: ids },
      data: {
        dataConcluided: new Date(),
      },
    });
  },

  updateTask : async (id, dataUpdate) =>{
     await prisma.createMessages.update({
      where: { id: id },
      data: dataUpdate,
    });
  },

  getTasksConcluided: async (userId) =>{

    try {
    
      return await prisma.createMessages.findMany({
        where: {
          userId: userId,
          dataConcluided: {
            not: null,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar tarefa no banco de dados:", error);
      throw error;
    }
  },

  getTasksPermanent: async (userId) =>{
    try {
      
      return  await prisma.createMessages.findMany({
         where: {
           userId: userId,
           permanent: true,
         },
       });
    } catch (error) {
      console.error("Erro ao atualizar tarefa no banco de dados:", error);
      throw error;

    }
  },

  deleteTaskPermanent: async (id) =>{
    try {
      await prisma.createMessages.delete({
        where: {
          id: id,
          permanent: true
        },
      });
    } catch (error) {
      console.error("Erro ao remover a tarefa:", error);
      res.status(500).send("Erro interno do servidor");
    }
  }

};

