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
  SELECT JSON_BUILD_OBJECT(
    'id', users.id,
    'name',users.name,
    'visitCount',(SELECT SUM("visitCount") FROM urls WHERE "userId"=$1),
    'shortenedUrls', (SELECT JSON_AGG(e) AS links
    FROM (
      SELECT id,"shortUrl",url,"visitCount"
      FROM urls
      WHERE "userId"=$1
    ) e)
    ) AS USER
  FROM users
  WHERE users.id=$1 
  ;`, [id]);
};

const getRankings = () => {
  return db.query(`
  SELECT users.id,users.name,COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
  FROM users
  JOIN urls ON users.id = urls."userId"
  GROUP BY users.id
  ORDER BY "visitCount" DESC
  LIMIT 10
  `);
};

export default {
  createNewUser,
  getUserByEmail,
  getUserById,
  getUser,
  getRankings
};