# @pantoken/rust

Emit Instructure design tokens as Rust constants for the two mainstream native Rust GUIs. Colours
become the framework's colour type; dimensions become `f32` (px). Icons and non-colour/dimension
tokens are skipped.

| Format | Type      | Framework                             |
| ------ | --------- | ------------------------------------- |
| `egui` | `Color32` | [egui](https://github.com/emilk/egui) |
| `iced` | `Color`   | [iced](https://iced.rs)               |

## Install

```sh
npm i @pantoken/rust
```

## Usage

```ts
import { writeFileSync } from "node:fs";
import { generateRust } from "@pantoken/rust";

writeFileSync("tokens.rs", generateRust({ format: "egui", theme: "rebrand" }));
```

Or via the CLI:

```sh
pantoken generate rust --format egui --out tokens.rs
pantoken generate rust --format iced --out src/tokens.rs
```

## Output

A single Rust module of `pub const`s — one per colour and dimension token, `SCREAMING_SNAKE_CASE`,
prefixed with `use egui::Color32;` or `use iced::Color;` to match the chosen format. Web-rendered
Rust UIs (Tauri, Dioxus-web, Leptos, Yew) render to HTML/CSS — use `@pantoken/css` there, not this
package.

## API

- **`generateRust(options?): string`** — emit Rust for a named theme (from the vendored
  `@pantoken/tokens` IR). Returns the source string.
- **`toRust(tokens, options?): string`** — same, but for an explicit token IR.
- **`RustFormat`** — `"egui" | "iced"`.
- **`RustOptions`** — the `format` and `mode` options (`generateRust` also takes `theme`).

## Related

- Uses `@pantoken/tokens` for the vendored token IR and `@pantoken/core` for the flattened Style
  Dictionary values.

## License

MIT
