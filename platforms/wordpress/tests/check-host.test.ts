import { afterEach, expect, test, vi } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import { assertPresets, checkHost } from "../scripts/check-host.ts";

vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
afterEach(() => vi.clearAllMocks());

test("accepts the expected host release with all generated preset families", () => {
  expect(() =>
    assertPresets('{"version":"6.6.2","palette":10,"spacing":5,"fonts":2}', "6.6"),
  ).not.toThrow();
  expect(() =>
    assertPresets('{"version":"6.7","palette":10,"spacing":5,"fonts":2}', "6.7.0"),
  ).not.toThrow();
});

test("rejects missing presets or the wrong host release", () => {
  expect(() =>
    assertPresets('{"version":"6.6.2","palette":10,"spacing":0,"fonts":2}', "6.6"),
  ).toThrow("did not load");
  expect(() =>
    assertPresets('{"version":"6.7","palette":10,"spacing":5,"fonts":2}', "6.6"),
  ).toThrow("did not load");
});

test("waits for authenticated TCP database access before WordPress installation", async () => {
  vi.mocked(spawnSync).mockImplementation(((_command: string, args: string[]) => ({
    status: 0,
    stdout:
      args[0] === "inspect"
        ? "healthy"
        : args.includes("eval")
          ? '{"version":"6.7","palette":10,"spacing":5,"fonts":2}'
          : "",
    stderr: "",
    pid: 0,
    output: [],
    signal: null,
  })) as unknown as typeof spawnSync);
  await checkHost(["6.7"]);
  const calls = vi.mocked(spawnSync).mock.calls.map((call) => call[1] as string[]);
  const database = calls.find((args) => args.includes("mariadb:11.4"))!;
  const health = database.find((argument) => argument.startsWith("--health-cmd="))!;
  expect(health).toContain("--host=127.0.0.1 --user=wordpress");
  expect(health).toContain("--database=wordpress --execute='SELECT 1'");
  expect(calls.findIndex((args) => args[0] === "inspect")).toBeLessThan(
    calls.findIndex((args) => args.includes("install")),
  );
});
