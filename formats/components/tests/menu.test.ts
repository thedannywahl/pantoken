import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { readFileSync } from "node:fs";
import { menu } from "../src/components/menu/index.ts";
import { menuItem } from "../src/components/menu/members/item/index.ts";
import { menuGroup } from "../src/components/menu/members/group/index.ts";
import { menuSeparator } from "../src/components/menu/members/separator/index.ts";
import { collectExamples } from "../scripts/audit-accessibility.ts";
import { validate } from "./_validate.ts";

test.each([menu, menuItem, menuGroup, menuSeparator])(
  "$name: ships a valid record and opts into real menu behavior",
  (record) => {
    validate(record);
    const [example] = collectExamples(parseCssDocs(record.rules("instui-")), [record.name]);
    const window = new Window();
    try {
      window.document.body.innerHTML = example!.html;
      const root = window.document.querySelector("[data-menu-navigation]")!;
      const trigger = window.document.querySelector("button[popovertarget]")!;
      expect(root.getAttribute("role")).toBe("menu");
      expect(root.getAttribute("popover")).toBe("auto");
      expect(root.getAttribute("aria-label")).toBeTruthy();
      expect(trigger.getAttribute("popovertarget")).toBe(root.id);
      expect(trigger.getAttribute("aria-controls")).toBe(root.id);
      expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(root.querySelectorAll('[role="menuitem"]')).toHaveLength(2);
      for (const button of window.document.querySelectorAll("button"))
        expect(button.type).toBe("button");
      for (const separator of root.querySelectorAll('[role="separator"]'))
        expect(separator.hasAttribute("tabindex")).toBe(false);
    } finally {
      void window.happyDOM.abort();
    }
  },
);

test("the localized menu demo uses the same opt-in production contract", () => {
  const html = readFileSync(
    new URL("../../../docs/demos/menu/index.html", import.meta.url),
    "utf8",
  );
  expect(html).toContain("data-menu-navigation");
  expect(html).toContain('role="menu"');
  expect(html).toContain('aria-labelledby="demo-menu-button"');
  expect(html).toContain('popovertarget="demo-menu"');
  expect(html.match(/role="menuitem"/gu)).toHaveLength(3);
  expect(menu.rules("instui-")).toContain("@demo self:menu");
});
