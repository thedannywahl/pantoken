[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / toRust

# Function: toRust()

> **toRust**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udled Rust-konstanter til en eksplicit token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

IR'en.

### options?

[`RustOptions`](../interfaces/RustOptions.md) = `{}`

[RustOptions](../interfaces/RustOptions.md).

## Returns

`string`

Rust-kilden (et modul af `pub const`s).

## Examples

**egui (Color32), standardformatet**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"));
// "use egui::Color32;\npub const COLOR_BACKGROUND_BRAND: Color32 = Color32::from_rgb(…);"
```

**iced (Color), mørkt tilstand**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"), { format: "iced", mode: "dark" });
// "use iced::Color;\npub const COLOR_BACKGROUND_BRAND: Color = Color { r: …, g: …, b: …, a: … };"
```
