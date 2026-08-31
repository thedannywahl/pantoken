# CSS: hero

`div[class~="instui-hero"]` — Fuldbredde-headersektion med titel, undertitel og valgfrit baggrundsbillede.

✅ Brug Hero når:

- Du har brug for en fremtrædende sidehoved med visuelt hierarki
- Siden drager fordel af en stor, øjnefaldende åbningssektion
- Du ønsker at inkludere baggrundsbilleder eller gradientaccenter

- Opbygning af et enkelt sidehoved — brug Page-Layout i stedet
- Helten konkurrerer med kritisk indhold — prioritér læsbarhed

## Accessibility

- Sikr, at titlen er i et `&lt;h1&gt;` tag for semantisk struktur
- Hvis du bruger baggrundsbilleder, skal du give tilstrækkelig farvekontrast for tekst
- Undgå autoafspilning på video eller animation, der kan aflede opmærksomheden fra indholdet

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Slots

| Slot       | Description             |
| ---------- | ----------------------- |
| `subtitle` | Hero undertitel-indhold |
| `title`    | Hero titel-indhold      |

## Parts

| Part                 | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `.instui-actions`    | Valgfrie handlingsknapper eller links.               |
| `.instui-background` | Valgfrit baggrundslag (billede eller gradient).      |
| `.instui-content`    | Container til hero-tekst og -handlinger.             |
| `.instui-overlay`    | Valgfrit semi-transparent overlay for tekstkontrast. |
| `.instui-subtitle`   | Valgfri understøttende tekst eller beskrivelse.      |
| `.instui-title`      | Hovedhero-titel (typisk `&lt;h1&gt;`).               |

## Pseudo-elements

| Pseudo-element | Description |
| -------------- | ----------- |
| `::before`     | —           |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-primary-background` | —          | —     |
| `--instui-font-size-hero`           | `<length>` | —     |
| `--instui-font-size-large`          | `<length>` | —     |
| `--instui-font-weight-bold`         | —          | —     |
| `--instui-space-large`              | —          | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [card](/da/api/css/card.md)
