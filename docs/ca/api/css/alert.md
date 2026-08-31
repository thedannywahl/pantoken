# CSS: alert

`.instui-alert` · <span class="instui-pill -color-success pantoken-doc-tag">stable</span> — Un missatge en línia amb una barra de color d'estat i un glifó d'estat emmascarat del conjunt d'icones compartides.

Un `-icon-&lt;name&gt;` personalitzat intercanvia el glifó d'estat però manté la barra de color de la variant; l'ompliment de la barra es reafirma amb una especificitat superior de manera que el pintor d'icones compartides no la consumeixi.

**Font:** [alert.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/alert/alert.css)

<!-- js-requirement -->

> [!TIP]
> **JS Enhancement** — El CSS d'aquest component es representa i funciona per si sol; emparella'l amb `@pantoken/interactions` per afegir el comportament interactiu. El seu modificador `-timeout` és impulsat per aquest comportament. Mira la [taula de modificadors a continuació](#modifiers).

## Accessibility

Per a un missatge important, afegeix `role="alert"` o una regió `aria-live` perquè la tecnologia d'assistència l'anunci; el control de tancament és un botó de tancament etiquetat (el `.instui-close-button` de l'exemple porta `aria-label="Close"`).

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/alert.css";
```

## Examples

-nocard

```html
<div class="instui-alert -icon-megaphone --mb-md">
  An alert with the default <code>info</code> color, and a custom icon.
</div>
<div class="instui-alert -color-success">
  Congratulations! You're using the "success" color.
  <button class="instui-close-button -size-sm" aria-label="Close"></button>
</div>
```

## Structure

```text
.instui-alert
  ‹content›
  close-button (component, 0..1)
```

```mermaid
flowchart TD
  n0[".instui-alert"]:::cssdoc-root
  n1[/"‹content›"/]:::cssdoc-slot
  n2(["close-button"]):::cssdoc-component
  n0 --> n1
  n0 -.->|0..1| n2
  click n2 "/api/css/close-button.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Slots

| Slot      | Description                                                               |
| --------- | ------------------------------------------------------------------------- |
| `content` | El contingut del missatge de l'alerta; pot incloure un botó de tancament. |

## Modifiers

| Modifier                 | Description                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.-color-danger`         | Un missatge d'error.                                                                                                                                                                                             |
| `.-color-info`           | Informatiu (per defecte).                                                                                                                                                                                        |
| `.-color-success`        | Un missatge positiu/de confirmació.                                                                                                                                                                              |
| `.-color-warning`        | Un missatge de precaució.                                                                                                                                                                                        |
| `.-has-shadow-false`     | <span class="instui-pill -color-info pantoken-doc-tag">Alias</span> — maps to `.-without-shadow`.                                                                                                                |
| `.-icon-*`               | Intercanvia el glifo d'estat per una icona personalitzada (p. ex. `-icon-megaphone`), mantinguda blanca a la barra de color de la variant.                                                                       |
| `.-render-custom-icon-*` | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — The former `renderCustomIcon` prop; still works as an alias, but use `-icon-<name>` (or override `--pantoken-alert-glyph`) instead. |
| `.-screen-reader-only`   | Ocultat visualment però anunciat.                                                                                                                                                                                |
| `.-timeout`              | <span class="instui-pill pantoken-doc-tag pantoken-doc-tag-interaction">Interaction</span> — The alert will automatically dismiss after a default of 5 seconds.                                                  |
| `.-timeout-1`            | Un segon abans del tancament automàtic.                                                                                                                                                                          |
| `.-timeout-2`            | Dos segons abans del tancament automàtic.                                                                                                                                                                        |
| `.-timeout-3`            | Tres segons abans del tancament automàtic.                                                                                                                                                                       |
| `.-timeout-4`            | Quatre segons abans del tancament automàtic.                                                                                                                                                                     |
| `.-timeout-5`            | Cinc segons abans del tancament automàtic.                                                                                                                                                                       |
| `.-variant-error`        | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-danger`.                                                                                                               |
| `.-variant-info`         | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-info`.                                                                                                                 |
| `.-variant-success`      | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-success`.                                                                                                              |
| `.-variant-warning`      | <span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span> — use `.-color-warning`.                                                                                                              |
| `.-without-shadow`       | Elimina l'ombra d'elevació per defecte (InstUI `hasShadow={false}`).                                                                                                                                             |

## Pseudo-elements

| Pseudo-element | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `::after`      | El glifo d'estat blanc, emmascarat i centrat sobre la barra.                              |
| `::before`     | La barra d'estat sòlida de color de la variant, enrasada amb l'aresta d'inici arrodonida. |

## Custom properties

| Property                   | Type        | Default | Description                                                                                                                                                  |
| -------------------------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--pantoken-alert-glyph`   | `<url>`     | —       | La font del glifo d'estat de baix nivell; `-icon-&lt;name&gt;` la configura per a tu. Substitució per a una icona personalitzada (un SVG codificat per URL). |
| `--pantoken-alert-icon-bg` | `<color>`   | —       | L'omplerta de barra d'estat de color darrere del glifo; cada variant `-color-*` estableix la seva pròpia.                                                    |
| `--timeout`                | `<integer>` | —       | Mil·lisegons abans del tancament automàtic; `0` la desactiva. Requereix el paquet d'interacció d'alertes.                                                    |

## Tokens consumed

| Token                                                 | Type                                               | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--instui-component-alert-background`                 | `<color>`                                          | `light-dark(#ffffff, #171B21)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-alert-border-radius`              | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-border-style`               | —                                                  | `solid`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--instui-component-alert-border-width`               | `<length>`                                         | `0.125rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `--instui-component-alert-color`                      | `<color>`                                          | `light-dark(#273540, #ffffff)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `--instui-component-alert-content-font-family`        | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--instui-component-alert-content-font-size`          | `<length>`                                         | `1rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--instui-component-alert-content-font-weight`        | `<integer>`                                        | `400`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--instui-component-alert-content-line-height`        | `<percentage>`                                     | `125%`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `--instui-component-alert-content-padding-horizontal` | `<length>`                                         | `1.5rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--instui-component-alert-content-padding-vertical`   | `<length>`                                         | `0.75rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-danger-border-color`        | `<color>`                                          | `#E62429`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-danger-icon-background`     | `<color>`                                          | `#E62429`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-icon-color`                 | `<color>`                                          | `#ffffff`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-info-border-color`          | `<color>`                                          | `#2B7ABC`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-info-icon-background`       | `<color>`                                          | `#2B7ABC`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-success-border-color`       | `<color>`                                          | `#03893D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-success-icon-background`    | `<color>`                                          | `#03893D`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-warning-border-color`       | `<color>`                                          | `#CF4A00`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-alert-warning-icon-background`    | `<color>`                                          | `#CF4A00`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--instui-component-base-button-medium-height`        | `<length>`                                         | `2.5rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--instui-elevation-above`                            | `none \| <shadow>#`                                | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--instui-icon-circle-check`                          | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m9%2012%202%202%204-4%22%2F%3E%3C%2Fsvg%3E')`                                                                                                   |
| `--instui-icon-circle-x`                              | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22m15%209-6%206%22%2F%3E%3Cpath%20d%3D%22m9%209%206%206%22%2F%3E%3C%2Fsvg%3E')`                                                                   |
| `--instui-icon-info`                                  | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M12%2016v-4%22%2F%3E%3Cpath%20d%3D%22M12%208h.01%22%2F%3E%3C%2Fsvg%3E')`                                                                        |
| `--instui-icon-triangle-alert`                        | `<image>`                                          | `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m21.73%2018-8-14a2%202%200%200%200-3.48%200l-8%2014A2%202%200%200%200%204%2021h16a2%202%200%200%200%201.73-3%22%2F%3E%3Cpath%20d%3D%22M12%209v4%22%2F%3E%3Cpath%20d%3D%22M12%2017h.01%22%2F%3E%3C%2Fsvg%3E')` |
| `--instui-spacing-space-xs`                           | `<length>`                                         | `0.25rem`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--pantoken-glyph`                                    | `<url>`                                            | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

## Subcomponents

- [close-button](/ca/api/css/close-button.md)

## Related

- [close-button](/ca/api/css/close-button.md) — El control de tancament que una alerta pot incloure.
