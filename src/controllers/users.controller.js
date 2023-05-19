import usersService from "../services/users.service.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const { status, response } = await usersService.createNewUser({ ...req.body, hashPassword });
  res.status(status).json(response);
};

const signIn = async (req, res) => {
  const { status, response } = await usersService.login(req.body);
  res.status(status).json(response);
};

export default {
  signUp,
  signIn
};