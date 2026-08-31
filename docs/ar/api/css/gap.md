# CSS: gap

`.--gap-md` — أدوات Flex/grid `gap` على مقياس التباعد، تهجئة قصيرة (`--gap-sm`) أو طويلة (`--gap-small`). قابلة للاستخدام بشكل مستقل أو مربوطة بأي مكون (`.instui-view.--gap-sm`) — قد يتم تجاوز المكونات التي تعيّن بالفعل `gap` الخاص بها من رمز خاص بالمكون.

**المصدر:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:gap
```

## Examples

```html
<div class="--display-flex --gap-sm">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifiers

| Modifier    | Description                                             |
| ----------- | ------------------------------------------------------- |
| `.--gap-md` | يطبق رمز التباعد المتوسط كفجوة.                         |
| `.--gap-*`  | أدوات الفجوة عبر تهجئات خطوات التباعد القصيرة والطويلة. |

## Tokens consumed

| Token                                                         | Type       | Value      |
| ------------------------------------------------------------- | ---------- | ---------- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem`     |
| `--instui-spacing-space-lg`                                   | `<length>` | `1rem`     |
| `--instui-spacing-space-md`                                   | `<length>` | `0.75rem`  |
| `--instui-spacing-space-sm`                                   | `<length>` | `0.5rem`   |
| `--instui-spacing-space-xl`                                   | `<length>` | `1.5rem`   |
| `--instui-spacing-space-xs`                                   | `<length>` | `0.25rem`  |
| `--instui-spacing-space2xl`                                   | `<length>` | `2rem`     |
| `--instui-spacing-space2xs`                                   | `<length>` | `0.125rem` |
