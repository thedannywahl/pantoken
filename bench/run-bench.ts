import { withCodSpeed } from "@codspeed/tinybench-plugin";
import { Bench } from "tinybench";

/**
 * Runs one benchmark through Tinybench with CodSpeed collection when the CI action provides it.
 */
export async function runBench(name: string, fn: () => void | Promise<void>): Promise<void> {
  const bench = withCodSpeed(new Bench());

  bench.add(name, fn);

  await bench.run();
}
