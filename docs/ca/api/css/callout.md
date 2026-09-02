# CSS: callout

`div[class~="instui-callout"]` — Alerta d'informació en línia per a una recordació o nota breu.

✅ Utilitza Callout quan:

- Has de destacar informació important o recordatoris en línia
- El missatge és relativament breu (una frase a un paràgraf curt)
- L'alerta ha de cridar l'atenció sense interrompre el flux principal
🚫 No utilitzis Callout quan:

- El missatge requereix interacció o múltiples accions — utilitza un Modal o Alert Dialog
- El contingut és el focus principal de la pàgina — utilitza un layout Card o Hero en lloc seu

## Accessibilitat

- Assegura't que el rol d'alerta s'aplica correctament (role="alert" o role="status")
- Utilitza contrast de color semàntic que compleixi els estàndards WCAG AA
- No es fies només del color per transmetre significat

## Ús

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot | Descripció |
| --- | --- |
| `message` | Contingut del missatge d'alerta |

## Parts

| Part | Descripció |
| --- | --- |
| `.instui-content` | Contenidor per al contingut de text. |
| `.instui-icon` | Icona opcional a l'esquerra del contingut. |

## Pseudoelements

| Pseudoelement | Descripció |
| --- | --- |
| `::before` | — |

## Estats

| Estat | Descripció |
| --- | --- |
| `:optional` | — |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-color-info-background` | — | — |
| `--instui-color-info-border` | — | — |
| `--instui-color-info-text` | — | — |
| `--instui-radius-medium` | — | — |
| `--instui-size-small` | `<length>` | — |
| `--instui-space-medium` | — | — |
| `--instui-space-small` | — | — |

## Relacionat

- [alert](/ca/api/css/alert.md)

