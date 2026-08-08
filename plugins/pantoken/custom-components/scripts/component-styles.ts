import { resolve } from "node:path";
import { compileCssToTs } from "../../scripts/compile-css-to-ts.ts";

compileCssToTs(
  resolve(import.meta.dirname, "../src/components"),
  resolve(import.meta.dirname, "../src/generated/component-styles.ts"),
  "custom-components",
);
