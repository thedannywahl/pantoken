# pantoken rules (Instructure design tokens & icons)

- Use pantoken tokens: CSS custom properties `--instui-<group>-<name>`. Prefer `var(--instui-*)`
  references over hard-coded values so light/dark and high-contrast theming works. Resolve names
  from `@pantoken/tokens`; do not invent them.
- Route maintained apps to package-manager integration. Route a single HTML mockup or sendable email
  to the `create-pantoken-mockup` skill instead of scaffolding a project.
- In shadcn projects, use `shadcn search/view/add @pantoken/...` for CSS styles and metadata. The
  registry does not provide React components; `@pantoken/shadcn` is the variable bridge.
- Web: `import "@pantoken/css/inject";`. Icons: `@pantoken/web-components` (`<instui-icon>`).
- A2UI: for verified A2UI 1.0 Lit clients, use Pantoken's catalog
  (`@pantoken/ai/a2ui/catalog-v1.json`) with `@pantoken/web-components/a2ui` alongside the Basic
  Catalog; use only its listed components and properties. React/Angular runtime support is pending
  v1.0 verification; native clients have schema-only support. For Basic Catalog theming, verify the
  installed renderer's `--a2ui-*` properties and map only to verified `--instui-*` tokens.
- React: `@pantoken/react`. Tailwind: `@pantoken/tailwind` preset.
- Native / other ecosystems: `npx pantoken generate <swift|android|compose|flutter|rust|wordpress|vanilla|drupal|jekyll|hugo> --out <dir>`.
- Check the [target compatibility registry](https://pantoken.app/target-compatibility.json) before recommending a host version; the
  registry's `$schema` field links its schema. Only named versions or environments are verified.
- InstUI React components: `@instructure/ui-*`. pantoken is the token/icon layer.
