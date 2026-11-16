import { afterEach, expect, test, vi } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { toJekyllAssets } from "../src/index.ts";

vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
afterEach(() => vi.resetAllMocks());

test("emits a _sass partial, a css asset, and the prose stylesheet", () => {
  const files = toJekyllAssets();
  const paths = files.map((f) => f.path);
  expect(paths).toContain("_sass/pantoken.scss");
  expect(paths).toContain("assets/css/pantoken.css");
  expect(paths).toContain("assets/css/pantoken-prose.css");
  const prose = files.find((f) => f.path.endsWith("pantoken-prose.css"))?.content ?? "";
  expect(prose).toContain(".pantoken-prose table");
});

test("the sass partial carries scss variables and the css carries custom properties", () => {
  const files = toJekyllAssets();
  const sass = files.find((f) => f.path.endsWith(".scss"))?.content ?? "";
  const css = files.find((f) => f.path.endsWith(".css"))?.content ?? "";
  expect(sass).toContain("$instui-");
  expect(css).toContain("--instui-");
});

test("rejects Jekyll versions outside verified support", () => {
  expect(() => checkCompatibility("4.5.0")).toThrow("Unsupported Jekyll release");
});

test("installs the exact Jekyll gem without assuming a matching Docker image tag", () => {
  vi.mocked(spawnSync).mockImplementation((_command, args) => {
    if (!Array.isArray(args)) throw new Error("Expected Docker arguments");
    expect(args).toContain("ruby:3.3.10-bookworm");
    expect(args).toContain("JEKYLL_VERSION=3.9.4");
    expect(args).toContain("GEM_HOME=/tmp/pantoken-gems");
    expect(args.some((arg) => arg.startsWith("jekyll/jekyll:"))).toBe(false);
    const site = args[args.indexOf("--volume") + 1].split(":")[0];
    mkdirSync(join(site, "_site/assets/css"), { recursive: true });
    writeFileSync(join(site, "_site/index.html"), "Compatibility");
    writeFileSync(
      join(site, "_site/assets/css/main.css"),
      ".pantoken-compatibility { color: #fff; }",
    );
    writeFileSync(join(site, "_site/assets/css/pantoken.css"), "--instui-primitive-color-white");
    return { status: 0, stdout: "", stderr: "", pid: 0, output: [], signal: null };
  });
  expect(() => checkCompatibility("3.9.4", true)).not.toThrow();
});
