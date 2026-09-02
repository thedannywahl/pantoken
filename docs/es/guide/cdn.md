# CDN y distribución

pantoken publica cada paquete en npm, así que puedes obtener tokens, componentes y web components directamente
desde un CDN — sin paso de compilación, sin bundler. Esta página cubre la URL combinada de CSS (con un generador
interactivo), además de los drop-ins de web-component.

## La base de tokens

Cada componente de pantoken lee `--instui-*` custom properties desde una hoja de tokens en la página. Se envían dos
variantes:

- `@pantoken/css/dist/style.lean.css` — la base CDN recomendada. Lleva todos los tokens excepto el
  conjunto completo de iconos, por lo que ocupa alrededor de 23 KB gzipped.
- `@pantoken/css/dist/style.css` — la hoja completa, incluyendo los ~1,777 glyph tokens de iconos
  (`--instui-icon-*`). Unos 140 KB gzipped. Carga esto si referencías iconos ampliamente vía
  `var(--instui-icon-*)`.

La escala de elevación y las variables del focus-ring están en ambas hojas, así que sombras y el anillo de enfoque funcionan con
solo la base cargada.

## Elige tus componentes e iconos

El [selector CDN interactivo](/guide/cdn-picker) construye URLs combinadas de jsDelivr para CSS y fragmentos para paquetes JavaScript. Ábrelo, marca lo que necesitas y copia la salida generada.

- **Pestaña Components** — elige hojas de estilo de componentes individuales o todo el barril `components.css`. Añade el reset base o utilidades de espacio/color si las necesitas.
- **Pestaña JS** — copia un fragmento de import ESM para `@pantoken/interactions`.
- **Pestaña Icons** — elige iconos individuales del set InstUI (~1,800 iconos) o de Simple Icons (~3,300 glyphs de marca). El selector genera una URL combinada separada para los archivos CSS de iconos para que puedas cargar solo los iconos que realmente usas.
- **Pestaña Web Components** — genera fragmentos `@pantoken/web-components` (registro selectivo ESM o bootstrap clásico por script).

Cada archivo de componente es pequeño — la mayoría rondan los 2 KB. Un componente que renderiza iconos (`alert`, `checkbox`,
y algunos otros) necesita esos glyphs, así que el generador añade `@pantoken/components/dist/component-icons.css` (aprox.
0.5 KB gzipped — los 11 iconos que usa el set de componentes) siempre que selecciones la hoja lean. La hoja completa
ya los incluye.

### Orden de carga y fuentes

Carga la base de tokens primero, luego el reset base opcional, luego los archivos de componentes, y por último las utilidades —
son utilidades de override, así que solo realmente sobrescriben la regla de un componente cuando llegan
después de él en la cascada. La URL combinada más arriba ya los ordena por ti. Las fuentes son la excepción:
`@pantoken/components/dist/fonts.css` apunta a archivos de fuentes por ruta relativa, así que combine no puede reescribirlas — cárgala como su propio `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Todo a la vez

Marca **All components** en el selector para cambiarlo al barril, o apúntalo directamente (unos 141 KB
gzipped) junto a la hoja de tokens:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registra elementos personalizados `<instui-*>` agnósticos al framework. Inyectan su
propio CSS, pero siguen leyendo tokens desde una hoja en la página, así que carga también una base de tokens.

### Módulos ES (recomendado)

Un CDN ESM resuelve las dependencias del paquete por ti. Esto registra todos los elementos:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Usa la hoja de tokens completa (o la hoja lean más `component-icons.css`) para que elementos que renderizan iconos como
`<instui-alert>` resuelvan sus glyphs.

Para registrar solo algunos elementos —y sus dependencias anidadas— importa `register` y pasa `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Un tag de script clásico

Para un drop-in sin módulos, carga la compilación IIFE. Empaqueta sus dependencias y auto-registra cada
elemento al cargarse, exponiendo una global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Es más grande que la ruta ESM — inyecta `@pantoken/components` y `@pantoken/icons` — así que úsalo
solo cuando no puedas usar módulos.

## Fijar versiones

Las URLs de arriba —y las que escribe el selector— siguen la release más reciente. Fija una versión mayor (o exacta)
para producción — por ejemplo `@pantoken/css@0` — así una actualización no te sorprende.
