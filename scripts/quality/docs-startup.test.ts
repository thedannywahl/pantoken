import { expect, test } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import config from "../../formats/css/vite.config.ts";
import manifest from "../../formats/css/package.json" with { type: "json" };

test("builds CSS generation dependencies before docs startup consumes their exports", () => {
  expect(config.run?.tasks?.generate).toMatchObject({
    command: "node scripts/generate.ts",
    dependsOn: [{ task: "build", from: ["dependencies", "devDependencies"] }],
  });
  expect(manifest.scripts).not.toHaveProperty("generate");
});

test("serializes all deployment dependency builds to prevent output cleanup races", () => {
  const workflow = parse(
    readFileSync(new URL("../../.github/workflows/docs.yml", import.meta.url), "utf8"),
  ) as { jobs: { deploy: { steps: Array<{ run?: string }> } } };
  const commands = workflow.jobs.deploy.steps
    .flatMap((step) => step.run?.split("\n") ?? [])
    .map((command) => command.trim())
    .filter((command) => command.startsWith('vp run -F "@pantoken/docs..."'));
  expect(commands).toHaveLength(3);
  for (const command of commands)
    expect(command).toBe('vp run -F "@pantoken/docs..." --concurrency-limit 1 build');
});

test("skips the docs build for accessibility audit tooling-only changes", () => {
  const workflow = parse(
    readFileSync(new URL("../../.github/workflows/ci.yml", import.meta.url), "utf8"),
  ) as {
    jobs: {
      "docs-changes": {
        steps: Array<{
          name?: string;
          with?: { filters?: string; "predicate-quantifier"?: string };
        }>;
      };
    };
  };
  const filterStep = workflow.jobs["docs-changes"].steps.find(
    (step) => step.name === "Detect docs-relevant changes",
  );
  const filters = parse(filterStep?.with?.filters ?? "") as {
    docs: string[];
  };
  expect(filterStep?.with?.["predicate-quantifier"]).toBe("some-with-excludes");
  expect(filters.docs).toContain("formats/**");
  expect(filters.docs).toContain("!formats/components/scripts/audit-accessibility.ts");
  expect(filters.docs).toContain("!formats/components/tests/audit-accessibility.test.ts");
  expect(filters.docs).toContain("renderers/**");
  expect(filters.docs).toContain("!renderers/astro/scripts/check-compatibility.ts");
  expect(filters.docs).toContain("!renderers/astro/tests/index.test.ts");
});
