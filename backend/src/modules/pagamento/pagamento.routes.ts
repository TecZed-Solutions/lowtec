import { Router } from "express";
import { usuarioMiddleware } from "../../middleware/usuarioMiddleware.js";
import {
  globalRateLimit,
  restrictRateLimit,
} from "../../utils/rateLimit.service.js";
import { pagamentoController } from "./pagamento.controller.js";
const rotaPagamento = Router();

rotaPagamento.use(globalRateLimit);

rotaPagamento.post(
  "/create",
  restrictRateLimit,
  usuarioMiddleware,
  pagamentoController.create,
);

export default {
  path: "/pagamento",
  router: rotaPagamento,
};
