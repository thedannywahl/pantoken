[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / injectContentStylesheet

# Funktion: injectContentStylesheet()

> **injectContentStylesheet**(`editor`, `url`): `void`

Tilføjer en `<link rel="stylesheet">` til editorens indholdsark `&lt;head&gt;` under kørsel.
Idempotent pr. URL — kald af dette to gange med samme `url` er en no-op anden gang.

## Parametre

### editor

`Editor`

### url

`string`

## Returnerer

`void`
