[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / parseArgs

# دالة: parseArgs()

> **parseArgs**(`argv`): [`CliArgs`](../interfaces/CliArgs.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حلل `generate &lt;target&gt; [--out dir] [--theme t] [--class Name]`.

## المعلمات

### argv

للقراءة فقط `string`[]

## القيم المرجعة

[`CliArgs`](../interfaces/CliArgs.md)

## أمثلة

**أعلام الهدف الموضعي بالإضافة إلى القيم**

```ts
import { parseArgs } from "@pantoken/cli";

parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
// → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
//     className: "PanTokens", … }
```

**أعلام منطقية وقائمة --icons مفصولة بفواصل**

```ts
import { parseArgs } from "@pantoken/cli";

const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
args.noScope; // → true
args.icons;   // → ["arrow-left", "check-mark"]
```
