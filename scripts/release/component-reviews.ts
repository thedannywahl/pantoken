import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { toKebab } from "../../packages/core/src/utils.ts";
import type { ThemeSnapshot } from "../../tools/upstream-diff/lifecycle.ts";

/** Checked source ownership and installed upstream export evidence for one build. */
export interface ComponentInventory {
  core: string[];
  custom: string[];
  upstream: string[] | null;
  families?: string[];
  upstreamChanged?: boolean;
}

/** A component change that must remain separate from test-gated dependency maintenance. */
export interface ComponentReview {
  id: string;
  kind:
    | "new-component"
    | "component-tokens"
    | "reference-change"
    | "promote-component"
    | "inventory-unavailable";
  component: string;
  destination: string;
  tokens: string[];
  references: Array<{
    token: string;
    theme: string;
    before?: string;
    after?: string;
    automatic?: boolean;
  }>;
  upstream: boolean | null;
  scaffold?: string;
}

/** Derive stable token-family ownership using longest-first explicit component prefixes. */
export function tokenComponent(name: string, known: readonly string[]): string | null {
  const prefix = "--instui-component-";
  if (!name.startsWith(prefix)) return null;
  const remainder = name.slice(prefix.length);
  return (
    [...known]
      .sort((left, right) => right.length - left.length)
      .find((component) => remainder.startsWith(`${component}-`)) ?? remainder.split("-")[0]
  );
}

