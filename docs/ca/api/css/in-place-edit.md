# CSS: in-place-edit

`.instui-in-place-edit` — Un [contenteditable] que es llegeix com a text fins que rep el focus, llavors mostra l'entrada chrome.

L'entrada chrome només apareix mentre està enfocada; `-readonly` suprimeix tant les afordances de desplaçament com de focus perquè l'element sempre es llegeixi com a text en línia simple.

**Font:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->
> [!TIP]
> **Millora JS** — El CSS d'aquest component es representa i funciona per si sol; emparella'l amb `@pantoken/interactions` per afegir el comportament interactiu. Mira la [taula de modificadors a continuació](#modifiers).


## Accessibilitat

Dona a l'element editable `role="textbox"` i un nom accessible (`aria-label`).

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## Demo

```demo
self:in-place-edit
```

## Exemples

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-readonly` | Es mostra en línia però no editable (sense affordança de sospesa/focus). |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-background-muted` | `<color>` | `light-dark(#F2F4F5, #273540)` |
| `--instui-color-text-base` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-text-input-background-color` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-text-input-border-color` | `<color>` | `light-dark(#7E8792, #5F6E7A)` |
| `--instui-component-text-input-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-text-input-border-width` | `<length>` | `0.0625rem` |
| `--instui-focus-outline-color` | `auto \| <color>` | — |
| `--instui-focus-outline-offset` | `<length>` | — |
| `--instui-focus-outline-style` | `auto \| <outline-line-style>` | — |
| `--instui-focus-outline-width` | `<line-width>` | — |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

## Relacionat

- [text-input](/ca/api/css/text-input.md) — En enfocar, mostra la mateixa cromadura d'entrada que una entrada de text.

