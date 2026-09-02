[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / parseArgs

# Ֆունկցիա: parseArgs()

> **parseArgs**(`argv`): [`CliArgs`](../interfaces/CliArgs.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Վերլուծել `generate &lt;target&gt; [--out dir] [--theme t] [--class Name]`-ը։

## Պարամետրեր

### argv

readonly `string`[]

## Վերադարձվող արժեք

[`CliArgs`](../interfaces/CliArgs.md)

## Օրինակներ

**Դիրքային թիրախ գումարած արժեքի դրոշներ**

```ts
import { parseArgs } from "@pantoken/cli";

parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
// → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
//     className: "PanTokens", … }
```

**Boolean դրոշներ և comma-separated --icons ցուցակ**

```ts
import { parseArgs } from "@pantoken/cli";

const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
args.noScope; // → true
args.icons;   // → ["arrow-left", "check-mark"]
```
