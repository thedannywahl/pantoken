# CDN & tohatoha

ka panuitia e pantoken ia pūrongo ki npm, nā reira ka taea e koe te tiki i ngā token, ngā kaupapa, me ngā paowa tukutuku tika
mai i tētahi CDN — kāore he hipanga hanga, kāore he pūkete. E kapi ana tēnei whārangi i te URL whakakotahi CSS (me tētahi
kaihanga rerekē), ā, me ngā tāpiri paowa tukutuku.

## Te tūāpapa token

Ka pānui ia waahanga pantoken i ngā `--instui-*` rawa ritenga mai i tētahi pepa token kei te whārangi. E rua
ngā rerekētanga e kawea ana:

- `@pantoken/css/dist/style.lean.css` — ko te tūāpapa CDN e taunakitia ana. Ka kawe ia ia token haunga te
  kohinga ā-ata katoa, nō reira tata ki te 23 KB gzipped.
- `@pantoken/css/dist/style.css` — te pepa katoa, tae atu ki ngā ōwehenga ata ~1,777
  (`--instui-icon-*`). Tata ki te 140 KB gzipped. Utaina tēnei mēnā ka whakamahia whānui āu ngā ata mā
  `var(--instui-icon-*)`.

Kei ngā pepa e rua ngā rahi hiki (elevation) me ngā rerekētanga rīngā-arotahi, nō reira ka mahi ngā ātā me te rīnga arotahi
me te tūāpapa anake kua utaina.

## Tīpakohia ōu whakahaere me ngā ata

Kei te [kaiwhiri CDN hāngai](/guide/cdn-picker) ngā URL whakakotahi jsDelivr mō te CSS me ngā tauira mō ngā pūrongo JavaScript. Whakatuwherahia,
tīpakohia ngā mea e hiahia ana koe, ā, kopya mai i te putanga i hangaia.

- **Ripa Wāhanga** — tīpako i ngā pepa arahanga wāhanga takitahi, rānei te kōpaki `components.css` katoa. Tāpirihia te whakamōhio tūāpapa, te
  atu rānei o ngā āwhina mokowā / tae mēnā e hiahiatia ana.
- **Ripa JS** — kopya i tētahi tauira kawenga ESM mō `@pantoken/interactions`.
- **Ripa Ata** — tīpako i ngā ata takitahi i te kohinga InstUI (~1,800 ata) rānei i Simple Icons (~3,300 tohu waitohu). Ka whakaputa te kaiwhiri i tētahi URL whakakotahi motuhake mō ngā konae CSS ata kia taea ai e koe te utaina noa ngā ata e whakamahia ana e koe.
- **Ripa Paowa Tukutuku** — hanga `@pantoken/web-components` tauira (rēhitatanga Kōwhiringa ESM rānei te waahanga tukutuku kōrero).

He iti ngā konae waahanga — ko te nuinga tata ki te 2 KB. He wāhanga e whakaatu ana i ngā ata (`alert`, `checkbox`,
me ētahi atu) e hiahia ana ki ngā tohu rānei, nō reira ka taapirihia e te kaiwhakairo `@pantoken/components/dist/component-icons.css` (tata
0.5 KB gzipped — ngā ata 11 e whakamahia ana e te huinga kaupapa) ia wā ka tīpakohia e koe te pepa māmā. Kua kei i te pepa katoa
ēnei āhuatanga.

### Te raupapa utaina me ngā tohu

Utaina tuatahi te tūāpapa token, katahi te whakamōhio tūāpapa optional, katahi ngā konae waahanga, ā, ko ngā āwhina
i te mutunga — he taputapu whakakapi rānei, nō reira ka whakakapi i tētahi ture o te wāhanga anake mēnā ka tae rānei ki te mutunga
o te kāpu. Kua whakaritea e te URL whakakotahi i runga ake ngā raupapa māu. Ko ngā tohu te tukanga kotahi:
`@pantoken/components/dist/fonts.css` e tohu ana ki ngā konae momotuhi mā te ara whakaritea, nō reira kāore e taea e te whakakotahi
te tuhituhi anō — utaina hei `<link>` motuhake:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Ngā mea katoa i te kotahi

Tirohia te **Ngā waahanga katoa** i te kaiwhiri kia huri ai ki te kōpaki, rānei tohuhia tōu ake (tata 141 KB
gzipped) i te taha o te pepa token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Ngā paowa tukutuku

`@pantoken/web-components` e rēhita ana i ngā `<instui-*>` āhuatanga ritenga-kāore-i-te-tūmatanui. Ka whakauru rātou i ā rātou
ake CSS, engari ka pānui tonu i ngā token mai i tētahi pepa kei te whārangi, nō reira utaina hoki tētahi tūāpapa token.

### Ngā modula ES (e taunaki ana)

Ka whakatau te CDN ESM i ngā whakawhitinga mō te pēke mōu. E rēhita ana tēnei i ia āhuatanga:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Whakamahia te pepa token katoa (rānei te pepa māmā me `component-icons.css`) kia taea ai e ngā wāhanga e hanga ana i ngā ata pēnei i
`<instui-alert>` te whiwhi i ō rātou tohu.

Hei rēhita i ētahi āhuatanga anake — me ō rātou whakawhitinga hōu — kawemai `register` āhakoa ka tukuna `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### He tapanga script kōrero

Mō te tāpiri kore-modula, utaina te hanga IIFE. Ka kohinga te nuinga o ōna whakawhitinga ka rēhita ia āhuatanga katoa i te utaina, ka whakaatu i tētahi
tohu `PantokenWebComponents` puta-ao:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

He nui ake i te ara ESM — ka whakauruhia `@pantoken/components` me `@pantoken/icons` — nō reira whakamahia anake mēnā kāore e taea te whakamahi i ngā modula.

## Te pēhanga putanga

Ko ngā URL kei runga ake — me ngā mea ka tuhia e te kaiwhiri — e whai tonu ana i te whakarewatanga hou. Whakakahangia tētahi putanga matua (rānei tūturu)
mō te whakaputa — hei tauira `@pantoken/css@0` — kia kore ai e whakamataku te whakahoutanga.
