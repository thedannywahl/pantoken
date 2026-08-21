import { expect, test } from "vite-plus/test";
import { sanitizeSvg } from "../src/svg.ts";

test("sanitizeSvg removes script elements", () => {
  const in_ = `<svg><script>alert(1)</script><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(in_)).not.toContain("<script");
  expect(sanitizeSvg(in_)).toContain("<path");
});

test("sanitizeSvg removes event-handler attributes", () => {
  const in_ = `<svg><path onclick="evil()" onload="bad()" d="M0 0"/></svg>`;
  const out = sanitizeSvg(in_);
  expect(out).not.toContain("onclick");
  expect(out).not.toContain("onload");
  expect(out).toContain(`d="M0 0"`);
});

test("sanitizeSvg is case-insensitive for script tags", () => {
  expect(sanitizeSvg("<svg><SCRIPT>x</SCRIPT></svg>")).not.toContain("SCRIPT");
});

test("sanitizeSvg passes through clean SVG unchanged", () => {
  const clean = `<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(clean)).toBe(clean);
});

test("sanitizeSvg strips on* attributes that would survive a single-pass replacement", () => {
  // Crafted so the outer on* value contains another on* — a single pass would only strip the outer.
  const in_ = `<svg><path ononclick="evil()" d="M0 0"/></svg>`;
  const out = sanitizeSvg(in_);
  expect(out).not.toContain("onclick");
  expect(out).not.toContain("on");
});
