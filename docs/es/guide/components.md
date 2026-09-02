# Componentes

`@pantoken/components` incluye estilos de componentes basados en clases construidos a partir de los tokens de Instructure. Importa
la hoja de estilos y etiqueta tu marcado — no se requiere framework.

```ts
import "@pantoken/components/components.css";
```

> [!NOTA]
> ¿Prefieres elementos personalizados? `@pantoken/web-components` envuelve estos mismos estilos como `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, y más — ver el
> [mapa de paquetes](/guide/packages).

## Convenciones

Las convenciones CSS en este paquete se basan en una versión modificada de [RSCSS](https://ricostacruz.com/rscss/index.html).

Los modificadores son **clave-valor** — `-<prop>-<val>`, alineados con los nombres de props de InstUI — de modo que se leen por
sí mismos: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Las props booleanas son el nombre
de la prop solo, donde la presencia significa `true` (`-has-shadow`, `-clickable`); una boolean por defecto activada que se apaga
invierte (`-without-background`, `-without-border`). Los tamaños aceptan tanto la forma corta como la larga
(`-size-sm` = `-size-small`). Cuando un nombre difiere de InstUI, la clase semántica de InstUI sigue funcionando
pero está obsoleta (p. ej. `-variant-info` → usar `-color-info`).

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
la interacción Alert. Un valor positivo programa el cierre; `0` (el valor por defecto) deja la alerta en
su lugar. Añade las clases `instui-transition -fade-entered` de la utilidad `transition` para el fade de InstUI; omítelas
para la eliminación inmediata. La interacción dirige el estado `-fade-exiting` y dispara un evento cancelable,
burbujeante `dismiss` antes de la eliminación, para que una aplicación pueda llamar a `preventDefault()` para mantener la
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
(`100` por defecto), con alias obsoletos `--value-now` y `--value-max`. Añade `-should-animate`
para aplicar la transición de medio segundo de InstUI siempre que cambie un valor. `.value` se sitúa junto a `.bar` como
hijo de la raíz; añade `-render-value-inside` para renderizarlo sobre la pista, alineado a su inicio,
en su lugar (estílalo para legibilidad contra el color del medidor). Usa un `<progress>` nativo para un
rango basado en cero y `<meter>` cuando el mínimo no sea cero; los web components seleccionan entre ellos
automáticamente desde su atributo `min`. InstUI no tiene estado indeterminado, así que un `<progress>`
que carece de su atributo `value` es una suposición propia de pantoken: `progress-bar` anima `.bar` como un
segmento deslizante y `progress-circle` gira su anillo en un arco fijo, ambos ocultando `.value`.

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
`--value-now` y `--value-max` permanecen como alias funcionales obsoletos. Añade `-should-animate` y
carga el paquete de interacción de enfoque para reproducir la animación de montaje de InstUI; `--animation-delay` es un
retraso sin unidad en milisegundos. Las grafías obsoletas `-should-animate-on-mount` y
`-shold-animate-on-mount` permanecen como alias funcionales.

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

Cada clase está con espacio de nombres `instui-` por defecto. Construye una hoja de estilos con tu propio prefijo — o ninguno — pasando
`prefix` a cualquier constructor. Cualquier valor falsy (`null`, `undefined`, `""`, u omitirlo) elimina el
prefijo por completo, así que puedes escribir `class="heading -level-h1"` en lugar de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Los modificadores con guión inicial (`.-color-secondary`, `.-level-h1`) no cambian de ninguna manera. Las
hojas de estilo incluidas por el paquete mantienen el prefijo `instui`.

## Base

`base.css` es un reset opt-in que establece valores predeterminados globales del documento a partir de los tokens: `box-sizing`, un
reset `body`, la superficie de la página, color y fuente de texto base, `color-scheme` (para que los tokens `light-dark()` y los controles nativos
sigan el tema), y un link base. Cárgalo una vez, antes de las hojas de componentes y prosa,
cuando pantoken gestione la página.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Omítelo cuando estés incrustando componentes en un host que ya temea sus propios `html` y `body` —
el reset pinta la superficie de la página, por lo que no quieres que compita con el host. Todo lo que establece usa
selectores `:where()` de baja especificidad, así que tus propias reglas siempre ganan.

`base.css` _aplica_ la fuente de la marca (`font-family: var(--instui-font-family-base)`, con fuentes de sistema
como fallback); para _cargarla_, importa el opt-in `fonts.css` — reglas `@font-face` para Atkinson Hyperlegible
Next, apuntando a los woff2 incluidos en el paquete. Está separado porque las fuentes ocupan ~350 kB y
autohospedar fuentes es una elección deliberada.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Contenido para lector de pantalla

<p>Hay un mensaje oculto después de esta frase.<span class="instui-screen-reader-content">Solo los lectores de pantalla lo anuncian.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` oculta un elemento visualmente mientras lo mantiene en el árbol de accesibilidad
— para labels y textos de estado que la tecnología asistiva debe leer pero el diseño no debe mostrar.

