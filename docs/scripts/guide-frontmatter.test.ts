import { describe, expect, test } from "vite-plus/test";
import { sanitizeGuideFrontmatter } from "./guide-frontmatter.ts";

describe("sanitizeGuideFrontmatter", () => {
  test("quotes frontmatter scalars that contain YAML mapping colons", () => {
    expect(
      sanitizeGuideFrontmatter(
        ["---", "title: Canvas: Remote-Code-Ausführung (RCE)", "layout: page", "---", ""].join(
          "\n",
        ),
      ),
    ).toBe(
      ["---", 'title: "Canvas: Remote-Code-Ausführung (RCE)"', "layout: page", "---", ""].join(
        "\n",
      ),
    );
  });

  test("leaves body text and safe frontmatter unchanged", () => {
    const source = [
      "---",
      "title: Canvas RCE",
      "layout: page",
      "---",
      "",
      "Canvas: body text stays plain.",
    ].join("\n");

    expect(sanitizeGuideFrontmatter(source)).toBe(source);
  });
});
