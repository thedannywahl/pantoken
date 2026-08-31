# CSS: popover

`.instui-popover` — En forhøjet overflade for et nativt `[popover]`, placeret med CSS-ankerpositionering.

Ankerpositionering er kun Chromium-baseret; `@supports`-beskyttelsen betyder, at `-placement-*` er stilfærdig inaktiv andetsteds, og UA centrerer popover'en i toplaget i stedet for at mislykkes.

**Kilde:** [popover.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/popover/popover.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/popover.css";
```

## Examples

```html
<div class="instui-popover -placement-bottom" id="pop-1">
  <div class="instui-heading -level-h4">Share this page</div>
  <p class="instui-text -size-sm">
    A popover is a lightweight surface anchored to a trigger. This one uses the native
    <code>popover</code> attribute.
  </p>
</div>
```

## Structure

```text
.instui-popover
  heading (component)
  text (component)
    code
```

```mermaid
flowchart TD
  n0[".instui-popover"]:::cssdoc-root
  n1(["heading"]):::cssdoc-component
  n2(["text"]):::cssdoc-component
  n3("code"):::cssdoc-part
  n0 --> n1
  n2 --> n3
  n0 --> n2
  click n1 "/api/css/heading.md"
  click n2 "/api/css/text.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier             | Description                                 |
| -------------------- | ------------------------------------------- |
| `.-placement-bottom` | Sid under ankeret.                          |
| `.-placement-end`    | Sid ved slutningen (inline-end) af ankeret. |
| `.-placement-start`  | Sid ved starten (inline-start) af ankeret.  |
| `.-placement-top`    | Sid over ankeret.                           |

## Conditions

| Type     | Query                                   | Description |
| -------- | --------------------------------------- | ----------- |
| supports | `(position-area: block-end)`            | —           |
| supports | `(transition-behavior: allow-discrete)` | —           |

## Tokens consumed

| Token                                             | Type                | Value                          |
| ------------------------------------------------- | ------------------- | ------------------------------ |
| `--instui-border-width-sm`                        | `<length>`          | `0.0625rem`                    |
| `--instui-color-background-elevated-surface-base` | `<color>`           | `light-dark(#ffffff, #171B21)` |
| `--instui-color-text-base`                        | `<color>`           | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-popover-border-color`         | `<color>`           | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-popover-border-radius`        | `<length>`          | `0.75rem`                      |
| `--instui-elevation-above`                        | `none \| <shadow>#` | —                              |
| `--instui-spacing-space-sm`                       | `<length>`          | `0.5rem`                       |

## Browser support

- Bruger CSS-ankerpositionering (`position-anchor`/`position-area`) og den native `[popover]` API, begge kun Chromium i dag; en `@supports`-beskyttelse holder placeringen inaktiv andetsteds, hvor UA centrerer popover'en i toplaget.

## Subcomponents

- [heading](/da/api/css/heading.md)
- [text](/da/api/css/text.md)

## Related

- [tooltip](/da/api/css/tooltip.md) — Et værktøjstip er en mindre, svæve- eller fokustrigger ankeroverf-lade.
- [context-view](/da/api/css/context-view.md) — Kontekstvisning er en relateret ankeroverf-lade med en markør.
