[pantoken](../../../../index.md) / [platforms/email/src](../index.md) / emailTokens

# Funktion: emailTokens()

> **emailTokens**(`mode?`): `Record`\<`string`, `string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Vælg tokenkortet for en tilstand (standard `"light"`).

## Parametre

### mode?

`Mode` = `"light"`

## Returnerer

`Record`\<`string`, `string`\>

## Eksempler

**Integrer et token i en email-celle (lys tilstand)**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens();
const html = `<td style="background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}">Hi</td>`;
```

**Mørk tilstand**

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("dark");
```
