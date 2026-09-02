# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — Viewport- or container-width show/hide classes across a themed breakpoint scale.

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` hide by viewport width; `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` are the inverse (hidden by default, shown only inside the range via `display: revert`); the `-cq-` variants react to a `.instui-container` ancestor's width instead, not the viewport's. Scale tiers `xs`/`sm`/`md`/`lg`/`xl` (sourced from the IR's tray-width component tokens) are each aliased to a long-form spelling (`x-small`–`x-large`) and a device name (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — both deprecated in favor of the short name — plus the unscaled, themed `content`/`content-full-width` tiers (the main content area's max-width).

**Source:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

## Użycie

```css
@import "@pantoken/components/utilities.css";
```

## Przykłady

```html
<div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
<div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
```

## Modyfikatory

| Modyfikator | Opis |
| --- | --- |
| `.-cq-hidden-max-content` | Hide when the marked container is at or below the `content` breakpoint (`68.75em`). |
| `.-cq-hidden-max-content-full-width` | Hide when the marked container is at or below the `content-full-width` breakpoint (`98.75em`). |
| `.-cq-hidden-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`. |
| `.-cq-hidden-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`. |
| `.-cq-hidden-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`. |
| `.-cq-hidden-max-lg` | Hide when the marked container is at or below the `lg` breakpoint (`48em`). |
| `.-cq-hidden-max-md` | Hide when the marked container is at or below the `md` breakpoint (`30em`). |
| `.-cq-hidden-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`. |
| `.-cq-hidden-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`. |
| `.-cq-hidden-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`. |
| `.-cq-hidden-max-sm` | Hide when the marked container is at or below the `sm` breakpoint (`20em`). |
| `.-cq-hidden-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`. |
| `.-cq-hidden-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`. |
| `.-cq-hidden-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`. |
| `.-cq-hidden-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`. |
| `.-cq-hidden-max-xl` | Hide when the marked container is at or below the `xl` breakpoint (`62em`). |
| `.-cq-hidden-max-xs` | Hide when the marked container is at or below the `xs` breakpoint (`16em`). |
| `.-cq-hidden-min-content` | Hide when the marked container is at or above the `content` breakpoint (`68.75em`). |
| `.-cq-hidden-min-content-full-width` | Hide when the marked container is at or above the `content-full-width` breakpoint (`98.75em`). |
| `.-cq-hidden-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`. |
| `.-cq-hidden-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`. |
| `.-cq-hidden-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`. |
| `.-cq-hidden-min-lg` | Hide when the marked container is at or above the `lg` breakpoint (`48em`). |
| `.-cq-hidden-min-md` | Hide when the marked container is at or above the `md` breakpoint (`30em`). |
| `.-cq-hidden-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`. |
| `.-cq-hidden-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`. |
| `.-cq-hidden-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`. |
| `.-cq-hidden-min-sm` | Hide when the marked container is at or above the `sm` breakpoint (`20em`). |
| `.-cq-hidden-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`. |
| `.-cq-hidden-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`. |
| `.-cq-hidden-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`. |
| `.-cq-hidden-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`. |
| `.-cq-hidden-min-xl` | Hide when the marked container is at or above the `xl` breakpoint (`62em`). |
| `.-cq-hidden-min-xs` | Hide when the marked container is at or above the `xs` breakpoint (`16em`). |
| `.-cq-show-max-content` | Show when the marked container is at or below the `content` breakpoint (`68.75em`); hidden otherwise. |
| `.-cq-show-max-content-full-width` | Show when the marked container is at or below the `content-full-width` breakpoint (`98.75em`); hidden otherwise. |
| `.-cq-show-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`. |
| `.-cq-show-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`. |
| `.-cq-show-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`. |
| `.-cq-show-max-lg` | Show when the marked container is at or below the `lg` breakpoint (`48em`); hidden otherwise. |
| `.-cq-show-max-md` | Show when the marked container is at or below the `md` breakpoint (`30em`); hidden otherwise. |
| `.-cq-show-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`. |
| `.-cq-show-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`. |
| `.-cq-show-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`. |
| `.-cq-show-max-sm` | Show when the marked container is at or below the `sm` breakpoint (`20em`); hidden otherwise. |
| `.-cq-show-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`. |
| `.-cq-show-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`. |
| `.-cq-show-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`. |
| `.-cq-show-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`. |
| `.-cq-show-max-xl` | Show when the marked container is at or below the `xl` breakpoint (`62em`); hidden otherwise. |
| `.-cq-show-max-xs` | Show when the marked container is at or below the `xs` breakpoint (`16em`); hidden otherwise. |
| `.-cq-show-min-content` | Show when the marked container is at or above the `content` breakpoint (`68.75em`); hidden otherwise. |
| `.-cq-show-min-content-full-width` | Show when the marked container is at or above the `content-full-width` breakpoint (`98.75em`); hidden otherwise. |
| `.-cq-show-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`. |
| `.-cq-show-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`. |
| `.-cq-show-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`. |
| `.-cq-show-min-lg` | Show when the marked container is at or above the `lg` breakpoint (`48em`); hidden otherwise. |
| `.-cq-show-min-md` | Show when the marked container is at or above the `md` breakpoint (`30em`); hidden otherwise. |
| `.-cq-show-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`. |
| `.-cq-show-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`. |
| `.-cq-show-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`. |
| `.-cq-show-min-sm` | Show when the marked container is at or above the `sm` breakpoint (`20em`); hidden otherwise. |
| `.-cq-show-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`. |
| `.-cq-show-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`. |
| `.-cq-show-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`. |
| `.-cq-show-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`. |
| `.-cq-show-min-xl` | Show when the marked container is at or above the `xl` breakpoint (`62em`); hidden otherwise. |
| `.-cq-show-min-xs` | Show when the marked container is at or above the `xs` breakpoint (`16em`); hidden otherwise. |
| `.-hidden-max-content` | Hide when the viewport is at or below the `content` breakpoint (`68.75em`). |
| `.-hidden-max-content-full-width` | Hide when the viewport is at or below the `content-full-width` breakpoint (`98.75em`). |
| `.-hidden-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`. |
| `.-hidden-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`. |
| `.-hidden-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`. |
| `.-hidden-max-lg` | Hide when the viewport is at or below the `lg` breakpoint (`48em`). |
| `.-hidden-max-md` | Hide when the viewport is at or below the `md` breakpoint (`30em`). |
| `.-hidden-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`. |
| `.-hidden-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`. |
| `.-hidden-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`. |
| `.-hidden-max-sm` | Hide when the viewport is at or below the `sm` breakpoint (`20em`). |
| `.-hidden-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`. |
| `.-hidden-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`. |
| `.-hidden-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`. |
| `.-hidden-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`. |
| `.-hidden-max-xl` | Hide when the viewport is at or below the `xl` breakpoint (`62em`). |
| `.-hidden-max-xs` | Hide when the viewport is at or below the `xs` breakpoint (`16em`). |
| `.-hidden-min-content` | Hide when the viewport is at or above the `content` breakpoint (`68.75em`). |
| `.-hidden-min-content-full-width` | Hide when the viewport is at or above the `content-full-width` breakpoint (`98.75em`). |
| `.-hidden-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`. |
| `.-hidden-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`. |
| `.-hidden-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`. |
| `.-hidden-min-lg` | Hide when the viewport is at or above the `lg` breakpoint (`48em`). |
| `.-hidden-min-md` | Hide when the viewport is at or above the `md` breakpoint (`30em`). |
| `.-hidden-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`. |
| `.-hidden-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`. |
| `.-hidden-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`. |
| `.-hidden-min-sm` | Hide when the viewport is at or above the `sm` breakpoint (`20em`). |
| `.-hidden-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`. |
| `.-hidden-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`. |
| `.-hidden-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`. |
| `.-hidden-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`. |
| `.-hidden-min-xl` | Hide when the viewport is at or above the `xl` breakpoint (`62em`). |
| `.-hidden-min-xs` | Hide when the viewport is at or above the `xs` breakpoint (`16em`). |
| `.-show-max-content` | Show (inverse of `-hidden-min-content`) when the viewport is at or below the `content` breakpoint (`68.75em`); hidden otherwise. |
| `.-show-max-content-full-width` | Show (inverse of `-hidden-min-content-full-width`) when the viewport is at or below the `content-full-width` breakpoint (`98.75em`); hidden otherwise. |
| `.-show-max-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`. |
| `.-show-max-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`. |
| `.-show-max-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`. |
| `.-show-max-lg` | Show (inverse of `-hidden-min-lg`) when the viewport is at or below the `lg` breakpoint (`48em`); hidden otherwise. |
| `.-show-max-md` | Show (inverse of `-hidden-min-md`) when the viewport is at or below the `md` breakpoint (`30em`); hidden otherwise. |
| `.-show-max-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`. |
| `.-show-max-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`. |
| `.-show-max-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`. |
| `.-show-max-sm` | Show (inverse of `-hidden-min-sm`) when the viewport is at or below the `sm` breakpoint (`20em`); hidden otherwise. |
| `.-show-max-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`. |
| `.-show-max-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`. |
| `.-show-max-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`. |
| `.-show-max-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`. |
| `.-show-max-xl` | Show (inverse of `-hidden-min-xl`) when the viewport is at or below the `xl` breakpoint (`62em`); hidden otherwise. |
| `.-show-max-xs` | Show (inverse of `-hidden-min-xs`) when the viewport is at or below the `xs` breakpoint (`16em`); hidden otherwise. |
| `.-show-min-content` | Show (inverse of `-hidden-max-content`) when the viewport is at or above the `content` breakpoint (`68.75em`); hidden otherwise. |
| `.-show-min-content-full-width` | Show (inverse of `-hidden-max-content-full-width`) when the viewport is at or above the `content-full-width` breakpoint (`98.75em`); hidden otherwise. |
| `.-show-min-desktop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`. |
| `.-show-min-laptop` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`. |
| `.-show-min-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`. |
| `.-show-min-lg` | Show (inverse of `-hidden-max-lg`) when the viewport is at or above the `lg` breakpoint (`48em`); hidden otherwise. |
| `.-show-min-md` | Show (inverse of `-hidden-max-md`) when the viewport is at or above the `md` breakpoint (`30em`); hidden otherwise. |
| `.-show-min-medium` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`. |
| `.-show-min-mobile` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`. |
| `.-show-min-phablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`. |
| `.-show-min-sm` | Show (inverse of `-hidden-max-sm`) when the viewport is at or above the `sm` breakpoint (`20em`); hidden otherwise. |
| `.-show-min-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`. |
| `.-show-min-tablet` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`. |
| `.-show-min-x-large` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`. |
| `.-show-min-x-small` | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`. |
| `.-show-min-xl` | Show (inverse of `-hidden-max-xl`) when the viewport is at or above the `xl` breakpoint (`62em`); hidden otherwise. |
| `.-show-min-xs` | Show (inverse of `-hidden-max-xs`) when the viewport is at or above the `xs` breakpoint (`16em`); hidden otherwise. |

## Własne właściwości

| Właściwość | Typ | Domyślny | Opis |
| --- | --- | --- | --- |
| `--pantoken-bp-content` | `<length>` | `68.75em` | The `content` breakpoint's value (`68.75em`, hand-authored, themed (not in the token IR)). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | The `content-full-width` breakpoint's value (`98.75em`, hand-authored, themed (not in the token IR)). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-lg` | `<length>` | `48em` | The `lg` breakpoint's value (`48em`, mirrors `--instui-component-tray-width-lg`). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-md` | `<length>` | `30em` | The `md` breakpoint's value (`30em`, mirrors `--instui-component-tray-width-md`). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-sm` | `<length>` | `20em` | The `sm` breakpoint's value (`20em`, mirrors `--instui-component-tray-width-sm`). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-xl` | `<length>` | `62em` | The `xl` breakpoint's value (`62em`, mirrors `--instui-component-tray-width-xl`). Overriding it does not move the compiled `@media`/`@container` thresholds above. |
| `--pantoken-bp-xs` | `<length>` | `16em` | The `xs` breakpoint's value (`16em`, mirrors `--instui-component-tray-width-xs`). Overriding it does not move the compiled `@media`/`@container` thresholds above. |

