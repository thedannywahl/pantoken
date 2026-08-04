/**
 * Deep-linking for the CDN picker: reads/writes the current URL's hash fragment as a flat set of
 * key-value params, so a specific tab/selection/format combination can be bookmarked or shared.
 *
 * Uses the hash rather than the query string — this is a fully static, client-only site, so neither
 * is part of routing, but `history.replaceState` is the only way to change either without firing a
 * browser event; picking the hash costs nothing extra and keeps the query string free for anything
 * else. `replaceState` (not `location.hash =`) on purpose: assigning `location.hash` pushes a new
 * history entry on every change, and checking a box shouldn't add a "back" stop.
 */

function readParams(): URLSearchParams {
  if (typeof location === "undefined") return new URLSearchParams();
  return new URLSearchParams(location.hash.slice(1));
}

function writeParams(params: URLSearchParams): void {
  if (typeof history === "undefined" || typeof location === "undefined") return;
  const str = params.toString();
  const url = `${location.pathname}${location.search}${str ? `#${str}` : ""}`;
  history.replaceState(history.state, "", url);
}

/** Read a hash param's raw string value, for restoring state when a component is set up. */
export function readHashParam(key: string): string | null {
  return readParams().get(key);
}

/**
 * Write a hash param, preserving every other param already there. Omits the key entirely when
 * `value` matches `defaultValue`, so the hash only ever carries state that differs from the default —
 * an untouched picker leaves no trace in the URL.
 */
export function writeHashParam(key: string, value: string, defaultValue: string): void {
  const params = readParams();
  if (value === defaultValue) params.delete(key);
  else params.set(key, value);
  writeParams(params);
}
