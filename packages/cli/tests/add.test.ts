import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, expect, test, vi } from "vite-plus/test";

const spawnSync = vi.fn();
vi.mock("node:child_process", () => ({ spawnSync }));

const { detectRunner, runAdd, run } = await import("../src/index.ts");

beforeEach(() => {
  vi.clearAllMocks();
  spawnSync.mockReturnValue({
    status: 0,
    stdout: Buffer.from(""),
    stderr: Buffer.from(""),
    output: [],
    pid: 1234,
    signal: null,
  });
});

test("detectRunner detects package manager from npm_config_user_agent", () => {
  const original = process.env.npm_config_user_agent;
  try {
    process.env.npm_config_user_agent = "pnpm/9.0.0 npm/? node/v20.0.0 darwin arm64";
    expect(detectRunner()).toEqual({ cmd: "pnpm", args: ["dlx", "shadcn@latest"] });

    process.env.npm_config_user_agent = "bun/1.1.0 npm/? node/v20.0.0 darwin arm64";
    expect(detectRunner()).toEqual({ cmd: "bunx", args: ["--bun", "shadcn@latest"] });

    process.env.npm_config_user_agent = "yarn/1.22.19 npm/? node/v20.0.0 darwin arm64";
    expect(detectRunner()).toEqual({ cmd: "yarn", args: ["dlx", "shadcn@latest"] });

    process.env.npm_config_user_agent = "npm/10.0.0 node/v20.0.0 darwin arm64";
    expect(detectRunner()).toEqual({ cmd: "npx", args: ["shadcn@latest"] });

    delete process.env.npm_config_user_agent;
    expect(detectRunner()).toEqual({ cmd: "npx", args: ["shadcn@latest"] });
  } finally {
    if (original !== undefined) process.env.npm_config_user_agent = original;
    else delete process.env.npm_config_user_agent;
  }
});

test("runAdd throws when no items are provided", async () => {
  await expect(runAdd([])).rejects.toThrow(/Missing item name for pantoken add/);
  await expect(runAdd(["-y", "--overwrite"])).rejects.toThrow(/Missing item name for pantoken add/);
});

test("runAdd invokes runner and passes flags and resolved items", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-cli-add-spawn-"));
  await runAdd(["button", "-y", "@custom/card"], dir);
  expect(spawnSync).toHaveBeenCalledWith(
    expect.any(String),
    expect.arrayContaining(["add", "@pantoken/button", "@custom/card", "-y"]),
    expect.objectContaining({ cwd: dir, stdio: "inherit" }),
  );
});

test("runAdd sets process.exitCode on non-zero status and throws on spawn error", async () => {
  const savedExitCode = process.exitCode;
  spawnSync.mockReturnValueOnce({
    status: 2,
    stdout: Buffer.from(""),
    stderr: Buffer.from(""),
    output: [],
    pid: 1234,
    signal: null,
  });

  try {
    await runAdd(["button"]);
    expect(process.exitCode).toBe(2);
  } finally {
    process.exitCode = savedExitCode;
  }

  spawnSync.mockReturnValueOnce({
    error: new Error("spawn failed"),
    status: 1,
    stdout: Buffer.from(""),
    stderr: Buffer.from(""),
    output: [],
    pid: 1234,
    signal: null,
  });

  await expect(runAdd(["button"])).rejects.toThrow("spawn failed");
});

test("run add command delegates to runAdd", async () => {
  await run(["add", "button", "-y"]);
  expect(spawnSync).toHaveBeenCalledWith(
    expect.any(String),
    expect.arrayContaining(["add", "@pantoken/button", "-y"]),
    expect.any(Object),
  );
});
