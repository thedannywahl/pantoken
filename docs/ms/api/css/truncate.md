# CSS: truncate

`.--truncate` — Ellipsis truncation with line clamping controlled by `--lines` — usable bare or chained onto any component (`.instui-button.--truncate`).

The base class uses `display: -webkit-box` and reads the `--lines` custom property to clamp text to a fixed number of lines before it ends in an ellipsis.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/truncate/index.ts)

<!-- js-requirement -->
> [!TIP]
> **Keperluan JS** — This component ships no CSS of its own — its markup and behavior come entirely from `@pantoken/interactions`. Its `--max-lines-auto` modifier is driven by that behavior. See the [modifier table below](#modifiers).


## Penggunaan

```css
@import "@pantoken/components/utilities.css";
```

## Contoh

```html
<div class="--truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
<div class="--truncate" style="--lines: 3">This text is clamped to three lines and ends in an ellipsis.</div>
<button class="instui-button --truncate">…</button>
```

## Pemodifikasi

| Pemodifikasi | Penerangan |
| --- | --- |
| `.--lines-1` | Alias of `--max-lines-1`. |
| `.--lines-2` | Alias of `--max-lines-2`. |
| `.--lines-3` | Alias of `--max-lines-3`. |
| `.--lines-4` | Alias of `--max-lines-4`. |
| `.--lines-5` | Alias of `--max-lines-5`. |
| `.--max-lines-1` | Clamp to one line (default). |
| `.--max-lines-2` | Clamp to two lines. |
| `.--max-lines-3` | Clamp to three lines. |
| `.--max-lines-4` | Clamp to four lines. |
| `.--max-lines-5` | Clamp to five lines. |
| `.--max-lines-auto` | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — — Clamp to the number of lines that fit in the container, based on its height and the line height of the text. |
| `.--truncate` | Enables truncation and line clamping on the target element. |
| `.--truncate-character` | (default) Truncate at the character level. |
| `.--truncate-word` | Truncate at the word level. |

## Hartanah tersuai

| Sifat | Jenis | Lalai | Penerangan |
| --- | --- | --- | --- |
| `--ellipsis` | `clip \| ellipsis \| <string> \| fade` | `ellipsis` | — |
| `--lines` | `<integer>` | `1` | — |

## Token digunakan

| Token | Jenis | Nilai |
| --- | --- | --- |
| `--instui-component-truncate-text-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-line-height-paragraph-base` | `<percentage>` | `150%` |

## Sokongan pelayar

- Clamping relies on `-webkit-line-clamp` with `display: -webkit-box`, paired with the standard `line-clamp`.

## Berkaitan

- [text](/ms/api/css/text.md) — Body typography that this truncates.

