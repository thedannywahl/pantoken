[pantoken](../../../index.md) / vite

# vite

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

`@pantoken/vite` — a Vite plugin for pantoken.

It exposes two virtual modules so apps consume tokens without importing the large packages
directly, and can auto-inject the stylesheet into the HTML entry:

- `virtual:pantoken/css` — the stylesheet string (default export).
- `virtual:pantoken/tokens` — the resolved token IR (`tokens` named + default export).

## อินเทอร์เฟซ

- [PantokenViteOptions](interfaces/PantokenViteOptions.md)

## ฟังก์ชัน

- [pantoken](functions/pantoken.md)

## การอ้างอิง

### default

Renames and re-exports [pantoken](functions/pantoken.md)
