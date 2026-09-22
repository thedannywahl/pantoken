import { describe, expect, it } from "vite-plus/test";

import {
  DEFAULT_HIDDEN_CLASS,
  DEFAULT_STORAGE_KEY,
  sidebarToggleHead,
} from "../src/inline-script.ts";

describe("sidebarToggleHead", () => {
  it("returns a script head tag using the default storage key and class", () => {
    const [tag, attrs, content] = sidebarToggleHead();
    expect(tag).toBe("script");
    expect(attrs).toEqual({});
    expect(content).toContain(DEFAULT_STORAGE_KEY);
    expect(content).toContain(DEFAULT_HIDDEN_CLASS);
  });

  it("honors a custom storage key and hidden class", () => {
    const [, , content] = sidebarToggleHead({
      storageKey: "custom-key",
      hiddenClass: "custom-class",
    });
    expect(content).toContain("custom-key");
    expect(content).toContain("custom-class");
    expect(content).not.toContain(DEFAULT_STORAGE_KEY);
    expect(content).not.toContain(DEFAULT_HIDDEN_CLASS);
  });

  it("serializes placement and custom icon classes for the component", () => {
    const [, , content] = sidebarToggleHead({
      placement: "end",
      icons: { show: "icon-expand", hide: "icon-collapse" },
    });
    expect(content).toContain('"placement":"end"');
    expect(content).toContain('"show":"icon-expand"');
    expect(content).toContain('"hide":"icon-collapse"');
  });

  it("wraps the body in try/catch so a blocked localStorage never throws before paint", () => {
    const [, , content] = sidebarToggleHead();
    expect(content).toMatch(/^\(function\(\)\{try\{/);
    expect(content).toContain("catch(e){}");
  });
});
