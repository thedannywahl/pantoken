/**
 * Platforms cycled by the hero's rotating pill and mock terminal (`VPHomeHero.vue` +
 * `GetStartedTabs.vue`, driven by `usePlatformTerminalCycle`). Each maps to a real pantoken
 * command: `generate`/`create` are `@pantoken/cli`/`@pantoken/scaffold` subcommands; `install` is
 * a plain npm-style dependency add (no pantoken-branded CLI verb exists for that target).
 *
 * Verified against source, not guessed:
 * - `generate` targets: `packages/cli/src/index.ts`'s `SUPPORTED` set.
 * - `create` targets: `packages/scaffold/templates/*` directory names (`SCAFFOLD_PLATFORMS`).
 * - Everything else installs `@pantoken/<arg>` directly (see each package's own README).
 */
export type PlatformCategory = "formats" | "renderers" | "bundlers" | "platforms" | "design";

/** How to invoke pantoken for one platform: a CLI subcommand, or a plain npm-style install. */
export interface PlatformCommand {
  verb: "generate" | "create" | "install";
  /** CLI target name (`generate`/`create`) or the `@pantoken/` scope suffix (`install`). */
  arg: string;
}

/** One entry in the hero's rotating platform pill and mock terminal. */
export interface PlatformOption {
  name: string;
  label: string;
  icon: string;
  category: PlatformCategory;
  /**
   * Brand hex for the picker's light-mode popover background. Verified to meet WCAG's 3:1
   * non-text contrast minimum against `#FFFFFF` (the popover's light-mode background) — see
   * file-level comment below for how these were computed.
   */
  color: string;
  /** Override for the popover's dark-mode background (`#10141A`), via `light-dark(color, darkColor)`. */
  darkColor?: string;
  command: PlatformCommand;
}

/** Fixed group order for the categorized platform-picker dropdown. */
export const PLATFORM_CATEGORY_ORDER: readonly PlatformCategory[] = [
  "formats",
  "renderers",
  "bundlers",
  "platforms",
  "design",
];

