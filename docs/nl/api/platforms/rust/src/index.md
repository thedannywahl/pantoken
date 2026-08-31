[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## Interfaces

- [RustOptions](interfaces/RustOptions.md)

## Type Aliases

- [RustFormat](type-aliases/RustFormat.md)

## Functions

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## References

### default

Renames and re-exports [generateRust](functions/generateRust.md)
