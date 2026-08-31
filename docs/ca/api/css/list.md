# CSS: list

`.instui-list` — Una llista amb espaiat d'elements conduït per token.

Estableix el seu propi `padding-inline-start` per a la sagnia de la llista; encadenar un modificador d'utilitat d'espaiat `-p*`/`-padding*` substitueix aquest valor integrat. Mira el membre `list.item` per als elements individuals.

**Font:** [list.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/list/list.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/list.css";
```

## Examples

```html
<ul class="instui-list">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

## Structure

```text
.instui-list
  li (0..n)
```

```mermaid
flowchart TD
  n0[".instui-list"]:::cssdoc-root
  n1("li"):::cssdoc-part
  n0 -->|0..n| n1
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Modifiers

| Modifier        | Description                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `.-inline`      | Disposa els elements en línia (horitzontals).                                                                                 |
| `.-size-large`  | Gran. @affects list.item — Escala l'espaiat de l'element per coincidir. Àlies de forma llarga de `-size-lg`.                  |
| `.-size-lg`     | Gran. @affects list.item — Escala l'espaiat de l'element per coincidir.                                                       |
| `.-size-md`     | Mitjana (per defecte). @affects list.item — Escala l'espaiat de l'element per coincidir.                                      |
| `.-size-medium` | Mitjana (per defecte). @affects list.item — Escala l'espaiat de l'element per coincidir. Àlies de forma llarga de `-size-md`. |
| `.-size-sm`     | Petit. @affects list.item — Escala l'espaiat de l'element per coincidir.                                                      |
| `.-size-small`  | Petit. @affects list.item — Escala l'espaiat de l'element per coincidir. Àlies de forma llarga de `-size-sm`.                 |
| `.-unstyled`    | Elimina marcadors i farcit.                                                                                                   |

## Tokens consumed

| Token                                           | Type                                               | Value                                                                        |
| ----------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-list-item-color`            | `<color>`                                          | `light-dark(#273540, #ffffff)`                                               |
| `--instui-component-list-item-font-family`      | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-list-item-font-size-large`  | `<length>`                                         | `1.25rem`                                                                    |
| `--instui-component-list-item-font-size-medium` | `<length>`                                         | `1rem`                                                                       |
| `--instui-component-list-item-font-size-small`  | `<length>`                                         | `0.875rem`                                                                   |
| `--instui-component-list-item-font-weight`      | `<integer>`                                        | `400`                                                                        |
| `--instui-component-list-item-line-height`      | `<percentage>`                                     | `150%`                                                                       |
| `--instui-component-list-item-spacing-medium`   | `<length>`                                         | `1.5rem`                                                                     |
| `--instui-component-list-list-padding`          | `<length>`                                         | `2.25rem`                                                                    |

## Subcomponents

- [list.item](/ca/api/css/list.item.md)
