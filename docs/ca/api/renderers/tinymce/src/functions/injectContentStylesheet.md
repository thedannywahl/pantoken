[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / injectContentStylesheet

# Function: injectContentStylesheet()

> **injectContentStylesheet**(`editor`, `url`): `void`

Afegeix una `<link rel="stylesheet">` al document de contingut de l'editor `&lt;head&gt;` en temps d'execució.
Idempotent per URL — cridar-ho dues vegades amb el mateix `url` és una no-op la segona vegada.

## Parameters

### editor

`Editor`

### url

`string`

## Returns

`void`
