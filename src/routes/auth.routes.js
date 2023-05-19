import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import usersController from "../controllers/users.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), usersController.signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), usersController.signIn);

export default authRouter;