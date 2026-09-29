import { afterEach, expect, test, vi } from "vite-plus/test";
import { isNewer, pendingRelease, publishIssues } from "./check-target-releases.ts";
import type { ConsumerEntry } from "./compatibility.ts";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const wordpress: ConsumerEntry = {
  package: "@pantoken/wordpress",
  path: "platforms/wordpress",
  governedBy: "token-ir",
  targetSupport: {
    target: "WordPress block themes",
    format: "theme.json v3",
    status: "verified",
    minimum: "6.6",
    testedThrough: "7.1.2",
    testedVersions: ["6.6", "7.1.2"],
    testCommand: "vp run @pantoken/wordpress#check:compatibility",
  },
};

test("compares numeric release trains without treating prereleases as supported", () => {
  expect(isNewer("7.2", "7.1.2")).toBe(true);
  expect(isNewer("7.1.1", "7.1.2")).toBe(false);
  expect(isNewer("7.1.2", "7.1.2")).toBe(false);
  expect(isNewer("8.0.0-beta.1", "7.1.2")).toBe(false);
});

test("flags a new WordPress release but not an already-verified release", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ offers: [{ response: "upgrade", version: "7.2" }] }),
    }),
  );
  expect(await pendingRelease(wordpress)).toMatchObject({
    package: "@pantoken/wordpress",
    version: "7.2",
  });
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ offers: [{ response: "upgrade", version: "7.1.2" }] }),
    }),
  );
  expect(await pendingRelease(wordpress)).toBeNull();
});

test("reports a release-feed failure", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));
  await expect(pendingRelease(wordpress)).rejects.toThrow("HTTP 503");
});

test("flags a future rehype release without claiming it as supported", async () => {
  const rehype: ConsumerEntry = {
    package: "@pantoken/rehype",
    path: "renderers/rehype",
    governedBy: "token-ir",
    targetSupport: {
      target: "rehype",
      status: "verified",
      minimum: "13.0.0",
      testedThrough: "13.0.2",
      testedVersions: ["13.0.0", "13.0.1", "13.0.2"],
      testCommand: "vp run @pantoken/rehype#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "13.0.3" }) }),
  );
  expect(await pendingRelease(rehype)).toMatchObject({ version: "13.0.3" });
});

test("flags a new Bootstrap patch without expanding the verified bridge scope", async () => {
  const bootstrap: ConsumerEntry = {
    package: "@pantoken/bootstrap",
    path: "renderers/bootstrap",
    governedBy: "token-ir",
    targetSupport: {
      target: "Bootstrap",
      format: "CSS variables: body + primary button",
      status: "verified",
      minimum: "5.2.0",
      testedThrough: "5.3.8",
      testedVersions: ["5.2.0", "5.2.3", "5.3.8"],
      testCommand: "vp run @pantoken/bootstrap#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "5.3.9" }) }),
  );
  expect(await pendingRelease(bootstrap)).toMatchObject({ version: "5.3.9" });
});

test("flags a future Foundation release without widening Sass compatibility", async () => {
  const foundation: ConsumerEntry = {
    package: "@pantoken/foundation",
    path: "renderers/foundation",
    governedBy: "token-ir",
    targetSupport: {
      target: "Foundation for Sites",
      format: "Concrete Sass settings + variable-backed CSS overlay",
      status: "verified",
      minimum: "6.1.2",
      testedThrough: "6.9.0",
      testedVersions: ["6.1.2", "6.9.0"],
      testCommand: "vp run @pantoken/foundation#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "6.9.1" }) }),
  );
  expect(await pendingRelease(foundation)).toMatchObject({ version: "6.9.1" });
});

const release = {
  package: "@pantoken/wordpress",
  path: "platforms/wordpress",
  target: "WordPress block themes",
  version: "7.2",
  url: "https://wordpress.org/download/releases/",
};

test("does not duplicate an open review issue", async () => {
  vi.stubEnv("GITHUB_TOKEN", "test-token");
  vi.stubEnv("GITHUB_REPOSITORY", "owner/repo");
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ title: "Compatibility review: @pantoken/wordpress / 7.2" }],
  });
  vi.stubGlobal("fetch", fetchMock);
  await publishIssues([release]);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test("opens a review issue with the owning adapter path", async () => {
  vi.stubEnv("GITHUB_TOKEN", "test-token");
  vi.stubEnv("GITHUB_REPOSITORY", "owner/repo");
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => [] })
    .mockResolvedValueOnce({ ok: true });
  vi.stubGlobal("fetch", fetchMock);
  await publishIssues([release]);
  const request = fetchMock.mock.calls[1]?.[1] as RequestInit;
  expect(request.method).toBe("POST");
  expect(JSON.parse(request.body as string).body).toContain("platforms/wordpress/src");
});
