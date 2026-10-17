import { getMediaObject, MediaTooLargeError, type MediaObject } from "@/lib/r2";

/* Public media proxy: /api/media/<key> streams a bucket object with
   immutable cache headers. Keeps R2 credentials private. */

type Params = { params: Promise<{ key: string }> };

function mediaHeaders(object: MediaObject): Headers {
  const headers = new Headers({
    "Content-Type": object.contentType,
    "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
  });
  if (object.contentLength !== undefined) {
    headers.set("Content-Length", String(object.contentLength));
  }
  return headers;
}

function failureResponse(error: unknown): Response {
  if (error instanceof MediaTooLargeError) {
    return new Response("Payload too large", { status: 413 });
  }
  throw error;
}

export async function GET(_req: Request, { params }: Params) {
  const { key } = await params;

  try {
    const object = await getMediaObject(key);
    if (!object) return new Response("Not found", { status: 404 });
    return new Response(object.body as BodyInit, { headers: mediaHeaders(object) });
  } catch (error) {
    return failureResponse(error);
  }
}
