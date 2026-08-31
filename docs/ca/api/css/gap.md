# CSS: gap

`.--gap-md` — Utilitats Flex/grid `gap` a l'escala d'espaiament, ortografia curta (`--gap-sm`) o llarga (`--gap-small`). Usables nues o encadenades a qualsevol component (`.instui-view.--gap-sm`) — els components que ja estableixen el seu propi `gap` a partir d'un token específic del component podrien tenir-lo sobrescrit.

**Font:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:gap
```

## Examples

```html
<div class="--display-flex --gap-sm">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifiers

| Modifier    | Description                                               |
| ----------- | --------------------------------------------------------- |
| `.--gap-md` | Aplica el token d'espaiat mitjà com a separació.          |
| `.--gap-*`  | Utilitats d'espaiat en notacions d'espaciat curt i llarg. |

## Tokens consumed

| Token                                                         | Type       | Value      |
| ------------------------------------------------------------- | ---------- | ---------- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem`     |
| `--instui-spacing-space-lg`                                   | `<length>` | `1rem`     |
| `--instui-spacing-space-md`                                   | `<length>` | `0.75rem`  |
| `--instui-spacing-space-sm`                                   | `<length>` | `0.5rem`   |
| `--instui-spacing-space-xl`                                   | `<length>` | `1.5rem`   |
| `--instui-spacing-space-xs`                                   | `<length>` | `0.25rem`  |
| `--instui-spacing-space2xl`                                   | `<length>` | `2rem`     |
| `--instui-spacing-space2xs`                                   | `<length>` | `0.125rem` |
