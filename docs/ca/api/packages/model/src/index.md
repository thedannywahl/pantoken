[pantoken](../../../index.md) / model

# model

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/model` — els contractes de tipus sense dependències per al token IR de pantoken.

Un [Token](interfaces/Token.md) s'alinea amb l'esquema CSS `@property` (`name`/`syntax`/`inherits`/
initial-`value`) i s'estén cap a un superconjunt que també porta valors temàtics i de referència,
més [TokenMeta](interfaces/TokenMeta.md) sense valor (icones, proveniència). Els icones es carreguen com tokens `&lt;image&gt;`.
Cada paquet pantoken depèn d'aquest paquet pel tipus, de manera que cap consumidor no necessita el
paquet de token ascendent (només a GitHub) només per tipificar el IR.

## Interfícies

- [TokenModify](interfaces/TokenModify.md)
- [TokenMeta](interfaces/TokenMeta.md)
- [DeprecationEntry](interfaces/DeprecationEntry.md)
- [DeprecationLedger](interfaces/DeprecationLedger.md)
- [Token](interfaces/Token.md)
- [TokenInput](interfaces/TokenInput.md)
- [IconEntry](interfaces/IconEntry.md)
- [PropertyRule](interfaces/PropertyRule.md)
- [CssContribution](interfaces/CssContribution.md)
- [TokenHookContext](interfaces/TokenHookContext.md)
- [IconHookContext](interfaces/IconHookContext.md)
- [CssHookContext](interfaces/CssHookContext.md)
- [RehypeHookContext](interfaces/RehypeHookContext.md)
- [PantokenPlugin](interfaces/PantokenPlugin.md)

## Àlies de tipus

- [Theme](type-aliases/Theme.md)
- [UpstreamRef](type-aliases/UpstreamRef.md)
- [IconResolver](type-aliases/IconResolver.md)

## Funcions

- [defineToken](functions/defineToken.md)
