[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# Funció: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir el bloc de focus-outline: les definicions de token de `--instui-focus-outline-*` més les regles de l'anell.
Integrat en `base.css` (de manera que els enfocables obtenguin l'anell de forma immediata), i reutilitzable per altres sortides estratificades (p. ex., el renderitzador de Pendo) mitjançant les opcions `selector`/`tokenSelector`.

```demo
self:focus-outline
```

## Paràmetres

### options?

`selector` — el selector enfocable; `tokenSelector` — on cauen les definicions de token
  (per defecte `:where(:root)`).

#### selector?

`string`

#### tokenSelector?

`string`

## Retorna

`string`

La cadena CSS.
