# CSS: screen-reader-content

`.instui-screen-reader-content` — Skjuler indhold visuelt, mens det forbliver tilgængeligt for hjælpeteknologi (standard clip-mønster).

**Kilde:** [screen-reader-content.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/screen-reader-content/screen-reader-content.css)

## Accessibility

Holder tekst i tilgængelighedstræet for skærmlæsere, mens den fjernes fra det visuelle layout.

## Usage

```css
@import "@pantoken/components/components.css";
```

## Examples

```html
<a class="instui-link" href="#examples" target="_blank">example</a>
<span class="instui-screen-reader-content">Opens in a new window</span>
```
