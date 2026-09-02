# CDN & dáileadh

foilsíonn pantoken gach pacáiste chuig npm, mar sin is féidir leat tarraingt ar na tokení, na comhpháirteanna, agus na comhpháirteanna gréasáin go díreach
ó CDN — gan céim tógála, gan bundler. Clúdaíonn an leathanach seo an URL comhtháthaithe CSS (le tógálaí idirghníomhach),
agus na drop-ins do na web-components.

## Bunús na dtokán

Léann gach comhpháirt pantoken `--instui-*` airíonna saincheaptha ó bhileog tokení ar an leathanach. Seoltar dhá
leagan:

- `@pantoken/css/dist/style.lean.css` — an bunús CDN molta. Iompraíonn sé gach token seachas an
  tacar iomlán de shiombailí, mar sin tá sé thart ar 23 KB gzipped.
- `@pantoken/css/dist/style.css` — an bileog iomlán, lena n-áirítear na thart ar 1,777 siombailí íocón
  (`--instui-icon-*`). Thart ar 140 KB gzipped. Luchtaigh é seo má luaigh tú íocóin go forleathan trí
  `var(--instui-icon-*)`.

Tá an scála ardaithe agus na hathróga fáinne fócasaithe araon sna bileoga, mar sin oibríonn scáthanna agus an fáinne fócasaithe le
bunús amháin luchtaithe.

## Roghnaigh do chomhpháirteanna agus do shiombailí

Tógann an [CDN picker idirghníomhach](/guide/cdn-picker) URLanna comhtháthaithe jsDelivr do CSS agus snippets do phacáistí JavaScript. Oscail é, seiceáil cad is gá duit, agus cóipeáil an t-aschur ginte.

- **Cluaisín Comhpháirteanna** — roghnaigh stíleanna bileoga comhpháirte aonair nó an biorclár iomlán `components.css`. Cuir an cíor bunús nó na siomptóga spásála/dathanna má tá siad ag teastáil uait.
- **Cluaisín JS** — cóipeáil sliocht allmhairithe ESM do `@pantoken/interactions`.
- **Cluaisín Íocón** — roghnaigh íocóin aonair ó thacar InstUI (thart ar 1,800 íocón) nó ó Simple Icons (thart ar 3,300 giolcacha branda). Tá URL comhtháthaithe ar leith ag an picker do na comhaid CSS íocón ionas gur féidir leat luchtú ach na híocóin atá uait a dhéanamh.
- **Cluaisín Web Components** — tógann sé snippets `@pantoken/web-components` (clárú roghnach ESM nó bootstrap script clasaiceach).

Tá gach comhad comhpháirte beag — tá formhór thart ar 2 KB. Teastaíonn na giolcanna sin ó chomhpháirt a léireoidh íocóin (`alert`, `checkbox`,
agus roinnt eile) , mar sin cuireann an tógálaí `@pantoken/components/dist/component-icons.css` (thart ar
0.5 KB gzipped — na 11 íocón a úsáideann an tacar comhpháirte) gach uair a roghnaíonn tú an bileog caol. Tá siad cheana féin sa bhileog iomlán.

### Ordú luchtaithe agus clóanna

Luchtaigh an bunús tokení ar dtús, ansin an cíor bunús roghnach, ansin comhaid na gcomhpháirteanna, agus na siomptóga faoi dheireadh — is uirlisí osclaíoch iad sin, mar sin ní dhéanann siad ach rialachán comhpháirte a shárú nuair a thagann siad ina dhiaidh i gcáscáid. Tá an URL comhtháthaithe thuas ordaithe cheana duit. Is é clóanna an t-aon eisceacht:
tagann `@pantoken/components/dist/fonts.css` ag pointeáil chuig comhaid cló trí bhealach gaolmhar, mar sin ní féidir le combine iad a athscríobh — luchtú mar `<link>` féin é:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Gach rud ag an am céanna

Seiceáil **All components** sa picker chun é a athrú go dtí an biorclár, nó pointigh leat féin air (thart ar 141 KB
gzipped) in aice leis an bhileog tokení:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

Cláraíonn `@pantoken/web-components` eilimintí saincheaptha `<instui-*>` gan brath ar fhrámaimhe. Ionaidíonn siad a
CSS féin, ach léann siad tokení fós ó bhileog ar an leathanach, mar sin luchtú bunús tokení freisin.

### Modúil ES (molta)

Réitíonn CDN ESM spleáchais an phacáiste duit. Cláraíonn sé gach eilimint:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Bain úsáid as an bhileog tokení iomlán (nó an bileog caol le `component-icons.css`) ionas go réiteofar ainglocha íocón-léirshúcháin cosúil le
`<instui-alert>` a ngiolcanna.

Chun roinnt eilimintí amháin — agus a ndíthchláir fholaithe — a chlárú, allmhaigh `register` agus pas `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Lipéad script clasaiceach

Chun drop-in gan modúil, luchtú an tógáil IIFE. Pacálann sé a spleáchais agus a chláraíonn gach
eilimint go huathoibríoch ar luchtú, ag nochtadh globál `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Tá sé níos mó ná an bealach ESM — ionaithníonn sé `@pantoken/components` agus `@pantoken/icons` — mar sin bain as é
amháin nuair nach féidir leat modúil a úsáid.

## Pináil leaganacha

Leanann na URLanna thuas — agus na cinn a scríobhann an picker — an scaoileadh is déanaí. Pináil leagan mór (nó cruinn)
don táirgeadh — mar shampla `@pantoken/css@0` — ionas nach gcuirfeadh uasghrádú iontas ort riamh.
