[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## インターフェース

- [RustOptions](interfaces/RustOptions.md)

## 型エイリアス

- [RustFormat](type-aliases/RustFormat.md)

## 関数

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## 参照

### default

Renames and re-exports [generateRust](functions/generateRust.md)
