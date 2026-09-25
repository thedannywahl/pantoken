# Complementos

Un complemento de pantoken extiende la salida de tokens o CSS sin bifurcar un paquete. Se crea con
`definePlugin` desde `@pantoken/plugin-kit`, luego pásalo a `buildTokens` o `toCss`.

## Crear un complemento

Da a `definePlugin` los hooks que implementes. Devuelve un complemento normal, marcado con las
capabilidades inferidas de esos hooks. Un complemento puede extender la IR (`tokens`, `icons`), la salida CSS
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

`buildTokens` y `toCss` ejecutan `checkPlugins` sobre los complementos que pases. Advierte —nunca lanza—
cuando un complemento no tiene un hook coincidente para la etapa en la que está registrado, de modo que un complemento solo de tokens pasado
a `toCss` se omite con una nota en lugar de no hacer nada silenciosamente.

## Componer complementos

Construye sobre otro complemento con `extendPlugin`, o combina pares con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Los hooks de la misma etapa se componen: `tokens` ejecuta la base y luego la adición, `css` fusiona las dos
contribuciones, y `icons` ejecuta ambas.

## Valida la salida de tu complemento

Ejecuta las comprobaciones de deriva compartidas desde `@pantoken/utils` sobre la propia salida de tu complemento en su test, de modo que un
error tipográfico o un token renombrado falle rápido y localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Los complementos empaquetados

- `@pantoken/plugin-simple-icons` — marca iconos de simple-icons, registrados como tokens de icono.
- `@pantoken/plugin-lucide-lab` — iconos de Lucide Lab, registrados como tokens de imagen `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotipos de producto de Instructure como SVG, URIs de datos y tokens de imagen `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin de PostCSS (no un complemento de pantoken) que elimina
  propiedades personalizadas no usadas de una hoja de estilos.
- `@pantoken/plugin-custom-theme-colors` — rebrandea una página estableciendo un atributo
  (`data-pantoken-color`) a una de 13 paletas, o a `custom` para cualquier hex de marca. Ver
  [Colores de tema](#theme-colors).

El registro de Lucide Lab puede cargarse de forma diferida y luego pasarse al hook de tokens sincrónico:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunas cosas que antes eran complementos ahora se incluyen en `@pantoken/components`, ya que muchos componentes
las necesitan por defecto: sombras de elevación (`--instui-elevation-*`, en `components.css`), el anillo de contorno de foco
(en `base.css` — cada elemento enfocables lo obtiene cuando pantoken controla la página), y las fuentes de marca de Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; la opción opt-in
`@pantoken/components/fonts.css` carga los woff2s de `@font-face`).

## Colores del tema

`@pantoken/plugin-custom-theme-colors` emite un bloque `[data-pantoken-color="…"]` por paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloque apunta las primitivas de marca (`--instui-primitive-color-navy-*` y `-blue-*`)
a la paleta elegida. También re-deriva las superficies de marca que el upstream aplanó a hex literal,
manteniendo su alfa horneado mediante `color-mix()`. Los colores semánticos de estado, los acentos azules explícitos y
las sombras de elevación permanecen. Pruébalo en la
[demostración de theming basada en muestras](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Color de marca personalizado

Establece `data-pantoken-color="custom"` para rebrandear desde cualquier hex, como el color primario que un administrador de Canvas
escriba en el Editor de Tema. pantoken deriva una escala completa de 10–200 `--instui-primitive-color-custom-*`
a partir de él:

1. **Curva de referencia.** La luminosidad objetivo de cada paso es la media de la luminosidad OKLCH de las 13
   paletas en ese paso, con 0 fijado en blanco y 210 en negro. Así, el espaciado de la escala personalizada
   coincide con el de las paletas distribuidas.
2. **Anclaje.** La entrada cae en el paso cuya luminosidad objetivo está más cercana a la suya propia, luego se ajusta a
   esa luminosidad exacta. `#cccccc` se convierte en `custom-40` en `#c9c9c9`: cercano a la entrada, pero no
   siempre idéntico. "Más cercano" significa el paso más cercano en la curva, no el color existente más parecido.
3. **Relleno.** Cada otro paso mantiene el tono (hue) de la entrada. Su saturación sigue la curva de saturación media de las paletas relativa al ancla, y se reduce solo donde un color cae fuera de sRGB.

Solo se aceptan `#rgb` y `#rrggbb`; cualquier otra cosa lanza un `TypeError`, por lo que un hex desde un formulario
no puede inyectar CSS.

En tiempo de compilación, emite la regla completa con las primitivas derivadas ya declaradas:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Para elegir el color en tiempo de ejecución sin enviar el conjunto de tokens, precomputar la curva y la regla de remapeo
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

El selector de tema del sitio de la documentación, el editor de temas de Canvas y la demostración anterior funcionan de esta manera.

Consulta la [referencia de API](/api/) para las exportaciones de cada complemento.
