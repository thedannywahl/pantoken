# CSS: gap

`.--gap-md` — Flex/grid `gap` utilities on the spacing scale, short (`--gap-sm`) or long (`--gap-small`) spelling. Usable bare or chained onto any component (`.instui-view.--gap-sm`) — components that already set their own `gap` from a component-specific token may have it overridden.

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/gap/index.ts)

## उपयोग

```css
@import "@pantoken/components/utilities.css";
```

## डेमो

```demo
self:gap
```

## उदाहरण

```html
<div class="--display-flex --gap-sm">
  <span>One</span>
  <span>Two</span>
</div>
```

## मॉडिफायर

| मॉडिफायर | विवरण |
| --- | --- |
| `.--gap-md` | Applies the medium spacing token as the gap. |
| `.--gap-*` | Gap utilities across short and long spacing-step spellings. |

## उपयोग किये गए टोकन

| टोकन | प्रकार | मान |
| --- | --- | --- |
| `--instui-component-shared-tokens-spacing-general-space-none` | `<length>` | `0rem` |
| `--instui-spacing-space-lg` | `<length>` | `1rem` |
| `--instui-spacing-space-md` | `<length>` | `0.75rem` |
| `--instui-spacing-space-sm` | `<length>` | `0.5rem` |
| `--instui-spacing-space-xl` | `<length>` | `1.5rem` |
| `--instui-spacing-space-xs` | `<length>` | `0.25rem` |
| `--instui-spacing-space2xl` | `<length>` | `2rem` |
| `--instui-spacing-space2xs` | `<length>` | `0.125rem` |

