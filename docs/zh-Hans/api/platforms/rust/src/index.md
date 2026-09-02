[pantoken](../../../index.md) / rust

# rust

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

`@pantoken/rust` — emit Instructure design tokens as Rust constants for the two mainstream native
Rust GUIs: **egui** (`Color32`) and **iced** (`Color`). Colours become the framework's colour
type; dimensions become `f32` (px). Web-rendered Rust UIs (Tauri, Dioxus-web, Leptos, Yew) should
use `@pantoken/css` instead.

## 接口

- [RustOptions](interfaces/RustOptions.md)

## 类型别名

- [RustFormat](type-aliases/RustFormat.md)

## 函数

- [toRust](functions/toRust.md)
- [generateRust](functions/generateRust.md)

## 引用

### default

Renames and re-exports [generateRust](functions/generateRust.md)
