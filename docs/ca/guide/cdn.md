# CDN i distribució

pantoken publica cada paquet a npm, així que es poden carregar tokens, components i web components directament
des d'un CDN — sense pas de build, sense bundler. Aquesta pàgina cobreix l'URL combinat de CSS (amb un
constructor interactiu), a més dels drop-ins de web-component.

## La base de tokens

Cada component de pantoken llegeix les propietats personalitzades `--instui-*` des d'una fulla de tokens a la pàgina. S'envien dues
variants:

- `@pantoken/css/dist/style.lean.css` — la fundació CDN recomanada. Porta cada token excepte el
  conjunt complet d'icones, així que són uns 23 KB gzipats.
- `@pantoken/css/dist/style.css` — la fulla completa, incloent totes les ~1.777 icones glif de
  token (`--instui-icon-*`). Uns 140 KB gzipats. Carrega-ho si referencies icones àmpliament via
  `var(--instui-icon-*)`.

L'escala d'elevació i les variables de focus-ring apareixen en ambdues fulles, així que les ombres i l'anell de focus funcionen amb
només la fundació carregada.

## Tria els teus components i icones

L'[selector CDN interactiu](/guide/cdn-picker) construeix URLs combinades jsDelivr per CSS i fragments per a paquets JavaScript. Obre'l, marca el que necessites i copia la sortida generada.

- Pestaña **Components** — tria fulles d'estil de components individuals o tot el barrel `components.css`. Afegeix el reset base o les utilitats d'espaiat/color si les necessites.
- Pestaña **JS** — copia un fragment d'import ESM per a `@pantoken/interactions`.
- Pestaña **Icons** — tria icones individuals del conjunt InstUI (~1.800 icones) o de Simple Icons (~3.300 glifs de marca). El selector genera un URL combinat separat per als fitxers CSS d'icones perquè només carreguis les icones que realment fas servir.
- Pestaña **Web Components** — genera fragments `@pantoken/web-components` (registre selectiu ESM o bootstrap amb script clàssic).

Cada fitxer de component és petit — la majoria són uns 2 KB. Un component que renderitza icones (`alert`, `checkbox`,
i alguns altres) necessita aquests glifs, així que el constructor afegeix `@pantoken/components/dist/component-icons.css` (uns
0.5 KB gzipats — les 11 icones que el conjunt de components utilitza) sempre que triïs la fulla lleugera. La fulla completa
ja les incorpora.

### Ordre de càrrega i fonts

Carrega primer la fundació de tokens, després el reset base opcional, després els fitxers de components, i finalment les utilitats — són utilitats d'override, així que només sobreescriuen realment la regla d'un component quan arriben
després d'ella en la cascada. L'URL combinat d'amunt ja els ordena per tu. Les fonts són l'excepció:
`@pantoken/components/dist/fonts.css` apunta a fitxers de fonts per ruta relativa, així que combine no pot reescriure'ls — carrega-ho com el seu propi `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tot alhora

Marca **All components** al selector per canviar-lo al barrel, o apunta-hi directament (uns 141 KB
gzipats) al costat de la fulla de tokens:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registra elements personalitzats `<instui-*>` independents del framework. Inclouen el seu
propi CSS inline, però encara llegeixen tokens d'una fulla a la pàgina, així que carrega també una fundació de tokens.

### Mòduls ES (recomanat)

Un CDN ESM resol les dependències del paquet per tu. Això registra cada element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Utilitza la fulla de tokens completa (o la fulla lleugera més `component-icons.css`) perquè elements que renderitzen icones com
`<instui-alert>` resolguin els seus glifs.

Per registrar només alguns elements — i les seves dependències anidades — importa `register` i passa `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Una etiqueta d'script clàssica

Per a un drop-in sense modules, carrega la build IIFE. Agrupa les seves dependències i auto-registra cada
element en carregar-se, exposant un global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

És més gran que la via ESM — inlinea `@pantoken/components` i `@pantoken/icons` — així que recorre-hi
només quan no puguis utilitzar modules.

## Fijar versions

Les URLs d'amunt — i les que escriu el selector — apunten a l'últim llançament. Fixar una versió major (o exacta)
per a producció — per exemple `@pantoken/css@0` — evita sorpreses amb una actualització.
