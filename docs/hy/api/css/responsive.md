# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — Դիտման պատուհան- կամ տարայի-լայնություն ցուցադրել/թաքցնել դասեր պետք թեմայական բեկում սանդղակ:

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` թաքցնել դիտման պատուհան լայնության վերլուծական; `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` հակադարձ են (թաքցված լռելյայն, ցուցադրված միայն տիրույթի մեջ `display: revert` միջոցով); `-cq-` տարբերակները արձագանք վերերի `.instui-container` լայնության, ոչ թե դիտման պատուհանի: Սանդղակ շերտերը `xs`/`sm`/`md`/`lg`/`xl` (արմատ ներառյալ IR-ի տրե-լայնություն բաղադրիչ խմբերը) տարբերակ հայտնի են երկար-ձեւ ուղղագրմամբ (`x-small`–`x-large`) և սարք անունով (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — երկուսն էլ հինավուրց հանվել կարճ անունի օգտին — պլյուս չսանդղակված, թեմայական `content`/`content-full-width` շերտերը (հիմնական բովանդակության տարածքի մեծ-լայնություն):

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
<div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
```

## Modifiers

| Modifier                             | Description                                                                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-cq-hidden-max-content`            | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `content` (`68.75em`):                                                                                              |
| `.-cq-hidden-max-content-full-width` | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `content-full-width` (`98.75em`):                                                                                   |
| `.-cq-hidden-max-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                                  |
| `.-cq-hidden-max-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                                  |
| `.-cq-hidden-max-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                                  |
| `.-cq-hidden-max-lg`                 | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `lg` (`48em`):                                                                                                      |
| `.-cq-hidden-max-md`                 | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `md` (`30em`):                                                                                                      |
| `.-cq-hidden-max-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                                  |
| `.-cq-hidden-max-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                                  |
| `.-cq-hidden-max-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                                  |
| `.-cq-hidden-max-sm`                 | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `sm` (`20em`):                                                                                                      |
| `.-cq-hidden-max-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                                  |
| `.-cq-hidden-max-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                                  |
| `.-cq-hidden-max-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                                  |
| `.-cq-hidden-max-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                                  |
| `.-cq-hidden-max-xl`                 | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `xl` (`62em`):                                                                                                      |
| `.-cq-hidden-max-xs`                 | Թաքցնել, երբ նշված տարայը բեկում վերն է կամ ցածր `xs` (`16em`):                                                                                                      |
| `.-cq-hidden-min-content`            | Թաքցնել, երբ նշված տարայը բեկում վերը կամ բարձր `content` (`68.75em`):                                                                                               |
| `.-cq-hidden-min-content-full-width` | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `content-full-width` անցման կետի (`98.75em`):                                                                       |
| `.-cq-hidden-min-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                                  |
| `.-cq-hidden-min-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                                  |
| `.-cq-hidden-min-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                                  |
| `.-cq-hidden-min-lg`                 | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `lg` անցման կետի (`48em`):                                                                                          |
| `.-cq-hidden-min-md`                 | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `md` անցման կետի (`30em`):                                                                                          |
| `.-cq-hidden-min-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                                  |
| `.-cq-hidden-min-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                                  |
| `.-cq-hidden-min-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                                  |
| `.-cq-hidden-min-sm`                 | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `sm` անցման կետի (`20em`):                                                                                          |
| `.-cq-hidden-min-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                                  |
| `.-cq-hidden-min-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                                  |
| `.-cq-hidden-min-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                                  |
| `.-cq-hidden-min-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                                  |
| `.-cq-hidden-min-xl`                 | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `xl` անցման կետի (`62em`):                                                                                          |
| `.-cq-hidden-min-xs`                 | Թաքցնել, երբ նշված տարայրը գտնվում է կամ վերևում `xs` անցման կետի (`16em`):                                                                                          |
| `.-cq-show-max-content`              | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `content` անցման կետի (`68.75em`); թաքցված հակառակ դեպքում:                                                      |
| `.-cq-show-max-content-full-width`   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `content-full-width` անցման կետի (`98.75em`); թաքցված հակառակ դեպքում:                                           |
| `.-cq-show-max-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                                    |
| `.-cq-show-max-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                                    |
| `.-cq-show-max-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                                    |
| `.-cq-show-max-lg`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `lg` անցման կետի (`48em`); թաքցված հակառակ դեպքում:                                                              |
| `.-cq-show-max-md`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `md` անցման կետի (`30em`); թաքցված հակառակ դեպքում:                                                              |
| `.-cq-show-max-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                                    |
| `.-cq-show-max-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                                    |
| `.-cq-show-max-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                                    |
| `.-cq-show-max-sm`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `sm` անցման կետի (`20em`); թաքցված հակառակ դեպքում:                                                              |
| `.-cq-show-max-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                                    |
| `.-cq-show-max-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                                    |
| `.-cq-show-max-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                                    |
| `.-cq-show-max-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                                    |
| `.-cq-show-max-xl`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `xl` անցման կետի (`62em`); թաքցված հակառակ դեպքում:                                                              |
| `.-cq-show-max-xs`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ ներքևում `xs` անցման կետի (`16em`); թաքցված հակառակ դեպքում:                                                              |
| `.-cq-show-min-content`              | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `content` անցման կետի (`68.75em`); թաքցված հակառակ դեպքում:                                                       |
| `.-cq-show-min-content-full-width`   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `content-full-width` անցման կետի (`98.75em`); թաքցված հակառակ դեպքում:                                            |
| `.-cq-show-min-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                                    |
| `.-cq-show-min-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                                    |
| `.-cq-show-min-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                                    |
| `.-cq-show-min-lg`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `lg` անցման կետի (`48em`); թաքցված հակառակ դեպքում:                                                               |
| `.-cq-show-min-md`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `md` անցման կետի (`30em`); թաքցված հակառակ դեպքում:                                                               |
| `.-cq-show-min-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                                    |
| `.-cq-show-min-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                                    |
| `.-cq-show-min-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                                    |
| `.-cq-show-min-sm`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `sm` անցման կետի (`20em`); թաքցված հակառակ դեպքում:                                                               |
| `.-cq-show-min-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                                    |
| `.-cq-show-min-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                                    |
| `.-cq-show-min-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                                    |
| `.-cq-show-min-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                                    |
| `.-cq-show-min-xl`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `xl` անցման կետի (`62em`); թաքցված հակառակ դեպքում:                                                               |
| `.-cq-show-min-xs`                   | Ցույց տալ, երբ նշված տարայրը գտնվում է կամ վերևում `xs` անցման կետի (`16em`); թաքցված հակառակ դեպքում:                                                               |
| `.-hidden-max-content`               | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `content` անցման կետի (`68.75em`):                                                                                     |
| `.-hidden-max-content-full-width`    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `content-full-width` անցման կետի (`98.75em`):                                                                          |
| `.-hidden-max-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                                     |
| `.-hidden-max-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                                     |
| `.-hidden-max-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                                     |
| `.-hidden-max-lg`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `lg` անցման կետի (`48em`):                                                                                             |
| `.-hidden-max-md`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `md` անցման կետի (`30em`):                                                                                             |
| `.-hidden-max-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                                     |
| `.-hidden-max-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                                     |
| `.-hidden-max-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                                     |
| `.-hidden-max-sm`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `sm` անցման կետի (`20em`):                                                                                             |
| `.-hidden-max-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                                     |
| `.-hidden-max-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                                     |
| `.-hidden-max-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                                     |
| `.-hidden-max-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                                     |
| `.-hidden-max-xl`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `xl` անցման կետի (`62em`):                                                                                             |
| `.-hidden-max-xs`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ ներքևում `xs` անցման կետի (`16em`):                                                                                             |
| `.-hidden-min-content`               | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `content` անցման կետի (`68.75em`):                                                                                      |
| `.-hidden-min-content-full-width`    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `content-full-width` անցման կետի (`98.75em`):                                                                           |
| `.-hidden-min-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                                     |
| `.-hidden-min-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                                     |
| `.-hidden-min-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                                     |
| `.-hidden-min-lg`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `lg` անցման կետի (`48em`):                                                                                              |
| `.-hidden-min-md`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `md` անցման կետի (`30em`):                                                                                              |
| `.-hidden-min-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                                     |
| `.-hidden-min-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                                     |
| `.-hidden-min-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                                     |
| `.-hidden-min-sm`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `sm` անցման կետի (`20em`):                                                                                              |
| `.-hidden-min-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                                     |
| `.-hidden-min-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                                     |
| `.-hidden-min-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                                     |
| `.-hidden-min-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                                     |
| `.-hidden-min-xl`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `xl` անցման կետի (`62em`):                                                                                              |
| `.-hidden-min-xs`                    | Թաքցնել, երբ տեսադաշտը գտնվում է կամ վերևում `xs` անցման կետի (`16em`):                                                                                              |
| `.-show-max-content`                 | Ցույց տալ (`-hidden-min-content`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `content` անցման կետի (`68.75em`); թաքցված հակառակ դեպքում:                       |
| `.-show-max-content-full-width`      | Ցույց տալ (`-hidden-min-content-full-width`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `content-full-width` անցման կետի (`98.75em`); թաքցված հակառակ դեպքում: |
| `.-show-max-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                                       |
| `.-show-max-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                                       |
| `.-show-max-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                                       |
| `.-show-max-lg`                      | Ցույց տալ (`-hidden-min-lg`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `lg` անցման կետի (`48em`); թաքցված հակառակ դեպքում:                                    |
| `.-show-max-md`                      | Ցույց տալ (`-hidden-min-md`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `md` անցման կետի (`30em`); թաքցված հակառակ դեպքում:                                    |
| `.-show-max-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                                       |
| `.-show-max-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                                       |
| `.-show-max-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                                       |
| `.-show-max-sm`                      | Ցույց տալ (`-hidden-min-sm`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `sm` անցման կետի (`20em`); թաքցված հակառակ դեպքում:                                    |
| `.-show-max-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                                       |
| `.-show-max-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                                       |
| `.-show-max-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                                       |
| `.-show-max-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                                       |
| `.-show-max-xl`                      | Ցույց տալ (`-hidden-min-xl`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `xl` անցման կետի (`62em`); թաքցված հակառակ դեպքում:                                    |
| `.-show-max-xs`                      | Ցույց տալ (`-hidden-min-xs`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ ներքևում `xs` անցման կետի (`16em`); թաքցված հակառակ դեպքում:                                    |
| `.-show-min-content`                 | Ցույց տալ (`-hidden-max-content`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ վերևում `content` անցման կետի (`68.75em`); թաքցված հակառակ դեպքում:                        |
| `.-show-min-content-full-width`      | Ցույց տալ (`-hidden-max-content-full-width`-ի հակառակը), երբ տեսադաշտը գտնվում է կամ վերևում `content-full-width` անցման կետի (`98.75em`); թաքցված հակառակ դեպքում:  |
| `.-show-min-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                                       |
| `.-show-min-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                                       |
| `.-show-min-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                                       |
| `.-show-min-lg`                      | Ցույց տալ ((`-hidden-max-lg`-ի հակադարձ) երբ դիտման պատուհանը `lg` բրեյկպոինտի (`48em`) մակարդակում կամ դրանից վեր է; այլ դեպքում թաքցված:                           |
| `.-show-min-md`                      | Ցույց տալ ((`-hidden-max-md`-ի հակադարձ) երբ դիտման պատուհանը `md` բրեյկպոինտի (`30em`) մակարդակում կամ դրանից վեր է; այլ դեպքում թաքցված:                           |
| `.-show-min-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                                       |
| `.-show-min-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                                       |
| `.-show-min-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                                       |
| `.-show-min-sm`                      | Ցույց տալ ((`-hidden-max-sm`-ի հակադարձ) երբ դիտման պատուհանը `sm` բրեյկպոինտի (`20em`) մակարդակում կամ դրանից վեր է; այլ դեպքում թաքցված:                           |
| `.-show-min-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                                       |
| `.-show-min-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                                       |
| `.-show-min-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                                       |
| `.-show-min-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                                       |
| `.-show-min-xl`                      | Ցույց տալ ((`-hidden-max-xl`-ի հակադարձ) երբ դիտման պատուհանը `xl` բրեյկպոինտի (`62em`) մակարդակում կամ դրանից վեր է; այլ դեպքում թաքցված:                           |
| `.-show-min-xs`                      | Ցույց տալ ((`-hidden-max-xs`-ի հակադարձ) երբ դիտման պատուհանը `xs` բրեյկպոինտի (`16em`) մակարդակում կամ դրանից վեր է; այլ դեպքում թաքցված:                           |

## Custom properties

| Property                           | Type       | Default   | Description                                                                                                                                                                |
| ---------------------------------- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-bp-content`            | `<length>` | `68.75em` | `content` բրեյկպոինտի արժեքը (`68.75em`, ձեռքով հեղինակված, թեմատիկ (token IR-ում չէ)): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:            |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | `content-full-width` բրեյկպոինտի արժեքը (`98.75em`, ձեռքով հեղինակված, թեմատիկ (token IR-ում չէ)): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր: |
| `--pantoken-bp-lg`                 | `<length>` | `48em`    | `lg` բրեյկպոինտի արժեքը (`48em`, արտացոլում է `--instui-component-tray-width-lg`): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:                 |
| `--pantoken-bp-md`                 | `<length>` | `30em`    | `md` բրեյկպոինտի արժեքը (`30em`, արտացոլում է `--instui-component-tray-width-md`): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:                 |
| `--pantoken-bp-sm`                 | `<length>` | `20em`    | `sm` բրեյկպոինտի արժեքը (`20em`, արտացոլում է `--instui-component-tray-width-sm`): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:                 |
| `--pantoken-bp-xl`                 | `<length>` | `62em`    | `xl` բրեյկպոինտի արժեքը (`62em`, արտացոլում է `--instui-component-tray-width-xl`): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:                 |
| `--pantoken-bp-xs`                 | `<length>` | `16em`    | `xs` բրեյկպոինտի արժեքը (`16em`, արտացոլում է `--instui-component-tray-width-xs`): Այն փոխարինելը չի տեղափոխում հավաքված `@media`/`@container` շեմերը վեր:                 |

## Conditions

| Type      | Query                  | Description                                                                         |
| --------- | ---------------------- | ----------------------------------------------------------------------------------- |
| media     | `(max-width: 16em)`    | `xs` բրեյկպոինտի վերին սահման:                                                      |
| media     | `(min-width: 16em)`    | `xs` բրեյկպոինտի ստորին սահման:                                                     |
| media     | `(max-width: 20em)`    | `sm` բրեյկպոինտի վերին սահման:                                                      |
| media     | `(min-width: 20em)`    | `sm` բրեյկպոինտի ստորին սահման:                                                     |
| media     | `(max-width: 30em)`    | `md` բրեյկպոինտի վերին սահման:                                                      |
| media     | `(min-width: 30em)`    | `md` բրեյկպոինտի ստորին սահման:                                                     |
| media     | `(max-width: 48em)`    | `lg` բրեյկպոինտի վերին սահման:                                                      |
| media     | `(min-width: 48em)`    | `lg` բրեյկպոինտի ստորին սահման:                                                     |
| media     | `(max-width: 62em)`    | `xl` բրեյկպոինտի վերին սահման:                                                      |
| media     | `(min-width: 62em)`    | `xl` բրեյկպոինտի ստորին սահման:                                                     |
| media     | `(max-width: 68.75em)` | `content` բրեյկպոինտի վերին սահման:                                                 |
| media     | `(min-width: 68.75em)` | `content` բրեյկպոինտի ստորին սահման:                                                |
| media     | `(max-width: 98.75em)` | `content-full-width` բրեյկպոինտի վերին սահման:                                      |
| media     | `(min-width: 98.75em)` | `content-full-width` բրեյկպոինտի ստորին սահման:                                     |
| container | `(max-width: 16em)`    | `xs` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:                  |
| container | `(min-width: 16em)`    | `xs` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:                 |
| container | `(max-width: 20em)`    | `sm` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:                  |
| container | `(min-width: 20em)`    | `sm` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:                 |
| container | `(max-width: 30em)`    | `md` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:                  |
| container | `(min-width: 30em)`    | `md` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:                 |
| container | `(max-width: 48em)`    | `lg` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:                  |
| container | `(min-width: 48em)`    | `lg` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:                 |
| container | `(max-width: 62em)`    | `xl` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:                  |
| container | `(min-width: 62em)`    | `xl` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:                 |
| container | `(max-width: 68.75em)` | `content` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:             |
| container | `(min-width: 68.75em)` | `content` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ:            |
| container | `(max-width: 98.75em)` | `content-full-width` բրեյկպոինտի վերին սահման՝ գնահատված նշված կոնտեյների հակառակ:  |
| container | `(min-width: 98.75em)` | `content-full-width` բրեյկպոինտի ստորին սահման՝ գնահատված նշված կոնտեյների հակառակ: |

## Tokens consumed

| Token                              | Type       | Value  |
| ---------------------------------- | ---------- | ------ |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |
