import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { r2Config } from "./env";

/* Server-side R2 access (S3-compatible Cloudflare R2).
   Public pages reference /api/media/<key>: the media key is browser-visible,
   but R2 credentials and the bucket endpoint stay server-side. */

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
/** Refuse to proxy anything above this; cap photos are ~50 KB–1 MB. */
const MAX_MEDIA_BYTES = 15 * 1024 * 1024;

export class MediaTooLargeError extends Error {
  constructor() {
    super(`R2 object exceeds the ${MAX_MEDIA_BYTES} byte proxy limit`);
    this.name = "MediaTooLargeError";
  }
}

function isValidMediaKey(key: string): boolean {
  return KEY_PATTERN.test(key) && key.length <= MAX_KEY_LENGTH;
}

function isMissingKeyError(error: unknown): boolean {
  const name = error instanceof Error ? error.name : "";
  return name === "NoSuchKey" || name === "NotFound";
}

function assertWithinLimit(length?: number): void {
  if (length !== undefined && length > MAX_MEDIA_BYTES) {
    throw new MediaTooLargeError();
  }
}

export interface MediaObject {
  /** Streamed straight through — never fully buffered in the function. */
  body: ReadableStream<Uint8Array>;
  contentType: string;
  contentLength?: number;
}

async function readObject(key: string): Promise<MediaObject | null> {
  const res = await getR2Client().send(
    new GetObjectCommand({ Bucket: r2Config().bucket, Key: key })
  );

  // R2 reports ContentLength for stored objects; reject oversized media
  // before reading a single byte.
  assertWithinLimit(res.ContentLength);

  const body = res.Body?.transformToWebStream();
  if (!body) return null;

  return {
    body,
    contentType: res.ContentType ?? "application/octet-stream",
    contentLength: res.ContentLength,
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

/** Upload (admin only). Keys are generated server-side and stay flat. */
export async function putMediaObject(
  key: string,
  body: Uint8Array,
  contentType: string
): Promise<void> {
  if (!isValidMediaKey(key)) {
    throw new Error("Invalid media key");
  }

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: r2Config().bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

/** Best-effort delete; a missing object is not an error. */
export async function deleteMediaObject(key: string): Promise<void> {
  if (!isValidMediaKey(key)) return;

  try {
    await getR2Client().send(
      new DeleteObjectCommand({ Bucket: r2Config().bucket, Key: key })
    );
  } catch (error) {
    console.error(`R2 delete failed for "${key}":`, error);
  }
}
