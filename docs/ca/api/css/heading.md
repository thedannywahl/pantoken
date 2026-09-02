# CSS: heading

`.instui-heading` — Tipografia de capçalera de `-level-h1` a `-level-h6`.

Els presets `-variant-*` sobrescriuen la mida de lletra i el pes de lletra de `-level-*`, així que combina només un de cada família per element.

**Font:** [heading.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/heading/heading.css)

## Accessibilitat

Aquestes classes estableixen només el nivell visual, així que renderitza un `&lt;h1&gt;`–`&lt;h6&gt;` real (o utilitza `role="heading"` amb `aria-level`) per transmetre el nivell de capçalera.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/heading.css";
```

## Exemples

```html
<div class="instui-heading -level-h1">Heading h1</div>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-border-bottom` | Afegeix una línia inferior. |
| `.-border-top` | Afegeix una línia superior. |
| `.-color-ai` | Color d'accent d'IA. |
| `.-color-primary` | Color primari (per defecte). |
| `.-color-primary-inverse` | Color primari invers (en fons fosc). |
| `.-color-secondary` | Color secundari (mut). |
| `.-level-h1` | Renderitza a l'escala de tipus h1. |
| `.-level-h2` | Renderitza a l'escala de tipus h2. |
| `.-level-h3` | Renderitza a l'escala de tipus h3. |
| `.-level-h4` | Renderitza a l'escala de tipus h4. |
| `.-level-h5` | Renderitza a l'escala de tipus h5. |
| `.-level-h6` | Renderitza a l'escala de tipus h6. |
| `.-variant-label` | Predefinit de tipus d'etiqueta. |
| `.-variant-title-card-mini` | Predefinit de títol de fitxa mini. |
| `.-variant-title-card-regular` | Predefinit de títol de fitxa regular. |
| `.-variant-title-card-section` | Predefinit de títol de secció de fitxa. |
| `.-variant-title-page` | Predefinit de títol de pàgina. |
| `.-variant-title-section` | Predefinit de títol de secció. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-heading-ai-text-bottom-gradient-color` | `<color>` | `light-dark(#027887, #3CC0D4)` |
| `--instui-component-heading-ai-text-top-gradient-color` | `<color>` | `light-dark(#944FB3, #CAA1D9)` |
| `--instui-component-heading-base-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-heading-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-heading-border-padding` | `<length>` | `0.125rem` |
| `--instui-component-heading-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-heading-h1-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-heading-h1-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-h1-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h2-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-h2-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h3-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-h3-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h4-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-h4-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-h5-font-size` | `<length>` | `0.875rem` |
| `--instui-component-heading-h5-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-h6-font-size` | `<length>` | `0.75rem` |
| `--instui-component-heading-h6-font-weight` | `<integer>` | `600` |
| `--instui-component-heading-inverse-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-heading-label-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-label-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-line-height` | `<percentage>` | `125%` |
| `--instui-component-heading-muted-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-heading-title-card-mini-font-size` | `<length>` | `1rem` |
| `--instui-component-heading-title-card-mini-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-regular-font-size` | `<length>` | `1.25rem` |
| `--instui-component-heading-title-card-regular-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-card-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-card-section-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-page-desktop-font-size` | `<length>` | `2.5rem` |
| `--instui-component-heading-title-page-desktop-font-weight` | `<integer>` | `700` |
| `--instui-component-heading-title-section-font-size` | `<length>` | `1.75rem` |
| `--instui-component-heading-title-section-font-weight` | `<integer>` | `700` |

## Relacionat

- [text](/ca/api/css/text.md) — Tipografia de cos per a text que no és de capçalera.

