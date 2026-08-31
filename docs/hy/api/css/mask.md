# CSS: mask

`.instui-mask` — Հոսքային վերլապ, որը լրացնում է իր դիրքավորված ծնողին և կենտրոնացնում է դրա բովանդակությունը — օրինակ, կոճղ քարտի վրա: Մոդալի համար նախընտրեք բնական `&lt;dialog&gt;` (դրա `::backdrop`-ը մեսկն է): Այս փոփոխիչներից յուրաքանչյուրն առկա է նաև գլոբալ (բաց կամ շղթայված ցանկացած այլ բաղադրիչի վրա) — տե՛ս `mask` գլոբալ կոմունալ:

**Աղբյուր:** [mask.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/mask/mask.css)

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/mask.css";
```

## Examples

```html
<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>
```

## Modifiers

| Modifier       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `.-blur`       | Փոշոտել մեսկի ետևում գտնվածը backdrop-filter-ով:       |
| `.-fullscreen` | Ամրագրված viewport-ին, այն ծածկում է բարձր z-index-ով: |

## Tokens consumed

| Token                                      | Type      | Value                                                     |
| ------------------------------------------ | --------- | --------------------------------------------------------- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |
