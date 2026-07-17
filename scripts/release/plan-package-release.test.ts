import { expect, test } from "vite-plus/test";
import { resolvePlanInputs } from "./plan-package-release.ts";

test("resolvePlanInputs keeps explicit target/version when provided", () => {
  const resolved = resolvePlanInputs({
    target: "@pantoken/pantoken",
    version: "0.1.1",
    tag: "@pantoken/pantoken@v0.1.1",
  });

  expect(resolved).toEqual({
    target: "@pantoken/pantoken",
    version: "0.1.1",
    tag: "@pantoken/pantoken@v0.1.1",
  });
});

test("resolvePlanInputs derives target/version from tag", () => {
  const resolved = resolvePlanInputs({
    target: "",
    tag: "@pantoken/pantoken@v0.1.2-beta.1",
  });

  expect(resolved).toEqual({
    target: "@pantoken/pantoken",
    version: "0.1.2-beta.1",
    tag: "@pantoken/pantoken@v0.1.2-beta.1",
  });
});

test("resolvePlanInputs rejects invalid tag format", () => {
  expect(() =>
    resolvePlanInputs({
      target: "",
      tag: "pantoken@0.1.1",
    }),
  ).toThrow('Invalid package tag "pantoken@0.1.1". Expected @pantoken/pkg@vX.Y.Z');
});
