# CDN in distribucija

pantoken objavlja vsak paket na npm, zato lahko žetone, komponente in spletne komponente potegneš neposredno
iz CDN — brez gradnje, brez bundlerja. Ta stran zajema URL za kombiniranje CSS (z interaktivnim
graditeljem) in priključke za spletne komponente.

## Temelj žetonov

Vsaka pantoken komponenta bere `--instui-*` lastnosti iz lista žetonov na strani. Na voljo sta dve
varianti:

- `@pantoken/css/dist/style.lean.css` — priporočena CDN osnova. Vsebuje vse žetone razen
  celotnega nabora ikon, zato je približno 23 KB stisnjenih z gzip.
- `@pantoken/css/dist/style.css` — celoten list, vključno z vsemi ~1.777 ikonami (glifi)
  (`--instui-icon-*`). Približno 140 KB stisnjenih z gzip. Naloži to, če ikone pogosto sklicuješ preko
  `var(--instui-icon-*)`.

Skala elevacije in spremenljivke za fokusni obroč so prisotne v obeh listih, zato senca in fokusni obroč delujeta tudi
če je naložena samo osnova.

## Izberi komponente in ikone

[Interaktivni izbirnik CDN](/guide/cdn-picker) ustvari jsDelivr combine URL-je za CSS in izrezke za JavaScript pakete. Odpri ga, označi, kar potrebuješ, in kopiraj ustvarjeno vsebino.

- **Zavihek Components** — izberi posamezne slogovne datoteke komponent ali celoten sod `components.css`. Dodaj osnovni reset ali pripomočke za prostora/obarvanje, če jih potrebuješ.
- **Zavihek JS** — kopiraj ESM import izrezek za `@pantoken/interactions`.
- **Zavihek Icons** — izberi posamezne ikone iz InstUI nabora (~1.800 ikon) ali iz Simple Icons (~3.300 blagovnih glifov). Izbirnik izpiše ločen combine URL za datoteke ikon CSS, da naložiš samo tiste ikone, ki jih dejansko uporabljaš.
- **Zavihek Web Components** — zgradi `@pantoken/web-components` izrezke (ESM selektivna registracija ali klasičen skriptni bootstrap).

Vsaka datoteka komponente je majhna — večina je okoli 2 KB. Komponenta, ki upodablja ikone (`alert`, `checkbox`,
in nekaj drugih) potrebuje te glife, zato graditelj doda `@pantoken/components/dist/component-icons.css` (približno
0.5 KB stisnjeno z gzip — 11 ikon, ki jih niz komponent uporablja), kadar izbereš lahki list. Celoten list
jih že vsebuje.

### Zaporedje nalaganja in pisave

Najprej naloži temelj žetonov, nato opcijski osnovni reset, potem datoteke komponent, in na koncu pripomočke —
so pripomočki za prepisovanje, zato dejansko prepišejo pravilo komponente šele, ko pridejo
po njem v kaskadi. Combine URL zgoraj jih že pravilno razporedi. Pisave so ena izjema:
`@pantoken/components/dist/fonts.css` kaže na datoteke pisav z relativno potjo, zato jih combine ne more prepisati — naloži ga kot svoj `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Vse naenkrat

V izbirniku označi **All components**, da ga preklopiš na sod, ali ga navedi sam (približno 141 KB
stisnjenih z gzip) skupaj z listom žetonov:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Spletne komponente

`@pantoken/web-components` registrira ogrodju nevtralne `<instui-*>` custom elemente. Vgrajujejo svoj
CSS, vendar še vedno berejo žetone iz lista na strani, zato naloži tudi temelj žetonov.

### ES moduli (priporočeno)

ESM CDN razreši odvisnosti paketa namesto tebe. To registrira vse elemente:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Uporabi celoten list žetonov (ali lahki list plus `component-icons.css`), da elementi, ki upodabljajo ikone, kot
`<instui-alert>`, najdejo svoje glife.

Če želiš registrirati le nekatere elemente — in njihove vgrajene odvisnosti — uvozi `register` in posreduj `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasičen script tag

Za drop-in brez modulov naloži IIFE build. Vključi svoje odvisnosti in ob nalaganju samodejno registrira vse
elemente, ter razkrije globalno spremenljivko `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Je večji od poti ESM — vključi `@pantoken/components` in `@pantoken/icons` — zato ga uporabi le,
ko modulov ne moreš uporabiti.

## Zaklepanje verzij

Zgornji URL-ji — in tisti, ki jih izbirnik zapiše — sledijo najnovejši izdaji. Za produkcijo zakleni glavno (ali natančno)
različico — na primer `@pantoken/css@0` — da nadgradnja ne bo presenetila.
