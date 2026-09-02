[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# Интерфейс: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

A minimal structural type for a Starlight plugin.

## Свойства

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### Параметры

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### Возвращаемое значение

`void`
