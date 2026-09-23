# Complementos

Un complemento de pantoken extiende la salida de tokens o CSS sin bifurcar un paquete. Se crea con
`definePlugin` de `@pantoken/plugin-kit`, luego pásalo a `buildTokens` o `toCss`.

## Crear un complemento

Proporciona a `definePlugin` los hooks que implementes. Devuelve un complemento normal, marcado con las
capacidades inferidas a partir de esos hooks. Un complemento puede extender el IR (`tokens`, `icons`), la salida CSS
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
cuando un complemento no tiene un hook coincidente para la etapa en la que está registrado, por lo que un complemento solo de tokens pasado
a `toCss` se omite con una nota en lugar de no hacer nada en silencio.

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

Ejecuta las comprobaciones compartidas de drift desde `@pantoken/utils` sobre la propia salida de tu complemento en su prueba, de modo que un
error tipográfico o un token renombrado falle rápido y localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Los complementos incluidos

- `@pantoken/plugin-simple-icons` — icons de simple-icons, registrados como tokens de icono.
- `@pantoken/plugin-lucide-lab` — iconos de Lucide Lab, registrados como tokens de imagen `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotipos de producto de Instructure como SVGs, URIs de datos y tokens de imagen `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin de PostCSS (no un complemento de pantoken) que elimina
  propiedades personalizadas no usadas de una hoja de estilos.

El registro de Lucide Lab puede cargarse de forma diferida y luego pasarse al hook de tokens síncrono:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunas cosas que antes eran complementos ahora se incluyen en `@pantoken/components`, ya que tantos componentes las necesitan
por defecto: sombras de elevación (`--instui-elevation-*`, en `components.css`), el anillo de contorno de foco
(en `base.css` — cada elemento focalizable lo obtiene cuando pantoken controla la página), y las fuentes de la marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; el opt-in
`@pantoken/components/fonts.css` carga los woff2 de `@font-face`).

Consulta la [referencia de la API](/api/) para las exportaciones de cada complemento.
