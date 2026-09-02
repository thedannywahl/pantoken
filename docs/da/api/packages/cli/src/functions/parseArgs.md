[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / parseArgs

# Funktion: parseArgs()

> **parseArgs**(`argv`): [`CliArgs`](../interfaces/CliArgs.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Analysér `generate &lt;target&gt; [--out dir] [--theme t] [--class Name]`.

## Parametre

### argv

readonly `string`[]

## Returnerer

[`CliArgs`](../interfaces/CliArgs.md)

## Eksempler

**Positions-mål plus værdimarkeringer**

```ts
import { parseArgs } from "@pantoken/cli";

parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
// → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
//     className: "PanTokens", … }
```

**Booleske markeringer og en kommadelt --icons-liste**

```ts
import { parseArgs } from "@pantoken/cli";

const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
args.noScope; // → true
args.icons;   // → ["arrow-left", "check-mark"]
```
