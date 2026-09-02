# CSS: file-drop

`.instui-file-drop` — Una zona de desplegament de fitxers amb estats de desplaçament, acceptat i rebutjat.

Les classes `-hover`/`-accepted`/`-rejected` són purament visuals — la detecció real de arrossega i deixa i la validació de fitxers són JS del consumidor per connectar al voltant de l'entrada nativa embolcallada.

**Font:** [file-drop.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/file-drop/file-drop.css)

## Accessibilitat

Encapsula un `<input type="file">` natiu a la zona de desplegament `&lt;label&gt;` perquè es mantingui com un control de fitxer real i etiquetat que el teclat i la tecnologia d'assistència puguin operar.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/file-drop.css";
```

## Exemples

```html
<label class="instui-file-drop" id="fd">
  <span class="instui-icon -icon-cloud-upload"></span>
  <div class="instui-text"><strong>Drag an image here</strong>, or click to browse.</div>
  <div class="instui-text -size-sm instui-fg-muted" id="fd-msg">PNG or JPG up to 5&nbsp;MB.</div>
  <input type="file" id="fd-input">
</label>
```

## Estructura

```text
.instui-file-drop
  [class*="-icon-"] (0..1)
  text (component)
    strong
  text (component)
  input
```

```mermaid
flowchart TD
  n0[".instui-file-drop"]:::cssdoc-root
  n1("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n2(["text"]):::cssdoc-component
  n3("strong"):::cssdoc-part
  n4(["text"]):::cssdoc-component
  n5("input"):::cssdoc-part
  n0 -.->|0..1| n1
  n2 --> n3
  n0 --> n2
  n0 --> n4
  n0 --> n5
  click n2 "/api/css/text.md"
  click n4 "/api/css/text.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-accepted` | Estat d'arrossegament per a un fitxer acceptable. |
| `.-hover` | Estat de desplaçament o arrossegament. |
| `.-icon-*` | Representa el glyph icon de la zona de desplegament principal. |
| `.-rejected` | Estat d'arrossegament per a un fitxer rebutjat. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-file-drop-accepted-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-file-drop-background-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-file-drop-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-file-drop-border-radius` | `<length>` | `1rem` |
| `--instui-component-file-drop-border-style` | — | `dashed` |
| `--instui-component-file-drop-border-width` | `<length>` | `0.0625rem` |
| `--instui-component-file-drop-hover-border-color` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-file-drop-rejected-color` | `<color>` | `light-dark(#CF1F24, #F56050)` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |

## Subcomponents

- [text](/ca/api/css/text.md)

