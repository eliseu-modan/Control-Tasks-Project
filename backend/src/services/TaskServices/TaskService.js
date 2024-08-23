const TaskRepository = require('../../repositories/TaskRepository');

module.exports = {

  getTasks: async (Id, search, checkedTasks) => {
    const filter = {
      AND: [
        { userId: { equals: Id } },
        { name: { startsWith: search || "" } },
        { dataConcluided: { equals: null } },
        { permanent: { equals: false } },
      ],
    };
    
    const orderBy = {
      currentTask: 'desc',
    };

    if (!isNaN(checkedTasks)) {
      const tasksToUpdateByOrder = await TaskRepository.findTasksById([checkedTasks]);

      await Promise.all(
        tasksToUpdateByOrder.map(async (task) => {
          const { id, currentTask } = task;
          const updatedValue = !currentTask;

          return TaskRepository.updateOrderTask(id, { currentTask: updatedValue });
        })
      );
    }

    const dataTasks = await TaskRepository.findTasks(filter, orderBy);
    const countDataTasks = await TaskRepository.countTasks(filter);

    return { dataTasks, countDataTasks };
  },

  deleteTask: async (id) =>{
    await TaskRepository.deleteTask(id)
  },

  updateTask: async(id, dataUpdate) =>{
    await TaskRepository.updateTask(id, dataUpdate)
  },

  concluidedTask: async(ids) =>{
    await TaskRepository.concluidedTask(ids)
  },
  
  getTasksConcluided: async (userId) =>{
   const dataTaskConcluided = await TaskRepository.getTasksConcluided(userId)
     return dataTaskConcluided
  },
  
};
