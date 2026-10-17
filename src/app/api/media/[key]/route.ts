import { getMediaObject } from "@/lib/r2";

/* Public media proxy: /api/media/<key> streams a bucket object with
   immutable cache headers. Keeps R2 private and keys off the client. */

type Params = { params: Promise<{ key: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { key } = await params;
  const object = await getMediaObject(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(object.bytes as BodyInit, {
    headers: {
      "Content-Type": object.contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      "Content-Length": String(object.bytes.byteLength),
    },
  });
}
