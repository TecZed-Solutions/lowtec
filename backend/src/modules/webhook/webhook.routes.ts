import { Router } from "express";
import { infinitePayController } from "./infinitePay.controller.js";

const webhookRouter = Router();

webhookRouter.post("/infinitepay", infinitePayController.processPayment);

export default {
  path: "/webhook",
  router: webhookRouter,
};
