import { tokens } from "@pantoken/tokens";

/** Resolve a canonical breakpoint token for emitted media and container queries. */
export function breakpointEm(tokenName: string): string {
  const match = /^([\d.]+)em$/u.exec(tokens.find((token) => token.name === tokenName)?.value ?? "");
  if (!match) throw new Error(`@pantoken/tokens: missing or non-em token "${tokenName}"`);
  return `${match[1]}em`;
}
