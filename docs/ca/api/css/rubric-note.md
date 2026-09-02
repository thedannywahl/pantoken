# CSS: rubric-note

`div[class~="instui-rubric-note"]` — Nota estructurada amb categories de rúbrica i indicadors de puntuació.

✅ Utilitza Rubric-Note quan:

- Mostrant rúbrica de qualificació o criteris d'avaluació
- Necessites estructurar contingut per categoria amb puntuacions o indicadors
- La disposició ha d'emfasitzar estructura i jerarquia
🚫 No utilitzis Rubric-Note quan:

- Mostrant notes o comentaris simples — utilitza Callout en canvi
- Es necessita lògica de qualificació complexa — considera un component personalitzat

## Accessibilitat

- Utilitza semàntica de taula si mostres una rúbrica veritable amb files i columnes
- Assegura't que els indicadors de puntuació no siguin només de color
- Proporciona etiquetes descriptives per a cada categoria

## Ús

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part | Descripció |
| --- | --- |
| `.instui-criteria` | Contenidor per a files de criteris de rúbrica. |
| `.instui-description` | Descripció detallada del criteri. |
| `.instui-header` | Capçalera amb títol i metadades. |
| `.instui-name` | Nom del criteri o categoria. |
| `.instui-row` | Fila de criteri individual. |
| `.instui-score` | Indicador de puntuació o insígnia. |

## Estats

| Estat | Descripció |
| --- | --- |
| `:optional` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-background` | — | — |
| `--instui-color-border` | — | — |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-color-primary` | — | — |
| `--instui-color-surface` | — | — |
| `--instui-color-text-secondary` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-font-weight-semibold` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Relacionat

- [card](/ca/api/css/card.md)

