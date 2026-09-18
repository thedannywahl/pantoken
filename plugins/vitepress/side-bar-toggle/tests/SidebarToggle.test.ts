import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vite-plus/test";

const source = readFileSync(
  fileURLToPath(new URL("../src/SidebarToggle.vue", import.meta.url)),
  "utf8",
);

// The .vue SFC ships as raw source (compiled by the consumer's own toolchain, see README), so these
// assertions check the accessibility contract at the source level instead of mounting the component.
describe("SidebarToggle.vue accessibility", () => {
  it("is a native, keyboard-operable button", () => {
    expect(source).toMatch(/<button\b/);
    expect(source).toContain('type="button"');
  });

  it("exposes a bound aria-label, aria-expanded, and a static aria-controls", () => {
    expect(source).toMatch(/:aria-label="[^"]+"/);
    expect(source).toMatch(/:aria-expanded="[^"]+"/);
    expect(source).toContain('aria-controls="VPSidebarNav"');
  });

  it("hides the decorative icon from assistive tech", () => {
    expect(source).toContain('aria-hidden="true"');
  });
});
