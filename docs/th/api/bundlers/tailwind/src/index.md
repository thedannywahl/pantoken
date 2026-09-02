[pantoken](../../../index.md) / tailwind

# tailwind

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

`@pantoken/tailwind` — a Tailwind CSS preset that maps Instructure design tokens into the theme.

Every token is exposed as a `var(--instui-*)` reference (not a concrete value), so Tailwind
utilities like `bg-color-background-base` theme through the same CSS custom properties that
`@pantoken/css` emits — light/dark and high-contrast all keep working.

## อินเทอร์เฟซ

- [TailwindPreset](interfaces/TailwindPreset.md)
- [PantokenPresetOptions](interfaces/PantokenPresetOptions.md)

## ฟังก์ชัน

- [pantokenPreset](functions/pantokenPreset.md)

## การอ้างอิง

### default

Renames and re-exports [pantokenPreset](functions/pantokenPreset.md)
