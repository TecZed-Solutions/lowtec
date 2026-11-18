import { Produto, StatusPagamento } from "@prisma/client";
import prisma from "../../config/prisma.js";
import { R2_PUBLIC_URL } from "../../config/r2.js";
import { r2Service } from "../../utils/cloudflareR2.service.js";
import { CreateProdutoDTO } from "../../types/produto.js";

export class ProdutoService {
  async create(data: CreateProdutoDTO): Promise<Produto> {
    return prisma.produto.create({
      data,
    });
  }

  private getDownloadKey(downloadUrl: string): string {
    if (!downloadUrl.trim()) {
      throw new Error("Arquivo de download não configurado para o produto.");
    }

    // Chaves do R2 são usadas diretamente, sem buscar URLs externas.
    if (!/^[a-z][a-z\d+.-]*:/i.test(downloadUrl)) {
      return downloadUrl;
    }

    if (!R2_PUBLIC_URL) {
      throw new Error(
        "R2_PUBLIC_URL não configurado para resolver a URL do produto.",
      );
    }

    const url = new URL(downloadUrl);
    const baseUrl = new URL(`${R2_PUBLIC_URL.replace(/\/+$/, "")}/`);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.origin !== baseUrl.origin ||
      !url.pathname.startsWith(baseUrl.pathname)
    ) {
      throw new Error("A URL do produto não pertence ao R2 configurado.");
    }

    const key = decodeURIComponent(url.pathname.slice(baseUrl.pathname.length));

    if (!key) {
      throw new Error("A URL do produto não contém uma chave de arquivo.");
    }

    return key;
  }

  async download(usuarioId: string, produtoId: string, signal?: AbortSignal) {
    if (!usuarioId || !produtoId) {
      throw new Error("Usuário e produto são obrigatórios para o download.");
    }

    const compra = await prisma.compra.findFirst({
      where: {
        usuarioId,
        produtoId,
        pagamento: {
          usuarioId,
          status: StatusPagamento.PAID,
        },
      },
      select: {
        produto: {
          select: {
            downloadUrl: true,
          },
        },
      },
    });

    if (!compra) {
      return null;
    }

    signal?.throwIfAborted();

    const key = this.getDownloadKey(compra.produto.downloadUrl);

    return {
      downloadUrl: await r2Service.getDownloadUrl(key),
      expiresIn: 60,
    };
  }
}

export const produtoService = new ProdutoService();
