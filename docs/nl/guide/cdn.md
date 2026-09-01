# CDN & distributie

pantoken publiceert elk pakket naar npm, zodat je tokens, componenten en webcomponenten rechtstreeks
van een CDN kunt halen — geen buildstap, geen bundler. Deze pagina behandelt de CSS combine URL (met een interactieve
builder), plus de web-component drop-ins.

## De tokenbasis

Elke pantoken-component leest `--instui-*` custom properties van een token sheet op de pagina. Twee
varianten worden geleverd:

- `@pantoken/css/dist/style.lean.css` — de aanbevolen CDN-basis. Het draagt alle tokens behalve de
  volledige iconset, dus het is ongeveer 23 KB gzipped.
- `@pantoken/css/dist/style.css` — het volledige sheet, inclusief alle ~1.777 icon-glyph tokens
  (`--instui-icon-*`). Ongeveer 140 KB gzipped. Laad dit als je iconen breed verwijst via
  `var(--instui-icon-*)`.

De elevatieschaal en focus-ring variabelen zitten in beide sheets, dus schaduwen en de focus-ring werken met
alleen de foundation geladen.

## Kies je componenten en iconen

De [interactieve CDN picker](/guide/cdn-picker) bouwt jsDelivr combine URLs voor CSS en snippets voor JavaScript-pakketten. Open hem, vink aan wat je nodig hebt, en kopieer de gegenereerde output.

- **Components tab** — kies individuele component-stylesheets of de hele `components.css` barrel. Voeg de base reset of spacing/color utilities toe als je die nodig hebt.
- **JS tab** — kopieer een ESM import-snippet voor `@pantoken/interactions`.
- **Icons tab** — kies individuele iconen uit de InstUI-set (~1.800 iconen) of uit Simple Icons (~3.300 brandglyphs). De picker geeft een aparte combine URL voor de icon CSS-bestanden zodat je alleen de iconen laadt die je daadwerkelijk gebruikt.
- **Web Components tab** — bouw `@pantoken/web-components` snippets (ESM selective register of classic script bootstrap).

Elke component-file is klein — de meeste zijn rond 2 KB. Een component die iconen rendert (`alert`, `checkbox`,
en een paar anderen) heeft die glyphs nodig, dus de builder voegt `@pantoken/components/dist/component-icons.css` toe (ongeveer
0.5 KB gzipped — de 11 iconen die de componentset gebruikt) wanneer je het lean sheet kiest. Het volledige sheet
heeft ze al.

### Laadvolgorde en fonts

Laad eerst de token foundation, dan de optionele base reset, daarna de component-bestanden, en utilities
als laatste — het zijn override-utilities, dus ze overschrijven een componentregel alleen echt wanneer ze
later in de cascade landen. De combine URL hierboven ordent ze al voor je. Fonts zijn de uitzondering:
`@pantoken/components/dist/fonts.css` verwijst naar fontbestanden via relatieve paden, dus combine kan die niet herschrijven — laad het als zijn eigen `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Alles in één keer

Vink **All components** in de picker aan om hem naar de barrel te schakelen, of verwijs er zelf direct naar (ongeveer 141 KB
gzipped) naast het token sheet:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web componenten

`@pantoken/web-components` registreert framework-agnostische `<instui-*>` custom elements. Ze inline-en hun
eigen CSS, maar lezen nog steeds tokens van een sheet op de pagina, dus laad ook een token foundation.

### ES-modules (aanbevolen)

Een ESM CDN lost de afhankelijkheden van het pakket voor je op. Dit registreert elk element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Gebruik het volledige token sheet (of het lean sheet plus `component-icons.css`) zodat icon-rendering elementen zoals
`<instui-alert>` hun glyphs kunnen resolven.

Om slechts sommige elementen te registreren — en hun geneste afhankelijkheden — importeer `register` en geef `only` door:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Een klassieke script-tag

Voor een no-modules drop-in, laad de IIFE-build. Die bundlet zijn afhankelijkheden en registreert automatisch elk
element bij het laden, en exposeert een `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Het is groter dan het ESM-pad — het inline-t `@pantoken/components` en `@pantoken/icons` — dus gebruik het
alleen wanneer je geen modules kunt gebruiken.

## Versies vastzetten

De URLs hierboven — en die de picker schrijft — volgen de laatste release. Zet een major (of exacte)
versie vast voor productie — bijvoorbeeld `@pantoken/css@0` — zodat een upgrade je nooit verrast.
