[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Funció: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Afirma que un plugin té una estructura vàlida: nom no buit, tots els ganxos són funcions,
i cap clau de ganxo cau fora del conjunt d'etapes reconegudes.

Anomenat automàticament per [definePlugin](definePlugin.md). Exporta'l perquè els plugins creats a mà es puguin
validar abans de passar-los a un executor d'etapa.

## Paràmetres

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Retorna

`void`

## Excepcions

Quan el plugin no supera la validació estructural.

## Exemple

**Valida un plugin creat a mà**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) });      // throws
```
