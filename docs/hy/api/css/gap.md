# CSS: gap

`.--gap-md` — Flex/grid `gap` կոմունալներ տարածության սանդղակի վրա, կարճ (`--gap-sm`) կամ երկար (`--gap-small`) ուղղագրություն: Օգտագործելի բաց կամ շղթայակցված ցանկացած բաղադրիչի (`.instui-view.--gap-sm`) — բաղադրիչներ, որոնք արդեն սահմանել են իրենց սեփական `gap` բաղադրիչ-հատուկ նշանից կարող են անտեսել:

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

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

| Modifier    | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `.--gap-md` | Կիրառում է միջին շարտի հեռավորության տոկենը որպես բացատ:             |
| `.--gap-*`  | Բացատի հատկությունները կարճ և երկար հեռավորության-քայլի ձևերի համար: |

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
