# CSS: maskglobal

`.--mask-overlay` — `mask` բաղադրիչի վերլապ փոփոխիչների գլոբալ, երկակի պատճեն — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — օգտագործելի բաց կամ շղթայված ցանկացած բաղադրիչի վրա, առանց `.instui-mask` տարրի մեջ փաթաթելու:

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/mask/index.ts)

## Օգտագործում

```css
@import "@pantoken/components/utilities.css";
```

## Օրինակներ

```html
<button class="instui-button --mask-overlay">…</button>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.--mask-blur` | Փոշոտել մեսկի ետևում գտնվածը backdrop-filter-ով: |
| `.--mask-fullscreen` | Ամրագրված viewport-ին, այն ծածկում է բարձր z-index-ով: |
| `.--mask-overlay` | Ամբողջական մեսկ վերլապ (դիրք, կենտրոնացում, ֆոն): |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-mask-background-color` | `<color>` | `light-dark(rgba(255,255,255,0.75), rgba(28,34,43,0.75))` |

