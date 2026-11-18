import { Response } from "express";
import { NoSuchKey } from "@aws-sdk/client-s3";
import { Prisma } from "@prisma/client";
import { Readable } from "node:stream";
import { AdminAuthRequest, AuthRequest } from "../../types/auth.js";
import { produtoService } from "./produto.service.js";

export class ProdutoController {
  async create(req: AdminAuthRequest, res: Response) {
    try {
      if (!req.admin) {
        return res.status(401).json({
          message: "Administrador não autenticado.",
        });
      }

      const { name, valor, discount = 0, downloadUrl } = req.body ?? {};

      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof downloadUrl !== "string" ||
        !downloadUrl.trim()
      ) {
        return res.status(400).json({
          message: "Nome e caminho do arquivo são obrigatórios.",
        });
      }

      // Decimal(10, 2): até oito dígitos inteiros e duas casas decimais.
      const formatoMonetario = /^\d{1,8}(\.\d{1,2})?$/;

      if (
        (typeof valor !== "number" && typeof valor !== "string") ||
        !formatoMonetario.test(String(valor))
      ) {
        return res.status(400).json({
          message:
            "Valor deve ser não negativo, até 99999999.99 e ter no máximo duas casas decimais.",
        });
      }

      if (
        (typeof discount !== "number" && typeof discount !== "string") ||
        !formatoMonetario.test(String(discount))
      ) {
        return res.status(400).json({
          message:
            "Desconto deve ser não negativo, até 99999999.99 e ter no máximo duas casas decimais.",
        });
      }

      if (new Prisma.Decimal(discount).gt(new Prisma.Decimal(valor))) {
        return res.status(400).json({
          message: "Desconto não pode ser maior que o valor do produto.",
        });
      }

      const produto = await produtoService.create({
        name: name.trim(),
        valor,
        discount,
        downloadUrl: downloadUrl.trim(),
      });

      return res.status(201).json({
        message: "Produto criado com sucesso.",
        produto,
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);

      return res.status(500).json({
        message: "Erro interno ao criar produto.",
      });
    }
  }

  async download(req: AuthRequest, res: Response) {
    res.setHeader("Cache-Control", "private, no-store");

    if (!req.usuario?.id) {
      return res.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    const { produtoId } = req.params;

    if (typeof produtoId !== "string" || !produtoId.trim()) {
      return res.status(400).json({
        message: "ID do produto é obrigatório.",
      });
    }

    const abortController = new AbortController();
    const abortDownload = () => {
      if (!res.writableFinished) abortController.abort();
    };
    let stream: Readable | undefined;

    res.once("close", abortDownload);

    try {
      const arquivo = await produtoService.download(req.usuario.id, produtoId);

      if (!arquivo) {
        return res.status(404).json({
          message:
            "Produto não encontrado ou sem compra com pagamento confirmado.",
        });
      }

      res.setHeader("Cache-Control", "private, no-store");

      return res.status(200).json(arquivo);
    } catch (error) {
      if (abortController.signal.aborted) return;

      if (error instanceof NoSuchKey) {
        return res.status(404).json({
          message: "Arquivo do produto não encontrado.",
        });
      }

      console.error("Erro ao baixar produto:", error);

      if (res.headersSent || res.destroyed) {
        if (!res.destroyed) res.destroy();
        return;
      }

      res.removeHeader("Content-Disposition");
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Type");

      return res.status(500).json({
        message: "Erro interno ao baixar produto.",
      });
    } finally {
      res.off("close", abortDownload);
      stream?.destroy();
    }
  }
}

export const produtoController = new ProdutoController();
