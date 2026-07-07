# Komponensek

`@pantoken/components` osztályalapú komponensstílusokat szállít, amelyeket az Instructure tokenekből építettünk. Importáld
a stíluslapot, és címkézd fel a jelölést — nincs szükség keretrendszerre.

```ts
import "@pantoken/components/components.css";
```

Egyedi elemeket preferálsz? `@pantoken/web-components` ugyanezeket a stílusokat `<instui-button>`,
`<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` és további formákba csomagolja — lásd a
[csomagtérképet](/guide/packages).

## Gomb

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button">Primary</button>
  <button class="instui-button instui-button--secondary">Secondary</button>
  <button class="instui-button instui-button--success">Success</button>
  <button class="instui-button instui-button--danger">Danger</button>
  <button class="instui-button" disabled>Disabled</button>
</div>

```html
<button class="instui-button">Primary</button>
<button class="instui-button instui-button--secondary">Secondary</button>
<button class="instui-button instui-button--success">Success</button>
<button class="instui-button instui-button--danger">Danger</button>
```

A szín módosítók: `--secondary`, `--tertiary`, `--success`, `--danger`, `--ai`, `--ai-secondary`,
és `--primary-inverse`. A méretek: `--sm` és `--lg` (a közepes az alapértelmezett). A formák: `--icon`
(négyzet) és `--circle`, míg `--condensed` és `--toggle` az alacsony hangsúlyú szöveges gombokat és a lenyomott
kapcsolóállapotokat fedik le. Csomagolj be egy soron belüli SVG-t a `.instui-icon` elembe, hogy a címkéhez méretezze.

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button instui-button--sm">Small</button>
  <button class="instui-button">Medium</button>
  <button class="instui-button instui-button--lg">Large</button>
</div>

```html
<button class="instui-button instui-button--sm">Small</button>
<button class="instui-button instui-button--lg">Large</button>
```

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <button class="instui-button instui-button--icon" aria-label="Add">+</button>
  <button class="instui-button instui-button--condensed">Condensed</button>
  <button class="instui-button instui-button--toggle" aria-pressed="true">Pressed</button>
  <button class="instui-button instui-button--toggle" aria-pressed="false">Unpressed</button>
</div>

```html
<button class="instui-button instui-button--icon" aria-label="Add">+</button>
<button class="instui-button instui-button--condensed">Condensed</button>
<button class="instui-button instui-button--toggle" aria-pressed="true">Pressed</button>
```

## Kapcsolócsoport

<div class="instui-toggle-group" role="group" aria-label="Text alignment">
  <button class="instui-button instui-button--toggle" aria-pressed="true">Left</button>
  <button class="instui-button instui-button--toggle" aria-pressed="false">Center</button>
  <button class="instui-button instui-button--toggle" aria-pressed="false">Right</button>
</div>

```html
<div class="instui-toggle-group" role="group">
  <button class="instui-button instui-button--toggle" aria-pressed="true">Left</button>
  <button class="instui-button instui-button--toggle" aria-pressed="false">Center</button>
</div>
```

## Riasztás

<div style="display:flex; flex-direction:column; gap:12px;">
  <div class="instui-alert instui-alert--info">Heads up — this is an informational alert.</div>
  <div class="instui-alert instui-alert--success">Saved. Everything went through.</div>
  <div class="instui-alert instui-alert--warning">Careful — double-check this before continuing.</div>
  <div class="instui-alert instui-alert--danger">Something went wrong.</div>
</div>

```html
<div class="instui-alert instui-alert--success">Saved.</div>
```

## Jelvény

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-badge">4</span>
  <span class="instui-badge instui-badge--success">9</span>
  <span class="instui-badge instui-badge--danger">3</span>
</div>

```html
<span class="instui-badge instui-badge--danger">3</span>
```

## Címke (Pill)

