# CDN a dosbarthu

mae pantoken yn cyhoeddi pob pecyn i npm, felly gallwch dynnu tokenau, cydrannau, a chydrannau gwe yn syth
o CDN — dim cam adeiladu, dim bundler. Mae'r dudalen hon yn trafod URL cyfuno CSS (gyda adeiladwr rhyngweithiol),
yn ogystal â'r drop-ins ar gyfer cydrannau gwe.

## Y sylfaen tokenau

Mae pob cydran pantoken yn darllen `--instui-*` eiddo custom o daflen token ar y dudalen. Mae dau
amrywiad yn cael eu lledaenu:

- `@pantoken/css/dist/style.lean.css` — y sylfaen CDN a argymhellir. Mae'n cario pob token heblaw am y
  set eicon gyfan, felly mae tua 23 KB gzipio.
- `@pantoken/css/dist/style.css` — y daflen lawn, gan gynnwys pob tua 1,777 glyph eicon
  (`--instui-icon-*`). Tua 140 KB gzipio. Llwythwch hwn os ydych yn cyfeirio at eicons yn helaeth trwy
  `var(--instui-icon-*)`.

Mae graddfa codi a variablau cylch ffocws yn bodoli yn y ddwy daflen, felly mae cysgodion a'r cylch ffocws yn gweithio gydag
yn unig y sylfaen wedi'i lwytho.

## Dewiswch eich cydrannau a'ch eicons

Mae'r [dewiswr CDN rhyngweithiol](/guide/cdn-picker) yn adeiladu URLau cyfuno jsDelivr ar gyfer CSS a snipetiau ar gyfer pecynnau JavaScript. Agorwch ef, ticiwch yr hyn sydd ei angen, a chopïwch y canlyniad a gynhyrchir.

- **Tab Cydrannau** — dewiswch arddulliau taflen ar gyfer cydran unigol neu'r faliwr `components.css` cyfan. Ychwanegwch y reset sylfaen neu'r gwrthrychau espac/lliw os oes eu hangen arnoch.
- **Tab JS** — copïwch snipet mewnforio ESM ar gyfer `@pantoken/interactions`.
- **Tab Eicons** — dewiswch eicons unigol o set InstUI (~1,800 eicon) neu o Simple Icons (~3,300 glyph brand). Mae'r dewiswr yn cynhyrchu URL cyfuno ar wahân ar gyfer ffeiliau CSS eicon fel y gallwch lwytho dim ond yr eicons rydych yn eu defnyddio.
- **Tab Cydrannau Gwe** — adeiladwch snipetiau `@pantoken/web-components` (cofrestr ESM dethol neu bootstrapi sgript glasurol).

Mae pob ffeil cydran yn fach — mae'r mwyafrif tua 2 KB. Mae cydran sy'n rendro eicons (`alert`, `checkbox`,
a rhai eraill) angen y glyphs hynny, felly mae'r adeiladwr yn ychwanegu `@pantoken/components/dist/component-icons.css` (tua
0.5 KB gzipio — y 11 eicon y mae'r set cydran yn eu defnyddio) pryd bynnag y dewiswch y daflen fisc. Mae'r daflen lawn
eisoes yn eu cynnwys.

### Trefn llwytho a ffontiau

Llwythwch y sylfaen tokenau yn gyntaf, yna'r reset sylfaenol dewisol, yna'r ffeiliau cydran, a'r utilities
yn olaf — maent yn utilities sy'n gor-ddefnyddio, felly dim ond pan fyddant yn cyrraedd
ar ôl rheol y cydran yn y cymysgu y byddant yn gor-ddefnyddio rheol y cydran. Mae'r URL cyfuno uchod eisoes yn eu trefnu ar eich rhan. Ffontiau yw'r unig eithriad:
mae `@pantoken/components/dist/fonts.css` yn pwyntio at ffeiliau ffont trwy lwybr cymharol, felly ni all combine eu hailysgrifennu — llwythwch ef fel ei `<link>` ei hun:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Popeth ar unwaith

Ticiwch **All components** yn y dewiswr i'w newid i'r faliwr, neu pwyntiwch ato eich hun (tua 141 KB
gzipio) ochr yn ochr â'r daflen token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Cydrannau gwe

Mae `@pantoken/web-components` yn cofrestru elfennau custom `<instui-*>` annibynnol ar fframwaith. Maent yn mewnosod eu
CSS eu hunain, ond yn dal i ddarllen tokenau o daflen ar y dudalen, felly llwythwch sylfaen tokenau hefyd.

### Modiwlau ES (argymelledig)

Mae CDN ESM yn datrys dibyniaethau'r pecyn i chi. Mae hyn yn cofrestru pob elfen:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Defnyddiwch y daflen token lawn (neu'r daflen fisc ynghyd â `component-icons.css`) i alluogi elfennau sy'n rendro eicons fel
`<instui-alert>` i ddatrys eu glyphs.

I gofrestru dim ond rhai elfennau — a'u dibyniaethau wedi'u mewnblannu — mewnforiwch `register` a phaswch `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Tag sgript glasurol

Ar gyfer drop-in heb fodiwlau, llwythwch y adeiladwaith IIFE. Mae'n pecynnu ei ddibyniaethau ac yn cofrestru pob
elfen ar lwytho, gan ddatgelu byd-eang `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Mae'n fwy na'r llwybr ESM — mae'n mewnosod `@pantoken/components` a `@pantoken/icons` — felly defnyddiwch ef
dim ond pan na allwch ddefnyddio modiwlau.

## Pinnio fersiynau

Mae'r URLau uchod — a'r rhai y mae'r dewiswr yn eu hysgrifennu — yn dilyn y rhyddhau diweddaraf. Pinnwch fersiwn major (neu union)
ar gyfer cynhyrchiad — er enghraifft `@pantoken/css@0` — fel na fydd uwchraddiad yn eich synnu byth.
