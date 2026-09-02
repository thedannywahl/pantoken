[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# इंटरफेस: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

A minimal structural type for a Starlight plugin.

## प्रॉपर्टीज

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### पैरामीटर

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### वापसी

`void`
