import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutos
  limit: 100, // máximo de 100 tentativas
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Muitas tentativas. Tente novamente mais tarde.",
  },
});

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10, // máximo de 10 tentativas
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Muitas tentativas de login. Tente novamente mais tarde.",
  },
});

export const restrictRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Hora
  limit: 3, // máximo de 3 tentativas
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Muitas tentativas. Tente novamente mais tarde.",
  },
});

export const createPaymentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Hora
  limit: 3, // máximo de 3 tentativas
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Muitas tentativas. Tente novamente mais tarde.",
  },
});
