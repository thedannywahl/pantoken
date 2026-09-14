/**
 * Package managers shown in the hero's mock terminal, cycled in sequence alongside the platform.
 *
 * Each has two launcher forms: `launcher` (dlx-style — run a binary without installing it, used
 * for `pantoken generate`/`create`) and `installLauncher` (add a dependency to the project, used
 * for platforms that only ship as an npm-installable `@pantoken/*` package).
 */
export interface PmOption {
  id: string;
  label: string;
  /** dlx-style launcher, e.g. `"npx "` — runs a binary without installing it. */
  launcher: string;
  /** Install-verb launcher, e.g. `"npm install "` — adds a dependency to the project. */
  installLauncher: string;
  color: string;
  darkColor?: string;
  icon?: string;
}

/** The six package managers cycled through, in display order. */
export const PM_OPTIONS: PmOption[] = [
  {
    id: "vpx",
    label: "vp",
    launcher: "vpx ",
    // `vp add` per viteplus.dev/guide's "Manage Dependencies" command reference.
    installLauncher: "vp add ",
    color: "#6b77f8",
    icon: "vite-plus",
  },
  {
    id: "pnpm",
    label: "pnpm",
    launcher: "pnpm dlx ",
    installLauncher: "pnpm add ",
    color: "#F69220",
    icon: "pnpm",
  },
  {
    id: "deno",
    label: "deno",
    launcher: "deno run npm:",
    installLauncher: "deno add npm:",
    color: "#00b84d",
    darkColor: "#70ffaf",
    icon: "deno",
  },
  {
    id: "bun",
    label: "bun",
    launcher: "bunx ",
    installLauncher: "bun add ",
    color: "#ff2e97",
    icon: "bun",
  },
  {
    id: "npm",
    label: "npm",
    launcher: "npx ",
    installLauncher: "npm install ",
    color: "#CB3837",
    icon: "npm",
  },
  {
    id: "yarn",
    label: "yarn",
    launcher: "yarn dlx ",
    installLauncher: "yarn add ",
    color: "#2C8EBB",
    icon: "yarn",
  },
];
