import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { usuarioMiddleware } from "../../middleware/usuarioMiddleware.js";
import { globalRateLimit } from "../../utils/rateLimit.service.js";
import { produtoController } from "./produto.controller.js";

const rotaProduto = Router();

rotaProduto.post("/create", adminMiddleware, produtoController.create);

rotaProduto.get(
  "/:produtoId/download",
  usuarioMiddleware,
  produtoController.download,
);

export default {
  path: "/produto",
  router: rotaProduto,
};
