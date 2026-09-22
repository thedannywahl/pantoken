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

  it("renders only on layouts that have a sidebar", () => {
    expect(source).toContain("useLayout()");
    expect(source).toMatch(/<button\s+v-if="hasSidebar"/);
    expect(source).toContain("if (!hasSidebar.value) return;");
  });

  it("shows only when VitePress hides its narrow-viewport menu", () => {
    expect(source).toMatch(/@media \(min-width: 60rem\)[\s\S]*display: flex/);
  });

  it("synchronizes VitePress's local-nav menu with visible sidebar state", () => {
    expect(source).toContain('event.target.closest(".VPLocalNav .menu")');
    expect(source).toContain("show()");
  });

  it("supports custom icons, navbar placement, and RTL mirroring", () => {
    expect(source).toContain("configuredSidebarToggleOptions()");
    expect(source).toContain("options.icons.show");
    expect(source).toContain("options.icons.hide");
    expect(source).toContain("'is-start': options.placement === 'start'");
    expect(source).toMatch(/\.vitepress-sidebar-toggle\.is-start\s*\{\s*order: -1/);
    expect(source).toContain('options.placement === "start" ? ".VPNavBar .search"');
    expect(source).toContain("anchor.before(toggleButton.value)");
    expect(source).toContain(".vitepress-sidebar-toggle-icon:dir(rtl)");
  });
});
