# Complementos

Un complemento de pantoken extiende la salida de tokens o CSS sin bifurcar un paquete. Se crea con
`definePlugin` desde `@pantoken/plugin-kit`, y luego se pasa a `buildTokens` o `toCss`.

## Crear un complemento

Da a `definePlugin` los hooks que implementes. Devuelve un plugin normal, marcado con las
capacidades inferidas a partir de esos hooks. Un plugin puede extender la IR (`tokens`, `icons`), la salida CSS
(`css`), o ambos.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registro consciente de capacidades

`buildTokens` y `toCss` ejecutan `checkPlugins` sobre los plugins que pases. Advierte —nunca lanza—
cuando un plugin no tiene un hook coincidente para la etapa en la que está registrado, así que un plugin solo de tokens pasado
a `toCss` se omite con una nota en lugar de no hacer nada silenciosamente.

## Componer plugins

Construye encima de otro plugin con `extendPlugin`, o combina pares con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Los hooks de la misma etapa se componen: `tokens` ejecuta la base y luego la adición, `css` fusiona las dos
contribuciones, y `icons` ejecuta ambas.

## Valida la salida de tu plugin

Ejecuta las comprobaciones de drift compartidas desde `@pantoken/utils` sobre la propia salida de tu plugin en su test, para que un
error tipográfico o un token renombrado falle rápido y localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Los plugins incluidos

- `@pantoken/plugin-simple-icons` — marca iconos de simple-icons, registrados como tokens de icono.
- `@pantoken/plugin-lucide-lab` — iconos de Lucide Lab, registrados como tokens de imagen `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotipos de productos Instructure como SVG, URIs de datos y tokens de imagen `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin de PostCSS (no un plugin de pantoken) que elimina
  propiedades personalizadas no usadas de una hoja de estilos.
- `@pantoken/plugin-custom-theme-colors` — rebrandea una página estableciendo un atributo
  (`data-pantoken-color`) a una de 13 paletas, o a `custom` para cualquier hex de marca. Ver
  [Colores del tema](#theme-colors).
- `@pantoken/plugin-custom-components` — controles personalizados respaldados por tokens incluyendo SegmentedControl
  y SkeletonLoader.

### Control segmentado

Usa un control segmentado para dos a cinco vistas o filtros relacionados. Cada opción es un radio nativo con etiqueta en un grupo nombrado; marca uno como seleccionado inicialmente. Usa pestañas o un desplegable si las opciones no caben cómodamente, y usa grupos de botones para acciones en lugar de elecciones. El estilo `-size-md` es el
predeterminado, con `-size-sm` y `-size-lg` para contextos más compactos o más prominentes.

Importa `@pantoken/plugin-custom-components/segmented-control.css` para el control y sus botones de desbordamiento.
Usa una clase `-icon-*` en la etiqueta de un segmento cuando el segmento necesite un glifo; el helper de interacción también promueve una clase `-icon-*` desde su input nativo al pintor de la etiqueta.
Da al fieldset un `aria-label` descriptivo o una leyenda visible. El helper preserva el anuncio nativo del radio, añade navegación por teclado, y opcionalmente revela un segmento recortado por pulsación de flecha.
Usa controles lógicos de inicio/fin y etiquetas de botón accesibles en ambas direcciones:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Importa `@pantoken/interactions/segmented-control.iife.js` para el registro cuando el DOM esté listo, o llama
a `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` desde `@pantoken/interactions`
y llama a `cleanup()` al removerlo. El CSS y las elecciones de radio nativas funcionan sin JS; las flechas de desbordamiento necesitan el comportamiento. El elemento seleccionado usa la sombra de diseño de dos capas de los colores semánticos de drop-shadow; es una sombra de elemento-activo distinta en lugar de un compuesto `--instui-elevation-*` existente. Los botones de desbordamiento usan los tokens de componente elevation3 upstream
a través de `--pantoken-segmented-overflow-shadow`.

### Carga esquelética (Skeleton loading)

La subruta `skeleton-loader.css` estiliza una forma decorativa de Texto, Avatar o Imagen. Texto acepta
`-size-xxs` mediante `-size-xxl`; Avatar e Imagen son de tamaño mediano. Cada `.skeleton-row` opcional
añade una línea de texto sin cambiar el tamaño. El brillo CSS se detiene después de tres barridos de 1.5 segundos y
permanece estático cuando el usuario prefiere reducir el movimiento. Funciona antes de que JavaScript cargue.

Coloca las formas solo donde aparecerá contenido dependiente de la consulta, no sobre navegación conocida por el servidor,
filtros, encabezados, o controles. Un skeleton no es un medidor de progreso ni un estado de ocupado por acción. Mantén
el contenido existente visible durante las actualizaciones en segundo plano; usa un spinner o el estado de botón ocupado para acciones.

La aplicación padre posee los marcados de loading, loaded, empty y error. Proporciona una región de estado vacía
por página y una alerta vacía separada en el HTML del servidor, ambas fuera de la región de contenido ocupado:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Llama al comportamiento a nivel padre cuando cambia el estado de la petición. Actualiza `aria-busy` y los dos
anuncios preexistentes, pero nunca reemplaza contenido ni mueve el foco:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Si se usa el paquete de interacciones por componente en lugar de la importación directa, despacha un
evento `pantoken:skeleton-state` en el elemento `[data-skeleton-region]` con
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Retrasa la visualización de
placeholders entre 200–500 ms para peticiones rápidas; el comportamiento retrasa de forma independiente el anuncio de carga por 400 ms. En cargas pasivas de página, deja el foco donde está. Solo mueve el foco a un resultado recién cargado cuando la propia acción del usuario lo solicitó. El nodo de estado anuncia resultados y estados vacíos; el nodo de alerta anuncia fallos. No combines `aria-busy`, `role="status"` y
`role="alert"` en un mismo elemento.

El registro de Lucide Lab puede cargarse perezosamente, y luego pasarse al hook de token síncrono:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunas cosas que antes eran plugins ahora se envían en `@pantoken/components`, ya que muchos componentes las necesitan
por defecto: sombras de elevación (`--instui-elevation-*`, en `components.css`), el anillo de focus-outline
(en `base.css` — cada elemento enfocables lo obtiene cuando pantoken posee la página), y las fuentes de marca de Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; el opt-in
`@pantoken/components/fonts.css` carga los woff2s `@font-face`).

