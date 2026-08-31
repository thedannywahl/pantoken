# CSS: position

`.--position-relative` — `position` som en sammensat, global klasse — `.--position-&lt;value&gt;` — som kan bruges alene eller kædet på enhver komponent (`.instui-button.--position-relative`).

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/position/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--position-relative">…</div>
```

## Modifiers

| Modifier               | Description         |
| ---------------------- | ------------------- |
| `.--position-absolute` | position: absolute. |
| `.--position-fixed`    | position: fixed.    |
| `.--position-relative` | position: relative. |
| `.--position-static`   | position: static.   |
| `.--position-sticky`   | position: sticky.   |
