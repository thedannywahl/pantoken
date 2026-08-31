[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / globalModifierSelector

# Function: globalModifierSelector()

> **globalModifierSelector**(`p`, `name`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg en global-utility-modifier-selector: `:where(*).--name.--name.--name`. Modifier-klassen
gentagent 3 gange giver reglen (0,3,0) specificitet, som deterministisk slår enhver reel 2-klasse
component-modifier-sammensat (`.instui-view.-mod`, 0,2,0) ned uanset kilderekkefølge — `:where(*)`
wrapperen bidrager nul specificitet i sig selv, så det er rent dokumentation, at dette er en global
modifier, ikke en scoping-betingelse. En simpel klasse-selector matcher allerede standalone (`--mt-lg` uden
anden klasse) eller kædet på enhver komponent, core eller plugin-forfattet, uden per-komponent
enumeration nødvendig. Erstatter det gamle bare-class-plus-enumerated-per-component-compound-mønster
(`globalSelectors`/`chainTargets`), som ikke kunne nå plugin-forfattede komponenter og ikke skalerede
til høj-kardinalitet-utilities som spacing.

## Parameters

### p

`string`

### name

`string`

## Returns

`string`
