import { db } from "../database/connect.js";

const insertNewUrl = ({ url, shortUrl, userId }) => {
  return db.query(`INSERT INTO urls (url,"shortUrl","userId") VALUES($1,$2,$3) RETURNING id;`, [url, shortUrl, userId]);
};

const getUrlByShortUrl = (shortUrl) => {
  return db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
};

const getUrlById = (id) => {
  return db.query(`SELECT id,"shortUrl",url FROM urls WHERE id=$1`, [id]);
};

const deleteUrlById = (id) => {
  return db.query(`DELETE FROM urls WHERE id=$1`, [id]);
};

const updateUrlByShortUrl = (shortUrl) => {
  return db.query(`UPDATE urls SET "visitCount"="visitCount" + 1 WHERE "shortUrl"=$1`, [shortUrl]);
};

export default {
  getUrlByShortUrl,
  insertNewUrl,
  getUrlById,
  deleteUrlById,
  updateUrlByShortUrl
};