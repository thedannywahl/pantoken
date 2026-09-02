[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / toRust

# Fungsi: toRust()

> **toRust**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit Rust constants for an explicit token IR.

## Parameter

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR.

### options?

[`RustOptions`](../interfaces/RustOptions.md) = `{}`

[RustOptions](../interfaces/RustOptions.md).

## Mengembalikan

`string`

The Rust source (a module of `pub const`s).

## Contoh

**egui (Color32), the default format**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"));
// "use egui::Color32;\npub const COLOR_BACKGROUND_BRAND: Color32 = Color32::from_rgb(…);"
```

**iced (Color), dark mode**

```ts
import { toRust } from "@pantoken/rust";
import { byTheme } from "@pantoken/tokens";

const source = toRust(byTheme("rebrand"), { format: "iced", mode: "dark" });
// "use iced::Color;\npub const COLOR_BACKGROUND_BRAND: Color = Color { r: …, g: …, b: …, a: … };"
```
