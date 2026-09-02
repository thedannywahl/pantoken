# CDN & Verteilung

pantoken veröffentlicht jedes Paket zu npm, sodass Tokens, Komponenten und Webkomponenten direkt
von einem CDN bezogen werden können — kein Build-Schritt, kein Bundler. Diese Seite behandelt die CSS-Combine-URL (mit einem interaktiven
Builder) sowie die Web-Component-Drop‑ins.

## Die Token-Grundlage

Jede pantoken-Komponente liest `--instui-*` Custom Properties aus einem Token-Sheet auf der Seite. Zwei
Varianten werden ausgeliefert:

- `@pantoken/css/dist/style.lean.css` — die empfohlene CDN-Grundlage. Sie enthält alle Tokens außer dem
  vollständigen Icon-Set, daher beträgt die Größe etwa 23 KB gzipped.
- `@pantoken/css/dist/style.css` — das vollständige Sheet, einschließlich aller ~1.777 Icon-Glyph-Tokens
  (`--instui-icon-*`). Etwa 140 KB gzipped. Laden, wenn Icons breit über
  `var(--instui-icon-*)` referenziert werden.

Die Elevation-Skala und Focus‑Ring-Variablen sind in beiden Sheets enthalten, sodass Schatten und der Fokus‑Ring bereits mit
nur der geladenen Foundation funktionieren.

## Wähle deine Komponenten und Icons

Der [interaktive CDN-Picker](/guide/cdn-picker) erstellt jsDelivr-Combine-URLs für CSS und Snippets für JavaScript‑Pakete. Öffnen, auswählen, was benötigt wird, und die generierte Ausgabe kopieren.

- **Components‑Tab** — einzelne Komponenten-Stylesheets oder das gesamte `components.css` Barrel wählen. Füge das Base‑Reset oder Spacing/Color‑Utilities hinzu, falls benötigt.
- **JS‑Tab** — ein ESM‑Import‑Snippet für `@pantoken/interactions` kopieren.
- **Icons‑Tab** — einzelne Icons aus dem InstUI‑Set (~1.800 Icons) oder aus Simple Icons (~3.300 Brand‑Glyphs) wählen. Der Picker gibt eine separate Combine‑URL für die Icon‑CSS‑Dateien aus, sodass nur die tatsächlich verwendeten Icons geladen werden.
- **Web Components‑Tab** — `@pantoken/web-components` Snippets erstellen (ESM selective register oder klassisches Script‑Bootstrap).

Jede Komponentendatei ist klein — die meisten sind um die 2 KB. Eine Komponente, die Icons rendert (`alert`, `checkbox`,
und einige andere), benötigt diese Glyphs, also fügt der Builder `@pantoken/components/dist/component-icons.css` (etwa
0,5 KB gzipped — die 11 Icons, die das Komponentenset verwendet) hinzu, wenn das schlanke Sheet gewählt wird. Das vollständige Sheet
enthält sie bereits.

### Lade-Reihenfolge und Fonts

Zuerst die Token-Grundlage laden, dann optional das Base‑Reset, danach die Komponenten-Dateien und zuletzt die Utilities — sie sind Override-Utilities und überschreiben eine Komponente tatsächlich nur dann, wenn sie später in der Kaskade landen. Die obenstehende Combine‑URL ordnet sie bereits für dich. Fonts sind die einzige Ausnahme:
`@pantoken/components/dist/fonts.css` verweist per relativen Pfad auf Font‑Dateien, daher kann Combine sie nicht umschreiben — lade es als eigenes `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Alles auf einmal

Im Picker **All components** auswählen, um auf das Barrel umzuschalten, oder selbst darauf verweisen (etwa 141 KB
gzipped) zusammen mit dem Token‑Sheet:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Webkomponenten

`@pantoken/web-components` registriert framework‑agnostische `<instui-*>` Custom Elements. Sie betten ihr
eigenes CSS ein, lesen aber weiterhin Tokens aus einem Sheet auf der Seite, also ebenfalls eine Token‑Foundation laden.

### ES‑Module (empfohlen)

Ein ESM‑CDN löst die Abhängigkeiten des Pakets für dich auf. Das registriert jedes Element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Das vollständige Token‑Sheet verwenden (oder das schlanke Sheet plus `component-icons.css`), damit ikon‑rendernde Elemente wie
`<instui-alert>` ihre Glyphs auflösen.

Um nur einige Elemente — und deren verschachtelte Abhängigkeiten — zu registrieren, `register` importieren und `only` übergeben:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Ein klassisches Script‑Tag

Für ein No‑Modules‑Drop‑in die IIFE‑Build laden. Es bündelt seine Abhängigkeiten und registriert beim Laden automatisch jedes
Element und exponiert ein `PantokenWebComponents` Global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Es ist größer als der ESM‑Pfad — es inlined `@pantoken/components` und `@pantoken/icons` — also nur verwenden, wenn Module nicht möglich sind.

## Versionen fixieren

Die URLs oben — und die, die der Picker schreibt — zeigen auf die neueste Release. Für Produktion eine Major‑Version (oder exakt) pinnen — zum Beispiel `@pantoken/css@0` — damit ein Upgrade nicht überraschend ist.