## Utilidades

`utilities.css` es una capa opt-in de clases transversales: un primitivo `View`, espaciado en la escala de tokens,
y sobrescrituras de color semánticas. A diferencia de las clases de componente `-modifier`, estas usan un **doble
guión** (`--mod`) para que nunca colisionen con los nombres de modificador de un componente, y se aplican a cualquier
elemento — solo, o compuesto sobre un componente.

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

**View** — `.instui-view` es el `View` de InstUI. Es la base sobre la que layerizas espaciado y color, y
lleva modificadores clave-valor para sus propias props visuales para que no tengas que recurrir a utilidades:
`-background-*` (sus superficies), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, y `-cursor-*` — estos son modificadores
de guión simple propios de `view`, no relacionados con las utilidades de doble guión abajo. Las props de valor libre
(width/height/inset) permanecen en estilos inline; `margin`/`padding` usan las utilidades de espaciado.

**Espaciado** — clases por lado en la escala de espaciado. Léelas como `{m|p}{side}-{step}`: `m` para
margen o `p` para padding (o las palabras completas `margin`/`padding`), un lado lógico opcional, luego un
paso. Así `.--m-lg` y `.--margin-lg` son lo mismo, al igual que `.--pt-md` y `.--paddingt-md`.

- Lados: none (todos), `t`/`b` (inicio/fin de bloque), `s`/`e` (inicio/fin en línea), `x`/`y` (eje inline/block).
  Los lados lógicos se mantienen correctos en diseños de derecha a izquierda.
- Pasos: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, más `auto` solo para margen.

Compónlos para la abreviatura `margin="small auto large"` de InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — sobrescrituras semánticas que permanecen en paleta: `.--bg-<name>` (fondo),
`.--text-<name>` (color de texto), y `.--border-<name>` (color de borde). Cada `<name>` es un
token de color semántico — las intenciones (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) más la paleta `accent-*` (`accent-blue`, `accent-green`, y así
sucesivamente). Un nombre solo existe si el token está en esa familia, por lo que `text-brand` no es una clase — el texto no tiene
token de marca. No hay forma de alcanzar un primitivo o un hex arbitrario, y cada sobrescritura sigue
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
para realmente dibujar un borde. Estas usan el nombre completo del token (`.--border-radius-md`), mientras que las
ayudas de color y espaciado arriba usan alias cortos (`.--bg-brand`, `.--mt-lg`) — los alias
son atajos ergonómicos; las clases de token son literales y exhaustivas.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) y `.--text-align-<value>` (`start`, `center`, `end`, `justify`) cubren las
props transversales `display` y `textAlign` de InstUI (View, Button, Metric, Tabs, …) como clases componibles —
por lo que no son modificadores por componente.

Cada clase de doble guión gana la cascada de forma determinista sobre un modificador de componente de nombre idéntico,
independientemente del orden de importación de las hojas de estilo — ver [Convenciones de authoring](/conventions/authoring)
para el mecanismo.

Todo aquí es CSS puro impulsado por los tokens `--instui-*`, por lo que sigue a InstUI a través de la capa de tokens. Ver la [referencia de API](/api/) para `componentsCss` y los constructores por componente.

## Superposiciones: dialog y popover

Los componentes de overlay usan primitivas nativas de la plataforma, por lo que se comportan accesiblemente con poco o ningún
JavaScript.

**Modal** — pon `.instui-modal` en un `<dialog>` nativo. Obtiene atrapado de foco, `Esc`-para-cerrar, y un
`::backdrop` gratis; el backdrop se atenúa con el mismo token `--instui-component-mask-background-color`
que `.instui-mask` (añade `-blur` para escarcharlo). Ábrelo y ciérralo con invoker commands — sin script:

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

**Context view / popover** — pon `.instui-context-view` en un elemento `[popover]` y alternalo con
`popovertarget`. Se sitúa en la capa superior y se cierra con click exterior o `Esc`, de nuevo sin script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — pon `.instui-drawer-layout` en una raíz de layout con hijos `.tray` y `.content`.
Añade el atributo `open` (o `-open`) para revelar la bandeja, y usa `placement="end"`
(o `-placement-end`) para acoplarla al lado inline-end — la colocación se resuelve mediante propiedades lógicas
`inset-inline-*`/`flex-direction`, por lo que gira automáticamente bajo `dir="rtl"` sin
reglas extra. El paquete de interacción de enfoque añade el ruteo de comandos Invoker y alterna el modo overlay
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

**Mask** — `.instui-mask` se mantiene para overlays en flujo (un spinner sobre una tarjeta); el `::backdrop`
de un modal cubre el caso modal.

Ambos patrones también están envueltos como elementos personalizados con comportamiento en `@pantoken/web-components`:
`<instui-modal open>` (un `<dialog>` impulsado por su atributo `open`) y `<instui-context-view>` (un
popover nativo).

