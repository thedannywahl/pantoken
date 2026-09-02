# CSS: stacking

`.--stack-topmost` — z-index խորություն օգտակար — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — օգտագործելի բացատ կամ շղթայավորված ցանկացած բաղադրիչի վրա, որպեսզի շերտերը պետք է կանխատեսելի փոխարեն ձեռքով կարգավորված թվերի:

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## Օգտագործում

```css
@import "@pantoken/components/utilities.css";
```

## Օրինակներ

```html
<div class="--stack-topmost">Always on top.</div>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.--stack-above` | Լռ հոսքից վեր: |
| `.--stack-below` | Լռ հոսքից ցածր: |
| `.--stack-deepest` | Ամենացածր պետք խորությունը: |
| `.--stack-topmost` | Ամենաբարձր պետք խորությունը (վերածածկեր, մենյուներ): |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-view-stacking-above` | `<integer>` | `1` |
| `--instui-component-view-stacking-below` | `<integer>` | `-1` |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999` |

