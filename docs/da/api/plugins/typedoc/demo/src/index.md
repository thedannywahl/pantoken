[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/typedoc-plugin-demo` — et TypeDoc-plugin for `@demo`-blok-tagget.

Forfattere knytter en live, indlejrbar demo til ethvert symbol med `@demo &lt;spec&gt;`, hvor `&lt;spec&gt;` enten er en nøgen URL eller et `&lt;provider&gt;:&lt;ref&gt;`-par (for eksempel `stackblitz:abc123`, `codesandbox:xy12z`, `wp-playground:https://…/blueprint.json` eller `self:button`). Dette plugin registrerer intet om udbydere selv — det forbliver bevidst simpelt og genbrugelig: det flytter hver `@demo`-tags specifikation til et hegnede `demo`-blok tilføjet til symbolets sammenfattelse, og din dokumentations-renderer bestemmer hvordan en specifikation bliver til en iframe. (Se `@pantoken/demo` for en renderer, der løser udbyderene.)

Hegnet passerer gennem markdown uberørt — herunder enhver oversættelsespipeline, der bevarer kodeblokke — så demoen overlever lokalisering.

**Opsætning:** Tilføj `"@demo"` til TypeDocs `blockTags`-indstilling. Kommentarparseren læser den liste før plugin'er indlæses, så et plugin kan ikke registrere tagget sent nok til at undertrykke "unknown block tag"-advarselen; det skal være i din `typedoc.json`.

## Eksempel

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"]
}
```

## Variabler

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## Funktioner

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
