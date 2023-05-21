import usersService from "../services/users.service.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const { status, response } = await usersService.signUp({ ...req.body, hashPassword });
  res.status(status).json(response);
};

const signIn = async (req, res) => {
  const { status, response } = await usersService.signIn(req.body);
  res.status(status).json(response);
};

const getUser = async (req, res) => {
  const { id } = res.locals.user;
  const { status, response } = await usersService.getUser(id);
  res.status(status).json(response);
};

export default {
  signUp,
  signIn,
  getUser
};