import urlsRepository from "../repositories/urls.repository.js";
import generateId from "../helpers/nanoIdGenerator.helper.js";

const createLink = async (body) => {
  let result;
  let shortUrl;
  try {
    do {
      shortUrl = generateId();
      result = await urlsRepository.getUrlByShortUrl(shortUrl);
    } while (result.rowCount !== 0);
    const newResult = await urlsRepository.insertNewUrl({ ...body, shortUrl });
    const { id } = newResult.rows[0];

    return { status: 201, response: { id, shortUrl } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const getUrlById = async (id) => {
  try {
    const result = await urlsRepository.getUrlById(id);
    if (result.rowCount === 0) return { status: 404, response: { message: "Url não encontrada" } };

    const response = result.rows[0];
    return { status: 200, response };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const deleteUrlById = async (id) => {
  try {
    const result = await urlsRepository.getUrlById(id);
    if (result.rowCount === 0) return { status: 404, response: { message: "Url não encontrada" } };

    await urlsRepository.deleteUrlById(id);
    return { status: 204, response: { message: "Url excluída com sucesso" } };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

const openUrl = async (shortUrl) => {
  try {
    const result = await urlsRepository.getUrlByShortUrl(shortUrl);
    if (result.rowCount === 0) return { status: 404, response: { message: "Url não encontrada" } };

    const url = result.rows[0];
    await urlsRepository.updateUrlByShortUrl(shortUrl);
    return { status: 200, response: url.url };
  } catch (error) {
    return { status: 500, response: { message: error.message } };
  }
};

export default {
  createLink,
  getUrlById,
  deleteUrlById,
  openUrl
};