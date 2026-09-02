# CSS: calendar.day

`.day` — A day cell (InstUI `Calendar.Day`); `-today`, `-selected`, and `-outside-month` mark its state.

## Utilisation

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/calendar.day.css";
```

## Modificateurs

| Modificateur | Description |
| --- | --- |
| `.-outside-month` | A day from the adjacent month (leading/trailing filler). |
| `.-selected` | The selected date. |
| `.-today` | Today's date. |

## Jetons consommés

| Jeton | Type | Valeur |
| --- | --- | --- |
| `--instui-component-calendar-day-background` | `<color>` | `light-dark(#ffffff, #171B21)` |
| `--instui-component-calendar-day-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-calendar-day-font-size` | `<length>` | `1rem` |
| `--instui-component-calendar-day-height` | `<length>` | `2rem` |
| `--instui-component-calendar-day-min-width` | `<length>` | `2rem` |
| `--instui-component-calendar-day-outside-month-color` | `<color>` | `light-dark(#576773, #AAB0B5)` |
| `--instui-component-calendar-day-selected-background` | `<color>` | `#037D37` |
| `--instui-component-calendar-day-selected-border-radius` | `<length>` | `0.75rem` |
| `--instui-component-calendar-day-selected-color` | `<color>` | `#ffffff` |
| `--instui-component-calendar-day-today-background` | `<color>` | `light-dark(#1D354F, #EEF4FD)` |
| `--instui-component-calendar-day-today-border-radius` | `<length>` | `999rem` |
| `--instui-component-calendar-day-today-color` | `<color>` | `light-dark(#ffffff, #1C222B)` |

