[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/typedoc-plugin-demo` — un connector TypeDoc per a l'etiqueta de bloc `@demo`.

Els autors adjunten una demostració en viu i incrustable a qualsevol símbol amb `@demo &lt;spec&gt;`, on `&lt;spec&gt;` és
una URL nua o una parella `&lt;provider&gt;:&lt;ref&gt;` (per exemple `stackblitz:abc123`, `codesandbox:xy12z`,
`wp-playground:https://…/blueprint.json`, o `self:button`). Aquest connector no registra res sobre
proveidors en si — es manté deliberadament simple i reutilitzable: mou l'especificació de cada etiqueta `@demo` en
un bloc tancat `demo` afegit al resum del símbol, i el vostre renderitzador de documentació decideix com
convertir una especificació en un iframe. (Veieu `@pantoken/demo` per a un renderitzador que resol els proveidors.)

La tanca es munta a través de descompte intacta — inclòs qualsevol canonada de traducció que conserva
blocs de codi — de manera que la demostració sobreviu a la localització.

**Configuració:** afegiu `"@demo"` a l'opció `blockTags` de TypeDoc. L'analitzador de comentaris llegeix aquesta llista abans
que es carreguin els connectors, de manera que un connector no pot registrar l'etiqueta prou tard per suprimir l'avís "unknown block tag";
ha de ser a la vostra `typedoc.json`.

## Example

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"],
}
```

## Variables

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## Functions

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