/** Classify added tokens, changed references, and custom-to-upstream promotion without guessing CSS. */
export function componentReviews(
  previous: ThemeSnapshot,
  current: ThemeSnapshot,
  inventory: ComponentInventory,
): ComponentReview[] {
  const known = [
    ...new Set([
      ...inventory.core,
      ...inventory.custom,
      ...(inventory.families ?? []),
      ...(inventory.upstream ?? []),
    ]),
  ];
  const findings = new Map<string, ComponentReview>();
  const ensure = (kind: ComponentReview["kind"], component: string): ComponentReview => {
    const key = `${kind}:${component}`;
    let finding = findings.get(key);
    if (!finding) {
      const owner = inventory.core.includes(component)
        ? "formats/components"
        : "plugins/pantoken/custom-components";
      finding = {
        id: createHash("sha256").update(key).digest("hex").slice(0, 20),
        kind,
        component,
        destination:
          kind === "reference-change" && component === "token-map"
            ? "packages/core/src/resolve.ts"
            : `${kind === "promote-component" ? "formats/components" : owner}/src/components/${component}`,
        tokens: [],
        references: [],
        upstream: inventory.upstream === null ? null : inventory.upstream.includes(component),
      };
      findings.set(key, finding);
    }
    return finding;
  };
  for (const [theme, tokens] of Object.entries(current)) {
    const before = new Map(
      previous[theme as keyof ThemeSnapshot].map((token) => [token.name, token]),
    );
    for (const token of tokens) {
      const old = before.get(token.name);
      const changedReference =
        old &&
        (old.refersTo !== token.refersTo ||
          (old.value !== token.value &&
            (old.value.includes("var(") || token.value.includes("var("))));
      const component =
        tokenComponent(token.name, known) ?? (changedReference ? "token-map" : null);
      if (!component || !/^[a-z][a-z0-9-]*$/u.test(component)) continue;
      if (!old) {
        const owned = inventory.core.includes(component) || inventory.custom.includes(component);
        const finding = ensure(owned ? "component-tokens" : "new-component", component);
        if (!finding.tokens.includes(token.name)) finding.tokens.push(token.name);
      } else if (changedReference) {
        const finding = ensure("reference-change", component);
        const target =
          token.refersTo && tokens.find((candidate) => candidate.name === token.refersTo);
        finding.references.push({
          token: token.name,
          theme,
          before: old.refersTo ?? old.value,
          after: token.refersTo ?? token.value,
          automatic: Boolean(
            target &&
            old.syntax === token.syntax &&
            old.inherits === token.inherits &&
            (token.syntax === "*" || target.syntax === token.syntax),
          ),
        });
      }
    }
  }
  for (const component of inventory.custom) {
    if (inventory.upstream?.includes(component) && !inventory.core.includes(component))
      ensure("promote-component", component);
  }
  if (inventory.upstreamChanged && inventory.upstream === null)
    ensure("inventory-unavailable", "instui-export-inventory");
  return [...findings.values()]
    .map((finding) => ({
      ...finding,
      tokens: finding.tokens.sort(),
      references: finding.references.sort((left, right) =>
        `${left.token}:${left.theme}`.localeCompare(`${right.token}:${right.theme}`),
      ),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
}

/** Render a concrete authoring scaffold without registering unimplemented or unverified component CSS. */
export function renderComponentReview(finding: ComponentReview): string {
  const component = finding.component;
  const lines = [
    `# ${finding.kind}: ${component}`,
    "",
    `Destination: ${finding.destination}`,
    "",
    `InstUI export evidence: ${finding.upstream === null ? "unavailable; do not claim parity" : finding.upstream ? "present in the version-pinned upstream export inventory" : "not present in the version-pinned upstream export inventory"}.`,
    "",
    "## Implementation Checklist",
    "",
    ...(finding.kind === "promote-component"
      ? [
          `- Move the implementation from plugins/pantoken/custom-components/src/components/${component} to ${finding.destination}.`,
          "- Preserve selectors, modifiers, prefix behavior, and token references; validate against the installed InstUI component.",
          `- Keep the existing custom-component export as a functional deprecated forwarder to the canonical ${component} stylesheet, following cardRules/cardCss.`,
          "- Preserve the compatibility export until two upstream minor increments or the next upstream major, whichever comes first; record its adopted upstream version and retirement boundary.",
        ]
      : finding.kind === "reference-change"
        ? [
            "- Inspect the authored token map and every changed reference below.",
            "- Stable component-token names already resolve their new upstream references through the normal build; do not rewrite their names.",
            "- Rewrite explicit mappings only with verified, unambiguous source/target evidence; list unresolved or ambiguous changes rather than guessing replacements.",
          ]
        : [
            finding.kind === "new-component"
              ? "- Confirm the token family name from raw upstream metadata before authoring a custom component; token existence does not establish an InstUI component."
              : "- Identify whether the added tokens describe a new variant or additional properties of the existing component.",
            "- Author the component/variant in the owning directory, using the existing record and CSS conventions; do not register an empty placeholder.",
          ]),
    "- Update the owning registry/exports, focused token-drift tests, guide, and real demo.",
    "- Add relevant Changesets and run focused checks, browser verification, and publish gates before merging.",
    "",
    "## Added Tokens",
    "",
    ...(finding.tokens.length ? finding.tokens.map((token) => `- ${token}`) : ["None."]),
    "",
    "## Changed References",
    "",
    ...(finding.references.length
      ? finding.references.map(
          (change) =>
            `- ${change.theme}: ${change.token}: ${change.before ?? "literal/expression"} -> ${change.after ?? "literal/expression"} (${change.automatic ? "automatically rebuilt through the stable reference map" : "manual mapping review required"})`,
        )
      : ["None."]),
    "",
  ];
  return lines.join("\n");
}

/** Read exported component names from a version-pinned ES entry without executing upstream JavaScript. */
export async function upstreamComponentExports(source: string): Promise<string[]> {
  const { parse } = await import("acorn");
  const module = parse(source, { ecmaVersion: "latest", sourceType: "module" });
  const names = new Set<string>();
  for (const statement of module.body) {
    if (statement.type !== "ExportNamedDeclaration") continue;
    for (const specifier of statement.specifiers) {
      const name =
        specifier.exported.type === "Identifier"
          ? specifier.exported.name
          : String(specifier.exported.value);
      if (/^[A-Z][A-Za-z0-9]*$/u.test(name)) names.add(toKebab(name));
    }
  }
  if (!names.size)
    throw new Error("No explicit InstUI component exports found; manual inventory review required");
  return [...names].sort();
}

/** Prepare an unapplied CSS promotion and functional alias patch for explicit human validation. */
export function promotionScaffold(
  directory: string,
  component: string,
  version: string,
): string | undefined {
  if (!/^[a-z][a-z0-9-]*$/u.test(component) || !/^\d+\.\d+\.\d+$/u.test(version)) return undefined;
  const previous = `plugins/pantoken/custom-components/src/components/${component}`;
  const destination = `formats/components/src/components/${component}`;
  const oldFile = `${previous}/index.ts`;
  if (
    !existsSync(join(directory, oldFile)) ||
    !existsSync(join(directory, `${previous}/${component}.css`))
  )
    return undefined;
  const source = readFileSync(join(directory, oldFile), "utf8");
  const exported =
    /^export function ([A-Za-z][A-Za-z0-9]*Rules)\(prefix = "instui-"\): string \{/mu.exec(
      source,
    )?.[1];
  if (!exported) return undefined;
  const name = component.replace(/-([a-z])/gu, (_, letter: string) => letter.toUpperCase());
  const canonical = `import { defineComponent, type Definition } from "../../lib/define.ts";\nimport { SENTINEL } from "../../lib/sentinel.ts";\nimport { ${name} as ${name}Raw } from "../../generated/component-styles.ts";\n\nexport const ${name}: Definition = defineComponent({\n  name: "${component}",\n  css: (prefix) => ${name}Raw.replaceAll(SENTINEL, prefix),\n});\nexport const ${name}Css: Definition["css"] = ${name}.css;\n`;
  const alias = `import { ${name}Css } from "@pantoken/components";\n\n/** @deprecated Import ${name}Css from @pantoken/components instead. */\nexport function ${exported}(prefix = "instui-"): string {\n  return ${name}Css({ prefix: prefix.endsWith("-") ? prefix.slice(0, -1) : prefix });\n}\n`;
  const [major, minor] = version.split(".").map(Number);
  const lifecycle =
    JSON.stringify(
      {
        component,
        deprecatedIn: `ui@${version}`,
        removeIn: `ui@${major}.${minor + 2}.0`,
        nextMajor: `ui@${major + 1}.0.0`,
        export: exported,
      },
      null,
      2,
    ) + "\n";
  const addition = (file: string, text: string): string =>
    `diff --git a/${file} b/${file}\nnew file mode 100644\n--- /dev/null\n+++ b/${file}\n@@ -0,0 +1,${text.trimEnd().split("\n").length} @@\n${text
      .trimEnd()
      .split("\n")
      .map((line) => `+${line}`)
      .join("\n")}\n`;
  return [
    `diff --git a/${previous}/${component}.css b/${destination}/${component}.css\nsimilarity index 100%\nrename from ${previous}/${component}.css\nrename to ${destination}/${component}.css\n`,
    addition(`${destination}/index.ts`, canonical),
    `diff --git a/${oldFile} b/${oldFile}\n--- a/${oldFile}\n+++ b/${oldFile}\n@@ -1,${source.trimEnd().split("\n").length} +1,${alias.trimEnd().split("\n").length} @@\n${source
      .trimEnd()
      .split("\n")
      .map((line) => `-${line}`)
      .join("\n")}\n${alias
      .trimEnd()
      .split("\n")
      .map((line) => `+${line}`)
      .join("\n")}\n`,
    addition(`.renovate/component-aliases/${component}.json`, lifecycle),
  ].join("\n");
}

/** Collect exact source/raw-token ownership and inspect pinned InstUI exports without importing them. */
export async function collectComponentInventory(
  directory: string,
  version: string,
  upstreamChanged: boolean,
): Promise<ComponentInventory> {
  const names = (path: string): string[] => {
    const full = join(directory, path);
    return existsSync(full)
      ? readdirSync(full, { withFileTypes: true })
          .filter((entry) => entry.isDirectory())
          .map((entry) => entry.name)
          .sort()
      : [];
  };
  const rawPath = join(directory, "formats/tokens/generated/raw.json");
  const raw = existsSync(rawPath)
    ? (JSON.parse(readFileSync(rawPath, "utf8")) as Record<string, { component?: object }>)
    : {};
  const families = [
    ...new Set(
      Object.values(raw).flatMap((theme) =>
        theme && typeof theme === "object" ? Object.keys(theme.component ?? {}).map(toKebab) : [],
      ),
    ),
  ];
  let upstream: string[] | null = null;
  if (/^\d+\.\d+\.\d+$/u.test(version)) {
    try {
      const response = await fetch(`https://unpkg.com/@instructure/ui@${version}/es/index.js`, {
        signal: AbortSignal.timeout(20_000),
      });
      if (response.ok) {
        const source = await response.text();
        if (Buffer.byteLength(source) > 2 * 1024 * 1024)
          throw new Error("InstUI export inventory exceeds size limit");
        upstream = await upstreamComponentExports(source);
      }
    } catch {
      upstream = null;
    }
  }
  return {
    core: names("formats/components/src/components"),
    custom: names("plugins/pantoken/custom-components/src/components"),
    families,
    upstream,
    upstreamChanged,
  };
}
