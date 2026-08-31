[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Function: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Bekræft, at et plugin har en gyldig struktur: ikke-tomt navn, alle hooks er funktioner,
og ingen hook-nøgle falder uden for det anerkendte stageset.

Kaldt automatisk af [definePlugin](definePlugin.md). Eksportér det, så håndforfattede plugins kan
valideres før de sendes til en stagekører.

## Parameters

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returns

`void`

## Throws

Når pluginnet mislykkes strukturel validering.

## Example

**Valider et håndforfattet plugin**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) }); // throws
```
