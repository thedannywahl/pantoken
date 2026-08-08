# @pantoken/plugin-custom-components

Custom, cssdoc-documented component rules for downstream consumers.

This package currently ships:

- `card` rules (the plugin output)
- `agent-shell` rules (exported for direct composition)

## Install

```sh
npm i @pantoken/plugin-custom-components
```

Also available as `pantoken/custom-components`.

## Usage

Use the plugin to append the custom component sheet to token CSS output:

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customComponents } from "@pantoken/plugin-custom-components";

const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
```

Import the built stylesheet directly when you only need the static CSS:

```ts
import "@pantoken/plugin-custom-components/custom-components.css";
```

## API

- `customComponents(options?)` — returns a CSS plugin with `position: "append" | "prepend"`.
- `cardRules(prefix?)` — returns the card rules as CSS text.
- `agentShellRules(prefix?)` — returns the agent-shell rules as CSS text.
- `./custom-components.css` — published stylesheet export.
