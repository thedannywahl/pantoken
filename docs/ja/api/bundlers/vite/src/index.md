[pantoken](../../../index.md) / vite

# vite

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

`@pantoken/vite` — a Vite plugin for pantoken.

It exposes two virtual modules so apps consume tokens without importing the large packages
directly, and can auto-inject the stylesheet into the HTML entry:

- `virtual:pantoken/css` — the stylesheet string (default export).
- `virtual:pantoken/tokens` — the resolved token IR (`tokens` named + default export).

## インターフェース

- [PantokenViteOptions](interfaces/PantokenViteOptions.md)

## 関数

- [pantoken](functions/pantoken.md)

## 参照

### default

Renames and re-exports [pantoken](functions/pantoken.md)
