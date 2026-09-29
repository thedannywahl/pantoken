import { expect, test } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { PantokenWebpackPlugin } from "../src/index.ts";

test("emits the token stylesheet as a build asset", () => {
  const emitted: Record<string, string> = {};
  const compiler = {
    hooks: {
      thisCompilation: {
        tap: (_name: string, fn: (c: unknown) => void) =>
          fn({
            hooks: { processAssets: { tap: (_o: unknown, f: () => void) => f() } },
            emitAsset: (name: string, src: { source(): string; size(): number }) => {
              emitted[name] = src.source();
              expect(src.size()).toBe(Buffer.byteLength(emitted[name]));
            },
          }),
      },
    },
  };

  new PantokenWebpackPlugin().apply(compiler as Parameters<PantokenWebpackPlugin["apply"]>[0]);
  expect(emitted["pantoken.css"]).toContain("--instui-");
});

test("honors a custom filename", () => {
  const emitted: Record<string, string> = {};
  const compiler = {
    hooks: {
      thisCompilation: {
        tap: (_n: string, fn: (c: unknown) => void) =>
          fn({
            hooks: { processAssets: { tap: (_o: unknown, f: () => void) => f() } },
            emitAsset: (name: string, src: { source(): string }) => {
              emitted[name] = src.source();
            },
          }),
      },
    },
  };
  new PantokenWebpackPlugin({ filename: "tokens.css" }).apply(
    compiler as Parameters<PantokenWebpackPlugin["apply"]>[0],
  );
  expect(emitted["tokens.css"]).toContain("--instui-");
});

test("rejects releases outside the checked Webpack major", async () => {
  await expect(checkCompatibility("6.0.0")).rejects.toThrow("Invalid Webpack 5 release");
});
