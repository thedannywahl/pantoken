[pantoken](../../../index.md) / tailwind

# tailwind

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/tailwind` — et Tailwind CSS preset som mapper Instructure designtokens ind i temaet.

Hvert token eksponeres som en `var(--instui-*)` reference (ikke en konkret værdi), så Tailwind
funktionaliteter som `bg-color-background-base` styler via de samme CSS egenskaber som
`@pantoken/css` udsender — lys/mørk og høj kontrast holder ved at virke.

## Interfaces

- [TailwindPreset](interfaces/TailwindPreset.md)
- [PantokenPresetOptions](interfaces/PantokenPresetOptions.md)

## Functions

- [pantokenPreset](functions/pantokenPreset.md)

## References

### default

Omdøber og re-eksporterer [pantokenPreset](functions/pantokenPreset.md)
