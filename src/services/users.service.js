import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersRepository from "../repositories/users.repository.js";

const signUp = async (body) => {
  try {
    await usersRepository.createNewUser(body);
    return { status: 201, response: { message: "Usuário criado com sucesso" } };
  } catch (error) {
    if (error.code === '23505') return { status: 409, response: { message: "E-mail já cadastrado" } };
    return { status: 500, response: { message: error.message } };
  }
};

const signIn = async ({ email, password }) => {
  try {
    const result = await usersRepository.getUserByEmail(email);
    const user = result.rows[0];
    if (!user) return { status: 401, response: { message: "E-mail não encontrado" } };

    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (!passwordValidation) return { status: 401, response: { message: "Senha incorreta" } };

    const data = { userId: user.id };
    const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1 day" });
    return { status: 200, response: { token, name: user.name } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const findUser = async (id) => {
  try {
    const result = await usersRepository.getUserById(id);
    const user = result.rows[0];
    return { status: 200, response: { user } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getUser = async (id) => {
  try {
    const result = await usersRepository.getUser(id);
    const user = result.rows[0];
    return { status: 200, response: user };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

export default {
  signUp,
  signIn,
  findUser,
  getUser
};