<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
  <span class="instui-pill">Draft</span>
  <span class="instui-pill instui-pill--info">In review</span>
  <span class="instui-pill instui-pill--success">Published</span>
  <span class="instui-pill instui-pill--warning">Stale</span>
  <span class="instui-pill instui-pill--danger">Blocked</span>
</div>

```html
<span class="instui-pill instui-pill--success">Published</span>
```

## Címke (Tag)

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-tag">design</span>
  <span class="instui-tag">tokens</span>
  <span class="instui-tag">accessibility</span>
</div>

```html
<span class="instui-tag">design</span>
```

## Avatár

<div style="display:flex; gap:12px; align-items:center;">
  <span class="instui-avatar">DW</span>
  <span class="instui-avatar instui-avatar--blue">AB</span>
  <span class="instui-avatar instui-avatar--green">CD</span>
  <span class="instui-avatar instui-avatar--orange instui-avatar--lg">EF</span>
  <span class="instui-avatar instui-avatar--rectangle">GH</span>
</div>

```html
<span class="instui-avatar instui-avatar--blue">AB</span>
```

## Fülek

<div class="instui-tabs">
  <div class="instui-tabs__list" role="tablist">
    <div class="instui-tabs__tab instui-tabs__tab--selected" role="tab">Overview</div>
    <div class="instui-tabs__tab" role="tab">Details</div>
    <div class="instui-tabs__tab" role="tab">History</div>
  </div>
  <div class="instui-tabs__panel" role="tabpanel">The selected tab's content shows here.</div>
</div>

## Metrika

<div style="display:flex; gap:32px;">
  <div class="instui-metric">
    <span class="instui-metric__value">1,284</span>
    <span class="instui-metric__label">Active users</span>
  </div>
  <div class="instui-metric">
    <span class="instui-metric__value">98%</span>
    <span class="instui-metric__label">Uptime</span>
  </div>
</div>

## Sorozat (Byline)

<div class="instui-byline">
  <span class="instui-avatar instui-avatar--blue">AB</span>
  <div>
    <div class="instui-byline__title">Ada Byron</div>
    <div class="instui-byline__description">Design systems, tokens, and the occasional pun.</div>
  </div>
</div>

## Táblázat

<table class="instui-table">
  <thead><tr><th>Package</th><th>Bucket</th></tr></thead>
  <tbody>
    <tr><td>@pantoken/css</td><td>formats</td></tr>
    <tr><td>@pantoken/react</td><td>renderers</td></tr>
  </tbody>
</table>

`.instui-table` a saját magad által épített táblázatokhoz való; a markdown táblázatok ugyanezt a megjelenést automatikusan
megkapják a prózarétegen keresztül.

## Hivatkozás és lista

<a class="instui-link" href="#">A styled link</a>

<ul class="instui-list">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

## Űrlapvezérlők

<label class="instui-checkbox"><input type="checkbox" checked /> Email me updates</label>

<div style="height:8px"></div>
<label class="instui-radio"><input type="radio" name="demo" checked /> Option A</label>
<label class="instui-radio"><input type="radio" name="demo" /> Option B</label>

<div style="height:8px"></div>
<label class="instui-checkbox instui-checkbox--toggle"><input type="checkbox" checked /> Notifications on</label>
<label class="instui-checkbox instui-checkbox--toggle"><input type="checkbox" /> Notifications off</label>

```html
<label class="instui-checkbox instui-checkbox--toggle">
  <input type="checkbox" checked /> Notifications on
</label>
```

## Forgó és folyamatjelző

<div style="display:flex; align-items:center; gap:24px;">
  <span class="instui-spinner" role="status" aria-label="Loading"></span>
  <div style="flex:1;">
    <div class="instui-progress"><div class="instui-progress__bar" style="width:60%"></div></div>
  </div>
</div>

## Menü

