import { db } from "../database/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createNewUser = async ({ name, email, hashPassword }) => {
  try {
    await db.query(`INSERT INTO users (name, email, password) VALUES($1,$2,$3)`, [name, email, hashPassword]);
    return { status: 201, response: { message: "Usuário criado com sucesso" } };
  } catch (error) {
    if (error.code === '23505') return { status: 409, response: { message: "E-mail já cadastrado" } };
    return { status: 500, response: { message: error.message } };
  }
};

const login = async ({ email, password }) => {
  try {
    const user = (await db.query(`SELECT * from users WHERE email=$1`, [email])).rows[0];
    if (!user) return { status: 401, response: { message: "E-mail não encontrado" } };

    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (!passwordValidation) return { status: 401, response: { message: "Senha incorreta" } };

    const data = { userId: user.id };
    const token = jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1 day" });
    return { status: 200, response: token };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const findUserById = async (id) => {
  try {
    const user = (await db.query(`SELECT * FROM users WHERE id=$1`, [id])).rows[0];

    if (!user) return { status: 404, user: { message: "Usuário não encontrado" } };

    return { status: 200, user };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export default {
  createNewUser,
  login,
  findUserById
};