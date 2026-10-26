import type { DeprecationEntry, DeprecationLedger, Theme, Token } from "@pantoken/model";
import {
  dueForRemoval,
  removalDeadline,
  type UpstreamVersions,
} from "../../plugins/pantoken/deprecations/src/index.ts";
import { makeResolver } from "../../packages/utils/src/resolver.ts";

/** Complete build evidence, including icon data, rather than the compact drift hashes. */
export type ThemeSnapshot = Record<Theme, Token[]>;

/** Ledger changes to rebuild before the upstream baseline is blessed. */
export interface LifecycleUpdate {
  ledger: DeprecationLedger;
  added: string[];
  retired: string[];
}

const themes: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

function owningReference(token: Token, upstream: UpstreamVersions): string {
  if (token.meta?.kind !== "icon" && token.syntax !== "<image>") {
    return `design-tokens@${upstream.designTokens}`;
  }
  if (token.meta?.source === "lucide") {
    if (!upstream.lucide) throw new Error(`Missing Lucide provenance for ${token.name}`);
    return `lucide@${upstream.lucide}`;
  }
  if (token.meta?.source !== "custom") throw new Error(`Unknown icon source for ${token.name}`);
  return `ui@${upstream.ui}`;
}

/** Freeze new removals and retire due shims without guessing replacements or losing theme values. */
export function prepareLifecycle(
  previous: ThemeSnapshot,
  current: ThemeSnapshot,
  ledger: DeprecationLedger,
  previousUpstream: UpstreamVersions,
  currentUpstream: UpstreamVersions,
): LifecycleUpdate {
  const retired = dueForRemoval(ledger, currentUpstream).map((entry) => entry.token);
  const entries = ledger.entries.filter((entry) => !retired.includes(entry.token));
  const added: string[] = [];
  const resolvers = Object.fromEntries(
    themes.map((theme) => [theme, makeResolver(previous[theme])]),
  );
  const currentNames = new Set(current.rebrand.map((token) => token.name));
  for (const token of previous.rebrand) {
    if (currentNames.has(token.name) || token.meta?.deprecated) continue;
    if (entries.some((entry) => entry.token === token.name)) continue;
    const deprecatedIn = owningReference(token, currentUpstream);
    if (deprecatedIn === owningReference(token, previousUpstream)) {
      throw new Error(`Removal has no owning upstream version change: ${token.name}`);
    }
    const frozen = {} as NonNullable<DeprecationEntry["frozen"]>;
    for (const theme of themes) {
      const before = previous[theme].find((candidate) => candidate.name === token.name);
      if (!before) throw new Error(`Missing ${theme} snapshot for ${token.name}`);
      if (current[theme].some((candidate) => candidate.name === token.name)) {
        throw new Error(`Theme-inconsistent removal: ${token.name}`);
      }
      const value = resolvers[theme](before.flatValue ?? before.value);
      if (/var\s*\(/u.test(value)) throw new Error(`Unresolved frozen reference: ${token.name}`);
      frozen[theme] = {
        value,
        syntax: before.syntax,
        inherits: before.inherits,
        ...(before.themed === undefined ? {} : { themed: before.themed }),
        ...(before.meta ? { meta: before.meta } : {}),
      };
    }
    entries.push({
      token: token.name,
      deprecatedIn,
      removeIn: removalDeadline(deprecatedIn),
      frozen,
      note: "Frozen from the last verified upstream build; no replacement inferred.",
    });
    added.push(token.name);
  }
  return {
    ledger: {
      ...ledger,
      entries: entries.toSorted((left, right) => left.token.localeCompare(right.token)),
    },
    added: added.sort(),
    retired: retired.sort(),
  };
}