## Warunki

| Typ | Zapytanie | Opis |
| --- | --- | --- |
| media | `(max-width: 16em)` | Upper bound of the `xs` breakpoint. |
| media | `(min-width: 16em)` | Lower bound of the `xs` breakpoint. |
| media | `(max-width: 20em)` | Upper bound of the `sm` breakpoint. |
| media | `(min-width: 20em)` | Lower bound of the `sm` breakpoint. |
| media | `(max-width: 30em)` | Upper bound of the `md` breakpoint. |
| media | `(min-width: 30em)` | Lower bound of the `md` breakpoint. |
| media | `(max-width: 48em)` | Upper bound of the `lg` breakpoint. |
| media | `(min-width: 48em)` | Lower bound of the `lg` breakpoint. |
| media | `(max-width: 62em)` | Upper bound of the `xl` breakpoint. |
| media | `(min-width: 62em)` | Lower bound of the `xl` breakpoint. |
| media | `(max-width: 68.75em)` | Upper bound of the `content` breakpoint. |
| media | `(min-width: 68.75em)` | Lower bound of the `content` breakpoint. |
| media | `(max-width: 98.75em)` | Upper bound of the `content-full-width` breakpoint. |
| media | `(min-width: 98.75em)` | Lower bound of the `content-full-width` breakpoint. |
| container | `(max-width: 16em)` | Upper bound of the `xs` breakpoint, evaluated against a marked container. |
| container | `(min-width: 16em)` | Lower bound of the `xs` breakpoint, evaluated against a marked container. |
| container | `(max-width: 20em)` | Upper bound of the `sm` breakpoint, evaluated against a marked container. |
| container | `(min-width: 20em)` | Lower bound of the `sm` breakpoint, evaluated against a marked container. |
| container | `(max-width: 30em)` | Upper bound of the `md` breakpoint, evaluated against a marked container. |
| container | `(min-width: 30em)` | Lower bound of the `md` breakpoint, evaluated against a marked container. |
| container | `(max-width: 48em)` | Upper bound of the `lg` breakpoint, evaluated against a marked container. |
| container | `(min-width: 48em)` | Lower bound of the `lg` breakpoint, evaluated against a marked container. |
| container | `(max-width: 62em)` | Upper bound of the `xl` breakpoint, evaluated against a marked container. |
| container | `(min-width: 62em)` | Lower bound of the `xl` breakpoint, evaluated against a marked container. |
| container | `(max-width: 68.75em)` | Upper bound of the `content` breakpoint, evaluated against a marked container. |
| container | `(min-width: 68.75em)` | Lower bound of the `content` breakpoint, evaluated against a marked container. |
| container | `(max-width: 98.75em)` | Upper bound of the `content-full-width` breakpoint, evaluated against a marked container. |
| container | `(min-width: 98.75em)` | Lower bound of the `content-full-width` breakpoint, evaluated against a marked container. |

## Zużyte tokeny

| Token | Typ | Wartość |
| --- | --- | --- |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |

