# CSS: alert

`.instui-alert` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Ներքին հաղորդագրություն status գույնի շերտով և վիրտուալ status glyph-ով կիսված icon set-ից:

Հատուկ `-icon-&lt;name&gt;` փոխանակում է status glyph-ը բայց պահում է variant-ի գույնային շերտը; շերտի լցումը վերահաստատվում է ավելի բարձր specificity-ում այնպես, որ կիսված icon painter-ը այն չի օգտագործում:

**Աղբյուր.** [alert.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/alert/alert.css)

<!-- js-requirement -->

> [!TIP]
> **JS Enhancement** — Այս բաղադրիչի CSS-ը ցուցադրվում և աշխատում է ինքնուրույն՝ միացրեք այն `@pantoken/interactions`-ի հետ՝ ինտերակտիվ վարքածություն ավելացնելու համար: Դրա `-timeout` մոդիֆիկատորը որոշվում է այդ վարքածությամբ: Տես [մոդիֆիկատորի աղյուսակը ստորեւ](#modifiers):

## Accessibility

Կարևոր հաղորդագրության համար ավելացրեք `role="alert"` կամ `aria-live` տարածք, որպեսզի օժանդակ տեխնոլոգիան այն հայտարարի՝ փակման վերահսկիչը պիտակավորված փակ կոճակ է (օրինակում `.instui-close-button`-ը կրում է `aria-label="Close"`):

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/alert.css";
```

## Examples

-nocard

```html
<div class="instui-alert -icon-megaphone --mb-md">
  An alert with the default <code>info</code> color, and a custom icon.
</div>
<div class="instui-alert -color-success">
  Congratulations! You're using the "success" color.
  <button class="instui-close-button -size-sm" aria-label="Close"></button>
</div>
```

## Structure

```text
.instui-alert
  ‹content›
  close-button (component, 0..1)
```

```mermaid
flowchart TD
  n0[".instui-alert"]:::cssdoc-root
  n1[/"‹content›"/]:::cssdoc-slot
  n2(["close-button"]):::cssdoc-component
  n0 --> n1
  n0 -.->|0..1| n2
  click n2 "/api/css/close-button.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Slots

| Slot      | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| `content` | Տbradford-ի հաղորդագրության բովանդակությունը՝ մեջ կարող է լինել փակ կոճակ: |

## Modifiers

| Modifier                 | Description                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-color-danger`         | Սխալի հաղորդագրություն:                                                                                                                                                                                          |
| `.-color-info`           | Տեղեկատվական (լռելյայն):                                                                                                                                                                                         |
| `.-color-success`        | Դրական/հաստատման հաղորդագրություն:                                                                                                                                                                               |
| `.-color-warning`        | Զգուշական հաղորդագրություն:                                                                                                                                                                                      |
| `.-has-shadow-false`     | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-without-shadow`.                                                                                                                |
| `.-icon-*`               | Տեղադրեք վիճակի գլիֆը հատուկ պատկերով (օր. `-icon-megaphone`), պահված սպիտակ տարբերակի գունավոր բարին:                                                                                                           |
| `.-render-custom-icon-*` | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — The former `renderCustomIcon` prop; still works as an alias, but use `-icon-<name>` (or override `--pantoken-alert-glyph`) instead. |
| `.-screen-reader-only`   | Տեսողականորեն թաքցված բայց հայտարարված:                                                                                                                                                                          |
| `.-timeout`              | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — The alert will automatically dismiss after a default of 5 seconds.                                                  |
| `.-timeout-1`            | Մեկ վայրկյան ինքնաբերում բացակայության դեպքում:                                                                                                                                                                  |
| `.-timeout-2`            | Երկու վայրկյան ինքնաբերում բացակայության դեպքում:                                                                                                                                                                |
| `.-timeout-3`            | Երեք վայրկյան ինքնաբերում բացակայության դեպքում:                                                                                                                                                                 |
| `.-timeout-4`            | Չորս վայրկյան ինքնաբերում բացակայության դեպքում:                                                                                                                                                                 |
| `.-timeout-5`            | Հինգ վայրկյան ինքնաբերում բացակայության դեպքում:                                                                                                                                                                 |
| `.-variant-error`        | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-danger`.                                                                                                               |
| `.-variant-info`         | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-info`.                                                                                                                 |
| `.-variant-success`      | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-success`.                                                                                                              |
| `.-variant-warning`      | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-warning`.                                                                                                              |
| `.-without-shadow`       | Հեռացրեք լռելյայն բարձրացման ստվերը (InstUI `hasShadow={false}`):                                                                                                                                                |

## Pseudo-elements

| Pseudo-element | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `::after`      | Սպիտակ վիճակի գլիֆ, մասկավորված և կենտրոնացված բարի վրա:               |
| `::before`     | Պինդ տարբերակ-գունավոր վիճակի բար, թաղված կլորացված մեկնարկային եզրին: |

## Custom properties

| Property                   | Type        | Default | Description                                                                                                                        |
| -------------------------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-alert-glyph`   | `<url>`     | —       | Ցածր մակարդակի վիճակ-գլիֆ աղբյուր՝ `-icon-&lt;name&gt;` սահմանում է այն: Վերաձեւակերպեք հատուկ պատկերի համար (URL-կոդավորված SVG): |
| `--pantoken-alert-icon-bg` | `<color>`   | —       | Գունավոր վիճակի բարի լրացում գլիֆի հետևում՝ յուրաքանչյուր `-color-*` տարբերակ սահմանում է իր սեփականը:                             |
| `--timeout`                | `<integer>` | —       | Միլիվայրկյաններ ինքնաբերում բացակայության դեպքում՝ `0` անջատում է այն: Պահանջում է այլերտ ինտերակցիայի փաթեթ:                      |

## Tokens consumed

| Token                                                 | Type                                               | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-component-alert-background`                 | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-alert-border-radius`              | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-border-style`               | —                                                  | `solid`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--instui-component-alert-border-width`               | `<length>`                                         | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-alert-color`                      | `<color>`                                          | `light-dark(#273540, #ffffff)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-alert-content-font-family`        | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-alert-content-font-size`          | `<length>`                                         | `1rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--instui-component-alert-content-font-weight`        | `<integer>`                                        | `400`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--instui-component-alert-content-line-height`        | `<percentage>`                                     | `125%`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--instui-component-alert-content-padding-horizontal` | `<length>`                                         | `1.5rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--instui-component-alert-content-padding-vertical`   | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-danger-border-color`        | `<color>`                                          | `#E62429`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-danger-icon-background`     | `<color>`                                          | `#E62429`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-icon-color`                 | `<color>`                                          | `#ffffff`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-info-border-color`          | `<color>`                                          | `#2B7ABC`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-info-icon-background`       | `<color>`                                          | `#2B7ABC`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-success-border-color`       | `<color>`                                          | `#03893D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-success-icon-background`    | `<color>`                                          | `#03893D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-warning-border-color`       | `<color>`                                          | `#CF4A00`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-warning-icon-background`    | `<color>`                                          | `#CF4A00`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-base-button-medium-height`        | `<length>`                                         | `2.5rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--instui-elevation-above`                            | `none \| <shadow>#`                                | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--instui-icon-circle-check`                          | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m9%2012%202%202%204-4%22%2F%3E%3C%2Fsvg%3E')`                                                                                                   |
| `--instui-icon-circle-x`                              | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m15%209-6%206%22%2F%3E%3Cpath%20d%3D%22m9%209%206%206%22%2F%3E%3C%2Fsvg%3E')`                                                                   |
| `--instui-icon-info`                                  | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M12%2016v-4%22%2F%3E%3Cpath%20d%3D%22M12%208h.01%22%2F%3E%3C%2Fsvg%3E')`                                                                        |
| `--instui-icon-triangle-alert`                        | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%2F%3E%3Cpath%20d%3D%22M12%209v4%22%2F%3E%3Cpath%20d%3D%22M12%2017h.01%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs`                           | `<length>`                                         | `0.25rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--pantoken-glyph`                                    | `<url>`                                            | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Subcomponents

- [close-button](/hy/api/css/close-button.md)

## Related

- [close-button](/hy/api/css/close-button.md) — Փակ վերահսկիչ, որը ծանուցումը կարող է ներառել:
