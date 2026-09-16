/**
 * Generate static shadcn/ui registry files under `docs/public/r/` conforming to
 * the registry JSON schema specification (https://ui.shadcn.com/schema/registry.json and
 * https://ui.shadcn.com/schema/registry-item.json).
 *
 * Emits:
 * - `docs/public/r/registry.json` (the full catalog)
 * - `docs/public/r/[name].json` (individual item manifests for all themes, components, and hooks)
 * - `docs/.vitepress/theme/generated/registry.json` (the catalog imported by the docs app)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { SHADCN_TO_INSTUI } from "../../renderers/shadcn/src/mapping.ts";
import { COMPONENTS } from "../../formats/components/src/components/index.ts";
import type {
  RegistryCatalog,
  RegistryItem,
} from "../.vitepress/theme/components/registry-types.ts";

const defaultOutDir = resolve(import.meta.dirname, "../public/r");
const defaultSourceDir = resolve(import.meta.dirname, "../.vitepress/theme/generated");

/** Build the complete shadcn/ui registry catalog object in-memory. */
export function buildRegistryCatalog(): RegistryCatalog {
  const lightVars: Record<string, string> = {};
  for (const [shadcnVar, instuiToken] of Object.entries(SHADCN_TO_INSTUI)) {
    const cleanKey = shadcnVar.replace(/^--/, "");
    lightVars[cleanKey] = `var(${instuiToken})`;
  }

  const items: RegistryItem[] = [];

  // 1. Base / Theme items
  items.push({
    name: "theme-canvas",
    type: "registry:theme",
    title: "Canvas LMS Theme",
    description: "Instructure Canvas LMS theme variables bridging to shadcn/ui custom properties.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    cssVars: {
      light: lightVars,
      dark: lightVars,
    },
  });

  items.push({
    name: "theme-canvas-high-contrast",
    type: "registry:theme",
    title: "Canvas High Contrast Theme",
    description: "Canvas LMS High Contrast theme variables for WCAG AAA compliance.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    cssVars: {
      light: lightVars,
      dark: lightVars,
    },
  });

  items.push({
    name: "theme-rebrand",
    type: "registry:theme",
    title: "Instructure Rebrand Theme",
    description: "Modern Instructure brand theme variables.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/css", "@pantoken/shadcn"],
    cssVars: {
      light: lightVars,
      dark: lightVars,
    },
  });

  items.push({
    name: "base",
    type: "registry:base",
    title: "Pantoken Base System",
    description:
      "Pantoken core design token system, CSS custom properties, and semantic components.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/css", "@pantoken/components", "@pantoken/shadcn"],
    cssVars: {
      light: lightVars,
      dark: lightVars,
    },
  });

  // 2. Behavior hooks
  items.push({
    name: "use-instui-modal",
    type: "registry:hook",
    title: "Instructure Modal Hook",
    description:
      "React hook wrapping @pantoken/interactions modal behavior with keyboard navigation and focus trapping.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/interactions"],
    files: [
      {
        path: "hooks/use-instui-modal.ts",
        type: "registry:hook",
        target: "@hooks/use-instui-modal.ts",
        content: `import { useEffect, useRef } from "react";
import { initModal } from "@pantoken/interactions";

export function useInstuiModal(isOpen: boolean, onClose?: () => void) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      const instance = initModal({ dialog, onClose });
      return () => instance.cleanup();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen, onClose]);

  return { dialogRef };
}
`,
      },
    ],
  });

  items.push({
    name: "use-instui-tooltip",
    type: "registry:hook",
    title: "Instructure Tooltip Hook",
    description:
      "React hook wrapping @pantoken/interactions tooltip positioning and accessibility.",
    author: "pantoken <https://pantoken.app>",
    dependencies: ["@pantoken/interactions"],
    files: [
      {
        path: "hooks/use-instui-tooltip.ts",
        type: "registry:hook",
        target: "@hooks/use-instui-tooltip.ts",
        content: `import { useEffect, useRef } from "react";
import { initTooltip } from "@pantoken/interactions";

export function useInstuiTooltip() {
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const instance = initTooltip({ trigger, tooltip });
    return () => instance.cleanup();
  }, []);

  return { triggerRef, tooltipRef };
}
`,
      },
    ],
  });

  // 3. UI Component items
  for (const comp of COMPONENTS) {
    const name = comp.name;
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    const description = `Instructure ${title} component styled with semantic .instui-${name} classes.`;
    const pascalName = name
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");

    items.push({
      name,
      type: "registry:ui",
      title,
      description,
      author: "pantoken <https://pantoken.app>",
      dependencies: ["@pantoken/components", "@pantoken/css"],
      files: [
        {
          path: `components/ui/${name}.tsx`,
          type: "registry:ui",
          target: `@ui/${name}.tsx`,
          content: `import * as React from "react";

export interface ${pascalName}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
  size?: "small" | "medium" | "large";
}

export const ${pascalName} = React.forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className = "", variant, size, children, ...props }, ref) => {
    const classes = [
      "instui-${name}",
      variant ? \`-color-\${variant}\` : "",
      size ? \`-size-\${size}\` : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
${pascalName}.displayName = "${pascalName}";
`,
        },
      ],
    });
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "pantoken",
    homepage: "https://pantoken.app",
    items,
  };
}

/** Write registry catalog and individual item JSON manifests to disk. */
export function writeRegistry(options?: { outDir?: string; sourceDir?: string }): {
  catalogPath: string;
  count: number;
} {
  const outDir = options?.outDir ?? defaultOutDir;
  const sourceDir = options?.sourceDir ?? defaultSourceDir;
  mkdirSync(outDir, { recursive: true });
  mkdirSync(sourceDir, { recursive: true });

  const catalog = buildRegistryCatalog();
  const catalogPath = resolve(outDir, "registry.json");
  const sourceCatalogPath = resolve(sourceDir, "registry.json");
  // The public directory index must omit file contents. Keep them in the
  // browser's source catalog and individual manifests for previews and installs.
  const publicCatalog = {
    ...catalog,
    items: catalog.items.map((item) => ({
      ...item,
      ...(item.files && {
        files: item.files.map(({ content: _content, ...file }) => file),
      }),
    })),
  };
  writeFileSync(catalogPath, JSON.stringify(publicCatalog, null, 2) + "\n");
  writeFileSync(sourceCatalogPath, JSON.stringify(catalog, null, 2) + "\n");

  // Write individual item files
  for (const item of catalog.items) {
    const itemPayload = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...item,
    };
    const itemPath = resolve(outDir, `${item.name}.json`);
    writeFileSync(itemPath, JSON.stringify(itemPayload, null, 2) + "\n");
  }

  return { catalogPath, count: catalog.items.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { catalogPath, count } = writeRegistry();
  console.log(`✓ registry: wrote ${catalogPath} (${count} items)`);
  console.log(`✓ registry: wrote ${count} item files to ${defaultOutDir}`);
}
