# CDN & distribution

pantoken publicerar varje paket till npm, så du kan hämta tokens, komponenter och webcomponents direkt
från en CDN — ingen byggsteg, ingen bundler. Denna sida täcker CSS combine-URL:en (med en interaktiv
byggare) samt web-component drop-ins.

## Token-grunden

Varje pantoken-komponent läser `--instui-*` custom properties från ett tokenark på sidan. Två
varianter levereras:

- `@pantoken/css/dist/style.lean.css` — den rekommenderade CDN-grunden. Den innehåller alla tokens utom den
  fullständiga ikonsatsen, så den är cirka 23 KB gzippad.
- `@pantoken/css/dist/style.css` — det fulla arket, inklusive alla ~1,777 ikon-glyph-tokens
  (`--instui-icon-*`). Cirka 140 KB gzippad. Ladda detta om du refererar till ikoner brett via
  `var(--instui-icon-*)`.

Elevationsskalan och focus-ring-variablerna finns i båda arken, så skuggor och focus-ring fungerar med
endast grunden laddad.

## Välj dina komponenter och ikoner

Den [interaktiva CDN-pickern](/guide/cdn-picker) bygger jsDelivr combine-URL:ar för CSS och snippets för JavaScript-paket. Öppna den, markera vad du behöver och kopiera den genererade outputen.

- **Components-fliken** — välj individuella komponentstilar eller hela `components.css`-barreln. Lägg till base reset eller spacing/color-utilities om du behöver dem.
- **JS-fliken** — kopiera ett ESM-import-snippet för `@pantoken/interactions`.
- **Icons-fliken** — välj individuella ikoner från InstUI-setet (~1,800 ikoner) eller från Simple Icons (~3,300 brand-glyphs). Pickern genererar en separat combine-URL för ikon-CSS-filerna så du kan ladda bara de ikoner du faktiskt använder.
- **Web Components-fliken** — bygg `@pantoken/web-components`-snippets (ESM selective register eller classic script bootstrap).

Varje komponentfil är liten — de flesta ligger runt 2 KB. En komponent som renderar ikoner (`alert`, `checkbox`,
och några andra) behöver de glyphs, så byggaren lägger till `@pantoken/components/dist/component-icons.css` (cirka
0.5 KB gzippad — de 11 ikoner som komponentuppsättningen använder) när du väljer det lean-arket. Det fulla arket
bär dem redan.

### Laddningsordning och typsnitt

Ladda token-grunden först, sedan den valfria base reset, sedan komponentfilerna och till sist utilities —
de är override-utilities, så de skriver bara över en komponents egna regler när de kommer efter den i kaskaden. Combine-URL:en ovan ordnar dem redan åt dig. Typsnitt är ett undantag:
`@pantoken/components/dist/fonts.css` pekar på fontfiler via relativ sökväg, så combine kan inte omskriva
dem — ladda det som sin egen `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Allt på en gång

Markera **All components** i pickern för att byta till barrel, eller peka på den själv (cirka 141 KB
gzippad) tillsammans med token-arket:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registrerar ramverks-agnostiska `<instui-*>` custom elements. De inlinar sin
egen CSS, men läser fortfarande tokens från ett ark på sidan, så ladda även en token-grund.

### ES-moduler (rekommenderat)

En ESM-CDN löser paketets beroenden åt dig. Detta registrerar varje element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Använd det fullständiga token-arket (eller det lean-arket plus `component-icons.css`) så att ikon-renderande element som
`<instui-alert>` kan lösa sina glyphs.

För att registrera bara några element — och deras inbäddade beroenden — importera `register` och skicka `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Ett klassiskt script-tag

För en no-modules drop-in, ladda IIFE-builden. Den bundle:ar sina beroenden och auto-registrerar varje
element vid laddning, och exponerar en `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Den är större än ESM-vägen — den inlinar `@pantoken/components` och `@pantoken/icons` — så använd den
endast när du inte kan använda moduler.

## Fästa versioner (pinning)

URL:arna ovan — och de som pickern skriver — pekar på senaste release. Fäst en major (eller exakt)
version för produktion — till exempel `@pantoken/css@0` — så en uppgradering aldrig överraskar dig.
