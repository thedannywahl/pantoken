import { expect, test } from "vite-plus/test";
import MarkdownIt from "markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import { PROSE_CLASS, pantokenMarkdownIt } from "../src/index.ts";
import type { MarkdownItOptions } from "../src/index.ts";

const render = (src: string, options: MarkdownItOptions = {}): string =>
  new MarkdownIt().use(pantokenMarkdownIt, options).render(src).trim();

test("replaces a known :icon: with an inline SVG span", () => {
  const html = render("go :arrow-left: back");
  expect(html).toContain('class="pantoken-icon"');
  expect(html).toContain('data-pantoken-icon="arrow-left"');
  expect(html).toContain("<svg");
  expect(html).toContain("go ");
  expect(html).toContain(" back");
});

test("leaves unknown icon codes untouched", () => {
  const html = render("hello :definitely-not-an-icon: world");
  expect(html).not.toContain("pantoken-icon");
  expect(html).toContain(":definitely-not-an-icon:");
});

test("renders a standalone color value as a swatch", () => {
  const html = render("brand is #03893D today");
  expect(html).toContain('class="pantoken-color-swatch"');
  expect(html).toContain('data-color-code="#03893D"');
  expect(html).toContain("background:#03893D");
});

test("handles rgb()/oklch() color functions too", () => {
  expect(render("a rgb(1, 2, 3) b")).toContain('data-color-code="rgb(1, 2, 3)"');
  expect(render("a oklch(0.7 0.1 200) b")).toContain('data-color-code="oklch(0.7 0.1 200)"');
});

test("icons and swatches can be disabled independently", () => {
  const noIcons = render(":arrow-left: #03893D", { icons: false });
  expect(noIcons).not.toContain("pantoken-icon");
  expect(noIcons).toContain("pantoken-color-swatch");

  const noSwatches = render(":arrow-left: #03893D", { swatches: false });
  expect(noSwatches).toContain("pantoken-icon");
  expect(noSwatches).not.toContain("pantoken-color-swatch");
});

test("plugin resolvers are tried first (simple-icons brand codes)", () => {
  const registry = { siGithub: { title: "GitHub", slug: "github", path: "M12 0z" } };
  const html = render(":github:", { plugins: [simpleIcons({ registry })] });
  expect(html).toContain('data-pantoken-icon="github"');
  expect(html).toContain('d="M12 0z"');
});

test("custom class names are honored", () => {
  const html = render(":arrow-left: #03893D", {
    iconClassName: "ico",
    swatchClassName: "sw",
  });
  expect(html).toContain('class="ico"');
  expect(html).toContain('class="sw"');
});

test("leaves code spans alone (no text-child rewriting inside code)", () => {
  const html = render("`:arrow-left:` and `#03893D`");
  expect(html).not.toContain("pantoken-icon");
  expect(html).not.toContain("pantoken-color-swatch");
  expect(html).toContain("<code>:arrow-left:</code>");
});

test("exports the prose-scope class name", () => {
  expect(PROSE_CLASS).toBe("pantoken-prose");
});
