import { afterEach, expect, test, vi } from "vite-plus/test";
import {
  fetchReleaseJson,
  selectReleaseCandidates,
  targetReleaseHistory,
} from "./release-candidates.ts";

afterEach(() => vi.unstubAllGlobals());
const publishedAt = "2026-01-01T00:00:00Z";
const now = Date.parse("2026-10-26T06:00:00Z");

test("selects latest releases in actual major trains, excluding prereleases", () => {
  expect(
    selectReleaseCandidates(
      ["1.1.0", "3.0.0", "3.2.0", "4.0.0-beta.1"].map((version) => ({ version, publishedAt })),
      now,
    ),
  ).toEqual(["1.1.0", "3.2.0"]);
});

test("defers young or undated latest majors instead of hiding them behind old versions", () => {
  expect(() =>
    selectReleaseCandidates(
      [
        { version: "2.0.0", publishedAt },
        { version: "3.0.0", publishedAt: "2026-10-25" },
      ],
      now,
    ),
  ).toThrow("Deferred");
  expect(() => selectReleaseCandidates([{ version: "2.0.0" }], now)).toThrow("Deferred");
  expect(() => selectReleaseCandidates([], now)).toThrow("no stable");
});

test("retries transient feed failures and bounds each request", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 503 })
    .mockResolvedValue({ ok: true, json: async () => ({}) });
  vi.stubGlobal("fetch", fetcher);
  expect(await fetchReleaseJson("https://example.com")).toEqual({});
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(fetcher.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
});

test("enumerates mature npm and Composer releases without deprecated npm versions", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        versions: { "19.0.0": {}, "20.0.0": { deprecated: "bad" } },
        time: { "19.0.0": publishedAt },
      }),
    }),
  );
  expect(await targetReleaseHistory("@pantoken/react")).toEqual([
    { version: "19.0.0", publishedAt },
  ]);
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        packages: { "drupal/core": [{ version: "11.0.0", time: publishedAt }] },
      }),
    }),
  );
  expect(await targetReleaseHistory("@pantoken/drupal")).toEqual([
    { version: "11.0.0", publishedAt },
  ]);
  expect(await targetReleaseHistory("@pantoken/unknown")).toBeNull();
});

test("filters GitHub prereleases and uses official WordPress artifact timestamps", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { tag_name: "v1.0.0", published_at: publishedAt },
        { tag_name: "v2.0.0-beta.1", prerelease: true },
      ],
    }),
  );
  expect(await targetReleaseHistory("@pantoken/hugo")).toEqual([{ version: "1.0.0", publishedAt }]);
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ "6.9.1": "outdated", "7.2": "latest" }),
      })
      .mockResolvedValue({ ok: true, headers: new Headers({ "last-modified": publishedAt }) }),
  );
  expect(await targetReleaseHistory("@pantoken/wordpress")).toEqual([
    { version: "6.9.1", publishedAt },
    { version: "7.2", publishedAt },
  ]);
});
