[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Função: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parâmetros

### name

`string`

## Retorna

`string`

## Exemplo

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
