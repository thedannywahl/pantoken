# CSS: in-place-edit

`.instui-in-place-edit` — A [contenteditable] that reads as text until focused, then shows input chrome.

The input chrome only appears while focused; `-readonly` suppresses both the hover and focus affordances so the element always reads as plain inline text.

**Source:** [in-place-edit.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/in-place-edit/in-place-edit.css)

<!-- js-requirement -->
> [!TIP]
> **JS 향상** — This component's CSS renders and works on its own; pair it with `@pantoken/interactions` to add the interactive behavior. See the [modifier table below](#modifiers).


## 접근성

Give the editable element `role="textbox"` and an accessible name (`aria-label`).

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/in-place-edit.css";
```

## 데모

```demo
self:in-place-edit
```

## 예제들

```html
<span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-readonly` | Shown inline but not editable (no hover/focus affordance). |

## 사용된 토큰

| 토큰 | 타입 | 값 |
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

## 관련 항목

- [text-input](/ko/api/css/text-input.md) — On focus it shows the same input chrome as a text input.

