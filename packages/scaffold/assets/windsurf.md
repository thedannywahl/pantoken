# pantoken rules (Instructure design tokens & icons)

- Use pantoken tokens: CSS custom properties `--instui-<group>-<name>`. Prefer `var(--instui-*)`
  references over hard-coded values so light/dark and high-contrast theming works. Resolve names
  from `@pantoken/tokens`; do not invent them.
- Route maintained apps to package-manager integration. Route a single HTML mockup or sendable email
  to the `create-pantoken-mockup` skill instead of scaffolding a project.
- In shadcn projects, use `shadcn search/view/add @pantoken/...` for CSS styles and metadata. The
  registry does not provide React components; `@pantoken/shadcn` is the variable bridge.
- Web: `import "@pantoken/css/inject";`. Icons: `@pantoken/web-components` (`<instui-icon>`).
- React: `@pantoken/react`. Tailwind: `@pantoken/tailwind` preset.
- Native / other ecosystems: `npx pantoken generate <swift|android|compose|flutter|rust|wordpress|vanilla|drupal|jekyll|hugo> --out <dir>`.
- InstUI React components: `@instructure/ui-*`. pantoken is the token/icon layer.
