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
- User preferences are automatic, not opt-in variants: `prefers-reduced-motion`, `prefers-contrast`,
  `prefers-reduced-transparency`, and forced colors. Preserve static loading feedback and disabled
  cues. More contrast strengthens boundaries; less removes decorative shadows without reducing text
  contrast. Ready token sheets follow the system scheme; explicit `data-pantoken-scheme` light/dark
  pins win. Use `properties.css` plus `scope.css` for nested themes, not multiple root theme sheets.
- Icons: `@pantoken/web-components` (`<instui-icon name="…">`) or `@pantoken/react` (`<Icon>`).
- InstUI-look CSS components (no framework dependency): `@pantoken/components`
  (`components.css`, `base.css`, `prose.css`, `utilities.css`, `fonts.css`) — class-based markup
  like `<button class="instui-button">`.
- Component behaviors (vanilla JS): `@pantoken/interactions` (`initModal`, `initTooltip`,
  `initInPlaceEdit`, `initCloseButton`). `initInPlaceEdit` accepts an optional `inputType` hint;
  supported hints are `text`, `number`, `email`, `url`, `tel`, and `search`. Validate its committed
  `change` value in the consuming application.
- ARIA tree-browser markup needs `initTreeBrowser` or `tree-browser.iife.js` for keyboard navigation.
  Name the tree, use focusable treeitems, and associate collection rows with groups via `aria-owns`.
  Native details/summary disclosures can use the CSS without claiming tree roles.
- Give `<instui-drawer-layout>` nonempty `tray-label` and `content-label` attributes to name its
  shadow-DOM regions. Labels on slotted content don't name those panes.
- Native form validation is opt-in through `initFormField(host, control, error)` or
  `data-native-validation` plus `form-field.iife.js`. Supply a separate error with a unique ID.
  CSS alone doesn't synchronize error associations; server-side validation is still required.
- ARIA menu keyboard behavior is opt-in via `initMenu(menu, button)` or `data-menu-navigation`
  plus `menu.iife.js`. Use a vertical, single-level native popover and its button. Applications own
  actions and checked state; disabled items need `aria-disabled`. Submenus and menubars aren't supported.
- Tables can use `-layout-responsive` inside an `instui-container` (load `utilities.css`) for
  CSS-only stacking below the canonical `md` container breakpoint. Match localized `data-label`
  values to column headers; retain native header associations. Alternatively, keep columns in a
  named, keyboard-focusable `--overflow-x-auto` region with a visible focus outline.
- Tailwind: `pantokenPreset()` from `@pantoken/tailwind`.
- Native / CMS/site/design targets: `npx pantoken generate
  <swift|android|compose|flutter|rust|wordpress|vanilla|drupal|swatches|icon-font|pendo|mintlify|jekyll|hugo>`.
- Check the [target compatibility registry](https://pantoken.app/target-compatibility.json) before recommending a host version. Its
  `$schema` field links the schema; tested versions and environments do not imply future support.
- For InstUI React components use `@instructure/ui-*`; pantoken is the token/icon layer. Use
  `@instructure/ui-*` for interactive, accessible UI components (buttons, modals, forms). Use
  `@pantoken/react` only for icons and token consumption. Do not substitute one for the other.
