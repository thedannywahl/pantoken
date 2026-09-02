# CSS: page-layout

`div[class~="instui-page-layout"]` — Disposició de pàgina estàndard de tres columnes amb capçalera, barra lateral i contingut principal.

✅ Utilitzeu Page-Layout quan:

- Necessiteu una estructura de pàgina clàssica amb àrees de navegació i contingut
- La pàgina té una zona de contingut principal clara flanquejada per regions complementàries
- Voleu espaiat consistent i alineació a la disposició
🚫 No utilitzeu Page-Layout quan:

- Construir una pàgina de columna única — utilitzeu una disposició més simple
- La barra lateral competeix amb el contingut principal per importància

## Accessibilitat

- Assigneu l'àrea de contingut principal a un punt de referència `&lt;main&gt;`
- Proporcioneu a la barra lateral `role="navigation"` o `role="complementary"` segons correspongui
- Assegureu-vos que les regions de referència tinguin etiquetes aria distintes

## Ús

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part | Descripció |
| --- | --- |
| `.instui-body` | Cos principal que conté la barra lateral i el contingut. |
| `.instui-footer` | Regió de peu inferior. |
| `.instui-header` | Regió de capçalera superior. |
| `.instui-main` | Àrea de contingut central. |
| `.instui-sidebar` | Navegació esquerra o columna auxiliar. |

## Estats

| Estat | Descripció |
| --- | --- |
| `:optional` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-border` | — | — |
| `--instui-color-footer-background` | — | — |
| `--instui-color-footer-text` | — | — |
| `--instui-color-header-background` | — | — |
| `--instui-color-sidebar-background` | — | — |
| `--instui-font-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |

## Relacionat

- [wrapper](/ca/api/css/wrapper.md)

