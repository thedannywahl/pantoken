import { expect, test } from "vite-plus/test";
import config from "../../vite.config.ts";

test("bounds standard and coverage test workers without weakening timeouts or coverage", () => {
  expect(config.test?.maxWorkers).toBe(2);
  expect(config.test?.testTimeout).toBe(20_000);
  expect(config.test?.coverage?.thresholds).toEqual({
    statements: 85,
    branches: 70,
    functions: 85,
    lines: 85,
  });
});
