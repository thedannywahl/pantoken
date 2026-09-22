import { describe, expect, test, vi } from "vite-plus/test";

import { PANTOKEN_ICON_PACK_NAME, registerPantokenIconPack } from "../src/icon-pack.js";

describe("registerPantokenIconPack", () => {
  test("replaces every TinyMCE icon with a Pantoken SVG", () => {
    const add = vi.fn();
    const iconManager = {
      add,
      get: () => ({ icons: { bold: "tiny-bold", close: "tiny-close", unknown: "tiny-unknown" } }),
      has: () => true,
    };

    expect(registerPantokenIconPack(iconManager)).toBe(PANTOKEN_ICON_PACK_NAME);
    expect(add).toHaveBeenCalledOnce();

    const [name, pack] = add.mock.calls[0];
    expect(name).toBe(PANTOKEN_ICON_PACK_NAME);
    expect(Object.keys(pack.icons)).toEqual(["bold", "close", "unknown"]);
    expect(pack.icons.bold).toContain("<svg");
    expect(pack.icons.bold).toContain('style="fill: none; stroke: currentColor"');
    expect(pack.icons.close).toContain("<svg");
    expect(pack.icons.unknown).toContain("<svg");
    expect(Object.values(pack.icons).join(" ")).not.toContain("tiny-");
  });

  test("requires TinyMCE's default icon pack", () => {
    const iconManager = { add: vi.fn(), get: vi.fn(), has: () => false };

    expect(() => registerPantokenIconPack(iconManager)).toThrow(/default icon pack/u);
  });
});
