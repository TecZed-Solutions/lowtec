import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesPath = path.join(__dirname, "../modules");

const loadRoutes = async () => {
  const modules = fs.readdirSync(modulesPath);

  for (const moduleName of modules) {
    const modulePath = path.join(modulesPath, moduleName);

    if (!fs.statSync(modulePath).isDirectory()) {
      continue;
    }

    const extensions = [".js", ".ts"];

    let routeFile: string | null = null;

    for (const extension of extensions) {
      const candidate = path.join(
        modulePath,
        `${moduleName}.routes${extension}`,
      );

      if (fs.existsSync(candidate)) {
        routeFile = candidate;
        break;
      }
    }

    if (!routeFile) {
      continue;
    }

    const moduleUrl = pathToFileURL(routeFile).href;

    const module = await import(moduleUrl);
    const moduleRouter = module.default;

    if (moduleRouter?.path && moduleRouter?.router) {
      console.log(`✅ Rota carregada: ${moduleRouter.path}`);

      router.use(moduleRouter.path, moduleRouter.router);
    }
  }
};

await loadRoutes();

export default router;
