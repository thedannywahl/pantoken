import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { parseHexColor, resolveTokens } from "@pantoken/utils";
import { docsJson, toMintlifyConfig } from "../src/index.ts";

test("maps brand/button/page tokens onto the Mintlify docs.json keys", () => {
  const cfg = toMintlifyConfig(tokens);
  const light = resolveTokens(tokens, { mode: "light" });
  const dark = resolveTokens(tokens, { mode: "dark" });
  expect(cfg.colors.primary).toBe(light.get("--instui-color-background-brand"));
  expect(cfg.colors.light).toBe(dark.get("--instui-color-background-brand"));
  expect(cfg.colors.dark).toBe(
    light.get("--instui-color-background-interactive-action-primary-base"),
  );
  expect(cfg.background.color.light).toBe(light.get("--instui-color-background-page"));
  expect(cfg.background.color.dark).toBe(dark.get("--instui-color-background-page"));
});

test("every emitted colour resolves to a concrete hex (Mintlify parses hex, not var())", () => {
  const cfg = toMintlifyConfig(tokens);
  const values = [
    cfg.colors.primary,
    cfg.colors.light,
    cfg.colors.dark,
    cfg.background.color.light,
    cfg.background.color.dark,
  ];
  for (const value of values) expect(parseHexColor(value)).toBeDefined();
});

test("docsJson is the ready-made rebrand fragment", () => {
  expect(docsJson).toEqual(toMintlifyConfig(tokens));
});
