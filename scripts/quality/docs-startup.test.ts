import { expect, test } from "vite-plus/test";
import config from "../../formats/css/vite.config.ts";
import manifest from "../../formats/css/package.json" with { type: "json" };

test("builds CSS generation dependencies before docs startup consumes their exports", () => {
  expect(config.run?.tasks?.generate).toMatchObject({
    command: "node scripts/generate.ts",
    dependsOn: [{ task: "build", from: ["dependencies", "devDependencies"] }],
  });
  expect(manifest.scripts).not.toHaveProperty("generate");
});
