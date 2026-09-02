[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# Interface: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

A minimal structural type for a Starlight plugin.

## Eigenschappen

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### Parameters

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### Retourneert

`void`
