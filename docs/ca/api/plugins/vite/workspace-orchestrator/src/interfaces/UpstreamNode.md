[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# Interfície: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Un paquet d'espai de treball ascendent a vigilar i reconstruir.

## Propietats

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Nom per a mostrar en missatges de registre.

***

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Directori arrel del paquet (el cwd per a l'ordre de construcció).

***

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Camins (fitxers o directoris) a vigilar — els directoris es vigilen recursivament.

***

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ordre de construcció: el primer element és l'executable, la resta són arguments.

***

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Noms d'altres nodes ascendents a reconstruir després que aquest tingui èxit.

***

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Patrons glob per a fitxers a incloure. Quan s'estableix, només els canvis en fitxers que coincideixen amb almenys un
patró desencadenan una reconstrucció. Omitir per a incloure tot.

***

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Patrons glob per a fitxers a ignorar. Els canvis en fitxers coincidents es salten silenciosament. Omitir per a
no ignorar res.
