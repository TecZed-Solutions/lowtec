import { Router } from "express";
import { usuarioMiddleware } from "../../middleware/usuarioMiddleware.js";
import { globalRateLimit } from "../../utils/rateLimit.service.js";
import { compraController } from "./compra.controller.js";
const rotaCompra = Router();

rotaCompra.get("/todas", usuarioMiddleware, compraController.getComprasUsuario);

export default {
  path: "/compra",
  router: rotaCompra,
};
