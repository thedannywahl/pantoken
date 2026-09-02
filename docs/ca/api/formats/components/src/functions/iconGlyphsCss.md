[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# Funció: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir la full d'estils de glif d'icona: una classe `.&lt;prefix&gt;-icon-&lt;name&gt;` per icona que apunta `--pantoken-glyph` al token `--instui-icon-&lt;name&gt;` que coincideix. Mantinguda fora del paquet de component (és gran); s'expedia com a la seva pròpia `icons.css`. Passa els noms d'icona (p. ex., de `@pantoken/icons`).

## Paràmetres

### names

readonly `string`[]

Noms d'icones sense el prefix `--instui-icon-` (p. ex. `["megaphone", "check"]`).

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (afegeix `deprecatedAliases` a [ComponentOptions](../interfaces/ComponentOptions.md)).

## Retorna

`string`

La cadena CSS.

## Exemple

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

Aquesta és la meitat del glyph-token del sistema d'icones (els modificadors `.-icon-&lt;name&gt;`, proporcionats com
`icons.css`); la utilitat `icon` és la meitat del pintor (el `::before` compartit). Comparteixen la
demostració `icon`.
