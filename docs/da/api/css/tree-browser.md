# CSS: tree-browser

`.instui-tree-browser` — Et åbenbaringstræ med indlejrede samlinger og bladposter med roterende chevrons.

Hver samling er et oprindeligt `&lt;details&gt;`; indlejring af dem i hinanden bygger træet, og browseren håndterer åbning og lukning af hver gren.

**Kilde:** [tree-browser.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/tree-browser/tree-browser.css)

## Accessibility

Mærk roden med role="tree" og hver indlejret liste med role="group".

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tree-browser.css";
```

## Examples

```html
<div class="instui-tree-browser" role="tree">
  <details open>
    <summary><span class="instui-icon -icon-folder"></span> Course files</summary>
    <ul role="group">
      <li>
        <a class="item" href="#"><span class="instui-icon -icon-file-text"></span> Syllabus.pdf</a>
      </li>
      <li>
        <details>
          <summary><span class="instui-icon -icon-folder"></span> Week 1</summary>
          <ul role="group">
            <li>
              <a class="item -selected" href="#"
                ><span class="instui-icon -icon-file-text"></span> Reading.pdf</a
              >
            </li>
            <li>
              <a class="item" href="#"
                ><span class="instui-icon -icon-file-text"></span> Slides.pptx</a
              >
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a class="item" href="#"><span class="instui-icon -icon-file-text"></span> Rubric.docx</a>
      </li>
    </ul>
  </details>
</div>
```

## Structure

```text
.instui-tree-browser
  details
    summary
      [class*="-icon-"] (0..1)
    ul
      li
        side-nav-bar.item (component)
          [class*="-icon-"] (0..1)
```

```mermaid
flowchart TD
  n0[".instui-tree-browser"]:::cssdoc-root
  n1("details"):::cssdoc-part
  n2("summary"):::cssdoc-part
  n3("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n4("ul"):::cssdoc-part
  n5("li"):::cssdoc-part
  n6(["side-nav-bar.item"]):::cssdoc-component
  n7("[class*=&quot;-icon-&quot;]"):::cssdoc-part
  n2 -.->|0..1| n3
  n1 --> n2
  n6 -.->|0..1| n7
  n5 --> n6
  n4 --> n5
  n1 --> n4
  n0 --> n1
  click n6 "/api/css/side-nav-bar.item.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier       | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `.-icon-*`     | Gengivelse af mappe/fil glyf-ikoner i opsummeringer og bladposter. |
| `.-size-large` | Stor. Langt-form alias af `-size-lg`.                              |
| `.-size-lg`    | Stor.                                                              |
| `.-size-sm`    | Lille.                                                             |
| `.-size-small` | Lille. Langt-form alias af `-size-sm`.                             |

## Parts

| Part    | Description             |
| ------- | ----------------------- |
| `.item` | En bladindgang i træet. |

## Pseudo-elements

| Pseudo-element | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| `::before`     | Tegner hver samlings åbenbaringschevron, en maskeret glyf, der roterer for at pege ned, når grenen er åben. |

## States

| State          | Description |
| -------------- | ----------- |
| `:state(open)` | —           |

## Tokens consumed

| Token                                                                   | Type                                               | Value                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-component-tree-browser-border-radius`                         | `<length>`                                         | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-tree-browser-tree-button-base-spacing-large`        | `<length>`                                         | `1rem`                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-tree-browser-tree-button-base-spacing-medium`       | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-tree-browser-tree-button-base-spacing-small`        | `<length>`                                         | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-tree-browser-tree-button-border-radius`             | `<length>`                                         | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-tree-browser-tree-button-hover-background-color`    | `<color>`                                          | `light-dark(#1D354F, #EEF4FD)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-tree-browser-tree-button-hover-text-color`          | `<color>`                                          | `light-dark(#ffffff, #1C222B)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-tree-browser-tree-button-icons-margin-right-medium` | `<length>`                                         | `0.5rem`                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-tree-browser-tree-button-name-font-size-large`      | `<length>`                                         | `1rem`                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-tree-browser-tree-button-name-font-size-medium`     | `<length>`                                         | `0.875rem`                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-tree-browser-tree-button-name-font-size-small`      | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-tree-browser-tree-button-name-text-color`           | `<color>`                                          | `light-dark(#2369A4, #7FB4F1)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-tree-browser-tree-button-selected-background-color` | `<color>`                                          | `light-dark(#4A5B68, #576773)`                                                                                                                                                                                                                                                                                                                                            |
| `--instui-component-tree-browser-tree-button-selected-text-color`       | `<color>`                                          | `#ffffff`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-tree-browser-tree-button-text-line-height`          | `<percentage>`                                     | `125%`                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-tree-browser-tree-collection-base-spacing-medium`   | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                 |
| `--instui-component-tree-browser-tree-collection-font-family`           | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif`                                                                                                                                                                                                                                                                                              |
| `--instui-icon-chevron-right`                                           | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m9%2018%206-6-6-6%22%2F%3E%3C%2Fsvg%3E')` |

## Subcomponents

- [side-nav-bar.item](/da/api/css/side-nav-bar.item.md)

## Related

- [menu](/da/api/css/menu.md) — Begge præsenterer indlejrede, valgbare elementer.
