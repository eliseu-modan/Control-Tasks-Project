const TaskRepository = require('../../repositories/TaskRepository');

module.exports = {
  createTask: async (taskData, userId) => {
    const { name, email, task, dateInitial, dateFinally, permanent } = taskData;
    const dataConcluided = null;
    const subject = task;
    const dataTasks = {
      name,
      email,
      subject,
      userId,
      dateInitial,
      dateFinally,
      dataConcluided,
      permanent,
    };
    await TaskRepository.create(dataTasks); 
  }
}