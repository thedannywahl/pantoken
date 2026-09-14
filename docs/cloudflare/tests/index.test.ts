import { describe, expect, test, vi } from "vite-plus/test";
import worker, {
  getCacheControl,
  getMimeType,
  handleRequest,
  type Env,
  type R2ObjectBodyLike,
  type R2ObjectHeaderLike,
} from "../src/index.ts";

describe("Cloudflare Worker Router", () => {
  test("getMimeType maps standard web and font extensions correctly", () => {
    expect(getMimeType("app.js")).toBe("text/javascript; charset=utf-8");
    expect(getMimeType("module.mjs")).toBe("text/javascript; charset=utf-8");
    expect(getMimeType("styles.css")).toBe("text/css; charset=utf-8");
    expect(getMimeType("registry.json")).toBe("application/json; charset=utf-8");
    expect(getMimeType("icon.svg")).toBe("image/svg+xml");
    expect(getMimeType("image.png")).toBe("image/png");
    expect(getMimeType("favicon.ico")).toBe("image/x-icon");
    expect(getMimeType("photo.webp")).toBe("image/webp");
    expect(getMimeType("font.woff2")).toBe("font/woff2");
    expect(getMimeType("font.woff")).toBe("font/woff");
    expect(getMimeType("font.ttf")).toBe("font/ttf");
    expect(getMimeType("page.html")).toBe("text/html; charset=utf-8");
    expect(getMimeType("sitemap.xml")).toBe("application/xml; charset=utf-8");
    expect(getMimeType("robots.txt")).toBe("text/plain; charset=utf-8");
    expect(getMimeType("file.unknown")).toBe("application/octet-stream");
  });

  test("getCacheControl provides long immutable caching for /assets/ and shorter for /demos-assets/", () => {
    expect(getCacheControl("/assets/chunks/framework.123.js")).toBe(
      "public, max-age=31536000, immutable",
    );
    expect(getCacheControl("/demos-assets/style.css")).toBe(
      "public, max-age=86400, stale-while-revalidate=3600",
    );
    expect(getCacheControl("/index.html")).toBe(
      "public, max-age=3600, stale-while-revalidate=86400",
    );
  });

  test("handleRequest rejects unsupported HTTP methods with 405", async () => {
    const env: Env = {
      ASSETS: { fetch: vi.fn() },
    };
    const req = new Request("https://pantoken.app/api", { method: "POST" });
    const res = await handleRequest(req, env);
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("GET, HEAD");
  });

  test("handleRequest delegates HTML and root paths to Workers Static Assets", async () => {
    const assetsFetch = vi
      .fn()
      .mockResolvedValue(new Response("<html>Home</html>", { status: 200 }));
    const env: Env = {
      ASSETS: { fetch: assetsFetch },
    };

    const req = new Request("https://pantoken.app/hu/guide/cli.html");
    const res = await handleRequest(req, env);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<html>Home</html>");
    expect(assetsFetch).toHaveBeenCalledWith(req);
  });

  test("handleRequest serves R2 assets with streaming body and correct headers", async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("console.log('chunk');"));
        controller.close();
      },
    });

    const mockObject: R2ObjectBodyLike = {
      key: "assets/chunks/app.123.js",
      size: 21,
      etag: "hash123",
      httpEtag: '"hash123"',
      body: stream,
    };

    const env: Env = {
      ASSETS: { fetch: vi.fn() },
      R2_DOCS: {
        get: vi.fn().mockResolvedValue(mockObject),
        head: vi.fn(),
      },
    };

    const req = new Request("https://pantoken.app/assets/chunks/app.123.js");
    const res = await handleRequest(req, env);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/javascript; charset=utf-8");
    expect(res.headers.get("ETag")).toBe('"hash123"');
    expect(res.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
    expect(res.headers.get("Content-Length")).toBe("21");
    expect(await res.text()).toBe("console.log('chunk');");
  });

  test("handleRequest serves HEAD requests from R2 without body", async () => {
    const mockHeader: R2ObjectHeaderLike = {
      key: "demos-assets/style.css",
      size: 15,
      etag: "css123",
      httpEtag: '"css123"',
    };

    const env: Env = {
      ASSETS: { fetch: vi.fn() },
      R2_DOCS: {
        get: vi.fn(),
        head: vi.fn().mockResolvedValue(mockHeader),
      },
    };

    const req = new Request("https://pantoken.app/demos-assets/style.css", { method: "HEAD" });
    const res = await handleRequest(req, env);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/css; charset=utf-8");
    expect(res.headers.get("Content-Length")).toBe("15");
    expect(res.headers.get("ETag")).toBe('"css123"');
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=86400, stale-while-revalidate=3600",
    );
  });

  test("handleRequest returns 304 when If-None-Match matches ETag", async () => {
    const mockObject: R2ObjectBodyLike = {
      key: "assets/chunks/app.123.js",
      size: 20,
      etag: "tag1",
      httpEtag: '"tag1"',
      body: new ReadableStream(),
    };

    const env: Env = {
      ASSETS: { fetch: vi.fn() },
      R2_DOCS: {
        get: vi.fn().mockResolvedValue(mockObject),
        head: vi.fn(),
      },
    };

    const req = new Request("https://pantoken.app/assets/chunks/app.123.js", {
      headers: { "If-None-Match": '"tag1"' },
    });
    const res = await handleRequest(req, env);
    expect(res.status).toBe(304);
    expect(res.headers.get("ETag")).toBe('"tag1"');

    // HEAD 304
    const headObject: R2ObjectHeaderLike = {
      key: "demos-assets/style.css",
      size: 20,
      etag: "tag2",
      httpEtag: '"tag2"',
    };
    const headEnv: Env = {
      ASSETS: { fetch: vi.fn() },
      R2_DOCS: {
        get: vi.fn(),
        head: vi.fn().mockResolvedValue(headObject),
      },
    };
    const headReq = new Request("https://pantoken.app/demos-assets/style.css", {
      method: "HEAD",
      headers: { "If-None-Match": '"tag2"' },
    });
    const headRes = await handleRequest(headReq, headEnv);
    expect(headRes.status).toBe(304);
  });

  test("handleRequest returns 404 when object is not found in R2", async () => {
    const env: Env = {
      ASSETS: { fetch: vi.fn() },
      R2_DOCS: {
        get: vi.fn().mockResolvedValue(null),
        head: vi.fn().mockResolvedValue(null),
      },
    };

    const reqGet = new Request("https://pantoken.app/assets/nonexistent.js");
    const resGet = await handleRequest(reqGet, env);
    expect(resGet.status).toBe(404);

    const reqHead = new Request("https://pantoken.app/assets/nonexistent.js", { method: "HEAD" });
    const resHead = await handleRequest(reqHead, env);
    expect(resHead.status).toBe(404);
  });

  test("default export invokes handleRequest", async () => {
    const assetsFetch = vi.fn().mockResolvedValue(new Response("ok"));
    const env: Env = { ASSETS: { fetch: assetsFetch } };
    const req = new Request("https://pantoken.app/");
    const res = await worker.fetch(req, env);
    expect(await res.text()).toBe("ok");
  });
});
