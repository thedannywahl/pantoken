[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# Interfície: ResolveOptions

Opcions per resoldre una especificació de demostració. Només el proveïdor `self` utilitza els camps corredor/demostracions/css.

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## Propietats

### base?

> `optional` **base?**: `string`

Camí base del lloc, per exemple `/pantoken/` (per defecte `/`).

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Camí de la pàgina del corredor, relatiu a `base` (per defecte `play/index.html`).

***

### demosPath?

> `optional` **demosPath?**: `string`

Directori de font de demostració autoallotjat, relatiu a `base` (per defecte `demos/`).

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

URLs de full d'estil que el corredor injecta (al seu chrome i a cada resultat renderitzat): els fulls de component,
el full de token de tema múltiple, i els fulls de connector/superfície. Els temes del corredor es controlen activant
l'atribut `data-pantoken-theme`, de manera que un full de token cobreix tots els temes.
