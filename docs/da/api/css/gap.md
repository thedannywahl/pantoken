# CSS: gap

`.--gap-md` — Flex/grid `gap` værktøjer på afstandsskalaen, kort (`--gap-sm`) eller lang (`--gap-small`) stavning. Brugbar bare eller kædet til enhver komponent (`.instui-view.--gap-sm`) — komponenter, der allerede indstiller deres eget `gap` fra et komponent-specifikt token, kan få det tilsidesat.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

## Brug

```css
@import "@pantoken/components/utilities.css";
```

## Demo

```demo
self:gap
```

## Eksempler

```html
<div class="--display-flex --gap-sm">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifikatorer

| Modifikator | Beskrivelse |
| --- | --- |
| `.--gap-md` | Anvender det mellemste afstandstoken som gap. |
| `.--gap-*` | Gapværktøjer på tværs af korte og lange stavemåder af afstandstrin. |

## Forbrugte tokens

| Token | Type | Værdi |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

