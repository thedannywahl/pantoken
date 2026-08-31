# CSS: transition

`.instui-transition.-transition-fade-entering` — Անիմացիոն վիճակի դասեր `Transition` բաղադրիչի համար — `.instui-transition` և վիճակի դասեր (`-transition-fade-entering`, `-transition-scale-exited`, և այլն) — օգտագործել ինքնուրույն կամ շղթայված ցանկացած բաղադրիչի հետ:

**Աղբյուր։** [transition.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/transition/transition.css)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="instui-transition -transition-fade-entering">Animated content</div>
```

## Modifiers

| Modifier                            | Description                                                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `.-transition-*`                    | Անցում տեսակ/վիճակի դաս, որը մեկ-անջատվում է միջավարման ժամանակ (`fade\|scale\|slide-*` + `entering\|entered\|exiting\|exited`): |
| `.-transition-fade-entered`         | —                                                                                                                                |
| `.-transition-fade-entering`        | —                                                                                                                                |
| `.-transition-fade-exited`          | —                                                                                                                                |
| `.-transition-fade-exiting`         | —                                                                                                                                |
| `.-transition-scale-entered`        | —                                                                                                                                |
| `.-transition-scale-entering`       | —                                                                                                                                |
| `.-transition-scale-exited`         | —                                                                                                                                |
| `.-transition-scale-exiting`        | —                                                                                                                                |
| `.-transition-slide-down-entered`   | —                                                                                                                                |
| `.-transition-slide-down-entering`  | —                                                                                                                                |
| `.-transition-slide-down-exited`    | —                                                                                                                                |
| `.-transition-slide-down-exiting`   | —                                                                                                                                |
| `.-transition-slide-left-entered`   | —                                                                                                                                |
| `.-transition-slide-left-entering`  | —                                                                                                                                |
| `.-transition-slide-left-exited`    | —                                                                                                                                |
| `.-transition-slide-left-exiting`   | —                                                                                                                                |
| `.-transition-slide-right-entered`  | —                                                                                                                                |
| `.-transition-slide-right-entering` | —                                                                                                                                |
| `.-transition-slide-right-exited`   | —                                                                                                                                |
| `.-transition-slide-right-exiting`  | —                                                                                                                                |
| `.-transition-slide-up-entered`     | —                                                                                                                                |
| `.-transition-slide-up-entering`    | —                                                                                                                                |
| `.-transition-slide-up-exited`      | —                                                                                                                                |
| `.-transition-slide-up-exiting`     | —                                                                                                                                |

## Custom properties

| Property     | Type     | Default       | Description                                                                                                    |
| ------------ | -------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `--duration` | `<time>` | `300ms`       | Անիմացիոն տևողություն (լռելյալ `300ms`); վերակազմել՝ արագացնելու կամ դանդաղեցնելու յուրաքանչյուր անցման վիճակ: |
| `--timing`   | `*`      | `ease-in-out` | Անիմացիոն ժամանակային ֆունկցիա (լռելյալ `ease-in-out`):                                                        |
