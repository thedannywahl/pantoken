[pantoken](../../../../index.md) / [platforms/rust/src](../index.md) / toRust

# Funkcja: toRust()

> **toRust**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit Rust constants for an explicit token IR.

## Parametry

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR.

### options?

[`RustOptions`](../interfaces/RustOptions.md) = `{}`

[RustOptions](../interfaces/RustOptions.md).

## Zwraca

`string`

The Rust source (a module of `pub const`s).

## Przykłady

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
