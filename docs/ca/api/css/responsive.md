# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — Classes de mostrar/amagar d'amplada de visor o contenidor en una escala de punt de ruptura temàtica.

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` amagar per amplada de visor; `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` són l'invers (ocult per defecte, mostrat només dins de l'interval mitjançant `display: revert`); les variants `-cq-` reaccionen a l'amplada d'un avantpassat `.instui-container` en lloc de la del visor. Els nivells d'escala `xs`/`sm`/`md`/`lg`/`xl` (procedents dels tokens del component tray-width de l'IR) estàn cadascun aliasats a una ortografia de forma llarga (`x-small`–`x-large`) i un nom de dispositiu (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — tots dos deprecats en favor del nom curt — més els nivells sense escala i temàtics `content`/`content-full-width` (l'amplada màxima de l'àrea de contingut principal).

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

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

| Modifier                             | Description                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.-cq-hidden-max-content`            | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `content` (`68.75em`).                                                               |
| `.-cq-hidden-max-content-full-width` | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `content-full-width` (`98.75em`).                                                    |
| `.-cq-hidden-max-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                          |
| `.-cq-hidden-max-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                          |
| `.-cq-hidden-max-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                          |
| `.-cq-hidden-max-lg`                 | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `lg` (`48em`).                                                                       |
| `.-cq-hidden-max-md`                 | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `md` (`30em`).                                                                       |
| `.-cq-hidden-max-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                          |
| `.-cq-hidden-max-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                          |
| `.-cq-hidden-max-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                          |
| `.-cq-hidden-max-sm`                 | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `sm` (`20em`).                                                                       |
| `.-cq-hidden-max-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                          |
| `.-cq-hidden-max-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                          |
| `.-cq-hidden-max-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                          |
| `.-cq-hidden-max-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                          |
| `.-cq-hidden-max-xl`                 | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `xl` (`62em`).                                                                       |
| `.-cq-hidden-max-xs`                 | Amagar quan el contenidor marcat està al o per sota del punt de ruptura `xs` (`16em`).                                                                       |
| `.-cq-hidden-min-content`            | Amagar quan el contenidor marcat està al o per sobre del punt de ruptura `content` (`68.75em`).                                                              |
| `.-cq-hidden-min-content-full-width` | Amaga quan el contenidor marcat està a o per sobre de la propera `content-full-width` (`98.75em`).                                                           |
| `.-cq-hidden-min-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                          |
| `.-cq-hidden-min-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                          |
| `.-cq-hidden-min-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                          |
| `.-cq-hidden-min-lg`                 | Amaga quan el contenidor marcat està a o per sobre de la propera `lg` (`48em`).                                                                              |
| `.-cq-hidden-min-md`                 | Amaga quan el contenidor marcat està a o per sobre de la propera `md` (`30em`).                                                                              |
| `.-cq-hidden-min-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                          |
| `.-cq-hidden-min-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                          |
| `.-cq-hidden-min-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                          |
| `.-cq-hidden-min-sm`                 | Amaga quan el contenidor marcat està a o per sobre de la propera `sm` (`20em`).                                                                              |
| `.-cq-hidden-min-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                          |
| `.-cq-hidden-min-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                          |
| `.-cq-hidden-min-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                          |
| `.-cq-hidden-min-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                          |
| `.-cq-hidden-min-xl`                 | Amaga quan el contenidor marcat està a o per sobre de la propera `xl` (`62em`).                                                                              |
| `.-cq-hidden-min-xs`                 | Amaga quan el contenidor marcat està a o per sobre de la propera `xs` (`16em`).                                                                              |
| `.-cq-show-max-content`              | Mostra quan el contenidor marcat està a o per sota de la propera `content` (`68.75em`); amaga sinó.                                                          |
| `.-cq-show-max-content-full-width`   | Mostra quan el contenidor marcat està a o per sota de la propera `content-full-width` (`98.75em`); amaga sinó.                                               |
| `.-cq-show-max-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                            |
| `.-cq-show-max-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                            |
| `.-cq-show-max-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                            |
| `.-cq-show-max-lg`                   | Mostra quan el contenidor marcat està a o per sota de la propera `lg` (`48em`); amaga sinó.                                                                  |
| `.-cq-show-max-md`                   | Mostra quan el contenidor marcat està a o per sota de la propera `md` (`30em`); amaga sinó.                                                                  |
| `.-cq-show-max-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                            |
| `.-cq-show-max-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                            |
| `.-cq-show-max-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                            |
| `.-cq-show-max-sm`                   | Mostra quan el contenidor marcat està a o per sota de la propera `sm` (`20em`); amaga sinó.                                                                  |
| `.-cq-show-max-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                            |
| `.-cq-show-max-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                            |
| `.-cq-show-max-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                            |
| `.-cq-show-max-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                            |
| `.-cq-show-max-xl`                   | Mostra quan el contenidor marcat està a o per sota de la propera `xl` (`62em`); amaga sinó.                                                                  |
| `.-cq-show-max-xs`                   | Mostra quan el contenidor marcat està a o per sota de la propera `xs` (`16em`); amaga sinó.                                                                  |
| `.-cq-show-min-content`              | Mostra quan el contenidor marcat està a o per sobre de la propera `content` (`68.75em`); amaga sinó.                                                         |
| `.-cq-show-min-content-full-width`   | Mostra quan el contenidor marcat està a o per sobre de la propera `content-full-width` (`98.75em`); amaga sinó.                                              |
| `.-cq-show-min-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                            |
| `.-cq-show-min-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                            |
| `.-cq-show-min-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                            |
| `.-cq-show-min-lg`                   | Mostra quan el contenidor marcat està a o per sobre de la propera `lg` (`48em`); amaga sinó.                                                                 |
| `.-cq-show-min-md`                   | Mostra quan el contenidor marcat està a o per sobre de la propera `md` (`30em`); amaga sinó.                                                                 |
| `.-cq-show-min-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                            |
| `.-cq-show-min-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                            |
| `.-cq-show-min-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                            |
| `.-cq-show-min-sm`                   | Mostra quan el contenidor marcat està a o per sobre de la propera `sm` (`20em`); amaga sinó.                                                                 |
| `.-cq-show-min-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                            |
| `.-cq-show-min-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                            |
| `.-cq-show-min-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                            |
| `.-cq-show-min-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                            |
| `.-cq-show-min-xl`                   | Mostra quan el contenidor marcat està a o per sobre de la propera `xl` (`62em`); amaga sinó.                                                                 |
| `.-cq-show-min-xs`                   | Mostra quan el contenidor marcat està a o per sobre de la propera `xs` (`16em`); amaga sinó.                                                                 |
| `.-hidden-max-content`               | Amaga quan la finestra gràfica està a o per sota de la propera `content` (`68.75em`).                                                                        |
| `.-hidden-max-content-full-width`    | Amaga quan la finestra gràfica està a o per sota de la propera `content-full-width` (`98.75em`).                                                             |
| `.-hidden-max-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                             |
| `.-hidden-max-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                             |
| `.-hidden-max-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                             |
| `.-hidden-max-lg`                    | Amaga quan la finestra gràfica està a o per sota de la propera `lg` (`48em`).                                                                                |
| `.-hidden-max-md`                    | Amaga quan la finestra gràfica està a o per sota de la propera `md` (`30em`).                                                                                |
| `.-hidden-max-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                             |
| `.-hidden-max-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                             |
| `.-hidden-max-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                             |
| `.-hidden-max-sm`                    | Amaga quan la finestra gràfica està a o per sota de la propera `sm` (`20em`).                                                                                |
| `.-hidden-max-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                             |
| `.-hidden-max-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                             |
| `.-hidden-max-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                             |
| `.-hidden-max-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                             |
| `.-hidden-max-xl`                    | Amaga quan la finestra gràfica està a o per sota de la propera `xl` (`62em`).                                                                                |
| `.-hidden-max-xs`                    | Amaga quan la finestra gràfica està a o per sota de la propera `xs` (`16em`).                                                                                |
| `.-hidden-min-content`               | Amaga quan la finestra gràfica està a o per sobre de la propera `content` (`68.75em`).                                                                       |
| `.-hidden-min-content-full-width`    | Amaga quan la finestra gràfica està a o per sobre de la propera `content-full-width` (`98.75em`).                                                            |
| `.-hidden-min-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                             |
| `.-hidden-min-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                             |
| `.-hidden-min-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                             |
| `.-hidden-min-lg`                    | Amaga quan la finestra gràfica està a o per sobre de la propera `lg` (`48em`).                                                                               |
| `.-hidden-min-md`                    | Amaga quan la finestra gràfica està a o per sobre de la propera `md` (`30em`).                                                                               |
| `.-hidden-min-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                             |
| `.-hidden-min-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                             |
| `.-hidden-min-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                             |
| `.-hidden-min-sm`                    | Amaga quan la finestra gràfica està a o per sobre de la propera `sm` (`20em`).                                                                               |
| `.-hidden-min-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                             |
| `.-hidden-min-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                             |
| `.-hidden-min-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                             |
| `.-hidden-min-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                             |
| `.-hidden-min-xl`                    | Amaga quan la finestra gràfica està a o per sobre de la propera `xl` (`62em`).                                                                               |
| `.-hidden-min-xs`                    | Amaga quan la finestra gràfica està a o per sobre de la propera `xs` (`16em`).                                                                               |
| `.-show-max-content`                 | Mostra (inversa de `-hidden-min-content`) quan la finestra gràfica està a o per sota de la propera `content` (`68.75em`); amaga sinó.                        |
| `.-show-max-content-full-width`      | Mostra (inversa de `-hidden-min-content-full-width`) quan la finestra gràfica està a o per sota de la propera `content-full-width` (`98.75em`); amaga sinó.  |
| `.-show-max-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                               |
| `.-show-max-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                               |
| `.-show-max-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                               |
| `.-show-max-lg`                      | Mostra (inversa de `-hidden-min-lg`) quan la finestra gràfica està a o per sota de la propera `lg` (`48em`); amaga sinó.                                     |
| `.-show-max-md`                      | Mostra (inversa de `-hidden-min-md`) quan la finestra gràfica està a o per sota de la propera `md` (`30em`); amaga sinó.                                     |
| `.-show-max-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                               |
| `.-show-max-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                               |
| `.-show-max-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                               |
| `.-show-max-sm`                      | Mostra (inversa de `-hidden-min-sm`) quan la finestra gràfica està a o per sota de la propera `sm` (`20em`); amaga sinó.                                     |
| `.-show-max-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                               |
| `.-show-max-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                               |
| `.-show-max-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                               |
| `.-show-max-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                               |
| `.-show-max-xl`                      | Mostra (inversa de `-hidden-min-xl`) quan la finestra gràfica està a o per sota de la propera `xl` (`62em`); amaga sinó.                                     |
| `.-show-max-xs`                      | Mostra (inversa de `-hidden-min-xs`) quan la finestra gràfica està a o per sota de la propera `xs` (`16em`); amaga sinó.                                     |
| `.-show-min-content`                 | Mostra (inversa de `-hidden-max-content`) quan la finestra gràfica està a o per sobre de la propera `content` (`68.75em`); amaga sinó.                       |
| `.-show-min-content-full-width`      | Mostra (inversa de `-hidden-max-content-full-width`) quan la finestra gràfica està a o per sobre de la propera `content-full-width` (`98.75em`); amaga sinó. |
| `.-show-min-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                               |
| `.-show-min-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                               |
| `.-show-min-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                               |
| `.-show-min-lg`                      | Mostra (l'inversa de `-hidden-max-lg`) quan la finestra gràfica es troba a o per sobre del punt de trencament `lg` (`48em`); amagada en cas contrari.        |
| `.-show-min-md`                      | Mostra (l'inversa de `-hidden-max-md`) quan la finestra gràfica es troba a o per sobre del punt de trencament `md` (`30em`); amagada en cas contrari.        |
| `.-show-min-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                               |
| `.-show-min-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                               |
| `.-show-min-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                               |
| `.-show-min-sm`                      | Mostra (l'inversa de `-hidden-max-sm`) quan la finestra gràfica es troba a o per sobre del punt de trencament `sm` (`20em`); amagada en cas contrari.        |
| `.-show-min-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                               |
| `.-show-min-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                               |
| `.-show-min-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                               |
| `.-show-min-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                               |
| `.-show-min-xl`                      | Mostra (l'inversa de `-hidden-max-xl`) quan la finestra gràfica es troba a o per sobre del punt de trencament `xl` (`62em`); amagada en cas contrari.        |
| `.-show-min-xs`                      | Mostra (l'inversa de `-hidden-max-xs`) quan la finestra gràfica es troba a o per sobre del punt de trencament `xs` (`16em`); amagada en cas contrari.        |

## Custom properties

| Property                           | Type       | Default   | Description                                                                                                                                                                                                          |
| ---------------------------------- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-bp-content`            | `<length>` | `68.75em` | El valor del punt de trencament `content` (`68.75em`, creat manualment, amb tema (no es troba a la IR de token)). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.            |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | El valor del punt de trencament `content-full-width` (`98.75em`, creat manualment, amb tema (no es troba a la IR de token)). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre. |
| `--pantoken-bp-lg`                 | `<length>` | `48em`    | El valor del punt de trencament `lg` (`48em`, reflecteix `--instui-component-tray-width-lg`). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.                                |
| `--pantoken-bp-md`                 | `<length>` | `30em`    | El valor del punt de trencament `md` (`30em`, reflecteix `--instui-component-tray-width-md`). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.                                |
| `--pantoken-bp-sm`                 | `<length>` | `20em`    | El valor del punt de trencament `sm` (`20em`, reflecteix `--instui-component-tray-width-sm`). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.                                |
| `--pantoken-bp-xl`                 | `<length>` | `62em`    | El valor del punt de trencament `xl` (`62em`, reflecteix `--instui-component-tray-width-xl`). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.                                |
| `--pantoken-bp-xs`                 | `<length>` | `16em`    | El valor del punt de trencament `xs` (`16em`, reflecteix `--instui-component-tray-width-xs`). Si el substitueixes, no es mouran els límits compilats `@media`/`@container` per sobre.                                |

## Conditions

| Type      | Query                  | Description                                                                                      |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| media     | `(max-width: 16em)`    | Límit superior del punt de trencament `xs`.                                                      |
| media     | `(min-width: 16em)`    | Límit inferior del punt de trencament `xs`.                                                      |
| media     | `(max-width: 20em)`    | Límit superior del punt de trencament `sm`.                                                      |
| media     | `(min-width: 20em)`    | Límit inferior del punt de trencament `sm`.                                                      |
| media     | `(max-width: 30em)`    | Límit superior del punt de trencament `md`.                                                      |
| media     | `(min-width: 30em)`    | Límit inferior del punt de trencament `md`.                                                      |
| media     | `(max-width: 48em)`    | Límit superior del punt de trencament `lg`.                                                      |
| media     | `(min-width: 48em)`    | Límit inferior del punt de trencament `lg`.                                                      |
| media     | `(max-width: 62em)`    | Límit superior del punt de trencament `xl`.                                                      |
| media     | `(min-width: 62em)`    | Límit inferior del punt de trencament `xl`.                                                      |
| media     | `(max-width: 68.75em)` | Límit superior del punt de trencament `content`.                                                 |
| media     | `(min-width: 68.75em)` | Límit inferior del punt de trencament `content`.                                                 |
| media     | `(max-width: 98.75em)` | Límit superior del punt de trencament `content-full-width`.                                      |
| media     | `(min-width: 98.75em)` | Límit inferior del punt de trencament `content-full-width`.                                      |
| container | `(max-width: 16em)`    | Límit superior del punt de trencament `xs`, avaluat contra un contenidor marcat.                 |
| container | `(min-width: 16em)`    | Límit inferior del punt de trencament `xs`, avaluat contra un contenidor marcat.                 |
| container | `(max-width: 20em)`    | Límit superior del punt de trencament `sm`, avaluat contra un contenidor marcat.                 |
| container | `(min-width: 20em)`    | Límit inferior del punt de trencament `sm`, avaluat contra un contenidor marcat.                 |
| container | `(max-width: 30em)`    | Límit superior del punt de trencament `md`, avaluat contra un contenidor marcat.                 |
| container | `(min-width: 30em)`    | Límit inferior del punt de trencament `md`, avaluat contra un contenidor marcat.                 |
| container | `(max-width: 48em)`    | Límit superior del punt de trencament `lg`, avaluat contra un contenidor marcat.                 |
| container | `(min-width: 48em)`    | Límit inferior del punt de trencament `lg`, avaluat contra un contenidor marcat.                 |
| container | `(max-width: 62em)`    | Límit superior del punt de trencament `xl`, avaluat contra un contenidor marcat.                 |
| container | `(min-width: 62em)`    | Límit inferior del punt de trencament `xl`, avaluat contra un contenidor marcat.                 |
| container | `(max-width: 68.75em)` | Límit superior del punt de trencament `content`, avaluat contra un contenidor marcat.            |
| container | `(min-width: 68.75em)` | Límit inferior del punt de trencament `content`, avaluat contra un contenidor marcat.            |
| container | `(max-width: 98.75em)` | Límit superior del punt de trencament `content-full-width`, avaluat contra un contenidor marcat. |
| container | `(min-width: 98.75em)` | Límit inferior del punt de trencament `content-full-width`, avaluat contra un contenidor marcat. |

## Tokens consumed

| Token                              | Type       | Value  |
| ---------------------------------- | ---------- | ------ |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |
