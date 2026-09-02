# CSS: truncate

`.--truncate` — Truncació amb els punts suspensius amb limitació de línies controlada per `--lines` — usable directament o encadenat a qualsevol component (`.instui-button.--truncate`).

La classe base utilitza `display: -webkit-box` i llegeix la propietat personalitzada `--lines` per limitar el text a un nombre fixe de línies abans que acabi amb punts suspensius.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->
> [!TIP]
> **Requisit JS** — Aquest component no inclou CSS propi — el seu codi i comportament provenen completament de `@pantoken/interactions`. El seu modificador `--max-lines-auto` depèn d'aquest comportament. Consulteu la [taula de modificadors a continuació](#modifiers).


## Ús

```css
@import "@pantoken/components/utilities.css";
```

## Exemples

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">This text is clamped to three lines and ends in an ellipsis.</div>
<button class="instui-button --truncate">…</button>
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.--lines-1` | Alias de `--max-lines-1`. |
| `.--lines-2` | Alias de `--max-lines-2`. |
| `.--lines-3` | Alias de `--max-lines-3`. |
| `.--lines-4` | Alias de `--max-lines-4`. |
| `.--lines-5` | Alias de `--max-lines-5`. |
| `.--max-lines-1` | Limitar a una línia (per defecte). |
| `.--max-lines-2` | Limitar a dues línies. |
| `.--max-lines-3` | Limitar a tres línies. |
| `.--max-lines-4` | Limitar a quatre línies. |
| `.--max-lines-5` | Limitar a cinc línies. |
| `.--max-lines-auto` | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate` | Activa la truncació i la limitació de línies a l'element de destinació. |
| `.--truncate-character` | (per defecte) Truncar al nivell de caràcter. |
| `.--truncate-word` | Truncar al nivell de paraula. |

## Propietats personalitzades

| Propietat | Tipus | Predeterminat | Descripció |
| --- | --- | --- | --- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | — |
| `--lines` | `<integer>` | `1` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base` | `<percentage>` | `150%` |

## Suport del navegador

- La limitació es basa en `-webkit-line-clamp` amb `display: -webkit-box`, emparellada amb l'estàndard `line-clamp`.

## Relacionat

- [text](/ca/api/css/text.md) — Tipografia del cos que es trunça.

