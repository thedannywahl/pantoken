# @pantoken/figma

Convert the Instructure token IR into a [Figma Variables](https://www.figma.com/plugin-docs/api/figma-variables/)
payload — one collection with `light` and `dark` modes — for a Figma plugin or the Variables REST
API. Colours become `COLOR` variables (RGBA 0–1), dimensions and numbers become `FLOAT`, and
everything else becomes `STRING`. Icons are excluded (they'd be Figma components, not variables).

## Install

```sh
npm i @pantoken/figma
```

Also available as `pantoken/figma`.

## Usage

```ts
import { toFigmaVariables } from "@pantoken/figma";
import { tokens } from "@pantoken/tokens";

const payload = toFigmaVariables(tokens); // { collection, modes, variables }
```

Inside a Figma plugin, apply the payload with the Variables API:

```ts
const collection = figma.variables.createVariableCollection(payload.collection);
const modeIds = payload.modes.map((m, i) =>
  i === 0
    ? (collection.renameMode(collection.modes[0].modeId, m), collection.modes[0].modeId)
    : collection.addMode(m),
);
for (const v of payload.variables) {
  const variable = figma.variables.createVariable(v.name, collection, v.type);
  payload.modes.forEach((m, i) => variable.setValueForMode(modeIds[i], v.valuesByMode[m]));
}
```

The same payload can drive the Variables REST API for CI-based sync.

## API

- **`toFigmaVariables(tokens, options?): FigmaVariablesPayload`** — convert an IR token list into a
  Figma Variables payload. `options.collection` sets the collection name (default `"Instructure"`);
  `options.modes` sets the two mode names mapped to the `light-dark()` sides (default
  `["light", "dark"]`).
- **`toFigmaColor(hex): FigmaColor | undefined`** — parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to a
  Figma RGBA (channels 0–1), or `undefined` if the string isn't a hex colour.
- **`FigmaVariablesPayload`, `FigmaVariable`, `FigmaColor`, `ToFigmaOptions`** — the payload and
  option types.
- **default export** — `toFigmaVariables`.

## Related

- Pairs with `@pantoken/tokens` for the token IR to convert.
- For token interchange, see `@pantoken/dtcg`.

## License

MIT
