/**
 * Cloudflare Worker for `pantoken.app` documentation hosting.
 *
 * Routes requests between Cloudflare R2 bucket storage (for high-volume hashed assets
 * under `/assets/*` and `/demos-assets/*`) and Cloudflare Workers Static Assets
 * (for HTML pages, `/r/*` shadcn registry, and root files).
 *
 * @module
 */

/** Minimal interface representing an R2 HTTP object representation. */
export interface R2ObjectHeaderLike {
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

/** Minimal interface representing an R2 object with readable stream body. */
export interface R2ObjectBodyLike extends R2ObjectHeaderLike {
  /** ReadableStream containing the object body. */
  body: ReadableStream;
}

/** Minimal interface representing the Cloudflare R2 bucket binding. */
export interface R2BucketLike {
  /** Retrieve an object with body from R2. */
  get: (
    key: string,
    options?: { onlyIf?: Headers | Record<string, unknown> },
  ) => Promise<R2ObjectBodyLike | null>;
  /** Retrieve object metadata without body from R2. */
  head: (key: string) => Promise<R2ObjectHeaderLike | null>;
}

/** Minimal interface representing the Cloudflare Workers Static Assets binding. */
export interface FetcherLike {
  /** Fetch a resource from the static assets binding. */
  fetch: (request: Request | string) => Promise<Response>;
}

/** Environment bindings supplied to the Worker execution context. */
export interface Env {
  /** Static assets binding for HTML and root files. */
  ASSETS: FetcherLike;
  /** R2 bucket binding for `/assets/*` and `/demos-assets/*`. */
  R2_DOCS?: R2BucketLike;
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
 * Handle incoming HTTP requests and route between R2 assets and Static Assets.
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

  // Check if request targets an R2-managed asset path prefix
  const isR2Path = pathname.startsWith("/assets/") || pathname.startsWith("/demos-assets/");

  if (isR2Path && env.R2_DOCS) {
    const key = pathname.replace(/^\/+/u, "");
    const ifNoneMatch = request.headers.get("if-none-match");

    if (method === "HEAD") {
      const object = await env.R2_DOCS.head(key);
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

    const object = await env.R2_DOCS.get(key);
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

  // All other requests (HTML, root sitemap, /r/* registry, icons) handled by Workers Static Assets
  return env.ASSETS.fetch(request);
}

/** Default Cloudflare Worker export. */
export default {
  fetch: handleRequest,
};
