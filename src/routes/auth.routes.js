import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema));
authRouter.post('/sign-in', validateSchema(signInSchema));

export default authRouter;