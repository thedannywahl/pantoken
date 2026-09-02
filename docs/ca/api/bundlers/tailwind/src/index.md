[pantoken](../../../index.md) / tailwind

# tailwind

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/tailwind` — un preset de Tailwind CSS que mapeja tokens de disseny d'Instructure en el tema.

Cada token s'exposa com a referència `var(--instui-*)` (no com a valor concret), de manera que les utilitats de Tailwind com `bg-color-background-base` es temitzen a través de les mateixes propietats personalitzades de CSS que `@pantoken/css` emet — la llum/obscuritat i el contrast alt continuen funcionant.

## Interfícies

- [TailwindPreset](interfaces/TailwindPreset.md)
- [PantokenPresetOptions](interfaces/PantokenPresetOptions.md)

## Funcions

- [pantokenPreset](functions/pantokenPreset.md)

## Referències

### default

Canvia de nom i reexporta [pantokenPreset](functions/pantokenPreset.md)
