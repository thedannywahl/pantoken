# CSS: responsive

`[class*="-hidden-"],[class*="-show-"]` — Viewport- eller container-bredde vis/skjul-klasser på tværs af en temaiseret breakpoint-skala.

`.instui-hidden-max-&lt;bp&gt;`/`-hidden-min-&lt;bp&gt;` skjule efter viewport-bredde; `.instui-show-max-&lt;bp&gt;`/`-show-min-&lt;bp&gt;` er det modsatte (skjult som standard, vist kun inden for området via `display: revert`); varianterne `-cq-` reagerer på en `.instui-container` forfaders bredde i stedet, ikke viewportets. Skalaniveauer `xs`/`sm`/`md`/`lg`/`xl` (hentet fra IR's tray-width komponent-tokens) er hver især aliaseret til en lang stavemåde (`x-small`–`x-large`) og et enhedsnavn (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) — begge forældet til fordel for det korte navn — plus de uskalerede, temaiserede `content`/`content-full-width` niveauer (hovedindholdets max-bredde).

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/responsive/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
<div class="instui-show-min-sm">Shown only at or above the small breakpoint.</div>
```

## Modifiers

| Modifier                             | Description                                                                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-cq-hidden-max-content`            | Skjul, når den markerede container er på eller under `content` breakpoint (`68.75em`).                                                              |
| `.-cq-hidden-max-content-full-width` | Skjul, når den markerede container er på eller under `content-full-width` breakpoint (`98.75em`).                                                   |
| `.-cq-hidden-max-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                 |
| `.-cq-hidden-max-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                 |
| `.-cq-hidden-max-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-lg`.                                                 |
| `.-cq-hidden-max-lg`                 | Skjul, når den markerede container er på eller under `lg` breakpoint (`48em`).                                                                      |
| `.-cq-hidden-max-md`                 | Skjul, når den markerede container er på eller under `md` breakpoint (`30em`).                                                                      |
| `.-cq-hidden-max-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                 |
| `.-cq-hidden-max-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                 |
| `.-cq-hidden-max-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                 |
| `.-cq-hidden-max-sm`                 | Skjul, når den markerede container er på eller under `sm` breakpoint (`20em`).                                                                      |
| `.-cq-hidden-max-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-sm`.                                                 |
| `.-cq-hidden-max-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-md`.                                                 |
| `.-cq-hidden-max-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xl`.                                                 |
| `.-cq-hidden-max-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-max-xs`.                                                 |
| `.-cq-hidden-max-xl`                 | Skjul, når den markerede container er på eller under `xl` breakpoint (`62em`).                                                                      |
| `.-cq-hidden-max-xs`                 | Skjul, når den markerede container er på eller under `xs` breakpoint (`16em`).                                                                      |
| `.-cq-hidden-min-content`            | Skjul, når den markerede container er på eller over `content` breakpoint (`68.75em`).                                                               |
| `.-cq-hidden-min-content-full-width` | Skjul når den markerede beholder er på eller over `content-full-width` breakpoint (`98.75em`).                                                      |
| `.-cq-hidden-min-desktop`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                 |
| `.-cq-hidden-min-laptop`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                 |
| `.-cq-hidden-min-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-lg`.                                                 |
| `.-cq-hidden-min-lg`                 | Skjul når den markerede beholder er på eller over `lg` breakpoint (`48em`).                                                                         |
| `.-cq-hidden-min-md`                 | Skjul når den markerede beholder er på eller over `md` breakpoint (`30em`).                                                                         |
| `.-cq-hidden-min-medium`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                 |
| `.-cq-hidden-min-mobile`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                 |
| `.-cq-hidden-min-phablet`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                 |
| `.-cq-hidden-min-sm`                 | Skjul når den markerede beholder er på eller over `sm` breakpoint (`20em`).                                                                         |
| `.-cq-hidden-min-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-sm`.                                                 |
| `.-cq-hidden-min-tablet`             | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-md`.                                                 |
| `.-cq-hidden-min-x-large`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xl`.                                                 |
| `.-cq-hidden-min-x-small`            | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-hidden-min-xs`.                                                 |
| `.-cq-hidden-min-xl`                 | Skjul når den markerede beholder er på eller over `xl` breakpoint (`62em`).                                                                         |
| `.-cq-hidden-min-xs`                 | Skjul når den markerede beholder er på eller over `xs` breakpoint (`16em`).                                                                         |
| `.-cq-show-max-content`              | Vis når den markerede beholder er på eller under `content` breakpoint (`68.75em`); skjult ellers.                                                   |
| `.-cq-show-max-content-full-width`   | Vis når den markerede beholder er på eller under `content-full-width` breakpoint (`98.75em`); skjult ellers.                                        |
| `.-cq-show-max-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                   |
| `.-cq-show-max-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                   |
| `.-cq-show-max-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-lg`.                                                   |
| `.-cq-show-max-lg`                   | Vis når den markerede beholder er på eller under `lg` breakpoint (`48em`); skjult ellers.                                                           |
| `.-cq-show-max-md`                   | Vis når den markerede beholder er på eller under `md` breakpoint (`30em`); skjult ellers.                                                           |
| `.-cq-show-max-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                   |
| `.-cq-show-max-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                   |
| `.-cq-show-max-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                   |
| `.-cq-show-max-sm`                   | Vis når den markerede beholder er på eller under `sm` breakpoint (`20em`); skjult ellers.                                                           |
| `.-cq-show-max-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-sm`.                                                   |
| `.-cq-show-max-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-md`.                                                   |
| `.-cq-show-max-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xl`.                                                   |
| `.-cq-show-max-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-max-xs`.                                                   |
| `.-cq-show-max-xl`                   | Vis når den markerede beholder er på eller under `xl` breakpoint (`62em`); skjult ellers.                                                           |
| `.-cq-show-max-xs`                   | Vis når den markerede beholder er på eller under `xs` breakpoint (`16em`); skjult ellers.                                                           |
| `.-cq-show-min-content`              | Vis når den markerede beholder er på eller over `content` breakpoint (`68.75em`); skjult ellers.                                                    |
| `.-cq-show-min-content-full-width`   | Vis når den markerede beholder er på eller over `content-full-width` breakpoint (`98.75em`); skjult ellers.                                         |
| `.-cq-show-min-desktop`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                   |
| `.-cq-show-min-laptop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                   |
| `.-cq-show-min-large`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-lg`.                                                   |
| `.-cq-show-min-lg`                   | Vis når den markerede beholder er på eller over `lg` breakpoint (`48em`); skjult ellers.                                                            |
| `.-cq-show-min-md`                   | Vis når den markerede beholder er på eller over `md` breakpoint (`30em`); skjult ellers.                                                            |
| `.-cq-show-min-medium`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                   |
| `.-cq-show-min-mobile`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                   |
| `.-cq-show-min-phablet`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                   |
| `.-cq-show-min-sm`                   | Vis når den markerede beholder er på eller over `sm` breakpoint (`20em`); skjult ellers.                                                            |
| `.-cq-show-min-small`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-sm`.                                                   |
| `.-cq-show-min-tablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-md`.                                                   |
| `.-cq-show-min-x-large`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xl`.                                                   |
| `.-cq-show-min-x-small`              | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-cq-show-min-xs`.                                                   |
| `.-cq-show-min-xl`                   | Vis når den markerede beholder er på eller over `xl` breakpoint (`62em`); skjult ellers.                                                            |
| `.-cq-show-min-xs`                   | Vis når den markerede beholder er på eller over `xs` breakpoint (`16em`); skjult ellers.                                                            |
| `.-hidden-max-content`               | Skjul når visningsvinduet er på eller under `content` breakpoint (`68.75em`).                                                                       |
| `.-hidden-max-content-full-width`    | Skjul når visningsvinduet er på eller under `content-full-width` breakpoint (`98.75em`).                                                            |
| `.-hidden-max-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                    |
| `.-hidden-max-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                    |
| `.-hidden-max-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-lg`.                                                    |
| `.-hidden-max-lg`                    | Skjul når visningsvinduet er på eller under `lg` breakpoint (`48em`).                                                                               |
| `.-hidden-max-md`                    | Skjul når visningsvinduet er på eller under `md` breakpoint (`30em`).                                                                               |
| `.-hidden-max-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                    |
| `.-hidden-max-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                    |
| `.-hidden-max-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                    |
| `.-hidden-max-sm`                    | Skjul når visningsvinduet er på eller under `sm` breakpoint (`20em`).                                                                               |
| `.-hidden-max-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-sm`.                                                    |
| `.-hidden-max-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-md`.                                                    |
| `.-hidden-max-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xl`.                                                    |
| `.-hidden-max-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-max-xs`.                                                    |
| `.-hidden-max-xl`                    | Skjul når visningsvinduet er på eller under `xl` breakpoint (`62em`).                                                                               |
| `.-hidden-max-xs`                    | Skjul når visningsvinduet er på eller under `xs` breakpoint (`16em`).                                                                               |
| `.-hidden-min-content`               | Skjul når visningsvinduet er på eller over `content` breakpoint (`68.75em`).                                                                        |
| `.-hidden-min-content-full-width`    | Skjul når visningsvinduet er på eller over `content-full-width` breakpoint (`98.75em`).                                                             |
| `.-hidden-min-desktop`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                    |
| `.-hidden-min-laptop`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                    |
| `.-hidden-min-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-lg`.                                                    |
| `.-hidden-min-lg`                    | Skjul når visningsvinduet er på eller over `lg` breakpoint (`48em`).                                                                                |
| `.-hidden-min-md`                    | Skjul når visningsvinduet er på eller over `md` breakpoint (`30em`).                                                                                |
| `.-hidden-min-medium`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                    |
| `.-hidden-min-mobile`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                    |
| `.-hidden-min-phablet`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                    |
| `.-hidden-min-sm`                    | Skjul når visningsvinduet er på eller over `sm` breakpoint (`20em`).                                                                                |
| `.-hidden-min-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-sm`.                                                    |
| `.-hidden-min-tablet`                | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-md`.                                                    |
| `.-hidden-min-x-large`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xl`.                                                    |
| `.-hidden-min-x-small`               | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-hidden-min-xs`.                                                    |
| `.-hidden-min-xl`                    | Skjul når visningsvinduet er på eller over `xl` breakpoint (`62em`).                                                                                |
| `.-hidden-min-xs`                    | Skjul når visningsvinduet er på eller over `xs` breakpoint (`16em`).                                                                                |
| `.-show-max-content`                 | Vis (inverse af `-hidden-min-content`) når visningsvinduet er på eller under `content` breakpoint (`68.75em`); skjult ellers.                       |
| `.-show-max-content-full-width`      | Vis (inverse af `-hidden-min-content-full-width`) når visningsvinduet er på eller under `content-full-width` breakpoint (`98.75em`); skjult ellers. |
| `.-show-max-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                      |
| `.-show-max-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                      |
| `.-show-max-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-lg`.                                                      |
| `.-show-max-lg`                      | Vis (inverse af `-hidden-min-lg`) når visningsvinduet er på eller under `lg` breakpoint (`48em`); skjult ellers.                                    |
| `.-show-max-md`                      | Vis (inverse af `-hidden-min-md`) når visningsvinduet er på eller under `md` breakpoint (`30em`); skjult ellers.                                    |
| `.-show-max-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                      |
| `.-show-max-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                      |
| `.-show-max-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                      |
| `.-show-max-sm`                      | Vis (inverse af `-hidden-min-sm`) når visningsvinduet er på eller under `sm` breakpoint (`20em`); skjult ellers.                                    |
| `.-show-max-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-sm`.                                                      |
| `.-show-max-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-md`.                                                      |
| `.-show-max-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xl`.                                                      |
| `.-show-max-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-max-xs`.                                                      |
| `.-show-max-xl`                      | Vis (inverse af `-hidden-min-xl`) når visningsvinduet er på eller under `xl` breakpoint (`62em`); skjult ellers.                                    |
| `.-show-max-xs`                      | Vis (inverse af `-hidden-min-xs`) når visningsvinduet er på eller under `xs` breakpoint (`16em`); skjult ellers.                                    |
| `.-show-min-content`                 | Vis (inverse af `-hidden-max-content`) når visningsvinduet er på eller over `content` breakpoint (`68.75em`); skjult ellers.                        |
| `.-show-min-content-full-width`      | Vis (inverse af `-hidden-max-content-full-width`) når visningsvinduet er på eller over `content-full-width` breakpoint (`98.75em`); skjult ellers.  |
| `.-show-min-desktop`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                      |
| `.-show-min-laptop`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                      |
| `.-show-min-large`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-lg`.                                                      |
| `.-show-min-lg`                      | Vis (omvendt af `-hidden-max-lg`) når viewporten er på eller over `lg` breakpoint (`48em`); skjult ellers.                                          |
| `.-show-min-md`                      | Vis (omvendt af `-hidden-max-md`) når viewporten er på eller over `md` breakpoint (`30em`); skjult ellers.                                          |
| `.-show-min-medium`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                      |
| `.-show-min-mobile`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                      |
| `.-show-min-phablet`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                      |
| `.-show-min-sm`                      | Vis (omvendt af `-hidden-max-sm`) når viewporten er på eller over `sm` breakpoint (`20em`); skjult ellers.                                          |
| `.-show-min-small`                   | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-sm`.                                                      |
| `.-show-min-tablet`                  | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-md`.                                                      |
| `.-show-min-x-large`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xl`.                                                      |
| `.-show-min-x-small`                 | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-show-min-xs`.                                                      |
| `.-show-min-xl`                      | Vis (omvendt af `-hidden-max-xl`) når viewporten er på eller over `xl` breakpoint (`62em`); skjult ellers.                                          |
| `.-show-min-xs`                      | Vis (omvendt af `-hidden-max-xs`) når viewporten er på eller over `xs` breakpoint (`16em`); skjult ellers.                                          |

## Custom properties

| Property                           | Type       | Default   | Description                                                                                                                                                                            |
| ---------------------------------- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-bp-content`            | `<length>` | `68.75em` | Værdien af `content` breakpoint (`68.75em`, håndforfattet, tema (ikke i token IR)). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.            |
| `--pantoken-bp-content-full-width` | `<length>` | `98.75em` | Værdien af `content-full-width` breakpoint (`98.75em`, håndforfattet, tema (ikke i token IR)). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over. |
| `--pantoken-bp-lg`                 | `<length>` | `48em`    | Værdien af `lg` breakpoint (`48em`, spejler `--instui-component-tray-width-lg`). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.               |
| `--pantoken-bp-md`                 | `<length>` | `30em`    | Værdien af `md` breakpoint (`30em`, spejler `--instui-component-tray-width-md`). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.               |
| `--pantoken-bp-sm`                 | `<length>` | `20em`    | Værdien af `sm` breakpoint (`20em`, spejler `--instui-component-tray-width-sm`). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.               |
| `--pantoken-bp-xl`                 | `<length>` | `62em`    | Værdien af `xl` breakpoint (`62em`, spejler `--instui-component-tray-width-xl`). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.               |
| `--pantoken-bp-xs`                 | `<length>` | `16em`    | Værdien af `xs` breakpoint (`16em`, spejler `--instui-component-tray-width-xs`). Tilsidesættelse af det flytter ikke de kompilerede `@media`/`@container` tærskler over.               |

## Conditions

| Type      | Query                  | Description                                                                                      |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| media     | `(max-width: 16em)`    | Øvre grænse for `xs` breakpoint.                                                                 |
| media     | `(min-width: 16em)`    | Nedre grænse for `xs` breakpoint.                                                                |
| media     | `(max-width: 20em)`    | Øvre grænse for `sm` breakpoint.                                                                 |
| media     | `(min-width: 20em)`    | Nedre grænse for `sm` breakpoint.                                                                |
| media     | `(max-width: 30em)`    | Øvre grænse for `md` breakpoint.                                                                 |
| media     | `(min-width: 30em)`    | Nedre grænse for `md` breakpoint.                                                                |
| media     | `(max-width: 48em)`    | Øvre grænse for `lg` breakpoint.                                                                 |
| media     | `(min-width: 48em)`    | Nedre grænse for `lg` breakpoint.                                                                |
| media     | `(max-width: 62em)`    | Øvre grænse for `xl` breakpoint.                                                                 |
| media     | `(min-width: 62em)`    | Nedre grænse for `xl` breakpoint.                                                                |
| media     | `(max-width: 68.75em)` | Øvre grænse for `content` breakpoint.                                                            |
| media     | `(min-width: 68.75em)` | Nedre grænse for `content` breakpoint.                                                           |
| media     | `(max-width: 98.75em)` | Øvre grænse for `content-full-width` breakpoint.                                                 |
| media     | `(min-width: 98.75em)` | Nedre grænse for `content-full-width` breakpoint.                                                |
| container | `(max-width: 16em)`    | Øvre grænse for `xs` breakpoint, evalueret i forhold til en markeret container.                  |
| container | `(min-width: 16em)`    | Nedre grænse for `xs` breakpoint, evalueret i forhold til en markeret container.                 |
| container | `(max-width: 20em)`    | Øvre grænse for `sm` breakpoint, evalueret i forhold til en markeret container.                  |
| container | `(min-width: 20em)`    | Nedre grænse for `sm` breakpoint, evalueret i forhold til en markeret container.                 |
| container | `(max-width: 30em)`    | Øvre grænse for `md` breakpoint, evalueret i forhold til en markeret container.                  |
| container | `(min-width: 30em)`    | Nedre grænse for `md` breakpoint, evalueret i forhold til en markeret container.                 |
| container | `(max-width: 48em)`    | Øvre grænse for `lg` breakpoint, evalueret i forhold til en markeret container.                  |
| container | `(min-width: 48em)`    | Nedre grænse for `lg` breakpoint, evalueret i forhold til en markeret container.                 |
| container | `(max-width: 62em)`    | Øvre grænse for `xl` breakpoint, evalueret i forhold til en markeret container.                  |
| container | `(min-width: 62em)`    | Nedre grænse for `xl` breakpoint, evalueret i forhold til en markeret container.                 |
| container | `(max-width: 68.75em)` | Øvre grænse for `content` breakpoint, evalueret i forhold til en markeret container.             |
| container | `(min-width: 68.75em)` | Nedre grænse for `content` breakpoint, evalueret i forhold til en markeret container.            |
| container | `(max-width: 98.75em)` | Øvre grænse for `content-full-width` breakpoint, evalueret i forhold til en markeret container.  |
| container | `(min-width: 98.75em)` | Nedre grænse for `content-full-width` breakpoint, evalueret i forhold til en markeret container. |

## Tokens consumed

| Token                              | Type       | Value  |
| ---------------------------------- | ---------- | ------ |
| `--instui-component-tray-width-lg` | `<length>` | `48em` |
| `--instui-component-tray-width-md` | `<length>` | `30em` |
| `--instui-component-tray-width-sm` | `<length>` | `20em` |
| `--instui-component-tray-width-xl` | `<length>` | `62em` |
| `--instui-component-tray-width-xs` | `<length>` | `16em` |