Compatibilidad de navegador: la API popover y `popovertarget` son Baseline 2024; los invoker commands
(`command`/`commandfor`) son Baseline 2025, así que en navegadores antiguos enlaza los botones a `dialog.showModal()`
como fallback de una línea. Posicionar un popover junto a su trigger usa posicionamiento ancla en CSS donde
está soportado (Chromium); en otros lugares se centra en la capa superior.

## Formularios

**FormField** — `.instui-form-field` es un wrapper CSS-Grid que dispone una etiqueta, el control y cualquier
mensaje. Ponlo en un `<label>` para que la etiqueta se asocie nativamente con su control. Tiene tres áreas de grid —
`label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (por defecto) apila las áreas; `-layout-inline` coloca la etiqueta al lado del control (ajusta
con `-label-align-{start,end}` y `-v-align-{top,middle,bottom}`). `-readonly` recolorea la etiqueta.

El **asterisco requerido** aparece cuando el campo es requerido por _cualquiera_ de la clase `-required` _o_ un
control nativo `required` dentro de él — así que puedes simplemente establecer `required` en el input y la marca aparece.
Es decorativo (un `::after` en la etiqueta, fuera del árbol de accesibilidad); complétalo con una nota como
"los campos marcados \* son obligatorios" a menos que el formulario sea evidente por sí mismo.

**FormFieldGroup** — `.instui-form-field-group` agrupa campos relacionados en un `<fieldset>` con una
descripción `<legend>`. Es solo layout (sin tokens dedicados): por defecto apila los campos;
`-layout-columns` / `-layout-inline` los fluyen en columnas responsivas, con `-row-spacing-*` /
`-col-spacing-*` y `-v-align-*` para ajustar la grid.

**RadioInputGroup** — `.instui-radio-input-group` es el mismo agrupamiento `<fieldset>`/`<legend>`,
especializado para radios. Debido a que los radios hijos comparten un `name`, la selección es nativamente de una sola opción —
así que un conjunto de botones toggle se comporta como un control, no como botones sueltos. `-variant-simple` (por defecto) dispone
los radios estándar (`-layout-columns`/`-inline` los fluyen en fila); `-variant-toggle` conecta los
botones `.instui-radio.-variant-toggle` hijos en un único control segmentado (bordes colapsados,
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
alias obsoleto de `-type-error`. Conecta el contenedor al control con `aria-describedby`, y pon
`aria-invalid` en el control cuando haya un error.

Dentro de un FormField, un mensaje `-type-error` sigue la validación del lado cliente: permanece oculto hasta que el
control del campo esté `:user-invalid` (nativo, después de la interacción del usuario) — o lo fuerzas con `-invalid`
en el `.instui-form-field` (para un error del lado servidor). Un `.instui-form-field-messages` independiente (no en
un campo) no se ve afectado. El anillo de foco del control sigue igual: peligro cuando `:user-invalid`/`-invalid`,
éxito en `-success`.

**Controles de texto** — `.instui-text-input` (nativo `<input>`), `.instui-text-area` (nativo `<textarea>`,
redimensionable), y `.instui-simple-select` (nativo `<select>` con caret) comparten una apariencia y los mismos
estados: `-invalid` (borde de error), `-success` (borde de éxito), `-readonly`, `:disabled` nativo, y
`-size-{sm,md,lg}`. Para un icono inicial/final (los `renderBeforeInput`/`renderAfterInput` de InstUI), envuelve
el input en `.instui-input-group` y añade una ranura `.before`/`.after` (un glifo `-icon-*`); `-should-not-wrap`
lo mantiene en una sola línea. `.instui-number-input` es esa fachada más una columna spinner +/- `.arrows` (nativo
`type="number"`; enlaza los botones a `stepUp()`/`stepDown()`). `.instui-range-input` es un
`input[type="range"]` estilizado cuyo valor se renderiza en una burbuja inversa `.instui-range-input-value`. Para un combobox enriquecido
con un listbox popover, usa `@instructure/ui` — esta librería cubre los controles nativos.

**Select estilizado (experimental)** — un opt-in `select.css` mejora el _mismo_
elemento `.instui-simple-select`: estiliza el dropdown abierto (el panel y cada opción, con hover y
estados seleccionados) usando el modelo CSS Customizable Select.

> [!ADVERTENCIA]
> `select.css` depende de `appearance: base-select` / `::picker(select)`, lo cual es **experimental**
> (Chrome 135+, aún no Baseline). Se distribuye como una hoja opt-in separada y cada regla está condicionada
> por `@supports (appearance: base-select)`, así que no hace nada en navegadores no compatibles — el
> control `.instui-simple-select` simplemente permanece el select nativo estándar. Cárgalo solo si deseas el
> dropdown mejorado y aceptas la compatibilidad limitada.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