## Colores del tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emite un bloque `[data-pantoken-color="…"]` por paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloque apunta las primitivas de marca (`--instui-primitive-color-navy-*` y `-blue-*`)
a la paleta elegida. También re-deriva las superficies de marca que upstream aplanó a hex literales,
manteniendo su alfa horneado a través de `color-mix()`. Los colores semánticos de estado, los acentos azules explícitos y
las sombras de elevación permanecen. Pruébalo en la
[demo de tematización basada en swatches](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Color de marca personalizado

Establece `data-pantoken-color="custom"` para rebrandear desde cualquier hex, como el color primario que un administrador de Canvas
introduzca en el Editor de Tema. pantoken deriva una escala completa de `--instui-primitive-color-custom-*` de 10–200
pasos a partir de él:

1. **Curva de referencia.** La luminosidad objetivo de cada paso es el promedio de luminosidad OKLCH de las 13
   paletas en ese paso, con 0 fijado en blanco y 210 en negro. Así, el espaciado de la escala personalizada
   coincide con el de las paletas incluidas.
2. **Anclaje.** La entrada aterriza en el paso cuya luminosidad objetivo está más cercana a la suya, luego se ajusta a
   esa luminosidad exacta. `#cccccc` se vuelve `custom-40` en `#c9c9c9`: cercano a la entrada, pero no
   siempre idéntico. "Más cercano" significa el paso más cercano en la curva, no el color de paleta existente más próximo.
3. **Relleno.** Cada otro paso conserva el tono (hue) de la entrada. Su saturación sigue la curva de saturación promedio de las paletas en relación con el ancla, y se reduce solo donde un color cae fuera de sRGB.

Solo se aceptan `#rgb` y `#rrggbb`; cualquier otra cosa lanza una `TypeError`, así que un hex desde un formulario
no puede inyectar CSS.

En tiempo de compilación, emite toda la regla con las primitivas derivadas ya declaradas:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Para elegir el color en tiempo de ejecución sin enviar el conjunto de tokens, precompute la curva y la regla de remapeo
en tiempo de compilación. Luego usa la entrada sin dependencias `/scale` en el navegador, y establece solo las 20
primitivas derivadas:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

El selector de tema del sitio de la documentación, el editor de temas de Canvas y la demo arriba funcionan todos de esta manera.

Consulta la [referencia de la API](/api/) para las exportaciones de cada plugin.
