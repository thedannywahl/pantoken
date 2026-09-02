[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# Funktion: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Flyt hver `@demo`-blok-tag på en kommentar til `demo`-hegn tilføjet til sammenfattelse, i rækkefølge. Blok-tag-indhold bliver re-hegnede af markdown-temaet, så hegnet skal være i sammenfattelsens tekst, som udsentes ordret.

## Parametre

### comment

`Comment`

Kommentaren skal omskrives på plads.

## Returnerer

`void`

## Eksempel

```ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
```
