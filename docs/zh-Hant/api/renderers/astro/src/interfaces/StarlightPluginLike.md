[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# 介面: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

A minimal structural type for a Starlight plugin.

## 屬性

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### 參數

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### 回傳

`void`
