# CDN & distribúšuvdna

pantoken publiseárda buot paketat npm:s, dakko don sáhttát johtit tokenat, komponentat ja web-komponentat suodjalikii
fassu CDN:s — ii ollu build-steppi, ii bundler. Dán sivdas geavahit CSS combine-URL:in (interaktiivalaš
builderin) ja web-komponentta drop-in:na.

## Tokenasáhttin múttá

Buot pantoken-komponentat læsihit `--instui-*` muhtun propertijat token-sheet:st sáhttuheapmi. Guovttos
variantat leat:

- `@pantoken/css/dist/style.lean.css` — geavahuvvui CDN-sáhttin múttá. Dat čuogá buot tokenat maŋŋil, muhto ii buot
  ikonaset, das mii lea ovttas 23 KB gzip:na.
- `@pantoken/css/dist/style.css` — buot sheet, mii sisdoallá buot ~1 777 ikon-glyph-tokenat
  (`--instui-icon-*`). Omtte 140 KB gzip:na. Lávkát dás dá leat ikonat muhtun dihtii via
  `var(--instui-icon-*)`.

Elevatiovdnaskala ja fokus-ringi variableat leat dahjeheet guovttos beide sheet:des, das sahteagat ja fokus-ringi
fálemaštit duođaštusat, nu vvuiddja doarji.

## Váljit komponentat ja ikonat

[Interaktiivalaš CDN-picker](/guide/cdn-picker) geavahit jsDelivr combine-URL:at CSS:ii ja snippeta JavaScript-pakettain. Oppen,
čakčat maid don galggat ja kopiera genererduvvan output.

- **Components tab** — válji eret komponenta stylesheet:at dahje buot `components.css` barrel. Adda base reset dahje spacing/color utilities jos don galgat.
- **JS tab** — kopiera ESM import-snippet `@pantoken/interactions`.
- **Icons tab** — válji eret ikonat InstUI-set:st (~1 800 ikonat) dahje Simple Icons: st (~3 300 brand-glyphs). Picker
  oainná eret combine-URL ikon-CSS fállat dál buot ikonat mii don geavahát.
- **Web Components tab** — builda `@pantoken/web-components` snippeta (ESM selective register dahje classic script bootstrap).

Buot komponenta failat leat lágidit — most leat ovttas 2 KB. Komponenta mii render-eart ikonat (`alert`, `checkbox`,
ja nugo few) galggát dán glyph:s, dahje builder addá `@pantoken/components/dist/component-icons.css` (ovttas
0.5 KB gzip:na — 11 ikonat mii komponentaset geavahát) go don váldit lean sheet:in. Buot sheet already leat dat.

### Load-ordna ja fonttat

Lávkát tokenasáhttin oktavuođas, dan maŋŋil base reset, dan maŋŋil komponenta failat, ja utilities badjel — dat leat override utilities,
dahje dat csakka muitalii komponenta oaidnit oassin geatnga go dat boahtá badjel cascade. Combine URL ávdnán eará ordna du.
Fonttat leat oktavuohta excepsuvdna: `@pantoken/components/dist/fonts.css` oahpá font-faila dihtii relativalaš path:in, das combine ii sáhtá čuovvut
dattut — lávkát das mii áigge `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Buot nuppásti

Čakčat **All components** picker:is mainnán eará barrel:in, dahje viŋŋa árvu (ovttas 141 KB
gzip:na) token-sheet:in gilvvon:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web-komponentat

`@pantoken/web-components` registrer-a framework-agnostic `<instui-*>` custom elements. Dát inlaina
odu CSS:s, muhto ráhkadit tokenat sheet:st sáhttit maid, dan mii lávkát tokenasáhttin.

### ES modules (recommenddohus)

ESM CDN resolvra paketin dependencies dutnje. Dát registrer buot elementat:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Geavahát buot token-sheet (vai lean sheet plus `component-icons.css`) das ikon-rendering elementat nu
`<instui-alert>` ráhkadit deras glyphs.

Registerit dábálaš elementaid — ja deras nested dependencies — import `register` ja passea `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Classic script tag

No-modules drop-in: lávkát IIFE build. Dat bundle-rahka dependencies ja auto-register-eart buot
elementat load:in, ja exposera `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Dat lea biggán ESM-path:st — dat inlaina `@pantoken/components` ja `@pantoken/icons` — dan dearvvuohttit du
das galggat ii sáhtát modulis geavahit.

## Versiovnnjit pinna

URL:at ovttas — ja dan mii picker lohpi — čállá latest release. Pinna major (vai exact)
versiuvdna produkšuvnna — d.b. `@pantoken/css@0` — das upgrada neva ráhkadit don.