// Colors start from each icon's canonical hex in the installed `simple-icons` package (queried
// directly, not recalled from memory). The popover's background is `light-dark(#fff, #10141A)`
// (see `.hero-popover` in pantoken.css), so any brand mark that's too light for `#fff` or too dark
// for `#10141A` gets a `color`/`darkColor` pair instead of one hex — computed by darkening (or, for
// Flutter, lightening) the canonical hue in HSL until it clears WCAG's 3:1 non-text contrast
// minimum against whichever background it's paired with; the untouched canonical hex becomes the
// other mode's value since it already cleared that background. Foundation (`zurb`) and TinyMCE
// (`tiny`) are custom icon assets with no published brand hex in this repo or `simple-icons` — left
// as a neutral grey pair rather than an invented brand color.
/** All 32 rotating platforms, each mapped to its category, brand color, and pantoken command. */
export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    name: "web",
    label: "web",
    icon: "html5",
    category: "formats",
    color: "#E34F26",
    command: { verb: "create", arg: "components" },
  },
  {
    name: "react",
    label: "React",
    icon: "react",
    category: "renderers",
    color: "#059AC3",
    darkColor: "#61DAFB",
    command: { verb: "create", arg: "react" },
  },
  {
    name: "vue",
    label: "Vue",
    icon: "vuedotjs",
    category: "renderers",
    color: "#399E70",
    darkColor: "#4FC08D",
    command: { verb: "create", arg: "vue" },
  },
  {
    name: "swift",
    label: "Swift",
    icon: "swift",
    category: "platforms",
    color: "#F05138",
    command: { verb: "generate", arg: "swift" },
  },
  {
    name: "android",
    label: "Android",
    icon: "android",
    category: "platforms",
    color: "#1DA058",
    darkColor: "#3DDC84",
    command: { verb: "generate", arg: "android" },
  },
  {
    name: "wordpress",
    label: "WordPress",
    icon: "wordpress",
    category: "platforms",
    color: "#21759B",
    command: { verb: "generate", arg: "wordpress" },
  },
  {
    name: "angular",
    label: "Angular",
    icon: "angular",
    category: "renderers",
    color: "#8F8F8F",
    darkColor: "#FFFFFF",
    command: { verb: "create", arg: "angular" },
  },
  {
    name: "svelte",
    label: "Svelte",
    icon: "svelte",
    category: "renderers",
    color: "#FF3E00",
    command: { verb: "create", arg: "svelte" },
  },
  {
    name: "astro",
    label: "Astro",
    icon: "astro",
    category: "renderers",
    color: "#BC52EE",
    command: { verb: "install", arg: "astro" },
  },
  {
    name: "vite",
    label: "Vite",
    icon: "vite",
    category: "bundlers",
    color: "#9135FF",
    command: { verb: "install", arg: "vite" },
  },
  {
    name: "webpack",
    label: "Webpack",
    icon: "webpack",
    category: "bundlers",
    color: "#0B95D7",
    darkColor: "#8DD6F9",
    command: { verb: "install", arg: "webpack" },
  },
  {
    name: "tailwind",
    label: "Tailwind",
    icon: "tailwindcss",
    category: "bundlers",
    color: "#059CB6",
    darkColor: "#06B6D4",
    command: { verb: "install", arg: "tailwind" },
  },
  {
    name: "postcss",
    label: "PostCSS",
    icon: "postcss",
    category: "bundlers",
    color: "#DD3A0A",
    command: { verb: "install", arg: "postcss" },
  },
  {
    name: "next",
    label: "Next.js",
    icon: "nextdotjs",
    category: "bundlers",
    color: "#8F8F8F",
    darkColor: "#FFFFFF",
    command: { verb: "create", arg: "next" },
  },
  {
    name: "compose",
    label: "Compose",
    icon: "jetpackcompose",
    category: "platforms",
    color: "#4285F4",
    command: { verb: "generate", arg: "compose" },
  },
  {
    name: "flutter",
    label: "Flutter",
    icon: "flutter",
    category: "platforms",
    color: "#02569B",
    darkColor: "#0267B9",
    command: { verb: "generate", arg: "flutter" },
  },
  {
    name: "rust",
    label: "Rust",
    icon: "rust",
    category: "platforms",
    color: "#8F8F8F",
    darkColor: "#FFFFFF",
    command: { verb: "generate", arg: "rust" },
  },
  {
    name: "drupal",
    label: "Drupal",
    icon: "drupal",
    category: "platforms",
    color: "#0678BE",
    command: { verb: "generate", arg: "drupal" },
  },
  {
    name: "hugo",
    label: "Hugo",
    icon: "hugo",
    category: "platforms",
    color: "#FF4088",
    command: { verb: "generate", arg: "hugo" },
  },
  {
    name: "jekyll",
    label: "Jekyll",
    icon: "jekyll",
    category: "platforms",
    color: "#CC0000",
    command: { verb: "generate", arg: "jekyll" },
  },
  {
    name: "sass",
    label: "Sass",
    icon: "sass",
    category: "formats",
    color: "#CC6699",
    command: { verb: "install", arg: "scss" },
  },
  {
    name: "stylus",
    label: "Stylus",
    icon: "stylus",
    category: "formats",
    color: "#8F8F8F",
    darkColor: "#B3B3B3",
    command: { verb: "install", arg: "stylus" },
  },
  {
    name: "storybook",
    label: "Storybook",
    icon: "storybook",
    category: "renderers",
    color: "#FF4785",
    command: { verb: "install", arg: "storybook" },
  },
  {
    name: "bootstrap",
    label: "Bootstrap",
    icon: "bootstrap",
    category: "renderers",
    color: "#7952B3",
    command: { verb: "install", arg: "bootstrap" },
  },
  {
    name: "docusaurus",
    label: "Docusaurus",
    icon: "docusaurus",
    category: "renderers",
    color: "#2BA247",
    darkColor: "#3ECC5F",
    command: { verb: "install", arg: "docusaurus" },
  },
  {
    name: "mintlify",
    label: "Mintlify",
    icon: "mintlify",
    category: "renderers",
    color: "#11A16D",
    darkColor: "#18E299",
    command: { verb: "generate", arg: "mintlify" },
  },
  {
    name: "shadcn",
    label: "shadcn/ui",
    icon: "shadcnui",
    category: "renderers",
    color: "#8F8F8F",
    darkColor: "#FFFFFF",
    command: { verb: "install", arg: "shadcn" },
  },
  {
    name: "web-components",
    label: "Web Components",
    icon: "webcomponentsdotorg",
    category: "renderers",
    color: "#1C97CC",
    darkColor: "#29ABE2",
    command: { verb: "create", arg: "web-components" },
  },
  {
    name: "mui",
    label: "MUI",
    icon: "mui",
    category: "renderers",
    color: "#007FFF",
    command: { verb: "install", arg: "mui" },
  },
  {
    name: "foundation",
    label: "Foundation",
    icon: "zurb",
    category: "renderers",
    color: "#8291A1",
    darkColor: "#CBD1D8",
    command: { verb: "install", arg: "foundation" },
  },
  {
    name: "tinymce",
    label: "TinyMCE",
    icon: "tiny",
    category: "renderers",
    color: "#8291A1",
    darkColor: "#CBD1D8",
    command: { verb: "install", arg: "tinymce" },
  },
  {
    name: "figma",
    label: "Figma",
    icon: "figma",
    category: "design",
    color: "#F24E1E",
    command: { verb: "install", arg: "figma" },
  },
];
