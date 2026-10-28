import { expect, test } from "vite-plus/test";
import { auditFingerprints } from "../scripts/audit-fingerprints.ts";
import { isSelected } from "../scripts/audit-accessibility.ts";
import { auditRecords } from "../scripts/audit-plugin-components.ts";

test("fingerprints every audited record deterministically", () => {
  const first = auditFingerprints();
  expect(Object.keys(first).sort()).toEqual(
    auditRecords()
      .map((record) => record.name)
      .sort(),
  );
  expect(auditFingerprints()).toEqual(first);
  expect(new Set(Object.values(first)).size).toBeGreaterThan(1);
});

test("record selection accepts one name, several, or everything", () => {
  expect(isSelected(undefined, "button")).toBe(true);
  expect(isSelected("button", "button")).toBe(true);
  expect(isSelected("button", "alert")).toBe(false);
  expect(isSelected(["button", "alert"], "alert")).toBe(true);
  expect(isSelected(["button"], "alert")).toBe(false);
});
