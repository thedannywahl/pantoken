import { expect, test } from "vite-plus/test";
import { danglingReferences, unknownReferences } from "../src/drift.ts";
import type { Token } from "@pantoken/model";

const IR: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
];

test("unknownReferences flags token names not defined by the IR (drift)", () => {
  const bridge = "--x: var(--instui-leaf); --y: var(--instui-gone);";
  expect(unknownReferences(bridge, IR)).toEqual(["--instui-gone"]);
  expect(unknownReferences("--x: var(--instui-leaf);", IR)).toEqual([]);
});

test("danglingReferences flags var() refs a stylesheet never defines", () => {
  const selfContained = "@property --instui-a {} .b { color: var(--instui-a); }";
  expect(danglingReferences(selfContained)).toEqual([]);
  const dangling =
    ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }";
  expect(danglingReferences(dangling)).toEqual(["--instui-b"]);
});
