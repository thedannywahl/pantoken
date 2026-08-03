/**
 * Copy the per-icon CSS files from `generated/icons/` into `dist/icons/` after `vp pack`.
 *
 * These files are NOT tsdown entry points — they're pre-minified in `build-icon-entries.ts`
 * and copied here verbatim so they're published with the package and accessible via jsDelivr
 * at `npm/@pantoken/components/dist/icons/<name>.css`.
 */
import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const from = resolve(import.meta.dirname, "../generated/icons");
const to = resolve(import.meta.dirname, "../dist/icons");
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log(`✓ components: copied icon CSS files to dist/icons/`);
