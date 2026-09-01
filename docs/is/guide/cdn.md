# CDN og dreifing

pantoken birtir hvert pakka á npm, svo hægt er að sækja tokens, components og web components beint
frá CDN — enginn byggingarstefna, enginn bundlari. Þessi síða fjallar um CSS combine URL (með gagnvirkum
byggjara), auk web-component drop-ins.

## Undirstaða tokens

Hver pantoken component les `--instui-*` sérsniðnar breytur frá token-skjali á síðunni. Tvær
útgáfur fylgja með:

- `@pantoken/css/dist/style.lean.css` — mælt CDN-grunnlag. Það inniheldur öll token nema
  heila ikonagrunninn, svo það er um 23 KB gzipað.
- `@pantoken/css/dist/style.css` — fulla skjalið, innifalið um ~1,777 icon glyph token
  (`--instui-icon-*`). Um 140 KB gzipað. Hlaða þessu ef vísað er vítt í tákn með
  `var(--instui-icon-*)`.

Skalastig upphækkunar (elevation) og breytur fyrir fókushringinn eru í báðum skjölum, svo skuggar og fókushringur virka
með aðeins grunninn hlaðinn.

## Veldu components og tákn

[Samsíða CDN-välirinn](/guide/cdn-picker) býr til jsDelivr combine URL fyrir CSS og bút fyrir JavaScript pakka. Opnaðu hann, hakaðu við það sem þú þarft, og afritaðu framleitt útflæði.

- **Components flipi** — veldu einstaka component-stílsíður eða allt `components.css` barrel-ið. Bættu við base reset eða spacing/color utilities ef þú þarft þau.
- **JS flipi** — afritaðu ESM import-bút fyrir `@pantoken/interactions`.
- **Icons flipi** — veldu einstök tákn úr InstUI settinu (~1,800 tákn) eða úr Simple Icons (~3,300 brand glyphs). Vælirinn skilar sérstöku combine URL fyrir icon CSS skrár svo þú getir hlaðið aðeins þeim táknum sem þú notar.
- **Web Components flipi** — byggja `@pantoken/web-components` bút (ESM selective register eða classic script bootstrap).

Hver component-skrá er lítil — flestar um 2 KB. Component sem renderar tákn (`alert`, `checkbox`,
og nokkrar aðrar) þarf þau glyphs, svo byggjarinn bætir `@pantoken/components/dist/component-icons.css` (um
0.5 KB gzipað — 11 tákn sem component-settið notar) þegar þú velur létta skjalið. Fulla skjalið
ber þau þegar þegar.

### Hleðsluröð og letur

Hlaða token-undirstöðunni fyrst, síðan valfrjálsa base reset, síðan component-skrám, og utilities síðast — þau eru ofritunar-utilities, þannig að þau yfirskrifa aðeins reglur component ef þau lenda
á eftir því í cascade-inu. Combine URL-ið hér að ofan raðar þeim þegar fyrir þig. Letur eru eina undantekningin:
`@pantoken/components/dist/fonts.css` bendir á font-skrár með relative path, svo combine getur ekki endurskrifað
þau — hlaða því sem sitt eigið `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Allt í einu

Hakktu við **All components** í vælirnum til að skipta yfir í barrel, eða benda á það sjálfur (um 141 KB
gzipað) ásamt token-skjali:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` skráir framework-agnostic `<instui-*>` sérsniðnar elementa. Þau inlin-a sína
sérstaka CSS, en lesa samt tokens frá skjali á síðunni, svo hlaða þarf token-undirstöðu líka.

### ES modules (mælt)

ESM CDN leysir dependencies pakksins fyrir þig. Þetta skráir hvert element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Nota fulla token-skjalið (eða létta skjalið plús `component-icons.css`) svo tákn-renderandi elementar eins og
`<instui-alert>` leysi glyphs sínar.

Til að skrá aðeins nokkur element — og þá innri dependencies þeirra — import-a `register` og gefa `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klassískur script-taggi

Fyrir no-modules drop-in, hlaða IIFE build-ið. Það pakkar dependencies sínum og sjálfvirkt skráir öll
element við hleðslu, og gerir `PantokenWebComponents` global aðgengilegt:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Það er stærra en ESM leiðin — það inlin-ar `@pantoken/components` og `@pantoken/icons` — svo nota það
aðeins þegar ekki er hægt að nota modules.

## Læsa við útgáfur

URL-arnir hér að ofan — og þeir sem vælirinn skrifar — fylgja nýjustu útgáfu. Læstu major (eða nákvæmri)
útgáfu fyrir framleiðslu — til dæmis `@pantoken/css@0` — svo uppfærsla komi aldrei á óvart.
