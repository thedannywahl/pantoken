[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / parseArgs

# Funksjon: parseArgs()

> **parseArgs**(`argv`): [`CliArgs`](../interfaces/CliArgs.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Parse `generate &lt;target&gt; [--out dir] [--theme t] [--class Name]`.

## Parametrar

### argv

readonly `string`[]

## Returnerer

[`CliArgs`](../interfaces/CliArgs.md)

## Døme

**Positional target plus value flags**

```ts
import { parseArgs } from "@pantoken/cli";

parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
// → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
//     className: "PanTokens", … }
```

**Boolean flags and a comma-separated --icons list**

```ts
import { parseArgs } from "@pantoken/cli";

const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
args.noScope; // → true
args.icons;   // → ["arrow-left", "check-mark"]
```
