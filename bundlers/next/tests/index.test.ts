import { expect, test } from "vite-plus/test";
import { withPantoken } from "../src/index.ts";

test("adds the InstUI packages to transpilePackages", () => {
  const config = withPantoken();
  expect(config.transpilePackages).toContain("@instructure/ui-buttons");
  expect(config.transpilePackages).toContain("@instructure/ui-icons");
});

test("preserves existing config and transpilePackages, and dedupes", () => {
  const config = withPantoken(
    { reactStrictMode: true, transpilePackages: ["foo", "@instructure/ui-icons"] },
    { transpile: ["bar"] },
  );
  expect(config.reactStrictMode).toBe(true);
  expect(config.transpilePackages).toContain("foo");
  expect(config.transpilePackages).toContain("bar");
  expect(config.transpilePackages?.filter((p) => p === "@instructure/ui-icons")).toHaveLength(1);
});
