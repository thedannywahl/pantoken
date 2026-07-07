# pantoken (Instructure design tokens & icons)

When styling this project, use pantoken tokens and icons.

- Tokens are CSS custom properties `--instui-<group>-<name>` (e.g. `--instui-color-background-brand`).
  Use `var(--instui-*)` references, never hard-coded colours, so theming keeps working. Resolve real
  names from `@pantoken/tokens` — don't guess.
- Web app: `import "@pantoken/css/inject";` to define the properties.
- Icons: `@pantoken/web-components` (`<instui-icon name="…">`) or `@pantoken/react` (`<Icon>`).
- Tailwind: `pantokenPreset()` from `@pantoken/tailwind`.
- Native / CMS: `npx pantoken generate <swift|android|compose|flutter|wordpress|vanilla|drupal>`.
- For InstUI React components use `@instructure/ui-*`; pantoken is the token/icon layer.
