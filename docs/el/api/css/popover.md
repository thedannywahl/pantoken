# CSS: popover

`.instui-popover` — An elevated surface for a native `[popover]`, positioned with CSS anchor positioning.

Anchor positioning is Chromium-only; the `@supports` guard means `-placement-*` is silently inert elsewhere and the UA centers the popover in the top layer instead of failing.

**Source:** [popover.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/popover/popover.css)

## Χρήση

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/popover.css";
```

## Παραδείγματα

```html
<div class="instui-popover -placement-bottom" id="pop-1">
  <div class="instui-heading -level-h4">Share this page</div>
  <p class="instui-text -size-sm">A popover is a lightweight surface anchored to a trigger. This one uses the native <code>popover</code> attribute.</p>
</div>
```

## Δομή

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

## Τροποποιητές

| Τροποποιητής | Περιγραφή |
| --- | --- |
| `.-placement-bottom` | Sit below the anchor. |
| `.-placement-end` | Sit at the end (inline-end) of the anchor. |
| `.-placement-start` | Sit at the start (inline-start) of the anchor. |
| `.-placement-top` | Sit above the anchor. |

## Συνθήκες

| Τύπος | Ερώτημα | Περιγραφή |
| --- | --- | --- |
| supports | `(position-area: block-end)` | — |
| supports | `(transition-behavior: allow-discrete)` | — |

## Καταναλωμένα tokens

| Token | Τύπος | Τιμή |
| --- | --- | --- |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-elevated-surface-base` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-popover-border-color` | `<color>` | `light-dark(#8D959F, #6A7883)` |
| `--instui-component-popover-border-radius` | `<length>` | `0.75rem` |
| `--instui-elevation-above` | `none \| <shadow>#` | — |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |

## Υποστήριξη προγράμματος περιήγησης

- Uses CSS anchor positioning (`position-anchor`/`position-area`) and the native `[popover]` API, both Chromium-only today; an `@supports` guard keeps the placement inert elsewhere, where the UA centres the popover in the top layer.

## Υποσυστατικά

- [heading](/el/api/css/heading.md)
- [text](/el/api/css/text.md)

## Σχετιζόμενα

- [tooltip](/el/api/css/tooltip.md) — A tooltip is a smaller, hover- or focus-triggered anchored surface.
- [context-view](/el/api/css/context-view.md) — Context view is a related anchored surface with a pointer.