<div class="instui-menu" style="max-width:220px;">
  <div class="instui-menu__item">Edit</div>
  <div class="instui-menu__item">Duplicate</div>
  <div class="instui-menu__separator"></div>
  <div class="instui-menu__item">Delete</div>
</div>

## Modális ablak

<div class="instui-modal" style="max-width:420px;">
  <div class="instui-modal__header"><strong>Confirm</strong></div>
  <div class="instui-modal__body">Are you sure you want to continue?</div>
  <div class="instui-modal__footer" style="display:flex; gap:12px; justify-content:flex-end;">
    <button class="instui-button instui-button--secondary">Cancel</button>
    <button class="instui-button">Confirm</button>
  </div>
</div>

## Morzsamenü

<nav class="instui-breadcrumb" aria-label="Breadcrumb">
  <span class="instui-breadcrumb__item"><a href="#">Home</a></span>
  <span class="instui-breadcrumb__item"><a href="#">Guides</a></span>
  <span class="instui-breadcrumb__item">Components</span>
</nav>

## Óriásplakát (Billboard)

<div class="instui-billboard">
  <div class="instui-billboard__message">Nothing here yet. Create your first item to get started.</div>
</div>

## Értékelés

<span class="instui-rating">
  <span class="instui-rating__star instui-rating__star--filled">★</span>
  <span class="instui-rating__star instui-rating__star--filled">★</span>
  <span class="instui-rating__star instui-rating__star--filled">★</span>
  <span class="instui-rating__star">★</span>
  <span class="instui-rating__star">★</span>
</span>

## Kontextusnézet

<div class="instui-context-view" style="max-width:320px;">
  A context view frames a callout with a caret. Point it at the thing it explains.
</div>

## Folyamatkör

<div style="display:flex; gap:24px; align-items:center; flex-wrap:wrap;">
  <span class="instui-progress-circle" style="--value:25;" role="img" aria-label="25 percent"></span>
  <span class="instui-progress-circle" style="--value:60;" role="img" aria-label="60 percent"></span>
  <span class="instui-progress-circle" style="--value:90;" role="img" aria-label="90 percent"></span>
</div>

```html
<span class="instui-progress-circle" style="--value:60;" role="img" aria-label="60 percent"></span>
```

## Lapozás

<nav class="instui-pagination" aria-label="Pagination">
  <a class="instui-pagination__page" href="#">1</a>
  <a class="instui-pagination__page" href="#" aria-current="page">2</a>
  <a class="instui-pagination__page" href="#">3</a>
  <a class="instui-pagination__page" href="#">4</a>
</nav>

## Csonkítás

<div class="instui-truncate" style="max-width:280px;">
  This single line keeps going past the edge of its box, so it ends in an ellipsis.
</div>

<div style="height:8px"></div>
<div class="instui-truncate" style="--lines:2; max-width:280px;">
  Set the <code>--lines</code> custom property to clamp to a fixed number of lines instead. This
  paragraph runs long on purpose so the clamp has something to cut off after the second line.
</div>

```html
<div class="instui-truncate">One line, then an ellipsis…</div>
<div class="instui-truncate" style="--lines:2;">Clamp me to two lines…</div>
```

## Részletek kapcsolása

<details class="instui-toggle-details">
  <summary>What ships in this package?</summary>
  Class-based component styles, built from the Instructure tokens, plus a prose layer.
</details>

## Fájl feltöltés

<div class="instui-file-drop">
  Drag a file here, or click to browse.
</div>

<div style="height:8px"></div>
<div class="instui-file-drop instui-file-drop--accepted">File accepted.</div>

## Tartomány

<label for="range-demo">Volume</label>
<input id="range-demo" class="instui-range" type="range" min="0" max="100" value="40" />

Itt minden tiszta CSS, amelyet a `--instui-*` tokenek vezérelnek, így a tokenrétegen keresztül követi az InstUI-t.
A `componentsCss` és a komponensenkénti építők részleteiért lásd az [API-referenciát](/api/).
