[pantoken](../../../../index.md) / deprecations

# deprecations

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-deprecations` — livscyklus-bevidst kompatibilitetshims til faldet upstream tokens.

Når en upstream-udgivelse udsender et `--instui-*`-token, registreres dets livscyklus i en håndskrevet `DeprecationLedger`:
hvornår det blev udfaset, den upstream minor-version, der fjerner det, og hvordan det forbliver funktionelt i mellemtiden — enten videresend til et kanonisk token (`replacement` → `var(...)`) eller fastfrys dets seneste kendte bogstavelige værdi (`value`). Dette plugin tilføjer ét shim-token pr. post. Fordi shimmet er et enkelt `var(...)` eller en almindelig værdi, registrerer `defineToken` dets `refersTo`/syntax og `toCss` udsender det, så shimmet integreres i css/scss/less/stylus/wordpress/vanilla uden ekstra kabling.

Pensioneringen håndhæves andre steder (opgraderingspipelinen fejler helt ved en bump, når en posts `removeIn` upstream minor nås, hvilket tvinger posten til at blive pensioneret og en forbrugermindor skåret).
[dueForRemoval](functions/dueForRemoval.md) er den kontrol, der driver det; [describeLifecycle](functions/describeLifecycle.md) driver dokumentationen.

## Eksempel

```ts
import { buildTokens } from "@pantoken/core";
import { deprecationShims } from "@pantoken/plugin-deprecations";
import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };

buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
```

## Interfaces

- [UpstreamVersions](interfaces/UpstreamVersions.md)
- [ParsedRef](interfaces/ParsedRef.md)

## Funktioner

- [shimValue](functions/shimValue.md)
- [shimEntries](functions/shimEntries.md)
- [ledgerCovers](functions/ledgerCovers.md)
- [parseUpstreamRef](functions/parseUpstreamRef.md)
- [compareVersions](functions/compareVersions.md)
- [dueForRemoval](functions/dueForRemoval.md)
- [describeLifecycle](functions/describeLifecycle.md)
- [deprecationShims](functions/deprecationShims.md)

## Referencer

### default

Omdøber og geneksporterer [deprecationShims](functions/deprecationShims.md)
