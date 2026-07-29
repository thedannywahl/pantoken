/**
 * Vitest global setup for fast-check property-based tests.
 *
 * Controls the number of random examples each `fc.assert` run generates. The
 * default (100) is fast enough for `vp test` and CI; set `FC_NUM_RUNS` to a
 * higher value for deeper stress runs:
 *
 * ```sh
 * # On-demand stress run (all property tests, 10 000 examples each):
 * FC_NUM_RUNS=10000 vp test "property.test"
 *
 * # Via the dedicated task (builds first, then stresses):
 * vp run property:stress
 * ```
 *
 * The scheduled `property.yml` CI workflow runs `vp run property:stress`
 * weekly so regressions are caught before a release, even if they only surface
 * under adversarial inputs the 100-example default wouldn't generate.
 *
 * @module
 */
import * as fc from "fast-check";

const raw = process.env["FC_NUM_RUNS"];
if (raw !== undefined) {
  const numRuns = parseInt(raw, 10);
  if (Number.isFinite(numRuns) && numRuns > 0) {
    fc.configureGlobal({ numRuns });
  }
}
