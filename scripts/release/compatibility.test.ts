import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vite-plus/test";
import { buildCompatibility, type Compatibility, renderMarkdown } from "./compatibility.ts";

const SAMPLE: Compatibility = {
  upstream: {
    "@instructure/instructure-design-tokens": {
      range: "github:instructure/...#v1.5.0",
      resolved: "v1.5.0@abcdef123456",
      feeds: "token-ir",
    },
    "@instructure/ui-heading": { range: "^11.7.4", resolved: "11.7.4", feeds: "instui-react" },
  },
  consumers: [
    { package: "@pantoken/css", path: "formats/css", governedBy: "token-ir" },
    {
      package: "@pantoken/react-markdown",
      path: "renderers/react-markdown",
      governedBy: "instui-react",
    },
  ],
  deprecations: [],
};

test("renderMarkdown emits the section headings and upstream/consumer rows", () => {
  const md = renderMarkdown(SAMPLE);
  expect(md.startsWith("# Compatibility")).toBe(true);
  expect(md).toContain("## Upstream sources");
  expect(md).toContain("## Consumers");
  expect(md).toContain("## Deprecations");
  expect(md).toContain("| `@instructure/ui-heading` | instui-react | `^11.7.4` | `11.7.4` |");
  expect(md).toContain(
    "| `@pantoken/react-markdown` | `renderers/react-markdown` | instui-react |",
  );
});

test("renderMarkdown shows the empty-state when there are no deprecations", () => {
  expect(renderMarkdown(SAMPLE)).toContain("_No active token deprecations._");
});

test("renderMarkdown renders a forwarded replacement and a frozen value", () => {
  const md = renderMarkdown({
    ...SAMPLE,
    deprecations: [
      {
        token: "--old-forward",
        deprecatedIn: "1.4.0",
        removeIn: "1.6.0",
        replacement: "var(--new)",
      },
      { token: "--old-frozen", deprecatedIn: "1.4.0", removeIn: "1.6.0" },
    ],
  });
  expect(md).toContain("| `--old-forward` | `1.4.0` | `1.6.0` | `var(--new)` |");
  expect(md).toContain("| `--old-frozen` | `1.4.0` | `1.6.0` | _frozen value_ |");
});

// Integration: reads the repo's built provenance. Guarded so it no-ops before a build.
const metaPath = path.resolve(
  new URL("../../formats/tokens/generated/meta.json", import.meta.url).pathname,
);

/** Assert consumer path ordering and expected governance labels. */
function expectWellFormedConsumers(consumers: Compatibility["consumers"]): void {
  const paths = consumers.map((c) => c.path);
  expect(paths).toEqual([...paths].sort((x, y) => x.localeCompare(y)));
  for (const consumer of consumers) {
    expect(["token-ir", "instui-react"]).toContain(consumer.governedBy);
  }
}

test.skipIf(!existsSync(metaPath))(
  "buildCompatibility is deterministic and well-formed",
  async () => {
    const a = await buildCompatibility();
    const b = await buildCompatibility();
    expect(a).toEqual(b);

    expect(a.upstream["@instructure/instructure-design-tokens"]?.feeds).toBe("token-ir");
    expect(a.upstream["@instructure/ui-icons"]?.feeds).toBe("icons");
    expect(a.upstream["@instructure/ui-heading"]?.feeds).toBe("instui-react");
    expect(a.consumers.length).toBeGreaterThan(0);
    expectWellFormedConsumers(a.consumers);
  },
);
