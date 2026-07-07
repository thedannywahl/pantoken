# pantoken rules (Instructure design tokens & icons)

- Use pantoken tokens: CSS custom properties `--instui-<group>-<name>`. Prefer `var(--instui-*)`
  references over hard-coded values so light/dark and high-contrast theming works. Resolve names
  from `@pantoken/tokens`; do not invent them.
- Web: `import "@pantoken/css/inject";`. Icons: `@pantoken/web-components` (`<instui-icon>`).
- React: `@pantoken/react`. Tailwind: `@pantoken/tailwind` preset.
- Native / other ecosystems: `npx pantoken generate <target> --out <dir>`.
- InstUI React components: `@instructure/ui-*`. pantoken is the token/icon layer.
