[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / parseArgs

# Function: parseArgs()

> **parseArgs**(`argv`): [`CliArgs`](../interfaces/CliArgs.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Analitzar `generate &lt;target&gt; [--out dir] [--theme t] [--class Name]`.

## Parameters

### argv

readonly `string`[]

## Returns

[`CliArgs`](../interfaces/CliArgs.md)

## Examples

**Objectiu posicional més banderes de valor**

```ts
import { parseArgs } from "@pantoken/cli";

parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
// → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
//     className: "PanTokens", … }
```

**Banderes booleanes i una llista --icons separada per comes**

```ts
import { parseArgs } from "@pantoken/cli";

const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
args.noScope; // → true
args.icons; // → ["arrow-left", "check-mark"]
```
