import { beforeEach, expect, test, vi } from "vite-plus/test";
import { watch as watchFs } from "node:fs";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { workspaceOrchestrator } from "../src/index.ts";
import type { UpstreamNode } from "../src/index.ts";
import type { ViteDevServer } from "vite";

vi.mock(import("node:fs"), () => ({ watch: vi.fn() }));
vi.mock(import("node:child_process"), () => ({ spawn: vi.fn() }));
const watchMock = watchFs as unknown as ReturnType<typeof vi.fn>;
const spawnMock = spawn as unknown as ReturnType<typeof vi.fn>;

type WatchCb = (event: string, filename: string | null) => void;
interface WatchRecord {
  path: string;
  cb: WatchCb;
  watcher: { close: ReturnType<typeof vi.fn> };
}

let watches: WatchRecord[] = [];

function fakeServer() {
  const emit = vi.fn();
  const use = vi.fn();
  let closeHandler: (() => void) | undefined;
  const server = {
    config: { logger: { info: vi.fn(), error: vi.fn() } },
    watcher: { emit },
    middlewares: { use },
    httpServer: {
      on: (_event: string, cb: () => void) => {
        closeHandler = cb;
      },
    },
  } as unknown as ViteDevServer;
  return { server, emit, use, triggerClose: () => closeHandler?.() };
}

const node = (over: Partial<UpstreamNode> = {}): UpstreamNode => ({
  name: over.name ?? "pkg-a",
  dir: "/ws/pkg-a",
  watchPaths: ["/ws/pkg-a/src"],
  build: ["node", "build.js"],
  dependents: [],
  ...over,
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  watches = [];
  spawnMock.mockReturnValue({ on: vi.fn() });
  watchMock.mockImplementation((path: string, _opts: unknown, cb: WatchCb) => {
    const watcher = { close: vi.fn() };
    watches.push({ path, cb, watcher });
    return watcher;
  });
});

function find(path: string): WatchRecord {
  const rec = watches.find((w) => w.path === path);
  if (!rec) throw new Error(`no watcher for ${path}`);
  return rec;
}

test("watches every upstream source path and every output path, and mounts file servers", () => {
  const { server, use } = fakeServer();
  const plugin = workspaceOrchestrator({
    upstream: [node()],
    outputWatchPaths: ["/ws/pkg-a/dist"],
    fileServers: [
      { mountPath: "/x", serveDir: "/ws/x", extension: ".css", contentType: "text/css" },
    ],
  });
  plugin.configureServer(server);

  expect(watches.map((w) => w.path)).toEqual(["/ws/pkg-a/src", "/ws/pkg-a/dist"]);
  expect(use).toHaveBeenCalledWith("/x", expect.any(Function));
});

test("an upstream change that passes filters schedules a rebuild", () => {
  const { server } = fakeServer();
  const plugin = workspaceOrchestrator({ upstream: [node({ include: ["**/*.ts"] })] });
  plugin.configureServer(server);

  find("/ws/pkg-a/src").cb("change", "src/index.ts");
  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(1);
});

test("a null filename still schedules (can't be filtered)", () => {
  const { server } = fakeServer();
  const plugin = workspaceOrchestrator({ upstream: [node({ include: ["**/*.ts"] })] });
  plugin.configureServer(server);

  find("/ws/pkg-a/src").cb("rename", null);
  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(1);
});

test("an upstream change that is filtered out does not schedule", () => {
  const { server } = fakeServer();
  const plugin = workspaceOrchestrator({ upstream: [node({ ignore: ["**/*.test.ts"] })] });
  plugin.configureServer(server);

  find("/ws/pkg-a/src").cb("change", "src/index.test.ts");
  vi.advanceTimersByTime(200);
  expect(spawnMock).not.toHaveBeenCalled();
});

test("an output change emits a synthetic vite 'change' event", () => {
  const { server, emit } = fakeServer();
  const plugin = workspaceOrchestrator({
    upstream: [],
    outputWatchPaths: ["/ws/pkg-a/dist"],
  });
  plugin.configureServer(server);

  find("/ws/pkg-a/dist").cb("change", "style.css");
  expect(emit).toHaveBeenCalledWith("change", resolve("/ws/pkg-a/dist", "style.css"));
});

test("an output change with a null filename is ignored", () => {
  const { server, emit } = fakeServer();
  const plugin = workspaceOrchestrator({ upstream: [], outputWatchPaths: ["/ws/pkg-a/dist"] });
  plugin.configureServer(server);

  find("/ws/pkg-a/dist").cb("change", null);
  expect(emit).not.toHaveBeenCalled();
});

test("a watchPath that cannot be watched is skipped silently", () => {
  const { server } = fakeServer();
  // The first watch (upstream src) throws; the second (output) succeeds.
  watchMock.mockImplementationOnce(() => {
    throw new Error("ENOENT");
  });
  const plugin = workspaceOrchestrator({
    upstream: [node()],
    outputWatchPaths: ["/ws/pkg-a/dist"],
  });
  expect(() => plugin.configureServer(server)).not.toThrow();
  // Only the output watcher was registered.
  expect(watches.map((w) => w.path)).toEqual(["/ws/pkg-a/dist"]);
});

test("an output path that cannot be watched is skipped silently", () => {
  const { server } = fakeServer();
  // Upstream src succeeds; the output watch throws.
  watchMock
    .mockImplementationOnce((path: string, _o: unknown, cb: WatchCb) => {
      const watcher = { close: vi.fn() };
      watches.push({ path, cb, watcher });
      return watcher;
    })
    .mockImplementationOnce(() => {
      throw new Error("ENOENT");
    });
  const plugin = workspaceOrchestrator({
    upstream: [node()],
    outputWatchPaths: ["/ws/pkg-a/dist"],
  });
  expect(() => plugin.configureServer(server)).not.toThrow();
  expect(watches.map((w) => w.path)).toEqual(["/ws/pkg-a/src"]);
});

test("closing the http server closes every fs watcher", () => {
  const { server, triggerClose } = fakeServer();
  const plugin = workspaceOrchestrator({
    upstream: [node()],
    outputWatchPaths: ["/ws/pkg-a/dist"],
  });
  plugin.configureServer(server);
  expect(watches).toHaveLength(2);

  triggerClose();
  for (const w of watches) expect(w.watcher.close).toHaveBeenCalledTimes(1);
});

test("no http server means no close handler is registered (no throw)", () => {
  const emit = vi.fn();
  const server = {
    config: { logger: { info: vi.fn(), error: vi.fn() } },
    watcher: { emit },
    middlewares: { use: vi.fn() },
    httpServer: null,
  } as unknown as ViteDevServer;

  const plugin = workspaceOrchestrator({ upstream: [node()] });
  expect(() => plugin.configureServer(server)).not.toThrow();
});
