[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Funktion: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Bekræft, at et plugin har en gyldig struktur: ikke-tomt navn, alle hooks er funktioner,
og ingen hook-nøgle falder uden for det anerkendte stageset.

Kaldt automatisk af [definePlugin](definePlugin.md). Eksportér det, så håndforfattede plugins kan
valideres før de sendes til en stagekører.

## Parametre

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returnerer

`void`

## Kaster

Når pluginnet mislykkes strukturel validering.

## Eksempel

**Valider et håndforfattet plugin**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) });      // throws
```
