# Componentes

`@pantoken/components` incluye estilos de componentes basados en clases construidos a partir de los tokens de Instructure. Importa la hoja de estilos y etiqueta tu marcado — no se requiere framework.

```ts
import "@pantoken/components/components.css";
```

> [!NOTA]
> ¿Prefieres elementos personalizados? `@pantoken/web-components` envuelve estos mismos estilos como `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` y más — ver el
> [mapa del paquete](/api/).

## Convenciones

Las convenciones de CSS en este paquete se basan en una versión modificada de [RSCSS](https://ricostacruz.com/rscss/index.html).

Los modificadores son **clave-valor** — `-<prop>-<val>`, alineados a los nombres de props de InstUI — por lo que se leen por
sí mismos: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Las props booleanas son solo
el nombre de la prop, donde la presencia significa `true` (`-has-shadow`, `-clickable`); un booleano con valor por defecto activado al
desactivarse invierte (`-without-background`, `-without-border`). Los tamaños aceptan tanto formas cortas como largas
(`-size-sm` = `-size-small`). Cuando un nombre difiere de InstUI, la clase semántica de InstUI aún funciona
pero está deprecada (p. ej. `-variant-info` → usar `-color-info`).

### Ejemplo

Componente React de Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

componentes pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

Para la prop `timeout` de InstUI, establece la propiedad personalizada sin unidad `--timeout` en milisegundos y carga
la interacción Alert. Un valor positivo programa el despido; `0` (el valor por defecto) deja la alerta en
su lugar. Añade las clases `instui-transition -fade-entered` de la utilidad `transition` para el fade de InstUI; omítelas
para una eliminación inmediata. La interacción controla el estado `-fade-exiting` y dispara un evento cancelable,
burbujeante `dismiss` antes de la eliminación, de modo que una aplicación puede llamar a `preventDefault()` para mantener la
alerta montada.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Las barras de progreso aceptan escalas arbitrarias mediante `--min` (`0` por defecto), `--value`, y `--max`
(`100` por defecto), con alias deprecados `--value-now` y `--value-max`. Añade `-should-animate`
para aplicar la transición de medio segundo de InstUI cada vez que cambia un valor. `.value` está junto a `.bar` como
hijo de la raíz; añade `-render-value-inside` para renderizarlo sobre la pista, alineado a su inicio,
en su lugar (estilízalo para legibilidad contra el color del medidor). Usa un `<progress>` nativo para un
rango basado en cero y `<meter>` cuando el mínimo no sea cero; los web components seleccionan entre ellos
automáticamente a partir del atributo `min`. InstUI no tiene estado indeterminado, así que un `<progress>`
sin su atributo `value` es una conjetura propia de pantoken: `progress-bar` anima `.bar` como un
segmento deslizante y `progress-circle` hace girar su anillo en un arco fijo, ambos ocultando `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Los círculos de progreso aceptan las mismas escalas arbitrarias mediante `--min`, `--value` y `--max`.
`--value-now` y `--value-max` permanecen como alias funcionales deprecados. Añade `-should-animate` y
carga el paquete de interacción de enfoque para reproducir la animación de montaje de InstUI; `--animation-delay` es un
retraso sin unidad en milisegundos. Las ortografías deprecadas `-should-animate-on-mount` y
`-shold-animate-on-mount` siguen siendo alias funcionales.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Prefijo de clase

Cada clase está con namespace `instui-` por defecto. Genera una hoja de estilos con tu propio prefijo — o ninguno — pasando
`prefix` a cualquier constructor. Cualquier valor falsy (`null`, `undefined`, `""`, u omitiéndolo) elimina el
prefijo por completo, así que puedes autor `class="heading -level-h1"` en lugar de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Los modificadores con guion inicial (`.-color-secondary`, `.-level-h1`) permanecen igual en ambos casos. Las
hojas de estilo incluidas en el paquete mantienen el prefijo `instui`.

## Base

`base.css` es un reset opt-in que establece valores por defecto globales del documento a partir de los tokens: `box-sizing`, un
reset `body`, la superficie de la página, color y fuente base del texto, `color-scheme` (para que los tokens
`light-dark()` y los controles nativos sigan el tema), y un enlace base. Cárgalo una vez, antes de las hojas de componentes y de prosa,
cuando pantoken controle la página.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Omítelo cuando estés embebiendo componentes en un host que ya themea su propio `html` y `body` —
el reset pinta la superficie de la página, así que no quieres que compita con el host. Todo lo que establece usa
selectores `:where()` de baja especificidad, por lo que tus propias reglas siempre prevalecen.

`base.css` _aplica_ la fuente de la marca (`font-family: var(--instui-font-family-base)`, con fallbacks del sistema); para _cargarla_, importa el opt-in `fonts.css` — `@font-face` reglas para Atkinson Hyperlegible
Next, apuntando a los woff2 incluidos en el paquete. Está separado porque las tipografías son ~350 kB y
autoalojar fuentes es una elección deliberada.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contenido para lectores de pantalla

<p>Hay un mensaje oculto después de esta oración.<span class="instui-screen-reader-content">Solo los lectores de pantalla anuncian esto.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` oculta visualmente un elemento manteniéndolo en el árbol de accesibilidad
— para etiquetas y texto de estado que la tecnología de asistencia debe leer pero el diseño no debe mostrar.

## Utilidades

`utilities.css` es una capa opt-in de clases transversales: un primitivo `View`, espaciado en la escala de tokens,
y sobrescrituras semánticas de color. A diferencia de las clases `-modifier` de componente, estas usan un **doble
guion** (`--mod`) para que nunca colisionen con los nombres de modificadores de un componente, y se aplican a cualquier
elemento — suelto, o compuesto sobre un componente.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Superficie accent-blue con texto on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centrado con mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` es el `View` de InstUI. Es la base sobre la que aplicas espaciado y color, y
lleva modificadores clave-valor para sus propias props visuales, así no tienes que recurrir a utilidades:
`-background-*` (sus superficies), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, y `-cursor-*` — estos son los propios
modificadores de un solo guion de `view`, no relacionados con las utilidades de doble guion más abajo. Las props de valor libre
(width/height/inset) permanecen como estilos inline; `margin`/`padding` usan las utilidades de espaciado.

**Espaciado** — clases por lado en la escala de espaciado. Léeselas como `{m|p}{side}-{step}`: `m` para
margin o `p` para padding (o las palabras completas `margin`/`padding`), un lado lógico opcional, luego un
paso. Así `.--m-lg` y `.--margin-lg` son lo mismo, al igual que `.--pt-md` y `.--paddingt-md`.

- Lados: none (todos), `t`/`b` (inicio/fin de bloque), `s`/`e` (inicio/fin inline), `x`/`y` (eje inline/block).
  Los lados lógicos se mantienen correctos en diseños de derecha a izquierda.
- Pasos: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, más `auto` solo para margin.

Compónlas para el atajo `margin="small auto large"` de InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — sobrescrituras semánticas que permanecen en la paleta: `.--bg-<name>` (fondo),
`.--text-<name>` (color de texto), y `.--border-<name>` (color de borde). Cada `<name>` es un
token de color semántico — las intenciones (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) además de la paleta `accent-*` (`accent-blue`, `accent-green`, y así
sucesivamente). Un nombre solo existe si el token está en esa familia, por lo que `text-brand` no es una clase — el texto no tiene
token de marca. No hay forma de alcanzar un primitivo o un hex arbitrary, y cada sobrescritura sigue
el tema.

**Familias de tokens** — cada familia "un token, una propiedad" obtiene una clase por token, nombrada según el
token. Compónlas libremente:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (y `-depth1`…`-card`) → `box-shadow`

Cada una establece solo su propiedad, así que `border-width`/`border-radius` necesitan un color `border-*` y un estilo de borde
para realmente dibujar un borde. Estas usan el nombre de token completo (`.--border-radius-md`), mientras que los
helpers de color y espaciado arriba usan alias cortos (`.--bg-brand`, `.--mt-lg`) — los alias
son atajos ergonómicos; las clases de token son literales y exhaustivas.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) y `.--text-align-<value>` (`start`, `center`, `end`, `justify`) cubren las
props transversales `display` y `textAlign` de InstUI (View, Button, Metric, Tabs, …) como clases composables —
por lo que no son modificadores por componente.

Cada clase de doble guion gana la cascada de forma determinista sobre un modificador de componente de
mismo nombre con un guion simple, independientemente del orden de importación de las hojas de estilo — ver [Convenciones de authoring](/conventions/authoring)
para el mecanismo.

Todo aquí es CSS puro impulsado por los tokens `--instui-*`, por lo que sigue a InstUI a través de la capa de tokens. Ver la [referencia de la API](/api/) para `componentsCss` y los constructores por componente.

## Overlays: diálogo y popover

Los componentes overlay usan primitivos nativos de la plataforma, por lo que se comportan de forma accesible con poco o ningún
JavaScript.

**Modal** — pon `.instui-modal` en un `<dialog>` nativo. Obtiene enfoque atrapado, cierre con `Esc` y un
`::backdrop` gratis; el backdrop se atenúa con el mismo token `--instui-component-mask-background-color`
que `.instui-mask` (añade `-blur` para escarcharlo). Ábrelo y ciérralo con comandos invoker — sin script:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — pon `.instui-context-view` en un elemento `[popover]` y alterna con
`popovertarget`. Se sitúa en la capa superior y se descarta con clic fuera o `Esc`, nuevamente sin script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — pon `.instui-drawer-layout` en una raíz de layout con hijos `.tray` y `.content`.
Añade el atributo `open` (o `-open`) para revelar la bandeja, y usa `placement="end"`
(o `-placement-end`) para acoplarla al lado inline-end — la colocación se resuelve mediante propiedades lógicas
`inset-inline-*`/`flex-direction`, por lo que gira automáticamente bajo `dir="rtl"` sin
reglas extras. El paquete de interacción enfocada añade el enrutamiento de comandos Invoker y alterna el modo overlay
(`should-overlay-tray`) cuando el ancho cruza `--drawer-layout-min-width` (por defecto
`--instui-breakpoints-sm`, luego `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` permanece para overlays en flujo (un spinner sobre una tarjeta); el `::backdrop`
de un modal cubre el caso modal.

Ambos patrones también están envueltos como elementos personalizados comportamentales en `@pantoken/web-components`:
`<instui-modal open>` (un `<dialog>` controlado por su atributo `open`) y `<instui-context-view>` (un
popover nativo).

Compatibilidad del navegador: la API de popover y `popovertarget` son Baseline 2024; los comandos invoker
(`command`/`commandfor`) son Baseline 2025, así que en navegadores antiguos conecta los botones a `dialog.showModal()`
como fallback de una línea. Posicionar un popover junto a su trigger usa anchor positioning de CSS donde
está soportado (Chromium); en otros navegadores se centra en la capa superior.

## Formularios

**FormField** — `.instui-form-field` es un wrapper CSS-Grid que dispone una etiqueta, el control y cualquier
mensaje. Ponlo en un `<label>` para que la etiqueta se asocie nativamente con su control. Tiene tres áreas de grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (por defecto) apila las áreas; `-layout-inline` coloca la etiqueta junto al control (ajusta
con `-label-align-{start,end}` y `-v-align-{top,middle,bottom}`). `-readonly` recolorea la etiqueta.

El **asterisco requerido** aparece cuando el campo es obligatorio por _cualquiera_ de la clase `-required` _o_ un
control nativo `required` dentro de él — así que puedes simplemente establecer `required` en el input y la marca aparece.
Es decorativo (un `::after` en la etiqueta, fuera del árbol de accesibilidad); complétalo con una nota como
"los campos marcados \* son obligatorios" a menos que el formulario sea evidente por sí mismo.

**FormFieldGroup** — `.instui-form-field-group` agrupa campos relacionados en un `<fieldset>` con una
descripción `<legend>`. Es puro layout (sin tokens dedicados): por defecto apila los campos;
`-layout-columns` / `-layout-inline` los fluyen en columnas responsivas, con `-row-spacing-*` /
`-col-spacing-*` y `-v-align-*` para ajustar la rejilla.

**RadioInputGroup** — `.instui-radio-input-group` es el mismo agrupamiento `<fieldset>`/`<legend>`,
especializado para radios. Debido a que los radios hijos comparten un `name`, la selección es nativamente de elección única —
así que un conjunto de botones toggle se comporta como un control, no como botones sueltos. `-variant-simple` (por defecto) dispone
los radios estándar (`-layout-columns`/`-inline` los fluyen en una fila); `-variant-toggle` conecta los
botones `.instui-radio.-variant-toggle` hijos en un control segmentado único (bordes colapsados,
extremos exteriores redondeados):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Mensajes** — `.instui-form-field-messages` es el contenedor; cada `.instui-form-field-message` toma un
`-type-*`: `-type-hint` (gris, por defecto), `-type-error` (texto rojo + un glifo de alerta circular), `-type-success`
(texto verde + un glifo de check circular), y `-type-screenreader-only` (visualmente recortado, aun así anunciado).
Los glifos pintan en `currentColor`, por lo que siempre coinciden con el color del mensaje. `-type-new-error` es un
alias deprecado de `-type-error`. Conecta el contenedor al control con `aria-describedby`, y establece
`aria-invalid` en el control cuando hay un error.

Dentro de un FormField, un mensaje `-type-error` sigue la validación del lado cliente: permanece oculto hasta que el
control del campo está `:user-invalid` (nativo, después de que el usuario interactúe) — o lo fuerzas con `-invalid`
en el `.instui-form-field` (para un error del lado servidor). Un `.instui-form-field-messages` independiente (no en
un campo) no se ve afectado. El anillo de foco del control hace lo propio: peligro cuando `:user-invalid`/`-invalid`,
éxito en `-success`.

**Controles de texto** — `.instui-text-input` (nativo `<input>`), `.instui-text-area` (nativo `<textarea>`,
redimensionable), y `.instui-simple-select` (nativo `<select>` con caret) comparten una apariencia y los mismos
estados: `-invalid` (borde de error), `-success` (borde de éxito), `-readonly`, `:disabled` nativo, y
`-size-{sm,md,lg}`. Para un icono lead/trailing (InstUI's `renderBeforeInput`/`renderAfterInput`), envuelve
el input en `.instui-input-group` y añade un slot `.before`/`.after` (un glifo `-icon-*`); `-should-not-wrap`
lo mantiene en una sola línea. `.instui-number-input` es esa fachada más una columna spinner +/- `.arrows` (nativo
`type="number"`; conecta los botones a `stepUp()`/`stepDown()`). `.instui-range-input` es un
`input[type="range"]` estilizado cuyo valor se renderiza en una burbuja inversa `.instui-range-input-value`. Para un combobox enriquecido con un popover listbox, usa `@instructure/ui` — esta librería cubre los controles nativos.

**Select estilizado (experimental)** — un opt-in `select.css` mejora el _mismo_
elemento `.instui-simple-select`: estiliza el dropdown abierto (el panel y cada opción, con hover y
estados seleccionados) usando el modelo CSS Customizable Select.

> [!ADVERTENCIA]
> `select.css` depende de `appearance: base-select` / `::picker(select)`, lo cual es **experimental**
> (Chrome 135+, aún no Baseline). Se distribuye como una hoja de estilos opt-in separada y cada regla está condicionada
> por `@supports (appearance: base-select)`, por lo que no hace nada en navegadores no soportados — el
> control `.instui-simple-select` simplemente permanece como el select nativo. Cárgalo solo si quieres el
> dropdown mejorado y aceptas el soporte limitado.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
