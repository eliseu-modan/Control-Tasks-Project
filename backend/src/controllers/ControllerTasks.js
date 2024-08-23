const e = require("cors");
const prisma = require("../importPrisma");
const TaskService = require('../services/TaskServices/TaskService');
const TaskPermanent = require('../services/TaskServices/TaskPermanent');
const CreateTask = require('../services/TaskServices/CreateTask');

const io = require("socket.io")(6060, {
  cors: {
    origin: "*",
  },
});
let userId;
exports.AssociationMessageId = function (userIdParam) {
  userId = userIdParam;
};


exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await CreateTask.createTask(taskData,userId);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getTasks = async (req, res) => {
  try {
    const { search, checkedTasks } = req.query;
    const Id = userId

    const tasks = await TaskService.getTasks(Id, search, parseInt(checkedTasks, 10));
    res.json(tasks);
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskSelected;
    const id = parseInt(taskId, 10);
    await TaskService.deleteTask(id)
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.concluidedTask = async (req, res) => {
  try {
    const taskConcluide = req.params.taskSelected;
    const ids = parseInt(taskConcluide, 10);
    await TaskService.concluidedTask(ids)
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao concluir a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const dataUpdate = req.body;
    const id = parseInt(taskId, 10);
    await TaskService.updateTask(id, dataUpdate)
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};
exports.getTasksConcluided = async (req, res) => {
  try {

   const data = await TaskService.getTasksConcluided(userId)
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
exports.getTasksPermanent = async (req, res) => {
  try {
   const dataPermanents =  await TaskPermanent.getTasksPermanent(userId)
    res.json(dataPermanents);
  } catch (error) {
    console.error("Erro ao buscar tarefas concluídas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
exports.deleteTaskPermants = async (req, res) => {
  try {
    const taskId = req.params.taskSelected;
    const id = parseInt(taskId, 10);
    await TaskPermanent.deleteTaskPermants(id)
    const deletetask = await prisma.createMessages.delete({
      where: {
        id: id,
        permanent: true
      },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover a tarefa:", error);
    res.status(500).send("Erro interno do servidor");
  }
};