[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# 인터페이스: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

A minimal structural type for a Starlight plugin.

## 속성

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">알파</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### 매개변수

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### 반환값

`void`
