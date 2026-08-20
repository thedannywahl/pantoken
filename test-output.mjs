import { spacingUtilitiesCss } from "./formats/components/src/index.ts" with { type: "wasm" };

const css = spacingUtilitiesCss({ prefix: "instui" });
const lines = css.split("\n").slice(10, 30);
console.log(lines.join("\n"));
