/**
 * Edge router for `pantoken.app` documentation hosting.
 *
 * Routes requests between an object-storage bucket (for high-volume hashed assets
 * under `/assets/*` and `/demos-assets/*`) and the static site assets
 * (for HTML pages, `/r/*` shadcn registry, and root files).
 *
 * @module
 */

/** Minimal interface representing a bucket object's HTTP metadata. */
export interface BucketObjectHeaderLike {
  /** The key of the object. */
  key: string;
  /** Size of the object in bytes. */
  size: number;
  /** ETag of the object. */
  etag: string;
  /** HTTP ETag formatted with quotes. */
  httpEtag: string;
  /** Upload or write timestamp. */
  uploaded?: Date;
  /** User-defined or system metadata. */
  customMetadata?: Record<string, string>;
  /** HTTP metadata. */
  httpMetadata?: {
    contentType?: string;
    contentLanguage?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    cacheControl?: string;
  };
}

/** Minimal interface representing a bucket object with readable stream body. */
export interface BucketObjectBodyLike extends BucketObjectHeaderLike {
  /** ReadableStream containing the object body. */
  body: ReadableStream;
}

/** Minimal interface representing the asset bucket binding. */
export interface BucketLike {
  /** Retrieve an object with body from the bucket. */
  get: (
    key: string,
    options?: { onlyIf?: Headers | Record<string, unknown> },
  ) => Promise<BucketObjectBodyLike | null>;
  /** Retrieve object metadata without body from the bucket. */
  head: (key: string) => Promise<BucketObjectHeaderLike | null>;
}

/** Minimal interface representing the static site assets binding. */
export interface FetcherLike {
  /** Fetch a resource from the static assets binding. */
  fetch: (request: Request | string) => Promise<Response>;
}

/** Environment bindings supplied to the Worker execution context. */
export interface Env {
  /** Static assets binding for HTML and root files. */
  ASSETS: FetcherLike;
  /** Asset bucket binding for `/assets/*` and `/demos-assets/*`. */
  ASSET_BUCKET?: BucketLike;
}

/**
 * Infer the MIME Content-Type header from a URL pathname or file extension.
 *
 * @param pathname - URL path or filename.
 * @returns MIME type string with charset where appropriate.
 */
export function getMimeType(pathname: string): string {
  const ext = pathname.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "js":
    case "mjs":
      return "text/javascript; charset=utf-8";
    case "css":
      return "text/css; charset=utf-8";
    case "json":
      return "application/json; charset=utf-8";
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    case "ico":
      return "image/x-icon";
    case "webp":
      return "image/webp";
    case "woff2":
      return "font/woff2";
    case "woff":
      return "font/woff";
    case "ttf":
      return "font/ttf";
    case "html":
      return "text/html; charset=utf-8";
    case "txt":
    case "md":
      return "text/plain; charset=utf-8";
    case "xml":
      return "application/xml; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

/**
 * Determine the appropriate Cache-Control header value for an asset path.
 *
 * @param pathname - Request URL pathname.
 * @returns Cache-Control directive string.
 */
export function getCacheControl(pathname: string): string {
  // VitePress client chunks under /assets/ are content-hashed
  if (pathname.startsWith("/assets/")) {
    return "public, max-age=31536000, immutable";
  }
  // Demo runtime assets under /demos-assets/
  if (pathname.startsWith("/demos-assets/")) {
    return "public, max-age=86400, stale-while-revalidate=3600";
  }
  return "public, max-age=3600, stale-while-revalidate=86400";
}

/**
 * Handle incoming HTTP requests and route between bucket assets and static site assets.
 *
 * @param request - The incoming HTTP request.
 * @param env - Worker environment bindings.
 * @returns HTTP Response.
 */
export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/.well-known/api-catalog") {
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set(
      "Content-Type",
      'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    );
    headers.set("Link", `<${url.origin}${pathname}>; rel="api-catalog"`);
    return new Response(method === "HEAD" ? null : response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const isBucketPath = pathname.startsWith("/assets/") || pathname.startsWith("/demos-assets/");

  if (isBucketPath && env.ASSET_BUCKET) {
    const key = pathname.replace(/^\/+/u, "");
    const ifNoneMatch = request.headers.get("if-none-match");

    if (method === "HEAD") {
      const object = await env.ASSET_BUCKET.head(key);
      if (!object) {
        return new Response("Not Found", { status: 404 });
      }

      const etag = object.httpEtag || `"${object.etag}"`;
      if (ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch === "*")) {
        return new Response(null, { status: 304, headers: { ETag: etag } });
      }

      const headers = new Headers();
      headers.set("Content-Type", object.httpMetadata?.contentType ?? getMimeType(pathname));
      headers.set("Content-Length", String(object.size));
      headers.set("ETag", etag);
      headers.set("Cache-Control", object.httpMetadata?.cacheControl ?? getCacheControl(pathname));
      return new Response(null, { status: 200, headers });
    }

    const object = await env.ASSET_BUCKET.get(key);
    if (!object) {
      return new Response("Not Found", { status: 404 });
    }

    const etag = object.httpEtag || `"${object.etag}"`;
    if (ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch === "*")) {
      return new Response(null, { status: 304, headers: { ETag: etag } });
    }

    const headers = new Headers();
    headers.set("Content-Type", object.httpMetadata?.contentType ?? getMimeType(pathname));
    headers.set("Content-Length", String(object.size));
    headers.set("ETag", etag);
    headers.set("Cache-Control", object.httpMetadata?.cacheControl ?? getCacheControl(pathname));

    return new Response(object.body, { status: 200, headers });
  }

  // All other requests (HTML, root sitemap, /r/* registry, icons) go to the static site assets
  return env.ASSETS.fetch(request);
}

/** Default edge worker export. */
export default {
  fetch: handleRequest,
};
