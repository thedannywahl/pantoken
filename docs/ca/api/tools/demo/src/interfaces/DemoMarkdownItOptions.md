[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

Opcions per a [demoMarkdownIt](../functions/demoMarkdownIt.md): els camps [resolveDemo](../functions/resolveDemo.md) més costura d'exemple en directe opcional.

## Extends

- [`ResolveOptions`](ResolveOptions.md)

## Properties

### base?

> `optional` **base?**: `string`

Camí base del lloc, per exemple `/pantoken/` (per defecte `/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

---

### runnerPath?

> `optional` **runnerPath?**: `string`

Camí de la pàgina del corredor, relatiu a `base` (per defecte `play/index.html`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

---

### demosPath?

> `optional` **demosPath?**: `string`

Directori de font de demostració autoallotjat, relatiu a `base` (per defecte `demos/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

---

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

URLs de full d'estil que el corredor injecta (al seu chrome i a cada resultat renderitzat): els fulls de component,
el full de token de tema múltiple, i els fulls de connector/superfície. Els temes del corredor es controlen activant
l'atribut `data-pantoken-theme`, de manera que un full de token cobreix tots els temes.

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

---

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

Quan s'estableix, afegeix una vista prèvia en directe després de cada tanca `html` a les pàgines coincidents — el mateix codi,
renderitzat en directe, sota la seva font. Els exemples de superposició (`&lt;dialog&gt;`, `[popover]`) es salten: són
amagats fins que s'obren, de manera que un iframe `## Demo` impulsa la seva vista prèvia.
