import { expect, test } from "vite-plus/test";
import { PantokenWebpackPlugin } from "../src/index.ts";

test("emits the token stylesheet as a build asset", () => {
  const emitted: Record<string, string> = {};
  class RawSource {
    constructor(private readonly s: string) {}
    source(): string {
      return this.s;
    }
  }
  const compiler = {
    webpack: { sources: { RawSource } },
    hooks: {
      thisCompilation: {
        tap: (_name: string, fn: (c: unknown) => void) =>
          fn({
            hooks: { processAssets: { tap: (_o: unknown, f: () => void) => f() } },
            emitAsset: (name: string, src: { source(): string }) => {
              emitted[name] = src.source();
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
  class RawSource {
    constructor(private readonly s: string) {}
    source(): string {
      return this.s;
    }
  }
  const compiler = {
    webpack: { sources: { RawSource } },
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
