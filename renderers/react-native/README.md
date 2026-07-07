# @pantoken/react-native

Instructure design tokens as React Native `StyleSheet`-friendly objects. React Native has no CSS
variables, so tokens are fully resolved: colors are hex strings, dimensions are numbers (dp), and
icons are excluded.

## Install

```sh
npm i @pantoken/react-native
```

Also available as `pantoken/reactNative`.

## Usage

```ts
import { useColorScheme } from "react-native";
import { tokensForScheme } from "@pantoken/react-native";

const t = tokensForScheme(useColorScheme());
const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
```

## API

- **`tokensForScheme(scheme): Record<string, RNTokenValue>`** — pick the token object for a color scheme. Pair with React Native's `useColorScheme`; anything other than `"dark"` returns the light set.
- **`light`, `dark`** — the resolved token objects, exported directly.
- **`RNTokenValue`** — a token value: a color/string or a numeric dimension.

## Related

- Reads from `@pantoken/tokens` and resolves through `@pantoken/utils`.

## License

MIT
