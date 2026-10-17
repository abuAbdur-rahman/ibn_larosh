import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { r2Config } from "./env";

/* Server-side R2 access (S3-compatible Cloudflare R2).
   Keys never reach the browser: public pages reference /api/media/<key>,
   which streams objects through our route handler with long cache headers. */

let client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!client) {
    const cfg = r2Config();
    client = new S3Client({
      region: "auto",
      endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: cfg.accessKeyId,
        secretAccessKey: cfg.secretAccessKey,
      },
    });
  }
  return client;
}

const KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const MAX_KEY_LENGTH = 200;

function isValidMediaKey(key: string): boolean {
  return KEY_PATTERN.test(key) && key.length <= MAX_KEY_LENGTH;
}

function isMissingKeyError(error: unknown): boolean {
  const name = error instanceof Error ? error.name : "";
  return name === "NoSuchKey" || name === "NotFound";
}

export interface MediaObject {
  bytes: Uint8Array;
  contentType: string;
}

async function readObject(key: string): Promise<MediaObject> {
  const res = await getR2Client().send(
    new GetObjectCommand({ Bucket: r2Config().bucket, Key: key })
  );
  return {
    bytes: await res.Body!.transformToByteArray(),
    contentType: res.ContentType ?? "application/octet-stream",
  };
}

export async function getMediaObject(key: string): Promise<MediaObject | null> {
  if (!isValidMediaKey(key)) return null;

  try {
    return await readObject(key);
  } catch (error) {
    if (isMissingKeyError(error)) return null;

    // Log without leaking credentials/URLs to the client.
    console.error(`R2 media read failed for "${key}":`, error);
    throw error;
  }
}
