# `@pantoken/interactions`

Per-component interaction helpers for InstUI components from pantoken. Provides spacing attribute application, command event routing, and component-specific behaviors as standalone IIFE bundles for use in generic HTML or with web components.

## Usage

Load the full interactions bundle or individual component bundles via CDN:

```html
<!-- Full bundle: all interactions in one file -->
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/interactions.iife.js"></script>

<!-- Individual components: just what you need -->
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/button.iife.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/calendar.iife.js"></script>

<!-- Combine multiple bundles -->
<script src="https://cdn.jsdelivr.net/combine/npm/@pantoken/interactions/dist/button.iife.js,npm/@pantoken/interactions/dist/calendar.iife.js"></script>
```

Each bundle auto-initializes on load:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.lean.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/button.iife.js"></script>

<button class="instui-button" margin="md">Click me</button>
```

## Interactions

- **Spacing**: Applies InstUI spacing keywords (e.g., `margin="md"`, `padding="sm"`) to elements
- **Command routing**: Sets up event routing for command-driven interactions
- **Invoker sync**: Mirrors invoker attributes onto inner buttons for popover/command targets

## Per-component Bundles

- `alert.iife.js` — `.instui-alert`
- `badge.iife.js` — `.instui-badge`
- `button.iife.js` — `.instui-button` (includes command routing)
- `calendar.iife.js` — `.instui-calendar` (includes command routing)
- ...and more (see all in `/dist/`)

Pick and combine only the components you need for minimal bundle size.
