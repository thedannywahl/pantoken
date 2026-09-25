/** Copy generated per-icon CSS files into the package's published dist directory. */
import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const from = resolve(import.meta.dirname, "../generated/icons");
const to = resolve(import.meta.dirname, "../dist/icons");
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log("✓ lucide-lab: copied per-icon CSS files to dist/icons/");
