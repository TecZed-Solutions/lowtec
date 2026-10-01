import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";

//Cria o app express
const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

//Health Check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LowTec API está online!" });
});

export default app;
