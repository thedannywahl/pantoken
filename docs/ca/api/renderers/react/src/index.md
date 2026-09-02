[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/react` — ajudants React prims sobre `@pantoken/web-components` i el CSS de token.

- `&lt;Icon&gt;` renderitza l'element personalitzat `&lt;instui-icon&gt;` (React 19 passa props als elements personalitzats).
- `useToken` llegeix un valor `--instui-*` resolt en temps d'execució (segur per a SSR: retorna el fallback al
  servidor).
- `&lt;TokenProvider&gt;` registra els elements i és on una aplicació pot injectar la fulla d'estils.

## Interfícies

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## Funcions

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## Referències

### register

Re-exporta [register](../../angular/src/functions/register.md)

***

### registerLocalized

Re-exporta [registerLocalized](../../svelte/src/functions/registerLocalized.md)
