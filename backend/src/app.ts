import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes/index.js";
import { globalRateLimit } from "./utils/rateLimit.service.js";

//Cria o app express
const app: Application = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Reconhece um proxy reverso na frente do Express
// -> configuração necessária para o proxy reverso da railway
app.set("trust proxy", 1);

app.use(globalRateLimit);
app.use(router);

//Health Check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LowTec API está online!" });
});

export default app;
