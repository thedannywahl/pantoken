[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / StarlightPluginLike

# Διεπαφή: StarlightPluginLike

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

A minimal structural type for a Starlight plugin.

## Ιδιότητες

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

***

### hooks

> **hooks**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

#### config:setup()

> **config:setup**(`context`): `void`

##### Παράμετροι

###### context

###### config

\{ `head?`: [`HeadEntry`](HeadEntry.md)[]; \}

###### config.head?

[`HeadEntry`](HeadEntry.md)[]

###### updateConfig

###### logger?

\{ `info`: `void`; \}

###### logger.info

##### Επιστρέφει

`void`
