import urlsService from "../services/urls.service.js";

const createLink = async (req, res) => {
  const { id: userId } = res.locals.user;
  const body = { ...req.body, userId };
  const { status, response } = await urlsService.createLink(body);
  res.status(status).json(response);
};

const getUrlById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await urlsService.getUrlById(id);
  res.status(status).json(response);
};

const deleteUrlById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await urlsService.deleteUrlById(id);
  res.status(status).json(response);
};

export default {
  createLink,
  getUrlById,
  deleteUrlById
};