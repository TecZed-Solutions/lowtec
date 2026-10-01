import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app;

server.listen(PORT, () => {
  console.log(`✈ API está online na porta ${PORT}`);
});
