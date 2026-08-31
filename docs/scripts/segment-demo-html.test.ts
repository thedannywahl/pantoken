import { expect, test } from "vite-plus/test";
import { collectDemoUnits, reassembleDemoHtml, segmentDemoHtml } from "./segment-demo-html.ts";

test("reassembleDemoHtml(segmentDemoHtml(html), identity) round-trips losslessly", () => {
  const html = [
    '<div class="card">',
    "  <!-- a dev comment, never translated -->",
    '  Dismissable with <code>transition="fade"</code> — I fade out when closed.',
    '  <button aria-label="Close"></button>',
    "</div>",
    "<style>.card { color: red; }</style>",
    "<script>const x = 1; // Comment</script>",
  ].join("\n");
  expect(reassembleDemoHtml(segmentDemoHtml(html), (t) => t)).toBe(html);
});

test("collectDemoUnits finds only visible text nodes, deduped, outside tags/comments", () => {
  const html = "<div>Hello <b>Hello</b> <!-- Hello --> world</div>";
  expect(collectDemoUnits(segmentDemoHtml(html))).toEqual(["Hello ", "Hello", " world"]);
});

test("<code> content is preserved verbatim even though it contains letters", () => {
  const html = "Use <code>-without-shadow</code> to flatten it.";
  const segments = segmentDemoHtml(html);
  expect(collectDemoUnits(segments)).toEqual(["Use ", " to flatten it."]);
  expect(reassembleDemoHtml(segments, () => "TRANSLATED")).toBe(
    "TRANSLATED<code>-without-shadow</code>TRANSLATED",
  );
});

test("<script>/<style> content is preserved verbatim, never treated as prose", () => {
  const html = "<script>const Type = 'Value';</script><style>.Type { color: Value; }</style>";
  const segments = segmentDemoHtml(html);
  expect(collectDemoUnits(segments)).toEqual([]);
  expect(reassembleDemoHtml(segments, () => "SHOULD NOT APPEAR")).toBe(html);
});

test("pure whitespace/number/punctuation runs are not treated as prose", () => {
  const html = "<td>1994</td>\n<td> - </td>";
  expect(collectDemoUnits(segmentDemoHtml(html))).toEqual([]);
});

test("translateDemos resolves each prose unit through resolve()", () => {
  const html = "<p>Hello <b>world</b></p>";
  const segments = segmentDemoHtml(html);
  const out = reassembleDemoHtml(segments, (t) => (t === "Hello " ? "Szia " : t));
  expect(out).toBe("<p>Szia <b>world</b></p>");
});
