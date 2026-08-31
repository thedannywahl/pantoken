# CSS: page-layout

`div[class~="instui-page-layout"]` — Standard tre-kolonnes sidelayout med header, sidebar og hovedindhold.

✅ Brug Page-Layout når:

- Du har brug for en klassisk sidestruktur med navigations- og indholdsområder
- Siden har et klart hovedindholdsområde flankeret af komplementære områder
- Du ønsker ensartet spacing og justering på hele layoutet
  🚫 Brug ikke Page-Layout når:

- Opbygning af en enkelt-kolonne side — brug et enklere layout i stedet
- Sidebjælken konkurrerer med hovedindhold om vigtighed

## Accessibility

- Kortlæg hovedindholdsområdet til et `&lt;main&gt;` landemærke
- Giv sidebjælken `role="navigation"` eller `role="complementary"` efter behov
- Sørg for, at landemærkeregioner har forskellige aria-labels

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                    |
| ----------------- | ---------------------------------------------- |
| `.instui-body`    | Hovedkroppen indeholder sidebjælke og indhold. |
| `.instui-footer`  | Bundsidefodregion.                             |
| `.instui-header`  | Top header-region.                             |
| `.instui-main`    | Centralt indholdsområde.                       |
| `.instui-sidebar` | Venstre navigation eller hjælpekolonne.        |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-border`             | —          | —     |
| `--instui-color-footer-background`  | —          | —     |
| `--instui-color-footer-text`        | —          | —     |
| `--instui-color-header-background`  | —          | —     |
| `--instui-color-sidebar-background` | —          | —     |
| `--instui-font-size-small`          | `<length>` | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [wrapper](/da/api/css/wrapper.md)
