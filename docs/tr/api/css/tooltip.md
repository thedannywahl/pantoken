# CSS: tooltip

`.instui-tooltip` — A CSS hover and focus tooltip bubble, positionable on any side.

Toggling is pure CSS (`:hover`/`:focus-within`), so the bubble only reaches keyboard users through a focusable trigger; unlike `popover`, it isn't dismissible or click-triggered.

**Source:** [tooltip.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/tooltip/tooltip.css)

<!-- js-requirement -->
> [!TIP]
> **JS İyileştirmesi** — This component's CSS renders and works on its own; pair it with `@pantoken/interactions` to add the interactive behavior. See the [modifier table below](#modifiers).


## Erişilebilirlik

Point the trigger at the bubble with aria-describedby and give the bubble role="tooltip".

## Kullanım

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tooltip.css";
```

## Örnekler

```html
<span class="instui-tooltip" aria-describedby="tt-1">
  <span class="instui-icon -icon-info"></span>
  <span class="tip" id="tt-1" role="tooltip">Default placement is top</span>
</span>
```

## Yapı

```text
.instui-tooltip
  [class*="-icon-"] (0..1)
  .tip
```

```mermaid
flowchart TD
  n0[".instui-tooltip"]:::cssdoc-root
  n1("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n2(".tip"):::cssdoc-part
  n0 -.->|0..1| n1
  n0 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Değiştiriciler

| Değiştirici | Açıklama |
| --- | --- |
| `.-icon-*` | Render a trigger glyph icon next to the tooltip bubble. |

## Bölümler

| Parça | Açıklama |
| --- | --- |
| `.tip` | The bubble; `-placement-*` sets its side. |

## Tüketilen tokenler

| Token | Tür | Değer |
| --- | --- | --- |
| `--instui-border-radius-sm` | `<length>` | `0.25rem` |
| `--instui-color-background-inverse` | `<color>` | `light-dark(#334450, #F2F4F5)` |
| `--instui-color-text-inverse` | `<color>` | `light-dark(#ffffff, #1C222B)` |
| `--instui-component-tooltip-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-tooltip-font-size` | `<length>` | `0.875rem` |
| `--instui-component-tooltip-font-weight` | `<integer>` | `400` |
| `--instui-component-tooltip-padding` | `<length>` | `0.75rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |

## İlgili

- [popover](/tr/api/css/popover.md) — The larger, click-triggered anchored surface.
- [context-view](/tr/api/css/context-view.md) — A related anchored surface with a pointer.

