const bcrypt = require("bcryptjs");
const prisma = require("../importPrisma");
const UserService = require("../services/RegisterServices/UserService")
const RegisterService = require('../services/RegisterServices/RegisterService');
const BcryptPasswordHasher = require('../services/hashing/BcryptPasswordHasher');

const Register = new RegisterService(new BcryptPasswordHasher());


exports.register = async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    await Register.register(email, password, admin)
    return res.json("usuarios");
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const dataUsers = await UserService.getUsers(search)
    res.json(dataUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const idUser = req.params.card;
    const id = parseInt(idUser, 10);
    await UserService.deleteUsers(id)
    res.status(204).send();
  } catch (error) {}
};

exports.editUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const newDataUser = req.body;
    const id = parseInt(idUser, 10);
    await UserService.editUser(newDataUser, id)
    res.send(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a tarefa" });
  }
};

exports.editPassword = async (req, res) => {
  try {
    const newPassword = req.body;
    const { password } = newPassword;
    var id = req.params.id;
    id = parseInt(id, 10);
     await UserService.editPassword(newPassword, password, id)
    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar senha." });
  }
};
