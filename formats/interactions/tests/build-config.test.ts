import { expect, test } from "vite-plus/test";
import config from "../vite.config.ts";

test("builds workspace dependencies before bundling standalone browser interactions", () => {
  expect(config.run?.tasks?.build).toMatchObject({
    dependsOn: [{ task: "build", from: "dependencies" }],
  });
});
