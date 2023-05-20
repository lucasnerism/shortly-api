import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/urls/me');
usersRouter.get('/ranking');

export default usersRouter;