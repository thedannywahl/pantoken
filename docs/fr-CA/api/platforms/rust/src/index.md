[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## Interfaces

- [RustOptions](interfaces/RustOptions.md)

## Alias de type

- [RustFormat](type-aliases/RustFormat.md)

## Fonctions

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## Références

### default

Renames and re-exports [generateRust](functions/generateRust.md)
