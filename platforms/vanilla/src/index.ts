/**
 * `@pantoken/vanilla` — Instructure design tokens as a Vanilla Forums Foundation `variables.json`.
 *
 * {@link toVanillaVariables} converts any IR; {@link variables} is the ready-made `rebrand` object.
 * Push it to a theme with the Vanilla API: `PUT /themes/{themeID}/assets/variables.json`.
 *
 * @module
 */
import variablesData from "../generated/variables.json" with { type: "json" };

export { toVanillaVariables, VANILLA_TO_INSTUI } from "./to-variables.ts";
export type { Mode, ToVanillaOptions } from "./to-variables.ts";

/**
 * The ready-made `rebrand` Vanilla Foundation variables object.
 *
 * @example PUT it to a theme's variables.json asset
 * ```ts
 * import { variables } from "@pantoken/vanilla";
 *
 * await fetch("https://community.example.com/api/v2/themes/THEME_ID/assets/variables.json", {
 *   method: "PUT",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(variables),
 * });
 * ```
 */
export const variables: Record<string, unknown> = variablesData as Record<string, unknown>;

export default variables;
