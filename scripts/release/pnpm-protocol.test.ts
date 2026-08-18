import { expect, test } from "vite-plus/test";
import { unresolvedPnpmProtocolDeps, type ManifestDeps } from "./pnpm-protocol.ts";

test("unresolvedPnpmProtocolDeps: flags workspace: and catalog: ranges across every bucket", () => {
  const manifest: ManifestDeps = {
    dependencies: { "@pantoken/utils": "workspace:*", postcss: "catalog:" },
    optionalDependencies: { "@pantoken/icons": "^0.2.0" },
    peerDependencies: { "@pantoken/core": "workspace:^" },
  };
  expect(unresolvedPnpmProtocolDeps(manifest)).toEqual([
    "@pantoken/utils@workspace:*",
    "postcss@catalog:",
    "@pantoken/core@workspace:^",
  ]);
});

test("unresolvedPnpmProtocolDeps: empty when every range is resolved", () => {
  expect(unresolvedPnpmProtocolDeps({ dependencies: { "@pantoken/utils": "^0.2.5" } })).toEqual([]);
});

test("unresolvedPnpmProtocolDeps: tolerates missing dependency buckets", () => {
  expect(unresolvedPnpmProtocolDeps({})).toEqual([]);
});
