[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## 인터페이스

- [RustOptions](interfaces/RustOptions.md)

## 타입 별칭

- [RustFormat](type-aliases/RustFormat.md)

## 함수

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## 참조

### default

Renames and re-exports [generateRust](functions/generateRust.md)
