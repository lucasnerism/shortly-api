import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import urlsController from "../controllers/urls.controller.js";


const urlsRouter = Router();

urlsRouter.get('/urls/:id', urlsController.getUrlById);
urlsRouter.get('/urls/open/:shortUrl', urlsController.openUrl);
urlsRouter.post('/urls/shorten', authMiddleware, validateSchema(urlSchema), urlsController.createLink);
urlsRouter.delete('/urls/:id', authMiddleware, urlsController.deleteUrlById);

export default urlsRouter;