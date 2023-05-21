import { db } from "../database/connect.js";

const createNewUser = async ({ name, email, hashPassword }) => {
  return db.query(`INSERT INTO users (name, email, password) VALUES($1,$2,$3);`, [name, email, hashPassword]);
};

const getUserByEmail = (email) => {
  return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};

const getUserById = (id) => {
  return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
};

const getUser = (id) => {
  return db.query(`
  SELECT users.id, users.name,SUM(urls."visitCount") AS "visitCount", 
  JSON_AGG(urls."id",urls."shortUrl",urls."url",urls."visitCount" GROUP BY urls.id) "shortnedUrls"
  FROM users
  INNER JOIN urls USING (id)
  GROUP BY users.id  
  ;`, [id]);
};

export default {
  createNewUser,
  getUserByEmail,
  getUserById,
  getUser
};