import postcss, { AtRule, type Node } from "postcss";
import { expect, test } from "vite-plus/test";
import { COMPONENTS } from "../src/components/index.ts";
import { UTILITIES } from "../src/utilities/index.ts";

test("every emitted motion declaration has an automatic reduced-motion policy", () => {
  for (const prefix of ["instui-", "custom-", ""]) {
    for (const record of [...COMPONENTS, ...UTILITIES]) {
      const css = record.rules(prefix);
      const violations: string[] = [];
      postcss.parse(css).walkDecls(/^(?:animation|transition)(?:$|-)/u, (declaration) => {
        if (declaration.value === "none") return;
        // These records retain their existing, tested reduced-motion overrides.
        if (["spinner", "toggle-details", "tree-browser"].includes(record.name)) {
          expect(css).toContain("@media (prefers-reduced-motion: reduce)");
          expect(css).toContain(`${declaration.prop.split("-")[0]}: none`);
          return;
        }
        let parent: Node | undefined = declaration.parent;
        while (parent) {
          if (
            parent instanceof AtRule &&
            parent.name === "media" &&
            parent.params === "(prefers-reduced-motion: no-preference)"
          ) {
            return;
          }
          parent = parent.parent;
        }
        violations.push(declaration.toString());
      });
      expect(violations, `${prefix}${record.name}`).toEqual([]);
    }
  }
});
