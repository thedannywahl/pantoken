/**
 * InstUI-compatible mount transitions for ProgressCircle.
 *
 * The interaction layer temporarily keeps `-should-animate` on the component. Removing it releases
 * `--value` from zero: the meter draws for one second, the ring fades/scales over half a second, and
 * the centered value follows over half a second after a one-second delay.
 *
 * Node-free CSS builder for use in component definitions. No dependencies.
 *
 * @param prefix - Class prefix (default `instui`).
 * @returns The ProgressCircle transition rules.
 */
export function progressCircleTransitionRules(prefix = "instui"): string {
  const circle = prefix ? `.${prefix}-progress-circle` : ".progress-circle";
  return [
    `${circle} { transition: --value 1s; }`,
    `${circle}::before { transition: opacity 0.5s 0.2s, transform 0.5s; transform: translate3d(0, 0, 0) scale(1); }`,
    `${circle} > .value { transition: opacity 0.5s 1s, transform 0.5s 1s; transform: translate3d(0, 0, 0); }`,
    `${circle}.-should-animate { --value: 0 !important; }`,
    `${circle}.-should-animate::before { opacity: 0; transform: translate3d(0, 0, 0) scale(0.75); }`,
    `${circle}.-should-animate > .value { opacity: 0; transform: translate3d(0, 10%, 0); }`,
  ].join("\n");
}
