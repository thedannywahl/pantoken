[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Funció: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Selecciona el mapa de tokens per a un mode (per defecte `"light"`).

## Paràmetres

### mode?

`Mode` = `"light"`

## Retorna

`Record`\<`string`, `string`\>

## Exemples

**Incrusta un token en una cel·la de correu (mode clar)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**Mode fosc**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
