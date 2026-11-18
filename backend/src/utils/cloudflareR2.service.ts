import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "node:stream";

import {
  r2,
  R2_BUCKET_PRIVATE_NAME,
  R2_BUCKET_PUBLIC_NAME,
} from "../config/r2.js";

interface UploadArquivoDTO {
  key: string;
  buffer: Buffer;
  contentType: string;
}

interface DownloadArquivoDTO {
  key: string;
  bucket?: string;
  signal?: AbortSignal;
}

class R2Service {
  async getDownloadUrl(key: string): Promise<string> {
    return getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: R2_BUCKET_PRIVATE_NAME,
        Key: key,
        ResponseContentDisposition: "attachment",
      }),
      { expiresIn: 60 },
    );
  }

  async download({
    key,
    bucket = R2_BUCKET_PRIVATE_NAME,
    signal,
  }: DownloadArquivoDTO) {
    const object = await r2.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
      { abortSignal: signal },
    );

    if (!(object.Body instanceof Readable)) {
      throw new Error("O R2 não retornou um stream de arquivo válido.");
    }

    return {
      stream: object.Body,
      contentType: object.ContentType ?? "application/octet-stream",
      contentLength: object.ContentLength,
    };
  }

  async upload({ key, buffer, contentType }: UploadArquivoDTO) {
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_PUBLIC_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );

    return key;
  }

  async delete(key: string) {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_PUBLIC_NAME,
        Key: key,
      }),
    );
  }
}

export const r2Service = new R2Service();
