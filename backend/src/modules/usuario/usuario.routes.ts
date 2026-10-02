import { Router } from "express";
import {
  globalRateLimit,
  restrictRateLimit,
} from "../../utils/rateLimit.service.js";
import { usuarioController } from "./usuario.controller.js";
import { usuarioMiddleware } from "../../middleware/usuarioMiddleware.js";
import { uploadAvatar } from "../../middleware/uploadMiddleware.js";

const rotaUsuario = Router();

rotaUsuario.use(globalRateLimit);

rotaUsuario.post(
  "/registro",
  restrictRateLimit,
  usuarioController.registroLocal,
);

rotaUsuario.post(
  "/verificar-email",
  restrictRateLimit,
  usuarioController.verificarEmailLocal,
);

rotaUsuario.post("/login-local", usuarioController.loginLocal);

rotaUsuario.post("/login-google", usuarioController.loginGoogle);

rotaUsuario.post(
  "/enviar-reset-token",
  restrictRateLimit,
  usuarioController.sendTokenPassword,
);

rotaUsuario.post(
  "/verificar-reset-token",
  usuarioController.verificarTokenPassword,
);

rotaUsuario.patch(
  "/atualizar-senha-token",
  restrictRateLimit,
  usuarioController.redefinirSenhaToken,
);

rotaUsuario.patch(
  "/atualizar-senha",
  restrictRateLimit,
  usuarioMiddleware,
  usuarioController.redefinirSenha,
);

//.patch devido a ser uma atualização parcial do registro (seria PUT caso seja uma atualização total).
rotaUsuario.patch(
  "/atualizar-foto",
  usuarioMiddleware,
  uploadAvatar,
  usuarioController.updateFoto,
);

rotaUsuario.patch(
  "/atualizar-perfil",
  usuarioMiddleware,
  usuarioController.updatePerfil,
);

export default {
  path: "/usuario",
  router: rotaUsuario,
};
