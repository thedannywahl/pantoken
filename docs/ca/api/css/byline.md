# CSS: byline

`.instui-byline` — Un objecte multimèdia: una figura destacada al costat d'un títol i una descripció.

Estableix el seu propi `gap` entre la figura i el bloc de text; encadenar un modificador `-gap-*` d'utilitat d'espaiat substitueix aquest valor integrat.

**Font:** [byline.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/byline/byline.css)

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/byline.css";
```

## Exemples

```html
<div class="instui-byline -size-md">
  <span class="instui-icon -icon-megaphone"></span>
  <div>
    <div class="title">What's new</div>
    <div class="description">The figure can be any leading visual — an icon, an avatar, or an image.</div>
  </div>
</div>
```

## Estructura

```text
.instui-byline
  [class*="-icon-"] (0..1)
  div
    .title
    .description
```

```mermaid
flowchart TD
  n0[".instui-byline"]:::cssdoc-root
  n1("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n2("div"):::cssdoc-part
  n3(".title"):::cssdoc-part
  n4(".description"):::cssdoc-part
  n0 -.->|0..1| n1
  n2 --> n3
  n2 --> n4
  n0 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-align-content-center` | Centra verticalment el text al costat del heroi. |
| `.-align-content-top` | Alinea el text a la part superior del heroi. |
| `.-icon-*` | Representa una icona de glifo inicial abans del bloc de text. |
| `.-size-large` | Gran. Àlias de forma llarga de `-size-lg`. |
| `.-size-lg` | Gran. |
| `.-size-md` | Mitjà. |
| `.-size-medium` | Mitjà. Pseudònim de forma llarga de `-size-md`. |
| `.-size-sm` | Petit. |
| `.-size-small` | Petit. Àlias de forma llarga de `-size-sm`. |

## Parts

| Part | Descripció |
| --- | --- |
| `.description` | El text del cos de suport. |
| `.title` | El text de l'encapçalament. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-byline-background` | `<color>` | `#00000000` |
| `--instui-component-byline-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-byline-description-font-size` | `<length>` | `1rem` |
| `--instui-component-byline-description-font-weight` | `<integer>` | `400` |
| `--instui-component-byline-description-line-height` | `<percentage>` | `125%` |
| `--instui-component-byline-figure-margin` | `<length>` | `0.75rem` |
| `--instui-component-byline-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-byline-large` | `<length>` | `62em` |
| `--instui-component-byline-medium` | `<length>` | `48em` |
| `--instui-component-byline-small` | `<length>` | `30em` |
| `--instui-component-byline-title-font-size` | `<length>` | `1.375rem` |
| `--instui-component-byline-title-font-weight` | `<integer>` | `600` |
| `--instui-component-byline-title-line-height` | `<length>` | `1.25rem` |
| `--instui-component-byline-title-margin` | `<length>` | `0 0 0.5rem 0` |

## Suport del navegador

- Conté els seus estils d'element amb la regla `@scope` de CSS; necessita un Chromium, Firefox o Safari recent.

