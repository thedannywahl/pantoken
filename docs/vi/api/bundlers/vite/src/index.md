[pantoken](../../../index.md) / vite

# vite

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

`@pantoken/vite` — a Vite plugin for pantoken.

It exposes two virtual modules so apps consume tokens without importing the large packages
directly, and can auto-inject the stylesheet into the HTML entry:

- `virtual:pantoken/css` — the stylesheet string (default export).
- `virtual:pantoken/tokens` — the resolved token IR (`tokens` named + default export).

## Giao diện

- [PantokenViteOptions](interfaces/PantokenViteOptions.md)

## Hàm

- [pantoken](functions/pantoken.md)

## Tham chiếu

### default

Renames and re-exports [pantoken](functions/pantoken.md)
