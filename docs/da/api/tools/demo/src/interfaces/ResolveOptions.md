[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

Muligheder for at løse en demo spec. Kun `self` provideren bruger runner/demos/css felterne.

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## Egenskaber

### base?

> `optional` **base?**: `string`

Sides basis-sti, f.eks. `/pantoken/` (standard `/`).

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner side-sti, relativ til `base` (standard `play/index.html`).

***

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-kilde mappe, relativ til `base` (standard `demos/`).

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URL'er som runner'en injicerer (i dens chrome og hvert gengivet resultat): komponent-
arkene, multi-tema token-arket, og plugin/overflade arkene. Runner'en temaiserer ved at slå
`data-pantoken-theme` attributten til og fra, så et token-ark dækker alle temaer.
