[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / toRust

# Function: toRust()

> **toRust**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արտանետել Rust հաստատունները բացահայտ թոկեն IR-ի համար:

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR:

### options?

[`RustOptions`](../interfaces/RustOptions.md) = `{}`

[RustOptions](../interfaces/RustOptions.md).

## Returns

`string`

Rust աղբյուր (`pub const`-ների մոդուլ):

## Examples

**egui (Color32), կանխադրված ձևաչափ**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"));
// "use egui::Color32;\npub const COLOR_BACKGROUND_BRAND: Color32 = Color32::from_rgb(…);"
```

**iced (Color), մուգ ռեժիմ**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"), { format: "iced", mode: "dark" });
// "use iced::Color;\npub const COLOR_BACKGROUND_BRAND: Color = Color { r: …, g: …, b: …, a: … };"
```
