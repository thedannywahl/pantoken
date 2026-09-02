# Empezando

pantoken toma los tokens de diseño e iconos de Instructure UI, los resuelve una vez y reorganiza ese único
modelo en paquetes para muchas plataformas: hojas de estilo planas, SCSS y Less, React y Vue y Svelte,
Tailwind y Panda, nativo Swift y Kotlin, WordPress y Drupal, Figma y más.

Instala el paquete más pequeño que se ajuste a tu tarea. Todo también se re-exporta desde el paquete unificado
`pantoken`, así que puedes empezar allí y concretar más tarde.

## Crear un proyecto inicial

La forma más rápida de probar pantoken: crear un proyecto inicial con él ya instalado y configurado.

```sh
npx create-pantoken-app react
```

Plataformas: `components` (HTML/CSS plano), `react`, `vue`, `svelte`, `web-components`, `angular`. Ver
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) para `--dir <path>` y
uso programático.

¿Usando un agente de codificación IA? No se necesita instalación — apúntalo directamente a la skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Funciona igual para Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI y Amazon Q
Developer CLI — intercambia `claude` por `gemini`, `agent`, `codex`, `copilot -p` o `q chat`. Si prefieres
integrar las reglas del agente de pantoken en el repositorio de forma permanente (AGENTS.md, reglas de editor, una copia local
de esta skill), ejecuta `npx @pantoken/ai init` en su lugar.

## El modelo de tokens

Los tokens son propiedades personalizadas CSS llamadas `--instui-<group>-<name>`, por ejemplo
`--instui-color-background-brand` o `--instui-spacing-space-md`. Se incluyen tres temas: `rebrand`
(el predeterminado, con `light-dark()` donde claro y oscuro difieren), `canvas` y `canvasHighContrast`.
Los iconos son tokens `<image>` (`--instui-icon-<name>`) derivados de Lucide más los glifos personalizados de Instructure.

## Estilar una aplicación web

Instala la hoja de estilos e imprótala una vez. Define cada propiedad `--instui-*`, así que las referencias
directamente desde tu propio CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Usar iconos en cualquier lugar

El componente web funciona en cualquier framework, sin necesidad de portar.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Los iconos son propiedades personalizadas CSS (`--instui-icon-<name>`). Carga la hoja de estilos una vez y referencia cualquier
icono como un `mask-image` o `background-image` — no se necesita import por icono.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icono individual vs. conjunto completo

`@pantoken/icons` expone dos exportaciones nombradas. Usa `iconsByName` para obtener un icono sin iterar
todo el arreglo:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Usa `icons` cuando necesites el conjunto completo (por ejemplo, para construir un selector):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Ambas exportaciones cargan el IR completo en la inicialización del módulo — no hay tree-shaking por icono en este
nivel. Para una carga ligera sólo con CSS, usa el [selector CDN](/guide/cdn-picker) para generar una URL combinada
sólo con los iconos que necesitas.

## Generar para una plataforma nativa

La CLI escribe la fuente de tokens en un repositorio objetivo. No se necesita instalación más allá del runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Ver [la CLI de pantoken](/guide/cli) para cada destino.

## Pistas para authoring en VS Code

`@pantoken/pantoken` ahora incluye archivos de datos personalizados para VS Code para que los proyectos consumidores obtengan completado de clases y
tokens en HTML/CSS sin instalar una extensión específica de pantoken.

1. Instala el paquete unificado:

```sh
npm i @pantoken/pantoken
```

1. Apunta VS Code al JSON de datos personalizados incluido desde tu espacio de trabajo consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Recarga VS Code (o ejecuta "Developer: Reload Window") para aplicar los nuevos datos.

Esto habilita sugerencias para tokens de clase `instui-*` (y tokens de clase `-modifier`) además de
propiedades personalizadas `--instui-*`.

## ¿Qué sigue?

- [El mapa de paquetes](/guide/packages) — qué paquete elegir, según la tarea.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instalar activos y reglas del agente en un repositorio consumidor.
- [Arquitectura](/guide/architecture) — cómo encajan el modelo de tokens, el core y las salidas.
- [Referencia de la API](/api/) — cada símbolo exportado, generado desde la fuente.
