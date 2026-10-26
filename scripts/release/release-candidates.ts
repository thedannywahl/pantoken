import { npmTargets, composerTargets, githubTargets } from "./check-target-releases.ts";
import { compareReleases } from "./support-policy.ts";

/** Stable release evidence supplied by an upstream registry. */
export interface ReleaseCandidate {
  version: string;
  publishedAt?: string;
}

/** Bound release-feed requests and keep transient failures distinct from incompatibility. */
export async function fetchReleaseJson(url: string): Promise<unknown> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30_000),
        headers: { Accept: "application/json" },
      });
      if (response.ok) return await response.json();
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`Release feed ${url}: HTTP ${response.status}`);
      }
      if (attempt === 2) throw new Error(`Release feed ${url}: HTTP ${response.status}`);
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
  throw new Error(`Unavailable release feed: ${url}`);
}

/** Select mature latest releases from the current and previous actually released major. */
export function selectReleaseCandidates(
  releases: readonly ReleaseCandidate[],
  now: number = Date.now(),
  minimumAgeDays = 5,
): string[] {
  const stable = releases
    .filter((release) => /^\d+\.\d+(?:\.\d+)?$/u.test(release.version))
    .toSorted((left, right) => compareReleases(left.version, right.version));
  if (!stable.length) throw new Error("Release feed has no stable versions");
  const majors = [...new Set(stable.map((release) => Number(release.version.split(".")[0])))].slice(
    -2,
  );
  return majors.map((major) => {
    const release = stable.filter((entry) => Number(entry.version.split(".")[0]) === major).at(-1)!;
    const published = Date.parse(release.publishedAt ?? "");
    if (!Number.isFinite(published) || published > now - minimumAgeDays * 86_400_000) {
      throw new Error(
        `Deferred release ${release.version}: missing timestamp or minimum release age`,
      );
    }
    return release.version;
  });
}

/** Enumerate known target release histories without updating compatibility claims. */
export async function targetReleaseHistory(
  packageName: string,
): Promise<ReleaseCandidate[] | null> {
  const npm = npmTargets[packageName];
  if (npm) {
    const payload = (await fetchReleaseJson(
      `https://registry.npmjs.org/${encodeURIComponent(npm)}`,
    )) as {
      versions: Record<string, { deprecated?: string }>;
      time: Record<string, string>;
    };
    return Object.entries(payload.versions)
      .filter(([, value]) => !value.deprecated)
      .map(([version]) => ({
        version,
        publishedAt: payload.time[version],
      }));
  }
  const composer = composerTargets[packageName];
  if (composer) {
    const payload = (await fetchReleaseJson(
      `https://repo.packagist.org/p2/${encodeURIComponent(composer)}.json`,
    )) as {
      packages: Record<string, Array<{ version: string; time?: string }>>;
    };
    return payload.packages[composer].map((release) => ({
      version: release.version.replace(/^v/u, ""),
      publishedAt: release.time,
    }));
  }
  const github = githubTargets[packageName];
  if (github) {
    const releases: ReleaseCandidate[] = [];
    for (let page = 1; page <= 20; page += 1) {
      const payload = (await fetchReleaseJson(
        `https://api.github.com/repos/${github}/releases?per_page=100&page=${page}`,
      )) as Array<{
        tag_name: string;
        published_at?: string;
        prerelease: boolean;
        draft: boolean;
      }>;
      releases.push(
        ...payload
          .filter((release) => !release.prerelease && !release.draft)
          .map((release) => ({
            version: release.tag_name.replace(/^v/u, ""),
            publishedAt: release.published_at,
          })),
      );
      if (payload.length < 100) return releases;
    }
    throw new Error(`Release history pagination limit reached for ${packageName}`);
  }
  if (packageName === "@pantoken/wordpress") {
    const payload = (await fetchReleaseJson(
      "https://api.wordpress.org/core/stable-check/1.0/",
    )) as Record<string, string>;
    const releases = Object.keys(payload)
      .filter((version) => /^\d+\.\d+(?:\.\d+)?$/u.test(version))
      .sort(compareReleases);
    const majors = [...new Set(releases.map((version) => Number(version.split(".")[0])))].slice(-2);
    return Promise.all(
      majors.map(async (major) => {
        const version = releases
          .filter((release) => Number(release.split(".")[0]) === major)
          .at(-1)!;
        const response = await fetch(
          `https://downloads.wordpress.org/release/wordpress-${version}.zip`,
          {
            method: "HEAD",
            signal: AbortSignal.timeout(30_000),
          },
        );
        if (!response.ok) throw new Error(`WordPress artifact ${version}: HTTP ${response.status}`);
        return { version, publishedAt: response.headers.get("last-modified") ?? undefined };
      }),
    );
  }
  return null;
}
