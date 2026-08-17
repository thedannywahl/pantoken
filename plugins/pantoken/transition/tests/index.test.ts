import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import {
  progressCircleTransitionRules,
  progressTransitionRules,
  transition,
} from "../src/index.ts";

test("is a factoried plugin with tokens + css capabilities", () => {
  expect(capabilitiesOf(transition())).toEqual(["tokens", "css"]);
});

test("tokens hook defines the duration + timing custom properties", () => {
  const out = transition().tokens?.({ tokens: [], theme: "rebrand" }) ?? [];
  const names = out.map((t) => t.name);
  expect(names).toContain("--instui-transition-duration");
  expect(names).toContain("--instui-transition-timing");
  expect(out.find((t) => t.name === "--instui-transition-duration")?.value).toBe("300ms");
});

test("css hook emits the base transition + fade/scale/slide state classes", () => {
  const c = transition().css?.({ tokens: [], css: "" });
  const css = c?.append ?? "";
  expect(css).toContain(".instui-transition {");
  expect(css).toContain("transition: opacity var(--instui-transition-duration)");
  expect(css).toContain(".instui-transition.-fade-entered");
  expect(css).toContain(".instui-transition.-scale-exited");
  expect(css).toContain(".instui-transition.-slide-down-exiting");
  expect(css).toContain("translate3d(0, 100%, 0)");
  const decls = Object.fromEntries(c?.declarations ?? []);
  expect(decls["--instui-transition-timing"]).toBe("ease-in-out");
});

test("options override duration, timing, and prefix", () => {
  const c = transition({ duration: "200ms", timing: "linear", prefix: "ui" }).css?.({
    tokens: [],
    css: "",
  });
  expect(c?.append).toContain(".ui-transition.-fade-entered");
  const decls = Object.fromEntries(c?.declarations ?? []);
  expect(decls["--instui-transition-duration"]).toBe("200ms");
});

test("progress circle mount rules reproduce InstUI's transition sequence", () => {
  const css = progressCircleTransitionRules("ui");
  expect(css).toContain(".ui-progress-circle { transition: --value 1s; }");
  expect(css).toContain("opacity 0.5s 0.2s");
  expect(css).toContain("opacity 0.5s 1s");
  expect(css).toContain(".ui-progress-circle.-should-animate { --value: 0 !important; }");
  expect(css).toContain("translate3d(0, 10%, 0)");
});

test("progress bar value rule reproduces InstUI's transition", () => {
  expect(progressTransitionRules("ui")).toBe(
    ".ui-progress.-should-animate > .bar { transition: all 0.5s; }",
  );
});
