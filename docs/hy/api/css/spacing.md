# CSS: spacing

`.--p-md` — Մեծ և լցում օգտակար — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` և `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` բաց միջակայքի սանդղակի վրա (կողմեր `t`/`b`/`s`/`e`/`x`/`y` կամ ոչ, հիշել կարճ կամ լիովին երկար — օրինակ `--mb-sm` և `--margin-bottom-small` նույն կանոնն են; մեծարը նաև վերցնում է `auto`): Օգտագործելի բացատ կամ շղթայավորված ցանկացած բաղադրիչի վրա (օրինակ `class="instui-view --mb-sm"`):

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/spacing/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:spacing
```

## Examples

```html
<div class="--p-md --mt-lg">Padded box with a large top margin.</div>
```

## Modifiers

| Modifier  | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `.--p-md` | Կիրառում է միջին լցում բոլոր կողմերում:                           |
| `.--m*`   | Մեծի օգտակար կարճ, ժառանգային երկար և լիովին երկար հնչումներում:  |
| `.--p*`   | Լցում օգտակար կարճ, ժառանգային երկար և լիովին երկար հնչումներում: |

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
