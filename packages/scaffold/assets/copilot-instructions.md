# pantoken (Instructure design tokens & icons)

When styling this project, use pantoken components, icons and tokens.

- First distinguish a maintained application from a standalone artifact. For a single HTML mockup
  or sendable email, follow the `create-pantoken-mockup` skill instead of scaffolding a project.
- In a shadcn project, discover CSS items with `shadcn search @pantoken`, inspect with `shadcn view
@pantoken/<item>`, and install with `shadcn add @pantoken/<item>`. These are styles and metadata,
  not React components. `@pantoken/shadcn` is only the CSS-variable bridge.

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
- Component behaviors (vanilla JS): `@pantoken/interactions` (`initModal`, `initTooltip`,
  `initInPlaceEdit`, `initCloseButton`). `initInPlaceEdit` accepts an optional `inputType` hint;
  supported hints are `text`, `number`, `email`, `url`, `tel`, and `search`. Validate its committed
  `change` value in the consuming application.
- Tailwind: `pantokenPreset()` from `@pantoken/tailwind`.
- Native / CMS/site/design targets: `npx pantoken generate
<swift|android|compose|flutter|rust|wordpress|vanilla|drupal|swatches|icon-font|pendo|mintlify|jekyll|hugo>`.
- Check the [target compatibility registry](https://pantoken.app/target-compatibility.json) before recommending a host version. Its
  `$schema` field links the schema; tested versions and environments do not imply future support.
- For InstUI React components use `@instructure/ui-*`; pantoken is the token/icon layer. Use
  `@instructure/ui-*` for interactive, accessible UI components (buttons, modals, forms). Use
  `@pantoken/react` only for icons and token consumption. Do not substitute one for the other.
