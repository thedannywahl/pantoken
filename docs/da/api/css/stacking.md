# CSS: stacking

`.--stack-topmost` — z-index dybdehjælpeprogrammer — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — kan bruges bare eller kædet på enhver komponent, så lag stabiles forudsigeligt i stedet for efter hånd-justerede tal.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/stacking/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--stack-topmost">Always on top.</div>
```

## Modifiers

| Modifier           | Description                                   |
| ------------------ | --------------------------------------------- |
| `.--stack-above`   | Over standardflowet.                          |
| `.--stack-below`   | Under standardflowet.                         |
| `.--stack-deepest` | Den laveste stakingsdybde.                    |
| `.--stack-topmost` | Den højeste stakingsdybde (overlays, menuer). |

## Tokens consumed

| Token                                      | Type        | Value   |
| ------------------------------------------ | ----------- | ------- |
| `--instui-component-view-stacking-above`   | `<integer>` | `1`     |
| `--instui-component-view-stacking-below`   | `<integer>` | `-1`    |
| `--instui-component-view-stacking-deepest` | `<integer>` | `-9999` |
| `--instui-component-view-stacking-topmost` | `<integer>` | `9999`  |
