[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# 接口: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

A minimal structural type for a Starlight plugin.

## 属性

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### 参数

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### 返回值

`void`
