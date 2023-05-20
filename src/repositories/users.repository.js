import { db } from "../database/connect.js";

const createNewUser = async ({ name, email, hashPassword }) => {
  return db.query(`INSERT INTO users (name, email, password) VALUES($1,$2,$3);`, [name, email, hashPassword]);
};

const getUserByEmail = (email) => {
  return db.query(`SELECT * from users WHERE email=$1;`, [email]);
};

const getUserById = async (id) => {
  return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
};

export default {
  createNewUser,
  getUserByEmail,
  getUserById
};