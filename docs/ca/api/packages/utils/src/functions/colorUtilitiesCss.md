[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / colorUtilitiesCss

# Funció: colorUtilitiesCss()

> **colorUtilitiesCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix el full d'estils d'utilitat de color semàntic: `.&lt;prefix&gt;-bg-&lt;name&gt;` (fons),
`.&lt;prefix&gt;-text-&lt;name&gt;` (color del text), `.&lt;prefix&gt;-border-&lt;name&gt;` (color de la vora), un per marca de color semàntic.
`.&lt;prefix&gt;-color-&lt;name&gt;` s'emet juntament amb `.&lt;prefix&gt;-text-&lt;name&gt;` com a àlies — mateixa
declaració, qualsevol nom de classe funciona. Els canvis són per tant només vàlids per marques — sense primitius,
sen hex arbitrari. Passa els noms de marques per família (per exemple, de `@pantoken/tokens`), o una parella explícita
`[name, token]` per obtenir un nom d'una marca diferent que l'escala pròpia de la família.

```demo
self:color-utilities
```

## Paràmetres

### names

[`ColorUtilityNames`](../interfaces/ColorUtilityNames.md)

[ColorUtilityNames](../interfaces/ColorUtilityNames.md).

### options?

[`UtilityOptions`](../interfaces/UtilityOptions.md) = `{}`

[UtilityOptions](../interfaces/UtilityOptions.md).

## Retorna

`string`

La cadena CSS.
