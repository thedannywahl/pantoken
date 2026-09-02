import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { extractMessagesSpace, parseMessageSource } from "../src/extract-messages.ts";

describe("parseMessageSource", () => {
  test("an explicit message entry is always-translate", () => {
    expect(parseMessageSource({ back: { message: "Back", translate: "always" } })).toEqual([
      { key: "back", msgctxt: "back", msgid: "Back", reference: "back", translate: "always" },
    ]);
  });

  test("an object entry carries its own translate intent", () => {
    expect(
      parseMessageSource({ datePlaceholder: { message: "yyyy-mm-dd", translate: "optional" } }),
    ).toEqual([
      {
        key: "datePlaceholder",
        msgctxt: "datePlaceholder",
        msgid: "yyyy-mm-dd",
        reference: "datePlaceholder",
        translate: "optional",
      },
    ]);
  });

  test("an object entry carries an explicit always intent", () => {
    expect(parseMessageSource({ x: { message: "y", translate: "always" } })).toEqual([
      { key: "x", msgctxt: "x", msgid: "y", reference: "x", translate: "always" },
    ]);
  });

  test("preserves key order", () => {
    const units = parseMessageSource({
      b: { message: "B", translate: "always" },
      a: { message: "A", translate: "always" },
    });
    expect(units.map((u) => u.key)).toEqual(["b", "a"]);
  });

  test("ignores the JSON Schema metadata key", () => {
    expect(
      parseMessageSource({
        $schema: "./i18n.source.schema.json",
        back: { message: "Back", translate: "always" },
      } as never),
    ).toHaveLength(1);
  });

  test("qualifies contexts without changing runtime keys", () => {
    expect(
      parseMessageSource({ back: { message: "Back", translate: "always" } }, "cli.ai")[0],
    ).toMatchObject({
      key: "back",
      msgctxt: "cli.ai:back",
    });
  });
});

describe("extractMessagesSpace", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-messages-"));
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  test("reads and parses a real i18n.json file", () => {
    const path = join(testDir, "i18n.json");
    writeFileSync(
      path,
      JSON.stringify({
        prevMonth: { message: "Previous month", translate: "always" },
        datePlaceholder: { message: "yyyy-mm-dd", translate: "optional" },
      }),
    );
    expect(extractMessagesSpace(path)).toEqual([
      {
        key: "prevMonth",
        msgctxt: "prevMonth",
        msgid: "Previous month",
        reference: "prevMonth",
        translate: "always",
      },
      {
        key: "datePlaceholder",
        msgctxt: "datePlaceholder",
        msgid: "yyyy-mm-dd",
        reference: "datePlaceholder",
        translate: "optional",
      },
    ]);
  });
});
