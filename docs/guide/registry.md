# Using the Pantoken registry

The indexed `@pantoken` namespace is a machine-readable CSS catalog for package-managed projects
that already use the shadcn CLI. Pantoken does not provide React components through this registry.
Items install Pantoken package dependencies and add CSS imports to the global stylesheet configured
in `components.json`.

## Discover before installing

```sh
npx shadcn@latest list @pantoken
npx shadcn@latest search @pantoken --query modal
npx shadcn@latest view @pantoken/modal
npx shadcn@latest add @pantoken/modal
```

The official registry index resolves `@pantoken` to `https://pantoken.app/r/{name}.json` and adds
the namespace to `components.json` when needed. `npx pantoken add modal` remains a convenience alias
for the final command.

Review `view` output before installation. Registry schema validation checks structure, not whether
the installed CSS or dependency is appropriate for an application.

## Item types

- `base` installs the Pantoken token foundation, base styles, shadcn bridge, and Tailwind v4 aliases.
- `theme-*` items select Rebrand, Canvas, or Canvas High Contrast token CSS.
- Component and layout items are `registry:style` resources. They install package CSS and describe
  the semantic HTML classes to author.
- Plugin items include custom components, layouts, custom and Simple Icons, product logos, custom
  theme colors, primitive utilities, and visual debugging.

The Simple Icons aggregate is intentionally large. Prefer per-icon package or CDN imports for
production bundles. Treat primitive utilities as an escape hatch after semantic utilities, and
remove visual-debug classes before production.

## When not to use the registry

For plain HTML without shadcn, install `@pantoken/components` directly or use the CDN workflow. For
Vue, Svelte, Angular, web components, native applications, and generated platform targets, use the
dedicated Pantoken package or CLI integration. For full React components, use `@instructure/ui-*`;
`@pantoken/react` supplies tokens and icons, not a component library.
