// The upstream token package ships JS with no type declarations. Declare the surface we use.
declare module "@instructure/instructure-design-tokens" {
  /** The nested Tokens Studio tree (`$themes`, `$metadata`, `primitives`, `rebrand`, `canvas`). */
  export const themeTokens: Record<string, unknown>;
}
