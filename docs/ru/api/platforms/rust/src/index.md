[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## Интерфейсы

- [RustOptions](interfaces/RustOptions.md)

## Псевдонимы типов

- [RustFormat](type-aliases/RustFormat.md)

## Функции

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## Ссылки

### default

Renames and re-exports [generateRust](functions/generateRust.md)
