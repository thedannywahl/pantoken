# Complementos

Un complemento de pantoken amplía la salida de tokens o CSS sin bifurcar un paquete. Se crea con
`definePlugin` desde `@pantoken/plugin-kit`, luego pásalo a `buildTokens` o `toCss`.

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

`buildTokens` y `toCss` ejecutan `checkPlugins` sobre los complementos que pases. Advierte — nunca lanza —
cuando un complemento no tiene un hook que coincida con la etapa en la que se registra, por lo que un complemento solo de tokens pasado
a `toCss` se omite con una nota en lugar de no hacer nada silenciosamente.

## Componer complementos

Construye sobre otro complemento con `extendPlugin`, o combina pares con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Los hooks de la misma etapa se componen: `tokens` ejecuta primero la base y luego la adición, `css` fusiona las dos
contribuciones, y `icons` ejecuta ambas.

## Validar la salida de tu complemento

Ejecuta las comprobaciones de deriva compartidas de `@pantoken/utils` sobre la propia salida de tu complemento en su test, así un
error tipográfico o un token renombrado falle rápido y de forma local:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Los complementos incluidos

- `@pantoken/plugin-simple-icons` — marca iconos de simple-icons, registrados como tokens de icono.
- `@pantoken/plugin-logos` — logotipos de producto de Instructure como SVGs, URIs de datos y tokens de imagen `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin de PostCSS (no un complemento de pantoken) que elimina
  propiedades personalizadas no usadas de una hoja de estilos.

Algunas cosas que antes eran complementos ahora se envían en `@pantoken/components`, ya que muchos componentes las necesitan
por defecto: sombras de elevación (`--instui-elevation-*`, en `components.css`), el anillo de contorno de foco
(en `base.css` — todos los elementos enfocables lo reciben cuando pantoken controla la página), y las fuentes de la marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; el opt-in
`@pantoken/components/fonts.css` carga los woff2s de `@font-face`).

Consulta la [referencia de la API](/api/) para las exportaciones de cada complemento.
