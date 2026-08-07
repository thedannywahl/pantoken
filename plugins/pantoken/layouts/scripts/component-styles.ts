import { resolve } from "node:path";
import { compileCssToTs } from "../../scripts/compile-css-to-ts.ts";

compileCssToTs(
  resolve(import.meta.dirname, "../src/layouts"),
  resolve(import.meta.dirname, "../src/generated/component-styles.ts"),
  "layouts",
);
