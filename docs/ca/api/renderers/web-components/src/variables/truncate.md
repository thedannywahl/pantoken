[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# Variable: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-truncate&gt;` — subjecta el text ranurat a un nombre fixe de línies amb una el·lipsi. `lines` accepta un enter positiu o `auto`. Un nombre estableix directament la propietat personalitzada `--lines`. `auto` calcula un nombre de línies de l'alçada disponible de l'host i l'aplica com a `--lines`. Omet `lines` per a truncament d'una sola línia.

## Example

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
