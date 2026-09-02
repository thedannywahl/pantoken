[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/react` — thin React helpers over `@pantoken/web-components` and the token CSS.

- `&lt;Icon&gt;` renders the `&lt;instui-icon&gt;` custom element (React 19 passes props to custom elements).
- `useToken` reads a resolved `--instui-*` value at runtime (SSR-safe: returns the fallback on
  the server).
- `&lt;TokenProvider&gt;` registers the elements and is where an app can inject the stylesheet.

## Interfaces

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## Funciones

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## Referencias

### register

Re-exports [register](../../angular/src/functions/register.md)

***

### registerLocalized

Re-exports [registerLocalized](../../svelte/src/functions/registerLocalized.md)
