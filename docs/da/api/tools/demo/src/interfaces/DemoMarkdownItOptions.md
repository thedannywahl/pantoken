[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

Muligheder for [demoMarkdownIt](../functions/demoMarkdownIt.md): [resolveDemo](../functions/resolveDemo.md) felterne plus valgfri live-eksempel syning.

## Extends

- [`ResolveOptions`](ResolveOptions.md)

## Properties

### base?

> `optional` **base?**: `string`

Sides basis-sti, f.eks. `/pantoken/` (standard `/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

---

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner side-sti, relativ til `base` (standard `play/index.html`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

---

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-kilde mappe, relativ til `base` (standard `demos/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

---

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URL'er som runner'en injicerer (i dens chrome og hvert gengivet resultat): komponent-
arkene, multi-tema token-arket, og plugin/overflade arkene. Runner'en temaiserer ved at slå
`data-pantoken-theme` attributten til og fra, så et token-ark dækker alle temaer.

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

---

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

Når det er sat, tilføjes en live forhåndsvisning efter hver `html` fold på matchende sider — den samme markup,
gengivet live, under dens kilde. Overlay eksempler (`&lt;dialog&gt;`, `[popover]`) bliver sprunget over: de er
gemte indtil de åbnes, så en `## Demo` iframe kører deres forhåndsvisning i stedet.
