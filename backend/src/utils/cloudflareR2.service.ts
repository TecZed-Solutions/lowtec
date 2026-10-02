import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import { r2, R2_BUCKET_NAME } from "../config/r2.js";

interface UploadArquivoDTO {
  key: string;
  buffer: Buffer;
  contentType: string;
}

class R2Service {
  async upload({ key, buffer, contentType }: UploadArquivoDTO) {
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
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
        Bucket: R2_BUCKET_NAME,
        Key: key,
      }),
    );
  }
}

export const r2Service = new R2Service();
