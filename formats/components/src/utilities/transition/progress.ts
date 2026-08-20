/**
 * InstUI-compatible value transitions for ProgressBar.
 *
 * Node-free CSS builder for use in component definitions. No dependencies.
 *
 * @param prefix - Class prefix (default `instui`).
 * @returns The ProgressBar transition rule.
 */
export function progressTransitionRules(prefix = "instui"): string {
  const progress = prefix ? `.${prefix}-progress` : ".progress";
  return `${progress}.-should-animate > .bar { transition: all 0.5s; }`;
}
