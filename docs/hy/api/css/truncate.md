# CSS: truncate

`.--truncate` — Էլիպսիսի կտրումը տողի ցմահ վերահսկվում է `--lines`-ի կողմից — կարող է օգտագործվել մերկ կամ շղթայված ցանկացած բաղադրիչի հետ (`.instui-button.--truncate`):

Բազային դասը օգտագործում է `display: -webkit-box` և կարդում է `--lines` հատուկ հատկությունը՝ տեքստը ցմահ թվով տողերի համար, մինչ այն ավարտվի էլիպսիսով:

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->
> [!TIP]
> **JS պահանջ** — Այս բաղադրիչը չի ունի իր սեփական CSS-ը — դրա նշումը և վարքը ամբողջապես գալիս են `@pantoken/interactions`-ից: Դրա `--max-lines-auto` փոփոխիչը վարվում է այդ վարքի կողմից: Տես ստորև գտնվող [փոփոխիչների աղյուսակը](#modifiers):


## Օգտագործում

```css
@import "@pantoken/components/utilities.css";
```

## Օրինակներ

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">This text is clamped to three lines and ends in an ellipsis.</div>
<button class="instui-button --truncate">…</button>
```

## Մոդիֆիկատորներ

| Մոդիֆիկատոր | Նկարագիր |
| --- | --- |
| `.--lines-1` | `--max-lines-1`-ի փոխանունը: |
| `.--lines-2` | `--max-lines-2`-ի փոխանունը: |
| `.--lines-3` | `--max-lines-3`-ի փոխանունը: |
| `.--lines-4` | `--max-lines-4`-ի փոխանունը: |
| `.--lines-5` | `--max-lines-5`-ի փոխանունը: |
| `.--max-lines-1` | Ցմահ մեկ տողի համար (լռելյայն): |
| `.--max-lines-2` | Ցմահ երկու տողի համար: |
| `.--max-lines-3` | Ցմահ երեք տողի համար: |
| `.--max-lines-4` | Ցմահ չորս տողի համար: |
| `.--max-lines-5` | Ցմահ հինգ տողի համար: |
| `.--max-lines-auto` | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate` | Կիրառում է կտրումն ու տողի ցմահը թիրախային տարրի վրա: |
| `.--truncate-character` | (լռելյայն) Կտրել նիշերի մակարդակում: |
| `.--truncate-word` | Կտրել բառերի մակարդակում: |

## Անհատական հատկություններ

| Առանձնահատկություն | Տիպ | Ընթացիկ | Նկարագիր |
| --- | --- | --- | --- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | — |
| `--lines` | `<integer>` | `1` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base` | `<percentage>` | `150%` |

## Բրաուզերի աջակցություն

- Ցմահը հիմնված է `-webkit-line-clamp`-ի վրա ``display: -webkit-box``-ի հետ, զուգակցված ստանդարտ `line-clamp`-ի հետ:

## Ավելին կապված

- [text](/hy/api/css/text.md) — Մարմնի տիպոգրաֆիա, որը սա կտրում է:

