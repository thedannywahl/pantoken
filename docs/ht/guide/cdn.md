# CDN & distribisyon

pantoken pibliye chak pake sou npm, konsa ou ka rale tokens, konpozan, ak web components dirèkteman
soti nan yon CDN — pa gen etap build, pa gen bundler. Paj sa a kouvri URL konbine CSS la (ak yon
konstwi entèaktif), plis drop-ins pou web-components yo.

## Fondasyon token yo

Chak konpozan pantoken li `--instui-*` pwopriyete koutim soti nan yon fèy token sou paj la. De
variant livre:

- `@pantoken/css/dist/style.lean.css` — fondasyon CDN rekòmande a. Li pote tout token eksepte
  set ikon konplè a, kidonk li anviwon 23 KB gzipped.
- `@pantoken/css/dist/style.css` — fèy konplè a, ki enkli tout apeprè 1,777 glyph ikon
  (`--instui-icon-*`). Apeprè 140 KB gzipped. Chaje sa si w refere ikon lajman atravè
  `var(--instui-icon-*)`.

Eskal elevasyon an ak varyab focus-ring yo sou toude fèy yo, konsa lonbraj ak ba fokus la mache ak
selman fondasyon an chaje.

## Chwazi konpozan ak ikon ou yo

[picker CDN entèaktif la](/guide/cdn-picker) konstwi jsDelivr combine URLs pou CSS ak snippet pou pake JavaScript. Louvri li, tcheke sa w bezwen, epi kopye sòti jenere a.

- **Tab Components** — chwazi fichye stil konpozan endividyèl oswa tout barèl `components.css`. Ajoute reset baz la oswa utilitè spacing/color si w bezwen yo.
- **Tab JS** — kopye yon snippet ESM import pou `@pantoken/interactions`.
- **Tab Icons** — chwazi ikon endividyèl nan set InstUI a (~1,800 ikon) oswa soti nan Simple Icons (~3,300 glyph mak). Picker a pwodui yon URL konbine separe pou fichye CSS ikon yo pou ou ka chaje sèlman ikon ou aktyèlman itilize.
- **Tab Web Components** — konstwi snippet `@pantoken/web-components` (ESM selective register oswa classic script bootstrap).

Chak fichye konpozan piti — pifò yo anviwon 2 KB. Yon konpozan ki rann ikon (`alert`, `checkbox`,
ak kèk lòt) bezwen glyph sa yo, konsa konstwi a ajoute `@pantoken/components/dist/component-icons.css` (anviron
0.5 KB gzipped — 11 ikon set konpozan an itilize) chak fwa ou chwazi fèy lean la. Fèy konplè a
deja pote yo.

### Lòd chajman ak font

Chaje fondasyon token an an premye, apre sa reset baz opsyonèl la, apre sa fichye konpozan yo, epi utilitè yo
dènye — yo se utilitè overrid, kidonk yo sèlman aktyèlman overrid règ yon konpozan lè yo tonbe
apre li nan kaskad la. URL konbine anlè a deja òdone yo pou ou. Font yo se sèl eksepsyon:
`@pantoken/components/dist/fonts.css` pwen sou fichye font pa chemen relatif, konsa combine pa ka reekri
yo — chaje li kòm pwòp `<link>` li:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tout ansanm

Chwazi **All components** nan picker a pou chanje li nan barèl la, oswa montre li tèt ou (anviwon 141 KB
gzipped) ansanm ak fèy token la:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` anrejistre eleman koutim `<instui-*>` ki pa depann sou kad. Yo entegre
pwòp CSS yo, men yo toujou li token soti nan yon fèy sou paj la, konsa chaje yon fondasyon token tou.

### ES modules (rekòmande)

Yon CDN ESM rezoud depandans pake a pou ou. Sa anrejistre chak eleman:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Sèvi ak fèy token konplè a (oswa fèy lean la plis `component-icons.css`) konsa eleman ki rann ikon tankou
`<instui-alert>` ka rezoud glyph yo.

Pou anrejistre sèlman kèk eleman — ak depandans nested yo — enpòte `register` epi pase `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Yon tag script klasik

Pou yon drop-in san modules, chaje build IIFE a. Li bundle depandans li yo epi oto-anrejistre chak
eleman lè li chaje, ekspoze yon global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Li pi gwo pase chemen ESM nan — li entegre `@pantoken/components` ak `@pantoken/icons` — kidonk itilize li
selman lè ou pa ka itilize modules.

## Fiksaj (pin) vèsyon

URL yo anlè — epi sa yo picker la ekri — swiv dènye lage a. Fikse yon major (oswa egzak)
vèsyon pou pwodiksyon — pou egzanp `@pantoken/css@0` — konsa yon ajou pap janm siprann ou.
