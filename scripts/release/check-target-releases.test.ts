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

test("flags a future Docusaurus theme without widening the Infima bridge claim", async () => {
  const docusaurus: ConsumerEntry = {
    package: "@pantoken/docusaurus",
    path: "renderers/docusaurus",
    governedBy: "token-ir",
    targetSupport: {
      target: "Docusaurus theme-classic",
      format: "Infima CSS-variable bridge: primary and background",
      status: "verified",
      minimum: "3.0.0",
      testedThrough: "3.10.2",
      testedVersions: ["3.0.0", "3.10.2"],
      testCommand: "vp run @pantoken/docusaurus#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "3.10.3" }) }),
  );
  expect(await pendingRelease(docusaurus)).toMatchObject({ version: "3.10.3" });
});

test("flags a future MUI release without widening createTheme support", async () => {
  const mui: ConsumerEntry = {
    package: "@pantoken/mui",
    path: "renderers/mui",
    governedBy: "token-ir",
    targetSupport: {
      target: "Material UI",
      format: "Concrete createTheme palettes (MUI 5, 6, 7, 9)",
      status: "verified",
      minimum: "5.0.0",
      testedThrough: "9.4.0",
      testedVersions: ["5.0.0", "9.4.0"],
      testCommand: "vp run @pantoken/mui#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "9.4.1" }) }),
  );
  expect(await pendingRelease(mui)).toMatchObject({ version: "9.4.1" });
});

test("flags a future Starlight release for Astro site-build review", async () => {
  const astro: ConsumerEntry = {
    package: "@pantoken/astro",
    path: "renderers/astro",
    governedBy: "token-ir",
    targetSupport: {
      target: "Astro / Starlight",
      format: "Built Starlight page with injected token stylesheet (Astro 5 and 7)",
      status: "verified",
      minimum: "0.35.0",
      testedThrough: "0.42.4",
      testedVersions: ["0.35.0", "0.42.4"],
      testCommand: "vp run @pantoken/astro#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "0.43.0" }) }),
  );
  expect(await pendingRelease(astro)).toMatchObject({ version: "0.43.0" });
});

test("flags a future Next release without widening Instructure transpilation support", async () => {
  const next: ConsumerEntry = {
    package: "@pantoken/next",
    path: "bundlers/next",
    governedBy: "token-ir",
    targetSupport: {
      target: "Next.js",
      format: "Production build transpiling and rendering Instructure UI 11.7.7 with React 19.3.0",
      status: "verified",
      minimum: "16.0.0",
      testedThrough: "16.3.7",
      testedVersions: ["16.0.0", "16.3.7"],
      testCommand: "vp run @pantoken/next#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "16.3.8" }) }),
  );
  expect(await pendingRelease(next)).toMatchObject({ version: "16.3.8" });
});

test("flags a future React release for SSR compatibility review", async () => {
  const react: ConsumerEntry = {
    package: "@pantoken/react",
    path: "renderers/react",
    governedBy: "token-ir",
    targetSupport: {
      target: "React",
      format: "SSR-rendered Icon custom element and token fallback",
      status: "verified",
      minimum: "19.3.0",
      testedThrough: "19.3.0",
      testedVersions: ["19.3.0"],
      testCommand: "vp run @pantoken/react#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "19.3.1" }) }),
  );
  expect(await pendingRelease(react)).toMatchObject({ version: "19.3.1" });
});

test("flags a future Vue release for SSR compatibility review", async () => {
  const vue: ConsumerEntry = {
    package: "@pantoken/vue",
    path: "renderers/vue",
    governedBy: "token-ir",
    targetSupport: {
      target: "Vue",
      format: "Plugin installation, custom-element configuration, and SSR output",
      status: "verified",
      minimum: "3.0.0",
      testedThrough: "3.5.43",
      testedVersions: ["3.0.0", "3.5.43"],
      testCommand: "vp run @pantoken/vue#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "3.5.44" }) }),
  );
  expect(await pendingRelease(vue)).toMatchObject({ version: "3.5.44" });
});

test("flags a future react-markdown release for InstUI SSR review", async () => {
  const reactMarkdown: ConsumerEntry = {
    package: "@pantoken/react-markdown",
    path: "renderers/react-markdown",
    governedBy: "token-ir",
    targetSupport: {
      target: "react-markdown",
      format: "SSR-rendered InstUI heading, icon, and color swatch with React 19.3.0",
      status: "verified",
      minimum: "10.1.0",
      testedThrough: "10.1.0",
      testedVersions: ["10.1.0"],
      testCommand: "vp run @pantoken/react-markdown#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "10.1.1" }) }),
  );
  expect(await pendingRelease(reactMarkdown)).toMatchObject({ version: "10.1.1" });
});

test("flags a future Svelte release for action compilation review", async () => {
  const svelte: ConsumerEntry = {
    package: "@pantoken/svelte",
    path: "renderers/svelte",
    governedBy: "token-ir",
    targetSupport: {
      target: "Svelte",
      format: "Icon action component compiles and SSR renders on Svelte 4 and 5",
      status: "verified",
      minimum: "4.2.20",
      testedThrough: "5.57.1",
      testedVersions: ["4.2.20", "5.57.1"],
      testCommand: "vp run @pantoken/svelte#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "5.57.2" }) }),
  );
  expect(await pendingRelease(svelte)).toMatchObject({ version: "5.57.2" });
});

test("flags a future Angular release for custom-element schema review", async () => {
  const angular: ConsumerEntry = {
    package: "@pantoken/angular",
    path: "renderers/angular",
    governedBy: "token-ir",
    targetSupport: {
      target: "Angular",
      format: "CUSTOM_ELEMENTS_SCHEMA template compilation",
      status: "verified",
      minimum: "16.2.12",
      testedThrough: "22.2.0",
      testedVersions: ["16.2.12", "22.2.0"],
      testCommand: "vp run @pantoken/angular#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "22.2.1" }) }),
  );
  expect(await pendingRelease(angular)).toMatchObject({ version: "22.2.1" });
});

test("flags a future Storybook theming release for constructor review", async () => {
  const storybook: ConsumerEntry = {
    package: "@pantoken/storybook",
    path: "renderers/storybook",
    governedBy: "token-ir",
    targetSupport: {
      target: "Storybook theming",
      format: "Storybook ThemeVars constructor accepts light and dark Pantoken themes",
      status: "verified",
      minimum: "8.6.14",
      testedThrough: "8.6.14",
      testedVersions: ["8.6.14"],
      testCommand: "vp run @pantoken/storybook#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "8.6.15" }) }),
  );
  expect(await pendingRelease(storybook)).toMatchObject({ version: "8.6.15" });
});

test("flags a future Panda CSS release for preset extraction review", async () => {
  const panda: ConsumerEntry = {
    package: "@pantoken/panda",
    path: "bundlers/panda",
    governedBy: "token-ir",
    targetSupport: {
      target: "Panda CSS",
      format: "Panda token utility extraction from the Pantoken preset",
      status: "verified",
      minimum: "1.12.1",
      testedThrough: "2.0.0",
      testedVersions: ["1.12.1", "2.0.0"],
      testCommand: "vp run @pantoken/panda#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "2.0.1" }) }),
  );
  expect(await pendingRelease(panda)).toMatchObject({ version: "2.0.1" });
});

test("flags a future VitePress release for built theme CSS review", async () => {
  const vitepress: ConsumerEntry = {
    package: "@pantoken/vitepress",
    path: "renderers/vitepress",
    governedBy: "token-ir",
    targetSupport: {
      target: "VitePress",
      format: "Built site CSS includes the Pantoken primary-brand bridge",
      status: "verified",
      minimum: "1.6.4",
      testedThrough: "1.6.4",
      testedVersions: ["1.6.4"],
      testCommand: "vp run @pantoken/vitepress#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "1.6.5" }) }),
  );
  expect(await pendingRelease(vitepress)).toMatchObject({ version: "1.6.5" });
});

test("flags a future Emotion release for CSS-in-JS SSR review", async () => {
  const cssInJs: ConsumerEntry = {
    package: "@pantoken/css-in-js",
    path: "renderers/css-in-js",
    governedBy: "token-ir",
    targetSupport: {
      target: "Emotion CSS-in-JS",
      format: "ThemeProvider SSR emits the Pantoken token variable",
      status: "verified",
      minimum: "11.14.0",
      testedThrough: "11.14.0",
      testedVersions: ["11.14.0"],
      testCommand: "vp run @pantoken/css-in-js#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "11.14.1" }) }),
  );
  expect(await pendingRelease(cssInJs)).toMatchObject({ version: "11.14.1" });
});

test("flags a future Mintlify CLI release for docs.json review", async () => {
  const mintlify: ConsumerEntry = {
    package: "@pantoken/mintlify",
    path: "renderers/mintlify",
    governedBy: "token-ir",
    targetSupport: {
      target: "Mintlify docs.json",
      format: "Official CLI validates generated colors and background theme config",
      status: "verified",
      minimum: "4.0.1555",
      testedThrough: "4.0.1555",
      testedVersions: ["4.0.1555"],
      testCommand: "vp run @pantoken/mintlify#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "4.0.1556" }) }),
  );
  expect(await pendingRelease(mintlify)).toMatchObject({ version: "4.0.1556" });
});

test("flags a future webpack release without widening emitted asset support", async () => {
  const webpack: ConsumerEntry = {
    package: "@pantoken/webpack",
    path: "bundlers/webpack",
    governedBy: "token-ir",
    targetSupport: {
      target: "webpack",
      format: "Emitted token CSS build asset",
      status: "verified",
      minimum: "5.61.0",
      testedThrough: "5.111.1",
      testedVersions: ["5.61.0", "5.111.1"],
      testCommand: "vp run @pantoken/webpack#check:compatibility",
    },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ version: "5.111.2" }) }),
  );
  expect(await pendingRelease(webpack)).toMatchObject({ version: "5.111.2" });
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
