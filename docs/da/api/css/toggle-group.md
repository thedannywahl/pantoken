# CSS: toggle-group

`.instui-toggle-group` — En afgrænsed åbenbaring bygget på `&lt;details&gt;`: en chevron-opsummeringsrække og sammenfaldbart indhold.

Bygget på det samme oprindelige `&lt;details&gt;` fundament som toggle-details; placer `&lt;summary&gt;` først, så det bliver den klikbare headerrække, og resten er det sammenfaldbare indhold.

**Kilde:** [toggle-group.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/toggle-group/toggle-group.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/toggle-group.css";
```

## Examples

```html
<details class="instui-toggle-group" open>
  <summary>Advanced settings</summary>
  <div>
    These options are revealed when the group is expanded. The header row carries a chevron that
    rotates on open, and the content sits below a divider.
  </div>
</details>
```

## Structure

```text
.instui-toggle-group
  summary
  div
```

```mermaid
flowchart TD
  n0[".instui-toggle-group"]:::cssdoc-root
  n1("summary"):::cssdoc-part
  n2("div"):::cssdoc-part
  n0 --> n1
  n0 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier           | Description                            |
| ------------------ | -------------------------------------- |
| `.-size-large`     | Stor. Langt-form alias af `-size-lg`.  |
| `.-size-lg`        | Stor.                                  |
| `.-size-sm`        | Lille.                                 |
| `.-size-small`     | Lille. Langt-form alias af `-size-sm`. |
| `.-without-border` | Fjern kanten.                          |

## Pseudo-elements

| Pseudo-element | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `::before`     | Tegner opsummeringsrækkes åbenbaringschevron, en maskeret glyf, der roterer for at pege ned, når gruppen er åben. |

## States

| State          | Description |
| -------------- | ----------- |
| `:state(open)` | —           |

## Tokens consumed

| Token                                                      | Type                                               | Value                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-border-radius-md`                                | `<length>`                                         | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-border-width-sm`                                 | `<length>`                                         | `0.0625rem`                                                                                                                                                                                                                                                                                                                                                               |
| `--instui-color-background-elevated-surface-base`          | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-toggle-details-content-padding-large`  | `<length>`                                         | `1.375rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-toggle-details-content-padding-medium` | `<length>`                                         | `1.125rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-toggle-details-content-padding-small`  | `<length>`                                         | `1.125rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-toggle-details-font-family`            | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif`                                                                                                                                                                                                                                                                                              |
| `--instui-component-toggle-details-font-size-large`        | `<length>`                                         | `1.25rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-toggle-details-font-size-medium`       | `<length>`                                         | `1rem`                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-toggle-details-font-size-small`        | `<length>`                                         | `0.875rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-toggle-details-font-weight`            | `<integer>`                                        | `400`                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-toggle-details-icon-margin`            | `<length>`                                         | `0.375rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-toggle-details-line-height`            | `<percentage>`                                     | `150%`                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-toggle-details-text-color`             | `<color>`                                          | `light-dark(#273540, #ffffff)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-toggle-group-border-color`             | `<color>`                                          | `light-dark(#8D959F, #6A7883)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-icon-chevron-right`                              | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')` |

## Related

- [toggle-details](/da/api/css/toggle-details.md) — Den enkelt, afgrænsningsfri form af samme åbenbaring.
