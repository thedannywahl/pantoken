[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/react` — tynde React-hjælpere over `@pantoken/web-components` og token CSS.

- `&lt;Icon&gt;` gengiver det `&lt;instui-icon&gt;` brugerdefinerede element (React 19 videregiver props til brugerdefinerede elementer).
- `useToken` læser en opløst `--instui-*` værdi ved kørselstid (SSR-sikker: returnerer fallback på
  serveren).
- `&lt;TokenProvider&gt;` registrerer elementerne og er hvor en app kan injicere stylesheet'et.

## Interfaces

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## Funktioner

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## Referencer

### register

Genudexporterer [register](../../angular/src/functions/register.md)

***

### registerLocalized

Re-exports [registerLocalized](../../svelte/src/functions/registerLocalized.md)
