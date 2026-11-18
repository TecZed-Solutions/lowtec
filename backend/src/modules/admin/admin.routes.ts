import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import {
  globalRateLimit,
  restrictRateLimit,
} from "../../utils/rateLimit.service.js";
import { adminController } from "./admin.controller.js";
const rotaAdmin = Router();

rotaAdmin.use(globalRateLimit);

//REMOVER ESSA ROTA ABAIXO EM PRODUÇÃO - CREATE NÃO PODE IR EM PRODUÇÃO
// rotaAdmin.post("/create", adminController.create);
//ATENÇÃO

rotaAdmin.post(
  "/verificar-factor",
  restrictRateLimit,
  adminController.verificarFactor,
);

rotaAdmin.post("/login", restrictRateLimit, adminController.login);

rotaAdmin.post("/logout", restrictRateLimit, adminController.logout);

rotaAdmin.get("/faturamento", adminMiddleware, adminController.getFaturamento);

rotaAdmin.get(
  "/usuarios",
  adminMiddleware,
  adminController.getQuantidadeUsuarios,
);

rotaAdmin.get(
  "/compras",
  adminMiddleware,
  adminController.getQuantidadeCompras,
);

export default {
  path: "/admin",
  router: rotaAdmin,
};
