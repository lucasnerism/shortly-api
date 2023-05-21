import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import usersController from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get('/users/me', authMiddleware, usersController.getUser);
usersRouter.get('/ranking');

export default usersRouter;