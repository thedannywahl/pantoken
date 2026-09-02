# CSS: icon

`.instui-icon` — El sistema d'icones: dimensionament `.instui-icon` més el pintor compartit `-icon-&lt;name&gt;` que emmascara un glif (en `currentColor`) abans de qualsevol element.

**Font:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Accessibilitat

El glif és decoratiu, així que marca'l `aria-hidden="true"`; dona'li un `role` o etiqueta només quan la icona transmet significat per si sola.

## Ús

```css
@import "@pantoken/components/components.css";
```

## Exemples

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-icon-*` | Estableix el token del glif (`--pantoken-glyph`) i renderitza'l a través del pintor compartit (per exemple `-icon-search`). |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::before` | El glif mateix: una caixa d'1em emmascara des de `--pantoken-glyph` i plena de `currentColor`. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

