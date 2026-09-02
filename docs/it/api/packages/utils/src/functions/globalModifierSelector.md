[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / globalModifierSelector

# Funzione: globalModifierSelector()

> **globalModifierSelector**(`p`, `name`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a global-utility modifier selector: `:where(*).--name.--name.--name`. The modifier class
repeated 3x gives the rule (0,3,0) specificity, which deterministically outranks any real 2-class
component-modifier compound (`.instui-view.-mod`, 0,2,0) regardless of source order — the `:where(*)`
wrapper contributes zero specificity of its own, so it's purely documentation that this is a global
modifier, not a scoping condition. A plain class selector already matches standalone (`--mt-lg` with
no other class) or chained onto any component, core or plugin-authored, with no per-component
enumeration needed. Replaces the old bare-class-plus-enumerated-per-component-compound pattern
(`globalSelectors`/`chainTargets`), which couldn't reach plugin-authored components and didn't scale
to high-cardinality utilities like spacing.

## Parametri

### p

`string`

### name

`string`

## Restituisce

`string`
