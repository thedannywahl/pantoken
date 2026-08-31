# CSS: truncate

`.--truncate` — Ellipsis-trunkering med linjeindlemning styret af `--lines` — kan bruges alene eller kombineres med enhver komponent (`.instui-button.--truncate`).

Baseklassen bruger `display: -webkit-box` og læser den `--lines` brugerdefinerede egenskab for at indlemme tekst til et fast antal linjer, før den slutter med en ellipsis.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->

> [!TIP]
> **JS Requirement** — Denne komponent har ingen egen CSS — dens markup og adfærd kommer helt fra `@pantoken/interactions`. Dens `--max-lines-auto`-modifikator styres af denne adfærd. Se [modifikatortabellen nedenfor](#modifiers).

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">
  This text is clamped to three lines and ends in an ellipsis.
</div>
<button class="instui-button --truncate">…</button>
```

## Modifiers

| Modifier                | Description                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.--lines-1`            | Alias for `--max-lines-1`.                                                                                                                                                                                  |
| `.--lines-2`            | Alias for `--max-lines-2`.                                                                                                                                                                                  |
| `.--lines-3`            | Alias for `--max-lines-3`.                                                                                                                                                                                  |
| `.--lines-4`            | Alias for `--max-lines-4`.                                                                                                                                                                                  |
| `.--lines-5`            | Alias for `--max-lines-5`.                                                                                                                                                                                  |
| `.--max-lines-1`        | Indlemme til én linje (standard).                                                                                                                                                                           |
| `.--max-lines-2`        | Indlemme til to linjer.                                                                                                                                                                                     |
| `.--max-lines-3`        | Indlemme til tre linjer.                                                                                                                                                                                    |
| `.--max-lines-4`        | Indlemme til fire linjer.                                                                                                                                                                                   |
| `.--max-lines-5`        | Indlemme til fem linjer.                                                                                                                                                                                    |
| `.--max-lines-auto`     | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate`           | Muliggør trunkering og linjeindlemning på destinationselementet.                                                                                                                                            |
| `.--truncate-character` | (standard) Trunker på tegnniveau.                                                                                                                                                                           |
| `.--truncate-word`      | Trunker på ordniveau.                                                                                                                                                                                       |

## Custom properties

| Property     | Type                                   | Default    | Description |
| ------------ | -------------------------------------- | ---------- | ----------- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | —           |
| `--lines`    | `<integer>`                            | `1`        | —           |

## Tokens consumed

| Token                                          | Type                                               | Value                                                                        |
| ---------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base`          | `<percentage>`                                     | `150%`                                                                       |

## Browser support

- Indlemning er afhængig af `-webkit-line-clamp` med `display: -webkit-box`, parret med standard `line-clamp`.

## Related

- [text](/da/api/css/text.md) — Brødtekst typografi, som dette trunker.
