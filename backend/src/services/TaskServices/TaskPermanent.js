
const TaskRepository = require('../../repositories/TaskRepository');

module.exports = {

getTasksPermanent: async (userId) =>{
    try {
     const getTasksPermanentData = await TaskRepository.getTasksPermanent(userId)
     return getTasksPermanentData
     } catch (error) {
  }
    },
  
    deleteTaskPermants: async (id) =>{
      await TaskRepository.getTasksPermanent(id)
    }
}