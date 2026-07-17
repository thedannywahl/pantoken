import { expect, test } from "vite-plus/test";
import { formatAggregateMessage } from "./aggregate.ts";

test("formatAggregateMessage joins keys deterministically", () => {
  expect(formatAggregateMessage(["aggregate", "pantoken"])).toBe(
    "pantoken meta: aggregated aggregate, pantoken",
  );
});

test("formatAggregateMessage handles empty target list", () => {
  expect(formatAggregateMessage([])).toBe("pantoken meta: aggregated ");
});
