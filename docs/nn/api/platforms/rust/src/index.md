[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## Grensesnitt

- [RustOptions](interfaces/RustOptions.md)

## Typealias

- [RustFormat](type-aliases/RustFormat.md)

## Funksjonar

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## Referansar

### default

Renames and re-exports [generateRust](functions/generateRust.md)
