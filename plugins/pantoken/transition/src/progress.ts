/**
 * InstUI-compatible value transitions for ProgressBar.
 *
 * InstUI applies `transition: all 0.5s` to the meter when `shouldAnimate` is enabled. This subpath
 * is deliberately Node-free so component and web-component runtimes can import it without pulling
 * in the build-time plugin implementation.
 *
 * @param prefix - Class prefix (default `instui`).
 * @returns The ProgressBar transition rule.
 */
export function progressTransitionRules(prefix = "instui"): string {
  const progress = prefix ? `.${prefix}-progress` : ".progress";
  return `${progress}.-should-animate > .bar { transition: all 0.5s; }`;
}
