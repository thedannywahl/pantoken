import { expect, test } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { pantokenStorybookTheme } from "../src/index.ts";

test("builds a ThemeVars object with concrete colours", () => {
  const theme = pantokenStorybookTheme("light");
  expect(theme.base).toBe("light");
  expect(theme.brandTitle).toBe("Instructure");
  expect(theme.colorPrimary.startsWith("#")).toBe(true);
  expect(theme.appBg.startsWith("#")).toBe(true);
  // No unresolved references.
  expect(theme.textColor.includes("var(")).toBe(false);
});

test("dark mode sets base and resolves the dark palette", () => {
  expect(pantokenStorybookTheme("dark").base).toBe("dark");
});

test("rejects Storybook theming releases outside the checked major", async () => {
  await expect(checkCompatibility("9.0.0")).rejects.toThrow("Invalid Storybook theming 8 release");
});
