import { Router } from "express";
import {
  globalRateLimit,
  registroRateLimit,
} from "../../utils/rateLimit.service.js";
import { usuarioController } from "./usuario.controller.js";

const rotaUsuario = Router();

rotaUsuario.use(globalRateLimit);

rotaUsuario.post(
  "/registro",
  registroRateLimit,
  usuarioController.registroLocal,
);

rotaUsuario.post(
  "/verificar-email",
  registroRateLimit,
  usuarioController.verificarEmailLocal,
);

rotaUsuario.post("/login-local", usuarioController.loginLocal);

rotaUsuario.post("/login-google", usuarioController.loginGoogle);

export default {
  path: "/usuario",
  router: rotaUsuario,
};
