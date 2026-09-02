[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# Giao diện: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

A minimal structural type for a Starlight plugin.

## Thuộc tính

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### Tham số

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### Trả về

`void`
