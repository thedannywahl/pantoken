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
    setHeader: vi.fn(),
    end: vi.fn(),
  } as unknown as ServerResponse & {
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
  handler({ url: "/styles/app.css?v=1" } as IncomingMessage, res, next);

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
  handler({ url: "/styles/app.js" } as IncomingMessage, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.end).not.toHaveBeenCalled();
  expect(readMock).not.toHaveBeenCalled();
});

test("falls through when there is no URL at all", () => {
  const mw = fakeMiddlewares();
  mountFileServers([entry()], mw);
  const handler = mw.handlers.get("/styles")!;

  const next = vi.fn();
  handler({} as IncomingMessage, fakeRes(), next);
  expect(next).toHaveBeenCalledTimes(1);
});

test("applies pathTransform before resolving against serveDir", () => {
  const mw = fakeMiddlewares();
  const pathTransform = vi.fn((p: string) => p.replace(/\/([^/]+)\.css$/u, "/$1/app.css"));
  mountFileServers([entry({ pathTransform })], mw);
  const handler = mw.handlers.get("/styles")!;

  readMock.mockReturnValue(".b{}");
  handler({ url: "/styles/theme.css" } as IncomingMessage, fakeRes(), vi.fn());

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
  handler({ url: "/styles/missing.css" } as IncomingMessage, res, next);

  expect(next).toHaveBeenCalledTimes(1);
  expect(res.end).not.toHaveBeenCalled();
});

test("mounts nothing when there are no entries", () => {
  const mw = fakeMiddlewares();
  mountFileServers([], mw);
  expect(mw.handlers.size).toBe(0);
});
