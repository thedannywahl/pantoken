[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# インターフェース: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

A minimal structural type for a Starlight plugin.

## プロパティ

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### パラメーター

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### 戻り値

`void`
