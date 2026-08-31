[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-prune-custom-props` — tree-shake ubrugte brugerdefinerede egenskaber fra et komponeret stylesheet.

pantokens `@pantoken/css` udsender hele `--instui-*`-tokensættet (≈1.800 ikon-data-URIer inkluderet). En renderer, der bygger på det lag, men kun stiliserer en del af systemet, ville ellers sende hele sættet — så enhver sådan renderer ønsker dette. Startende fra `var()` referencer i rigtige (ikke-brugerdefinerede-egenskab) deklarationer, holder den kun de brugerdefinerede egenskaber, der faktisk kan nås, og fjerner de matchende ubrugte `@property`-registreringer.

Det er et selvstændigt PostCSS-plugin (kør det i din egen PostCSS-pipeline). Fabrikken returnerer et standard plugin-objekt, så import af dette modul trækker ingen runtime-afhængighed ind — `postcss` er kun en type.

## Example

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## Variables

- [pruneCustomProps](variables/pruneCustomProps.md)

## References

### default

Omdøber og gen-eksporterer [pruneCustomProps](variables/pruneCustomProps.md)
