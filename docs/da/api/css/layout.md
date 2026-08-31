# CSS: layout

`.--display-flex` — Display- og text-align-værktøjer — `.--display-&lt;value&gt;` og `.--text-align-&lt;value&gt;` — som sammensat, globale klasser, kan bruges alene eller sammenkædet på enhver komponent.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifiers

| Modifier          | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `.--display-flex` | Indstiller `display: flex`.                                                            |
| `.--display-*`    | Display-værktøjer: `block`, `inline-block`, `inline`, `flex`, `inline-flex` og `none`. |
| `.--text-align-*` | Text-align-værktøjer: `start`, `center`, `end` og `justify`.                           |
