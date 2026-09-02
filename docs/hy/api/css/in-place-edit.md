# CSS: in-place-edit

`.instui-in-place-edit` — [contenteditable], որ կարդացվում է որպես տեքստ մինչև կենտրոնանալը, այնուհետև ցուցադրում է մուտքի ինտերֆեյս:

Մուտքի ինտերֆեյսը հայտնվում է միայն կենտրոնացած վիճակում. `-readonly`-ը խոնարհում է թե՛ hover-ի, թե՛ focus-ի ազդեցությունները, ուստի տարրը միշտ կարդացվում է որպես պարզ ինլայն տեքստ:

**Աղբյուր:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->
> [!TIP]
> **JS բարելավում** — Այս բաղադրիչի CSS-ը ցուցադրվում և աշխատում է ինքնուրույն՝ միացրեք այն `@pantoken/interactions`-ի հետ՝ ինտերակտիվ վարքածություն ավելացնելու համար: Տես [մոդիֆիկատորի աղյուսակը ստորեւ](#modifiers):


## Մուտքականություն

Տվեք խմբագիր տարրին `role="textbox"` և մատչելի անուն (`aria-label`):

## Օգտագործում

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## Դեմո

```demo
self:in-place-edit
```

## Օրինակներ

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.-readonly` | Ցուցադրվում է տողի մեջ, բայց խմբագրելի չէ (առանց hover/focus հնարավորության): |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
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

## Ավելին կապված

- [text-input](/hy/api/css/text-input.md) — Ֆոկուսի ժամանակ այն ցուցադրում է նույն մուտքի chrome-ը, ինչպես text input-ը:

