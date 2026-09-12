# pantoken (Instructure design tokens & icons)

When styling this project, use pantoken components, icons and tokens.

- Tokens are CSS custom properties `--instui-<group>-<name>` (e.g. `--instui-color-background-brand`).
  Use `var(--instui-*)` references, never hard-coded colours, so theming keeps working. Resolve real
  names from `@pantoken/tokens` — don't guess. If the exact token name is unknown, state that the
  token name must be verified against `@pantoken/tokens` and provide a placeholder like
  `--instui-<group>-<name>` with a comment noting it needs confirmation.
- Web app: `import "@pantoken/css/inject";` to define the properties.
- Icons: `@pantoken/web-components` (`<instui-icon name="…">`) or `@pantoken/react` (`<Icon>`).
- InstUI-look CSS components (no framework dependency): `@pantoken/components`
  (`components.css`, `base.css`, `prose.css`, `utilities.css`, `fonts.css`) — class-based markup
  like `<button class="instui-button">`.
- Component behaviors (vanilla JS): `@pantoken/interactions` (`initModal`, `initTooltip`, `initInPlaceEdit`, `initCloseButton`).
- Tailwind: `pantokenPreset()` from `@pantoken/tailwind`.
- Native / CMS/site/design targets: `npx pantoken generate
<swift|android|compose|flutter|rust|wordpress|vanilla|drupal|swatches|icon-font|pendo|mintlify|jekyll|hugo>`.
- For InstUI React components use `@instructure/ui-*`; pantoken is the token/icon layer. Use
  `@instructure/ui-*` for interactive, accessible UI components (buttons, modals, forms). Use
  `@pantoken/react` only for icons and token consumption. Do not substitute one for the other.
