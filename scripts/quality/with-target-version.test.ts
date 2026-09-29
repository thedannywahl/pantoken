import { afterEach, expect, test, vi } from "vite-plus/test";
import { withTargetVersion } from "./with-target-version.ts";

const { spawnSync, mkdtempSync, writeFileSync, readFileSync, rmSync } = vi.hoisted(() => ({
  spawnSync: vi.fn(),
  mkdtempSync: vi.fn(() => "/tmp/pantoken-target-test"),
  writeFileSync: vi.fn(),
  readFileSync: vi.fn(() => '{"version":"8.0.0"}'),
  rmSync: vi.fn(),
}));

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({ mkdtempSync, writeFileSync, readFileSync, rmSync }));

afterEach(() => vi.clearAllMocks());

test("installs an exact release and removes the temporary project", async () => {
  spawnSync.mockReturnValue({ status: 0 });
  const check = vi.fn().mockResolvedValue(undefined);
  await withTargetVersion("postcss", "8.0.0", check);
  expect(spawnSync).toHaveBeenCalledWith(
    "vp",
    ["add", "--ignore-scripts", "postcss@8.0.0"],
    expect.objectContaining({ cwd: "/tmp/pantoken-target-test" }),
  );
  expect(check).toHaveBeenCalledOnce();
  expect(rmSync).toHaveBeenCalledWith("/tmp/pantoken-target-test", {
    recursive: true,
    force: true,
  });
});

test("removes the temporary project when the target check fails", async () => {
  spawnSync.mockReturnValue({ status: 0 });
  await expect(
    withTargetVersion("postcss", "8.0.0", async () => {
      throw new Error("bad output");
    }),
  ).rejects.toThrow("bad output");
  expect(rmSync).toHaveBeenCalledOnce();
});

test("rejects a failed install and still removes the temporary project", async () => {
  spawnSync.mockReturnValue({ status: 1, stderr: "registry unavailable" });
  await expect(withTargetVersion("postcss", "8.0.0", async () => {})).rejects.toThrow(
    "registry unavailable",
  );
  expect(rmSync).toHaveBeenCalledOnce();
});
