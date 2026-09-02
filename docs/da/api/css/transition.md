# CSS: transition

`.instui-transition.-transition-fade-entering` — Animationstilstandsklasser for `Transition` komponenten — `.instui-transition` og tilstandsklasser (`-transition-fade-entering`, `-transition-scale-exited`, osv.) — kan bruges alene eller kædet til enhver komponent.

**Kilde:** [transition.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/transition/transition.css)

## Brug

```css
@import "@pantoken/components/utilities.css";
```

## Eksempler

```html
<div class="instui-transition -transition-fade-entering">Animated content</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.-transition-*` | Overgangstype/-tilstandsklasse slået til af runtime (`fade\|scale\|slide-*` + `entering\|entered\|exiting\|exited`). |
| `.-transition-fade-entered` | — |
| `.-transition-fade-entering` | — |
| `.-transition-fade-exited` | — |
| `.-transition-fade-exiting` | — |
| `.-transition-scale-entered` | — |
| `.-transition-scale-entering` | — |
| `.-transition-scale-exited` | — |
| `.-transition-scale-exiting` | — |
| `.-transition-slide-down-entered` | — |
| `.-transition-slide-down-entering` | — |
| `.-transition-slide-down-exited` | — |
| `.-transition-slide-down-exiting` | — |
| `.-transition-slide-left-entered` | — |
| `.-transition-slide-left-entering` | — |
| `.-transition-slide-left-exited` | — |
| `.-transition-slide-left-exiting` | — |
| `.-transition-slide-right-entered` | — |
| `.-transition-slide-right-entering` | — |
| `.-transition-slide-right-exited` | — |
| `.-transition-slide-right-exiting` | — |
| `.-transition-slide-up-entered` | — |
| `.-transition-slide-up-entering` | — |
| `.-transition-slide-up-exited` | — |
| `.-transition-slide-up-exiting` | — |

## Brugerdefinerede egenskaber

| Egenskab | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `--duration` | `<time>` | `300ms` | Animationens varighed (standard `300ms`); tilsidesæt for at fremskynde eller bremse hver overgangstilstand. |
| `--timing` | `*` | `ease-in-out` | Animation timing function (standard `ease-in-out`). |

