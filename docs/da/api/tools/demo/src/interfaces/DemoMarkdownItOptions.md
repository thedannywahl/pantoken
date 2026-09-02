[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

Muligheder for [demoMarkdownIt](../functions/demoMarkdownIt.md): [resolveDemo](../functions/resolveDemo.md) felterne plus valgfri live-eksempel syning.

## Udvider

- [`ResolveOptions`](ResolveOptions.md)

## Egenskaber

### base?

> `optional` **base?**: `string`

Sides basis-sti, f.eks. `/pantoken/` (standard `/`).

#### Arvet fra

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Runner side-sti, relativ til `base` (standard `play/index.html`).

#### Arvet fra

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

***

### demosPath?

> `optional` **demosPath?**: `string`

Self-hosted demo-kilde mappe, relativ til `base` (standard `demos/`).

#### Arvet fra

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Stylesheet URL'er som runner'en injicerer (i dens chrome og hvert gengivet resultat): komponent-
arkene, multi-tema token-arket, og plugin/overflade arkene. Runner'en temaiserer ved at slå
`data-pantoken-theme` attributten til og fra, så et token-ark dækker alle temaer.

#### Arvet fra

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

***

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

Når det er sat, tilføjes en live forhåndsvisning efter hver `html` fold på matchende sider — den samme markup,
gengivet live, under dens kilde. Overlay eksempler (`&lt;dialog&gt;`, `[popover]`) bliver sprunget over: de er
gemte indtil de åbnes, så en `## Demo` iframe kører deres forhåndsvisning i stedet.

***

### localePrefix?

> `optional` **localePrefix?**: (`relativePath`) => `string`

Route a `demo:self:&lt;name&gt;` fence to a locale-specific self-hosted demo directory, from the current
page's markdown-it `env.relativePath` (e.g. `"hu/"` for pages under `hu/`, `""` for the root
locale). Prepended to `demosPath` so the localized clone of a demo (translated prose, same markup)
loads instead of the English source. Omit for a single-locale site.

#### Parametre

##### relativePath

`string`

#### Returnerer

`string`
