[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / injectContentStylesheet

# Function: injectContentStylesheet()

> **injectContentStylesheet**(`editor`, `url`): `void`

Appends a `<link rel="stylesheet">` to the editor's content document `&lt;head&gt;` at runtime.
Idempotent per URL — calling this twice with the same `url` is a no-op the second time.

## Parameters

### editor

`Editor`

### url

`string`

## Returns

`void`
