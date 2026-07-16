import { writeFileSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const apiIndexPath = join(docsRoot, "api/index.md");

const content = `# API reference

The pantoken API reference spans core libraries, format emitters, platform targets, renderers,
bundler plugins, and design tooling.

## Start here

| Area | Use this when you need... |
| --- | --- |
| [CSS API reference](/api/css/) | Component classes, utilities, rules, declarations, and token-backed CSS behavior. |
| [packages](/api/packages/) | Core contracts and pipeline helpers (model, core, utils, plugin-kit, CLI). |
| [renderers](/api/renderers/) | Framework-specific integrations (React, Vue, Svelte, Storybook, and more). |
| [platforms](/api/platforms/) | Generated platform outputs (Swift, Compose, Flutter, Android, WordPress, etc.). |

## Browse by group

| Group | Contents |
| --- | --- |
| [ai](/api/ai/) | Agent assets and AI tooling packages. |
| [bundlers](/api/bundlers/) | Bundler integrations for Next, Vite, Webpack, Tailwind, Panda, and PostCSS. |
| [design](/api/design/) | Design-surface outputs such as Figma and swatches. |
| [formats](/api/formats/) | Importable token/icon format outputs (CSS, SCSS, tokens, icons, and more). |
| [packages](/api/packages/) | Core package APIs that power the transform pipeline. |
| [platforms](/api/platforms/) | Generated target ecosystems and runtime-specific exports. |
| [plugins](/api/plugins/) | pantoken, Vite, PostCSS, and TypeDoc plugin APIs. |
| [renderers](/api/renderers/) | Framework and docs-site renderers and adapters. |
| [tools](/api/tools/) | Internal tooling APIs used by generation and docs pipelines. |
`;

writeFileSync(apiIndexPath, content);
console.log("✓ API overview: wrote docs/api/index.md");
