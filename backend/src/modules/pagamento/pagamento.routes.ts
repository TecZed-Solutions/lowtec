import { Router } from "express";
import { usuarioMiddleware } from "../../middleware/usuarioMiddleware.js";
import {
  createPaymentRateLimit,
  globalRateLimit,
} from "../../utils/rateLimit.service.js";
import { pagamentoController } from "./pagamento.controller.js";
const rotaPagamento = Router();

rotaPagamento.use(globalRateLimit);

rotaPagamento.post(
  "/create",
  createPaymentRateLimit,
  usuarioMiddleware,
  pagamentoController.create,
);

export default {
  path: "/pagamento",
  router: rotaPagamento,
};
