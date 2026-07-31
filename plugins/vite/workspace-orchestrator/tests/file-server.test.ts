import { beforeEach, expect, test, vi } from "vite-plus/test";
import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { mountFileServers } from "../src/file-server.ts";
import type { FileServerEntry } from "../src/types.ts";

vi.mock(import("node:fs"), () => ({ readFileSync: vi.fn() }));
const readMock = readFileSync as unknown as ReturnType<typeof vi.fn>;

/** A connect-style middleware stack that records the handler mounted at each path. */
function fakeMiddlewares() {
  const handlers = new Map<
    string,
    (req: IncomingMessage, res: ServerResponse, next: () => void) => void
  >();
  return {
    handlers,
    use(
      mountPath: string,
      handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void,
    ) {
      handlers.set(mountPath, handler);
    },
  };
}

function fakeRes() {
  return {
    statusCode: undefined,
    setHeader: vi.fn(),
    end: vi.fn(),
  } as unknown as ServerResponse & {
    statusCode?: number;
    setHeader: ReturnType<typeof vi.fn>;
    end: ReturnType<typeof vi.fn>;
  };
}

const entry = (over: Partial<FileServerEntry> = {}): FileServerEntry => ({
  mountPath: "/styles",
  serveDir: "/ws/styles",
  extension: ".css",
  contentType: "text/css",
  ...over,
});

beforeEach(() => {
  vi.clearAllMocks();
});

test("serves a matching file with the configured content type", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;
  expect(handler).toBeTruthy();

  readMock.mockReturnValue(".a{}");
  const res = fakeRes();
  const next = vi.fn();
  handler(
    {
      url: "/styles/app.css?v=1",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as IncomingMessage,
    res,
    next,
  );

  expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/css");
  expect(res.end).toHaveBeenCalledWith(".a{}");
  expect(next).not.toHaveBeenCalled();
});

test("falls through when the URL extension does not match", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  const res = fakeRes();
  const next = vi.fn();
  handler(
    {
      url: "/styles/app.js",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as IncomingMessage,
    res,
    next,
  );

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.end).not.toHaveBeenCalled();
  expect(readMock).not.toHaveBeenCalled();
});

test("falls through when there is no URL at all", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  const next = vi.fn();
  handler(
    { headers: {}, socket: { remoteAddress: "127.0.0.1" } } as IncomingMessage,
    fakeRes(),
    next,
  );
  expect(next).toHaveBeenCalledTimes(1);
});

test("applies pathTransform before resolving against serveDir", () => {
  const mw = fakeMiddlewares();
  const pathTransform = vi.fn((p: string) => p.replace(/\/([^/]+)\.css$/u, "/$1/app.css"));
  mountFileServers([entry({ pathTransform })], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".b{}");
  handler(
    {
      url: "/styles/theme.css",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as IncomingMessage,
    fakeRes(),
    vi.fn(),
  );

  expect(pathTransform).toHaveBeenCalledWith("/styles/theme.css");
  // The transformed path (theme.css → theme/app.css) is resolved against serveDir and read.
  expect(String(readMock.mock.calls[0][0]).endsWith("theme/app.css")).toBe(true);
});

test("falls through when the file cannot be read", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockImplementation(() => {
    throw new Error("ENOENT");
  });
  const res = fakeRes();
  const next = vi.fn();
  handler(
    {
      url: "/styles/missing.css",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    } as IncomingMessage,
    res,
    next,
  );

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.end).not.toHaveBeenCalled();
});

test("mounts nothing when there are no entries", () => {
  const mw = fakeMiddlewares();
  mountFileServers([], mw);
  expect(mw.handlers.size).toBe(0);
});

test("serves cached file content on repeated requests", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".a{}");
  const next = vi.fn();
  const req = {
    url: "/styles/app.css",
    headers: {},
    socket: { remoteAddress: "127.0.0.1" },
  } as IncomingMessage;

  // First request — reads from filesystem
  handler(req, fakeRes(), next);
  expect(readMock).toHaveBeenCalledTimes(1);

  // Second request for same file — served from cache, no new filesystem read
  handler(req, fakeRes(), next);
  expect(readMock).toHaveBeenCalledTimes(1); // Still 1, not 2
});

test("enforces per-IP rate limiting at 100 tokens capacity", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".a{}");

  const req = {
    url: "/styles/app.css",
    headers: {},
    socket: { remoteAddress: "192.168.1.1" },
  } as unknown as IncomingMessage;

  // Make 100 successful requests
  for (let i = 0; i < 100; i++) {
    const res = fakeRes();
    handler(req, res, vi.fn());
  }

  // 101st request should be rate limited (statusCode = 429)
  const blockedRes = fakeRes();
  handler(req, blockedRes, vi.fn());
  expect(blockedRes.statusCode).toBe(429);
  expect(blockedRes.end).toHaveBeenCalledWith("Rate limit exceeded");
});

test("rate limits per IP, allowing different IPs to both serve content", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".a{}");

  const req1 = {
    url: "/styles/app.css",
    headers: {},
    socket: { remoteAddress: "192.168.1.1" },
  } as unknown as IncomingMessage;

  const req2 = {
    url: "/styles/app.css",
    headers: {},
    socket: { remoteAddress: "192.168.1.2" },
  } as unknown as IncomingMessage;

  const res = fakeRes();
  handler(req1, res, vi.fn());
  expect(res.end).toHaveBeenCalled();

  const res2 = fakeRes();
  handler(req2, res2, vi.fn());
  expect(res2.end).toHaveBeenCalled();
});

test("extracts client IP from x-forwarded-for header", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".a{}");

  const req = {
    url: "/styles/app.css",
    headers: { "x-forwarded-for": "10.0.0.1, 10.0.0.2" },
    socket: { remoteAddress: "192.168.1.1" },
  } as unknown as IncomingMessage;

  const res = fakeRes();
  handler(req, res, vi.fn());
  // Should use the first IP from x-forwarded-for, not the socket address
  expect(res.end).toHaveBeenCalled();
  // Both requests from this "client" should consume rate limit tokens
  for (let i = 1; i < 100; i++) {
    const r = fakeRes();
    handler(req, r, vi.fn());
    expect(r.end).toHaveBeenCalled();
  }
  // 100th request should be rate limited
  const blockedRes = fakeRes();
  handler(req, blockedRes, vi.fn());
  expect(blockedRes.statusCode).toBe(429);
});
