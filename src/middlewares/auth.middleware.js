import jwt from "jsonwebtoken";
import "dotenv/config.js";
import usersService from "../services/users.service.js";

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(400).json({ message: "Campo authorization não encontrado nos headers" });

  const [schema, token] = authorization.split(" ");

  if (schema !== "Bearer" || !token) return res.status(401).json({ message: "Formato de token inválido" });

  jwt.verify(token, process.env.JWT_KEY, async (error, decode) => {
    if (error) return res.status(401).json({ message: "Token inválido" });
    try {
      const { status, user } = usersService.findUserById(decode.userId);
      if (status === 404) return res.status(status).json({ message: "Usuário não encontrado" });

      res.locals.user = user;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  next();
};

export default authMiddleware;