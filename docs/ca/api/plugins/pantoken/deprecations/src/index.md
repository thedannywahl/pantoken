[pantoken](../../../../index.md) / deprecations

# deprecations

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-deprecations` — capes de compatibilitat conscients del cicle de vida per als tokens de sobrecost descartats.

Quan una versió amunt deixa caure un token `--instui-*`, un `DeprecationLedger` escrit a mà
registra el seu cicle de vida: quan va ser deprecat, la versió menor amunt que el farà desaparèixer, i com
mantenir-lo funcionant mentre tant — ja sigui redirigint a un token canònic (`replacement` → `var(...)`) o
congelant el seu últim literal conegut (`value`). Aquest connector afegeix un token shim per entrada. Perquè el
shim és un únic `var(...)` o un valor senzill, `defineToken` registra la seva `refersTo`/sintaxi i
`toCss` l'emet, de manera que el shim entra a css/scss/less/stylus/wordpress/vanilla sense cablatge addicional.

La jubilació s'executa en altres llocs (el pipeline d'actualització falla durament quan es completa una actualització una vegada que la versió menor amunt
`removeIn` d'una entrada és assolida, forçant l'entrada a ser jubilada i un menor del consumidor a tallar).
[dueForRemoval](functions/dueForRemoval.md) és la comprovació que la potencia; [describeLifecycle](functions/describeLifecycle.md) potencia la documentació.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
```

## Interfaces

- [UpstreamVersions](interfaces/UpstreamVersions.md)
- [ParsedRef](interfaces/ParsedRef.md)

## Functions

- [shimValue](functions/shimValue.md)
- [shimEntries](functions/shimEntries.md)
- [ledgerCovers](functions/ledgerCovers.md)
- [parseUpstreamRef](functions/parseUpstreamRef.md)
- [compareVersions](functions/compareVersions.md)
- [dueForRemoval](functions/dueForRemoval.md)
- [describeLifecycle](functions/describeLifecycle.md)
- [deprecationShims](functions/deprecationShims.md)

## References

### default

Canvia el nom i re-exporta [deprecationShims](functions/deprecationShims.md)
