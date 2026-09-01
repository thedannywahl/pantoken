# Security policy

## Supported versions

pantoken publishes many small packages from this monorepo, all versioned together. We support the
latest published release of each package. Fixes land on `main` and ship in the next release; we don't
backport to older lines.

## Security requirements and scope

pantoken is a design-token transformation and distribution system. It converts Instructure design tokens and icons into CSS, framework integrations, build-tool plugins, design-tool data, and generated platform source. It is not an authentication, authorization, cryptography, or application-security library.

### What users can expect

- Published downstream packages use a vendored, versioned token model and do not require consumers to retrieve the GitHub-hosted upstream design-token source.
- Generated output is reproducible from the repository source and pinned dependencies.
- npm releases include provenance linking the package to its source commit and GitHub Actions workflow.
- The project tests token resolution, output generation, reference integrity, package exports, and supported integrations in continuous integration.
- Reported vulnerabilities affecting the latest release will be investigated and, when confirmed, fixed in a subsequent release.

### Security boundaries and limitations

- Token values, plugin implementations, configuration files, Markdown, HTML, and other caller-provided content must be treated as trusted input unless the relevant package explicitly documents otherwise.
- pantoken emitters transform input into CSS, JavaScript, JSON, markup, or platform source. They are not a general-purpose sanitizer for untrusted input. Passing attacker-controlled values to an emitter or plugin may produce unsafe output, including CSS, markup, or code injection.
- Generated stylesheets, components, and framework integrations do not provide an application security boundary. Applications remain responsible for authentication, authorization, output encoding, Content Security Policy, browser security, and safe handling of user content.
- Application-controlled Pendo guide classes and layout attributes select stylesheet presentation rules. They do not validate or sanitize Pendo-injected guide HTML, which remains trusted consumer content.
- Browser component configuration, including numeric attributes and CSS custom properties such as ProgressBar's `min`/`value-now`/`value-max`, Alert's `--timeout`, and ProgressCircle's `--animation-delay`, is application-controlled. Web components and interaction helpers validate expected numeric ranges, but applications remain responsible for deciding which elements may be updated, dismissed, or animated.
- pantoken plugins execute with the privileges of the Node.js build or application process that loads them. Plugin structure is validated by `validatePlugin` (non-empty name, function hooks, no unrecognised keys) and plugin output is validated at the IR boundary before it enters the token graph. Full execution sandboxing is planned. Only trusted plugins and configuration should be used.
- The CLI validates `--theme`, `--class`, and `--format` inputs against allowlists at parse time; unknown flags are rejected immediately. The CLI warns when the output path escapes the current working directory but still writes to the caller-selected location.
- Repository translation sources are trusted input. Entries marked `verbatim: "required"` bypass external translation adapters and are copied exactly into locale caches; `allow` only permits a model response to match the source.

## Reporting a vulnerability

Please report security issues privately. Don't open a public issue for anything security-sensitive.

- Use GitHub's [private vulnerability reporting](https://github.com/thedannywahl/pantoken/security/advisories/new)
  to open a draft advisory. This is the preferred channel.
- If you can't use GitHub, email <danny@iywahl.com>.

Please include enough detail to reproduce the issue: affected package and version, a description of the
impact, and steps or a proof of concept. We'll acknowledge your report within five business days and
keep you updated as we work on a fix.

## Vulnerability response process

When a vulnerability is reported, the project will:

1. Acknowledge the report within five business days.
2. Privately assess and attempt to reproduce the issue, identify affected packages and versions, and evaluate its severity and impact.
3. Coordinate with the reporter through the private advisory or email channel and request any additional information needed.
4. Develop a fix privately, including regression tests where practical, and check related packages for the same weakness.
5. Release the fix for the latest supported version and document the security-relevant change in the affected package changelog.
6. Publish a GitHub security advisory after the fix is available, including affected versions, impact, remediation, and upgrade instructions.
7. Credit the reporter unless they request anonymity.

If a report is determined not to be a vulnerability, the project will explain that conclusion privately to the reporter. Information about an unresolved vulnerability will remain private until a coordinated disclosure date is agreed upon or a fix is released.

## Supply-chain hardening

This repo already takes several supply-chain precautions, and this policy documents them so reporters
know what's in place:

- **npm provenance.** Every package publishes with `--provenance` through npm OIDC trusted publishing,
  so each release is cryptographically linked to the workflow run and commit that produced it.
- **Install delay.** The pnpm workspace sets `minimumReleaseAge`, and Renovate a matching 5-day
  `minimumReleaseAge`, so newly published dependency versions aren't adopted until they've been public
  for a few days.
- **Pinned actions.** CI workflows pin third-party GitHub Actions to commit SHAs, and Renovate keeps
  those pins current (as digests).
- **Automated scanning.** CodeQL and OpenSSF Scorecard run in CI, and GitHub security advisories are
  enabled. Snyk scans both dependencies (`snyk test`) and source code for vulnerabilities
  (`snyk code`, SAST); because Snyk has no GitHub App here, the SAST scan gates locally at push time
  rather than in CI.

### Verifying releases

Pantoken protects its releases with GitHub immutable-release attestations and npm/Sigstore provenance attestations.

#### GitHub releases

GitHub releases are immutable. After publication, their tags cannot be moved and their attached assets cannot be modified or deleted. GitHub automatically generates a cryptographically verifiable release attestation containing the release tag, source commit, and attached assets.

Each release includes two attached assets: the package tarball (`.tgz`) and a JSON-serialized Sigstore bundle (`*.sigstore.json`) generated by `actions/attest-build-provenance`. The bundle is a signed statement linking the tarball to the exact source commit and GitHub Actions workflow that produced it.

Install the GitHub CLI and verify a release with:

```sh
gh release verify RELEASE-TAG --repo thedannywahl/pantoken
```

Verify an attached artifact (tarball or provenance bundle):

```sh
gh release verify-asset RELEASE-TAG ARTIFACT-PATH \
  --repo thedannywahl/pantoken
```

GitHub uses keyless release attestations, so Pantoken does not maintain a long-lived private signing key on GitHub or another distribution site. The GitHub CLI obtains and validates the required public verification material automatically.

#### npm packages

Pantoken’s public npm packages are published from GitHub Actions using npm trusted publishing and the `--provenance` option. npm creates signed Sigstore provenance and publish attestations associating each package with its source commit and release workflow.

To verify an installed Pantoken package and its provenance using a current npm CLI:

```sh
npm install @pantoken/core
npm audit signatures
```

Replace `@pantoken/core` with the Pantoken package being verified. The command fails if a registry signature or provenance attestation is missing or invalid.

Users can also inspect the provenance indicator for a package version on npmjs.com to view its source commit, build workflow, signing certificate, and public transparency-log entry.

Sigstore provenance uses short-lived signing certificates rather than a long-lived Pantoken private key. npm retrieves the necessary certificate and transparency-log material automatically. The npm registry’s public signature keys are available at:

<https://registry.npmjs.org/-/npm/v1/keys>

Additional verification documentation:

- <https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/verify-release-integrity>
- <https://docs.npmjs.com/viewing-package-provenance/>

## Disclosure

We follow coordinated disclosure. Once a fix ships, we'll publish an advisory crediting the reporter
unless you'd rather stay anonymous.
