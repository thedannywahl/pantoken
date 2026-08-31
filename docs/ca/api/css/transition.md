# CSS: transition

`.instui-transition.-transition-fade-entering` — Classes d'estat d'animació per al component `Transition` — `.instui-transition` i classes d'estat (`-transition-fade-entering`, `-transition-scale-exited`, etc.) — utilitzables soles o encadenades a qualsevol component.

**Font:** [transition.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/transition/transition.css)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="instui-transition -transition-fade-entering">Animated content</div>
```

## Modifiers

| Modifier                            | Description                                                                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `.-transition-*`                    | Classe de tipus/estat de transició commutada per la runtime (`fade\|scale\|slide-*` + `entering\|entered\|exiting\|exited`). |
| `.-transition-fade-entered`         | —                                                                                                                            |
| `.-transition-fade-entering`        | —                                                                                                                            |
| `.-transition-fade-exited`          | —                                                                                                                            |
| `.-transition-fade-exiting`         | —                                                                                                                            |
| `.-transition-scale-entered`        | —                                                                                                                            |
| `.-transition-scale-entering`       | —                                                                                                                            |
| `.-transition-scale-exited`         | —                                                                                                                            |
| `.-transition-scale-exiting`        | —                                                                                                                            |
| `.-transition-slide-down-entered`   | —                                                                                                                            |
| `.-transition-slide-down-entering`  | —                                                                                                                            |
| `.-transition-slide-down-exited`    | —                                                                                                                            |
| `.-transition-slide-down-exiting`   | —                                                                                                                            |
| `.-transition-slide-left-entered`   | —                                                                                                                            |
| `.-transition-slide-left-entering`  | —                                                                                                                            |
| `.-transition-slide-left-exited`    | —                                                                                                                            |
| `.-transition-slide-left-exiting`   | —                                                                                                                            |
| `.-transition-slide-right-entered`  | —                                                                                                                            |
| `.-transition-slide-right-entering` | —                                                                                                                            |
| `.-transition-slide-right-exited`   | —                                                                                                                            |
| `.-transition-slide-right-exiting`  | —                                                                                                                            |
| `.-transition-slide-up-entered`     | —                                                                                                                            |
| `.-transition-slide-up-entering`    | —                                                                                                                            |
| `.-transition-slide-up-exited`      | —                                                                                                                            |
| `.-transition-slide-up-exiting`     | —                                                                                                                            |

## Custom properties

| Property     | Type     | Default       | Description                                                                                              |
| ------------ | -------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| `--duration` | `<time>` | `300ms`       | Durada de l'animació (per defecte `300ms`); sobreescriu per accelerar o alentir cada estat de transició. |
| `--timing`   | `*`      | `ease-in-out` | Funció de temporització de l'animació (per defecte `ease-in-out`).                                       |
