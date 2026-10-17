import { putMediaObject } from "./r2";

/* Image upload guardrails. Files are validated by type, size, and magic
   bytes before anything is written to R2. */

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const MIME_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Detect the real type from the first bytes (browsers can lie about MIME). */
function sniffMime(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;

  const ascii = (start: number, end: number) =>
    String.fromCharCode(...bytes.slice(start, end));

  const signatures: Array<{ mime: string; matches: boolean }> = [
    { mime: "image/jpeg", matches: bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
    {
      mime: "image/png",
      matches: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
        (byte, index) => bytes[index] === byte
      ),
    },
    { mime: "image/webp", matches: ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP" },
  ];

  return signatures.find((signature) => signature.matches)?.mime ?? null;
}

export async function uploadCapImage(file: File, capId: string): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("Choose a photo to upload.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Photo must be 5 MB or smaller.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffMime(bytes);

  if (!mime || !MIME_EXTENSION[mime]) {
    throw new Error("Photo must be a JPEG, PNG, or WebP image.");
  }

  const key = `cap-${capId}-${Date.now()}.${MIME_EXTENSION[mime]}`;
  await putMediaObject(key, bytes, mime);
  return key;
}
