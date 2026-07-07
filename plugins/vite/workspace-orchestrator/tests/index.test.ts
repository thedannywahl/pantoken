import { beforeEach, expect, test, vi } from "vite-plus/test";
import { spawn } from "node:child_process";
import { createScheduler } from "../src/scheduler.ts";
import { matchesFilters, workspaceOrchestrator } from "../src/index.ts";
import type { UpstreamNode } from "../src/index.ts";

vi.mock(import("node:child_process"), () => ({ spawn: vi.fn() }));
const spawnMock = spawn as unknown as ReturnType<typeof vi.fn>;

/** A fake child process whose "close" event tests can trigger. */
function fakeChild() {
  const handlers: ((code: number | null) => void)[] = [];
  return {
    on: vi.fn((event: string, handler: (code: number | null) => void) => {
      if (event === "close") handlers.push(handler);
    }),
    close(code: number | null) {
      for (const h of handlers) h(code);
    },
  };
}

const node = (over: Partial<UpstreamNode> = {}): UpstreamNode => ({
  name: over.name ?? "pkg-a",
  dir: "/ws/pkg-a",
  watchPaths: ["/ws/pkg-a/src"],
  build: ["node", "build.js"],
  dependents: [],
  ...over,
});

const logger = { info: vi.fn(), error: vi.fn() };

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  spawnMock.mockReturnValue(fakeChild());
});

test("plugin has apply:'serve' and the expected name", () => {
  const plugin = workspaceOrchestrator({ upstream: [] });
  expect(plugin.apply).toBe("serve");
  expect(plugin.name).toBe("workspace-orchestrator");
  expect(typeof plugin.configureServer).toBe("function");
});

test("matchesFilters honors include and ignore globs", () => {
  const n = node({ include: ["**/*.ts"], ignore: ["**/*.test.ts"] });
  expect(matchesFilters("src/index.ts", n)).toBe(true);
  expect(matchesFilters("src/index.test.ts", n)).toBe(false);
  expect(matchesFilters("src/styles.css", n)).toBe(false);
  expect(matchesFilters("anything", node())).toBe(true);
});

test("scheduler debounces rapid changes into a single build", () => {
  const map = new Map([["pkg-a", node()]]);
  const schedule = createScheduler(map, logger, 200);

  schedule("pkg-a");
  schedule("pkg-a");
  schedule("pkg-a");
  expect(spawnMock).not.toHaveBeenCalled();

  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(1);
  expect(spawnMock).toHaveBeenCalledWith(
    "node",
    ["build.js"],
    expect.objectContaining({ cwd: "/ws/pkg-a" }),
  );
});

test("a successful build rebuilds its dependents in order", () => {
  const child = fakeChild();
  spawnMock.mockReturnValue(child);
  const map = new Map([
    ["pkg-a", node({ name: "pkg-a", dependents: ["pkg-b"] })],
    ["pkg-b", node({ name: "pkg-b", dir: "/ws/pkg-b" })],
  ]);
  const schedule = createScheduler(map, logger, 200);

  schedule("pkg-a");
  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(1);

  child.close(0); // pkg-a succeeds → schedules pkg-b
  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(2);
  expect(spawnMock).toHaveBeenLastCalledWith(
    "node",
    ["build.js"],
    expect.objectContaining({ cwd: "/ws/pkg-b" }),
  );
});

test("a failed build does not rebuild dependents", () => {
  const child = fakeChild();
  spawnMock.mockReturnValue(child);
  const map = new Map([
    ["pkg-a", node({ name: "pkg-a", dependents: ["pkg-b"] })],
    ["pkg-b", node({ name: "pkg-b", dir: "/ws/pkg-b" })],
  ]);
  const schedule = createScheduler(map, logger, 200);

  schedule("pkg-a");
  vi.advanceTimersByTime(200);
  child.close(1); // pkg-a fails
  vi.advanceTimersByTime(200);

  expect(spawnMock).toHaveBeenCalledTimes(1);
  expect(logger.error).toHaveBeenCalled();
});

test("changes during a build re-run it once afterward", () => {
  const child = fakeChild();
  spawnMock.mockReturnValue(child);
  const map = new Map([["pkg-a", node()]]);
  const schedule = createScheduler(map, logger, 200);

  schedule("pkg-a");
  vi.advanceTimersByTime(200); // build starts (building = true)
  expect(spawnMock).toHaveBeenCalledTimes(1);

  schedule("pkg-a"); // queued while building
  vi.advanceTimersByTime(200);
  expect(spawnMock).toHaveBeenCalledTimes(1); // still building, not re-spawned yet

  child.close(0); // build finishes → pending re-run fires
  expect(spawnMock).toHaveBeenCalledTimes(2);
});
