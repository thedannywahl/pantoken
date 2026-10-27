# Pantoken security assurance case

## Purpose and status

This document explains why Pantoken's documented security requirements are met within the project's
intended use and stated trust model. It identifies the assets and threats considered, the trust
boundaries in the system, the secure-design principles applied, the controls used against common
implementation weaknesses, and the evidence supporting each claim.

This assurance case covers the source repository, the generated outputs, the published npm packages,
the command-line generator, the documentation and demo tooling, and the release process. It should be
read with the [security policy](SECURITY.md) and the
[architecture overview](docs/architecture/overview.md).

The case is intentionally qualified. Pantoken transforms trusted design-system inputs; it is not a
sanitizer or a security boundary for attacker-controlled CSS, JavaScript, JSON, Markdown, HTML,
configuration, or plugin code. Known limitations and improvement work are recorded in
[Residual risks and limitations](#residual-risks-and-limitations).

## Top-level claim

**C0: Pantoken's published packages and generated outputs satisfy the security requirements documented
in `SECURITY.md` when Pantoken is used within its documented trust boundaries.**

The argument for C0 is:

1. The requirements and scope are explicit and testable.
2. The architecture limits runtime dependencies and separates trusted transformation from downstream
   consumption.
3. Controls address the credible threats and common implementation weaknesses in that architecture.
4. Automated tests, analysis, packaging checks, and release attestations provide evidence that the
   controls continue to operate.
5. Residual risks are disclosed rather than silently treated as solved.

## System description

Pantoken resolves Instructure design tokens and icons into a canonical `Token[]` intermediate
representation (IR), vendors that IR as versioned static data, and emits it into formats and
integrations for web frameworks, build systems, design tools, and native platforms.

The principal data flow is:

```mermaid
flowchart TD
    upstream["Pinned upstream token and icon sources"]
    core["@pantoken/core transform"]
    ir["Canonical Token[] intermediate representation"]
    tokens["@pantoken/tokens vendored static data"]
    emitters["npm emitters"]
    cli["CLI generators"]
    consumers["Consumer-controlled applications and files"]

    upstream --> core
    core --> ir
    ir --> tokens
    tokens --> emitters
    tokens --> cli
    emitters --> consumers
    cli --> consumers
```

The release path is:

```mermaid
flowchart TD
    source["Reviewed repository source"]
    actions["GitHub Actions build and verification"]
    npm["npm trusted publishing and Sigstore provenance"]
    github["GitHub immutable release and release attestation"]

    source --> actions
    actions --> npm
    actions --> github
```

The authoritative architecture description is
[`docs/architecture/overview.md`](docs/architecture/overview.md).

## Assets to protect

Contributor accessibility tooling runs trusted authored examples in a local browser, using
lockfile-pinned automatica11y and locally built styles and scripts. Its reports are advisory evidence,
not security controls or a WCAG certification. Fixtures must not contain credentials or private data.

The security-relevant assets are:

- The integrity of the source repository and release workflow.
- The integrity and provenance of published npm packages and GitHub releases.
- The correctness and reproducibility of the canonical token IR and generated outputs.
- The integrity of consumer files written by the CLI.
- The confidentiality of repository and release credentials.
- The availability of build, documentation, and transformation tools when processing expected inputs.
- The integrity of a consumer process that loads a Pantoken package or plugin.

Pantoken does not hold end-user accounts, passwords, private cryptographic keys, authorization data,
or confidential application data.

## Security requirements

The requirements below restate the user-visible commitments in
[`SECURITY.md`](SECURITY.md#security-requirements-and-scope) as assurance claims.

| ID   | Requirement                                                                                                                          | Argument and evidence                                                                                                                                                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SR-1 | Published consumer packages must not need to retrieve Pantoken's GitHub-only upstream token source at runtime.                       | The build resolves upstream data once and `@pantoken/tokens` vendors the resulting IR and raw data. Consumer packages depend on `@pantoken/model` and `@pantoken/tokens`, not `@pantoken/core`. The dependency boundary is documented and checked by builds, package tests, Publint, and Are the Types Wrong. |
| SR-2 | Generated output must be reproducible from repository source and pinned dependencies.                                                | The lockfile, pinned upstream reference, deterministic generators, and generated-output validation define a repeatable build input. Generated artifacts are rebuilt rather than edited by hand. The `build`, test, and `validate-generated` gates run in CI.                                                  |
| SR-3 | Public releases must be attributable to their source and build process.                                                              | npm packages are published through trusted publishing with `--provenance`; GitHub releases are immutable and receive release attestations. Verification instructions are documented in [`SECURITY.md`](SECURITY.md#verifying-releases).                                                                       |
| SR-4 | Token resolution, output generation, reference integrity, package exports, and supported integrations must be tested before release. | The CI workflow builds all packages and runs type checks, unit and property tests, generated-output validation, linting, package checks, and an aggregate gate on every pull request and push to `main`. Coverage has an enforced 85% statement floor.                                                        |
| SR-5 | Confirmed vulnerabilities in the supported release must receive a coordinated response and corrective release.                       | The reporting channels, acknowledgement target, private assessment, regression-test expectation, release steps, disclosure, and reporter-credit policy are documented in [`SECURITY.md`](SECURITY.md#vulnerability-response-process).                                                                         |
| SR-6 | Pantoken must clearly disclose where it is not a security boundary.                                                                  | The security policy states that caller-provided tokens, plugins, configuration, Markdown, and HTML are trusted unless a package says otherwise, and that emitters do not sanitize attacker-controlled content.                                                                                                |

## Threat model

### Threat sources

The model considers:

- An attacker who compromises or publishes a malicious external dependency.
- An attacker who tampers with a package, release, tag, or download path.
- A malicious or compromised contributor attempting to introduce unsafe code or workflow changes.
- Malformed structured input that attempts prototype pollution, path traversal, excessive regular
  expression work, or parser failure.
- Crafted documentation or demo metadata that attempts markup injection or iframe capability escape.
- Crafted process arguments that attempt shell-command injection.
- Accidental maintainer errors that produce incomplete, stale, or incorrectly packaged output.

### Entry points

Security-relevant entry points include:

- Upstream design-token and icon packages consumed during generation.
- Public JavaScript APIs that accept token arrays, plugin objects, options, Markdown trees, and HTML
  fragments.
- Browser component attributes and CSS custom properties consumed by interaction helpers.
- Parent loading-region state events and announcement labels consumed by the SkeletonLoader interaction helper.
- CLI arguments and caller-selected output paths.
- Documentation demo specifications and generated iframe attributes.
- Reviewed locale catalogs used to build TinyMCE plugin labels and inserted logo alt text.
- Docs-supplied iframe locale tags and browser session drafts restored by the Canvas theme editor.
- URLs handled by the local Vite development file server.
- Vendored script fonts and their upstream licenses used by the social-card renderer.
- CDN provider/version/package/path values passed to `@pantoken/cdn`'s URL builders (consumed by
  `@pantoken/canvas-theme-editor`'s `buildTheme` and, in future, the docs CDN picker).
- A brand hex color passed to `@pantoken/plugin-custom-theme-colors` (`custom`, `customColorCss`),
  entered by a Canvas admin in the theme editor or restored from a saved preset, and written into
  generated CSS.
- Public shadcn registry JSON consumed by `shadcn list`, `search`, `view`, and `add`; installation
  may add package dependencies and mutate the consumer's configured global CSS file.
- Dependency updates, pull requests, GitHub Actions workflows, and the release workflow.

### Threats and controls

| ID   | Threat                                                                                                                  | Control argument                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-1  | A dependency or upstream update changes generated output unexpectedly.                                                  | Versions are recorded in the lockfile, new dependency releases are delayed, automated update pull requests expose changes for review, and the upstream-drift and generated-output gates fail on unreviewed changes. Tokens Studio colour modifiers are allowlisted by operation and colour space, range-checked, and resolved through a type-checked reference graph; malformed modifiers are recorded and block artifact replacement until explicitly reviewed.                                   | [`pnpm-lock.yaml`](pnpm-lock.yaml), [`pnpm-workspace.yaml`](pnpm-workspace.yaml), [`renovate.json`](renovate.json), [`packages/core/src/resolve.ts`](packages/core/src/resolve.ts), [`packages/core/src/build.ts`](packages/core/src/build.ts), [`formats/tokens/scripts/generate.ts`](formats/tokens/scripts/generate.ts), [`tools/upstream-diff`](tools/upstream-diff/), [`tools/validate-generated`](tools/validate-generated/) |
| T-2  | A registry or distribution-path attacker substitutes a release.                                                         | npm registry signatures and Sigstore provenance bind packages to the source workflow. Each GitHub release has an attached package tarball and a JSON-serialized Sigstore bundle (`*.sigstore.json`) generated by `actions/attest-build-provenance`, binding the tarball to the source commit and Actions workflow. GitHub immutable-release attestations bind a release tag to its commit and attached assets. Users receive verification commands and public verification-material instructions.  | [`SECURITY.md`](SECURITY.md#verifying-releases), [release workflow](.github/workflows/release.yml), [`scripts/release/publish-npm.ts`](scripts/release/publish-npm.ts)                                                                                                                                                                                                                                                             |
| T-3  | A crafted token name causes prototype pollution in DTCG output.                                                         | DTCG output begins with a null-prototype root and excludes `__proto__`, `constructor`, and `prototype` keys. Property tests exercise arbitrary and deliberately dangerous names.                                                                                                                                                                                                                                                                                                                   | [`formats/dtcg/src/transform.ts`](formats/dtcg/src/transform.ts), [`formats/dtcg/tests/transform.property.test.ts`](formats/dtcg/tests/transform.property.test.ts)                                                                                                                                                                                                                                                                 |
| T-4  | A development-server URL escapes the configured file root.                                                              | Requested paths are resolved against the configured root and rejected when the relative result escapes that root. Only configured file extensions are served; read failures fall through without exposing error detail.                                                                                                                                                                                                                                                                            | [`plugins/vite/workspace-orchestrator/src/file-server.ts`](plugins/vite/workspace-orchestrator/src/file-server.ts), [`plugins/vite/workspace-orchestrator/tests/file-server.test.ts`](plugins/vite/workspace-orchestrator/tests/file-server.test.ts)                                                                                                                                                                               |
| T-5  | Crafted strings cause catastrophic regular-expression backtracking.                                                     | Security-sensitive expressions use bounded or non-ambiguous forms. Property tests exercise arbitrary token and syntax strings, and CodeQL and Snyk Code inspect the source for unsafe patterns.                                                                                                                                                                                                                                                                                                    | [`formats/dtcg/tests/transform.property.test.ts`](formats/dtcg/tests/transform.property.test.ts), [`docs/scripts/build-css-api.property.test.ts`](docs/scripts/build-css-api.property.test.ts), [CodeQL workflow](.github/workflows/codeql.yml)                                                                                                                                                                                    |
| T-6  | Demo metadata injects markup into generated documentation.                                                              | Iframe attribute values are escaped before insertion. Executable demonstrations run in sandboxed iframes with an explicit capability list. Tests assert escaping and sandbox emission.                                                                                                                                                                                                                                                                                                             | [`tools/demo/src/index.ts`](tools/demo/src/index.ts), [`tools/demo/tests/index.test.ts`](tools/demo/tests/index.test.ts), [`tools/demo/runner/main.ts`](tools/demo/runner/main.ts)                                                                                                                                                                                                                                                 |
| T-7  | A value passed to a repository script is interpreted by a command shell.                                                | Release and repository scripts invoke child processes with argument arrays and `shell: false` rather than interpolating commands into a shell string. Temporary release-note files are created in unique directories and removed after use.                                                                                                                                                                                                                                                        | [`scripts/release/publish-npm.ts`](scripts/release/publish-npm.ts), [`scripts/release/changed-packages.ts`](scripts/release/changed-packages.ts)                                                                                                                                                                                                                                                                                   |
| T-8  | A generated package is incomplete, points at the wrong files, or exposes broken types.                                  | The build validates generated files and token references. Publint and Are the Types Wrong inspect packed consumer artifacts. Repository metadata and changeset coverage are checked separately.                                                                                                                                                                                                                                                                                                    | [`tools/validate-generated/index.ts`](tools/validate-generated/index.ts), [`scripts/release/check-repository-metadata.ts`](scripts/release/check-repository-metadata.ts), [CI workflow](.github/workflows/ci.yml)                                                                                                                                                                                                                  |
| T-9  | A workflow or dependency is changed to execute unexpected code with release authority.                                  | Third-party actions are pinned to commit SHAs, workflow permissions are declared, ordinary CI is read-only, and npm publishing uses short-lived OIDC trusted publishing rather than a long-lived npm token. Dependency and workflow updates are automated and reviewed as pull requests.                                                                                                                                                                                                           | [CI workflow](.github/workflows/ci.yml), [release workflow](.github/workflows/release.yml), [Scorecard workflow](.github/workflows/scorecard.yml), [`renovate.json`](renovate.json)                                                                                                                                                                                                                                                |
| T-10 | A defect or malicious change is not detected before release.                                                            | Every pull request and push to `main` runs build, type checking, tests, coverage, linting, generated-output validation, package validation, and static analysis. Releases rebuild the publish set and use the verified `main` commit.                                                                                                                                                                                                                                                              | [CI workflow](.github/workflows/ci.yml), [release workflow](.github/workflows/release.yml), [`vite.config.ts`](vite.config.ts), [`codecov.yml`](codecov.yml)                                                                                                                                                                                                                                                                       |
| T-11 | A crafted CDN version string breaks out of a URL and corrupts generated CSS/JS/markup.                                  | `@pantoken/cdn` rejects version strings containing quotes, angle brackets, whitespace, or path separators before building any URL. Package/path values are caller-controlled by design (see TB-4) and are not treated as untrusted user input.                                                                                                                                                                                                                                                     | [`packages/cdn/src/version.ts`](packages/cdn/src/version.ts), [`packages/cdn/tests/index.test.ts`](packages/cdn/tests/index.test.ts)                                                                                                                                                                                                                                                                                               |
| T-12 | An external translation model changes a source literal that must remain exact.                                          | Translation entries marked `verbatim: "required"` are copied from the trusted source directly into locale caches and are excluded from adapter prompts, including forced translation runs. Tests assert adapter bypass and replacement of stale translated cache values.                                                                                                                                                                                                                           | [`tools/translation-adapters/src/index.ts`](tools/translation-adapters/src/index.ts), [`tools/translation-adapters/tests/index.test.ts`](tools/translation-adapters/tests/index.test.ts), [`docs/scripts/translation-memory.ts`](docs/scripts/translation-memory.ts), [`docs/scripts/translation-memory.test.ts`](docs/scripts/translation-memory.test.ts)                                                                         |
| T-13 | A social-card script font is substituted with a hostile file.                                                           | Fonts and their upstream licenses are vendored from one pinned `google/fonts` revision. The renderer verifies signatures and recorded SHA-256 digests before use, with no network download or font-cache write. Missing or invalid files warn and fall back to Latin text; unexpected read errors fail the build.                                                                                                                                                                                  | [`docs/scripts/lib/og-fonts.ts`](docs/scripts/lib/og-fonts.ts), [font provenance](docs/assets/fonts/noto/README.md), [`docs/scripts/lib/og-fonts.test.ts`](docs/scripts/lib/og-fonts.test.ts)                                                                                                                                                                                                                                      |
| T-14 | A crafted `--lang` value is written into scaffolded markup as an HTML attribute.                                        | The scaffold CLI resolves `--lang` against the fixed 44-entry supported-locale registry and rejects anything else before the value reaches template substitution, so only registry-canonical tags are ever emitted into a generated `lang`/`dir` attribute. Ambient sources (`LC_ALL`/`LANG`/`Intl`) are narrowed to a registry entry or discarded in favor of English.                                                                                                                            | [`packages/scaffold/src/locale.ts`](packages/scaffold/src/locale.ts), [`packages/scaffold/tests/locale.test.ts`](packages/scaffold/tests/locale.test.ts), [`packages/scaffold/tests/index.test.ts`](packages/scaffold/tests/index.test.ts)                                                                                                                                                                                         |
| T-15 | Statically deployed documentation assets exceed hosting quotas or fail to maintain origin and integrity boundaries.     | Deploy tooling splits the distribution into a static site tree (<100k files, <25MB/file) and bucket assets (`assets/`, `demos-assets/`). A single edge router entry point handles same-origin routing and sets immutable cache headers for hashed assets without cross-origin CORS exposure. Gating checks enforce file and size limits before deployment.                                                                                                                                         | [`docs/scripts/prepare-deploy.ts`](docs/scripts/prepare-deploy.ts), [`docs/edge/src/index.ts`](docs/edge/src/index.ts), [docs deploy workflow](.github/workflows/docs.yml)                                                                                                                                                                                                                                                         |
| T-16 | A public registry item changes dependencies or CSS configuration unexpectedly.                                          | Registry catalogs and item manifests are generated from reviewed source, validated against the shadcn schema, tested with the current shadcn CLI, and served over HTTPS. Public guidance tells consumers to inspect items with `shadcn view` and review installation diffs. npm provenance covers package payloads; registry JSON itself remains mutable and unsigned.                                                                                                                             | [`docs/scripts/generate-registry.ts`](docs/scripts/generate-registry.ts), [`docs/scripts/generate-registry.test.ts`](docs/scripts/generate-registry.test.ts), [`docs/guide/registry.md`](docs/guide/registry.md), [`SECURITY.md`](SECURITY.md#security-boundaries-and-limitations)                                                                                                                                                 |
| T-17 | A credential typed or printed during an agent session is published in an Entire checkpoint transcript.                  | Entire captures agent transcripts and pushes them to the repository as git objects under `refs/entire/checkpoints/*`. The `redaction.goredact` scanner is enabled so known credential formats (npm, GitHub, AWS, Slack, Stripe, OpenAI/Anthropic keys, PEM private keys, credentialed URIs) are replaced before a transcript is written to a git object; `redaction.custom_redactions` adds npm registry auth-token and `NPM_TOKEN` assignment patterns, and PII redaction covers email and phone. | [`.entire/settings.json`](.entire/settings.json), [`.github/secret_scanning.yml`](.github/secret_scanning.yml)                                                                                                                                                                                                                                                                                                                     |
| T-18 | A translated TinyMCE logo label injects markup into inserted editor HTML.                                               | The label is escaped as an HTML attribute value when the logo markup is built; per-editor strings default to the English catalog for missing translations.                                                                                                                                                                                                                                                                                                                                         | [`renderers/tinymce/src/logos.ts`](renderers/tinymce/src/logos.ts), [`renderers/tinymce/tests/logos-picker.test.ts`](renderers/tinymce/tests/logos-picker.test.ts)                                                                                                                                                                                                                                                                 |
| T-19 | A crafted iframe locale or corrupt session draft changes the embedded editor's state.                                   | The iframe accepts only exact tags in the supported locale registry and ignores standalone preferences. Session drafts are validated against the versioned preset shape before one-time restoration; unavailable or invalid storage leaves the editor's initial state unchanged.                                                                                                                                                                                                                   | [`packages/scaffold/templates/canvas-theme-editor/src/locale.ts`](packages/scaffold/templates/canvas-theme-editor/src/locale.ts), [`packages/scaffold/templates/canvas-theme-editor/src/main.ts.tmpl`](packages/scaffold/templates/canvas-theme-editor/src/main.ts.tmpl), [`packages/scaffold/tests/locale.test.ts`](packages/scaffold/tests/locale.test.ts)                                                                       |
| T-20 | A compromised platform release feed causes a workflow to execute untrusted data or expand an unsupported version claim. | Release monitoring reads JSON from fixed upstream endpoints, accepts numeric stable versions only, and writes review issues with scoped `issues: write` authority. It never executes upstream content or updates the reviewed support registry; a new claim needs a version-specific integration check and a normal PR.                                                                                                                                                                            | [`scripts/release/check-target-releases.ts`](scripts/release/check-target-releases.ts), [target releases workflow](.github/workflows/target-releases.yml), [`platforms/wordpress/scripts/check-host.ts`](platforms/wordpress/scripts/check-host.ts)                                                                                                                                                                                |
| T-21 | A crafted SkeletonLoader state event injects markup into a live announcement.                                           | The interaction accepts known state names and string labels, inserts announcements with `textContent`, and requires pre-rendered status and error nodes outside the busy content region. It never treats event labels as HTML or creates a live region from them.                                                                                                                                                                                                                                  | [`formats/interactions/src/behaviors/skeleton-loader.ts`](formats/interactions/src/behaviors/skeleton-loader.ts), [`formats/interactions/tests/skeleton-loader.test.ts`](formats/interactions/tests/skeleton-loader.test.ts)                                                                                                                                                                                                       |
| T-22 | A remote or browser-driven request invokes a local translation provider.                                                | The shim exposes only a loopback-bound listening handle, rejects browser Origin headers, and accepts only localhost or loopback Host headers matching its actual port before invoking a provider.                                                                                                                                                                                                                                                                                                  | [`tools/translation-adapters/src/shim.ts`](tools/translation-adapters/src/shim.ts), [`tools/translation-adapters/tests/shim.test.ts`](tools/translation-adapters/tests/shim.test.ts)                                                                                                                                                                                                                                               |
| T-23 | A theme broadcast uses a wildcard for a frame that does not require it.                                                 | Scope and docs broadcasters share one target-origin policy. Only explicitly sandboxed srcdoc frames without allow-same-origin receive wildcard-addressed public presentation settings; malformed and other opaque URLs receive no message.                                                                                                                                                                                                                                                         | [`formats/scope/src/scope.ts`](formats/scope/src/scope.ts), [`formats/scope/tests/scope.test.ts`](formats/scope/tests/scope.test.ts), [`docs/.vitepress/theme/theme.test.ts`](docs/.vitepress/theme/theme.test.ts)                                                                                                                                                                                                                 |
| T-24 | Persisted preset content enters the live DOM during export.                                                             | Exports serialize snapshots into JSON blobs and click detached anchors using browser-generated object URLs and sanitized filenames. Stored markup is not appended to the document during download.                                                                                                                                                                                                                                                                                                 | [`plugins/tinymce/save/src/index.ts`](plugins/tinymce/save/src/index.ts), [`plugins/tinymce/save/tests/index.test.ts`](plugins/tinymce/save/tests/index.test.ts)                                                                                                                                                                                                                                                                   |

## Trust boundaries

### Example metadata parsing

TinyMCE insertion and accessibility audit tooling use the shared, Node-free
`stripExampleMetadata` scanner in `packages/utils/src/example-targets.ts` for leading flag headers
(T-5). The scanner advances through each token once, preserving each consumer's whitespace rules
without overlapping repeated regex groups. Regression tests exercise long malformed headers in
the helper and both consumer paths. This bounds metadata parsing, not arbitrary HTML processing;
component examples remain trusted authored HTML.

### Weekly maintenance controls

The optional required `renovate-policy` commit status adds automation-specific merge restrictions
without granting bot bypass rights or preventing legitimate bot rebases. Reserved PRs must match
their configured identity, same-repository origin, branch, and `main` target. Failed-update branches
remain blocked. Component follow-ups need a non-author human maintainer's approval on the exact
current head and cannot use auto-merge. The workflow checks out the fixed `refs/heads/main` policy,
never a PR-selected ref. Workflow permissions are read-only; the policy job alone posts its result
on the PR head with commit-status write permission, not repository-content write access.
Evidence: `scripts/release/renovate-policy.ts`, its tests, and
`.github/workflows/renovate-policy.yml`. The ruleset administrator must activate this required
context after its first successful deployed run; until then the new status is advisory.

Component follow-up adds one fixed, version-pinned upstream export lookup in the credential-free
preparation job. Acorn parses the returned ES module without executing it. Lookup/parser failures
produce an inventory-review finding. The publisher validates component identifiers, paths, and
bounded patch text, and writes review artifacts only under `.renovate/component-reviews`; it does
not apply candidate-authored source patches. Component availability, variants, CSS behavior, and
alias retirement still require human validation. Evidence: `scripts/release/component-reviews.ts`
and its co-located tests, plus the publisher's separate-draft regression test.

| Threat                                                                                                        | Control                                                                                                                                                                                                                                                                                                | Evidence                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A dependency proposal acquires repository-write credentials during execution.                                 | Candidate commands receive a credential-filtered environment; the publication job checks out trusted base code, does not install candidate dependencies, and accepts only bounded file handoffs tied to immutable base/proposal SHAs.                                                                  | `scripts/release/weekly-maintenance.ts`, `scripts/release/weekly-maintenance.test.ts`, `.github/workflows/renovate.yml`                                |
| A stale or unrelated artifact is pushed by automation.                                                        | Publication rejects stale refs, path traversal, unexpected paths, workflow content outside the original proposal, and manifest script/version/export changes; branch updates are non-forced.                                                                                                           | `scripts/release/maintenance-publication.ts`, `scripts/release/maintenance-publication.test.ts`                                                        |
| A release feed manufactures supported versions or an outage removes working support.                          | Numeric stable releases need age evidence and explicit version-specific checks. Missing evidence and infrastructure errors block claim changes. Failed candidates stay outside the passing PR, with separate issues and a blocked draft.                                                               | `scripts/release/release-candidates.ts`, `scripts/release/support-policy.ts`, their co-located tests                                                   |
| An impersonated release PR bypasses Changeset coverage.                                                       | The exemption and auto-merge validate the exact branch, base, repository, title, and expected actor. The guard and adapter compatibility checks join the required CI aggregate.                                                                                                                        | `.github/workflows/changeset-check.yml`, `.github/workflows/guard-release-automation.yml`, `.github/workflows/ci.yml`, `.github/workflows/release.yml` |
| An output pathname changes between inspection and reading, or an artifact controls a privileged request path. | Maintenance opens output and changed files with no-follow flags, inspects and reads the same descriptor, and rejects non-regular files. Publication resolves file names against immutable GitHub trees, fetches validated blob SHAs, rejects truncated trees and symlinks, and refuses HTTP redirects. | `scripts/release/weekly-maintenance.test.ts`, `scripts/release/maintenance-publication.test.ts`                                                        |

### TB-1: Upstream source to Pantoken transformation

The upstream design-token and icon packages are external inputs. Pantoken trusts the selected
versions only after dependency resolution, review, generation, drift analysis, and CI complete. The
resolved IR, not the live upstream package, crosses into consumer packages.

### TB-2: Repository source to CI and release infrastructure

GitHub Actions executes repository-controlled workflows and third-party actions. Pull requests run
with read-only repository access. Release permissions are confined to the release job, and npm
publishing uses an OIDC identity scoped to the configured repository and workflow. GitHub and npm are
trusted to enforce their access controls, attestations, and immutable-release guarantees.

### TB-3: Pantoken packages to consumer applications

Pantoken packages provide generated values, CSS, components, and integration helpers. They do not
provide authentication, authorization, output sanitization, Content Security Policy, or a browser
security boundary. The consuming application owns those controls.

### TB-4: Caller configuration and plugins to the Pantoken process

Configuration and plugins are executable or code-generating inputs and run with the privileges of
the process that loads them. Pantoken treats them as trusted. A plugin boundary is an extension
boundary, not a sandbox. Consumers must not load attacker-controlled plugins or configuration.

### TB-5: CLI invocation to the local filesystem

The CLI writes to a caller-selected location with the caller's operating-system permissions. The
caller is trusted to choose the destination. Pantoken does not claim to confine a deliberately
malicious local user who already controls the CLI invocation.

### TB-6: Documentation content to browser execution

Repository-controlled documentation and demo specifications become HTML and iframe URLs. Pantoken
escapes generated attributes and applies iframe sandboxing. The documentation toolchain still treats
the underlying Markdown and example code as trusted project content.

### TB-7: Public registry to consumer project

The shadcn CLI retrieves Pantoken registry JSON over HTTPS, validates its schema, and applies
declared package and CSS changes to a consumer project. Schema validation does not establish that an
item is appropriate for that project. Consumers are responsible for trusting the registry origin,
inspecting item content and diffs, and reviewing package updates. npm provenance does not cover the
registry JSON response.

## Application of secure-design principles

### Economy of mechanism

Pantoken has one canonical token IR and a shared resolver instead of independent parsers in every
output package. Type contracts live in the zero-dependency `@pantoken/model` package. Consumer
packages use the vendored IR and avoid the upstream transformer unless transformation is their
purpose. This reduces duplicated security-sensitive logic and the consumer attack surface.

### Fail-safe defaults

The CLI rejects unknown commands and generation targets, unsupported swatch formats are rejected,
unsupported file-server paths fall through without being served, and release or CI gate failures
stop publication. Generated-output validation reports failure rather than silently accepting missing
or inconsistent artifacts.

### Complete mediation

Every request handled by the development file server passes through extension and path-containment
checks. Every proposed repository change passes through the aggregate CI gate. Every published
package passes through the repository-metadata and packaging gates, and releases are created through
the single release workflow.

### Open design

The architecture, trust assumptions, security limitations, workflows, release scripts, tests, and
verification commands are public. Security does not depend on keeping the implementation secret.
Authentication secrets and short-lived credentials, rather than hidden algorithms, protect release
authority.

### Separation of privilege

Source changes, CI verification, GitHub release authority, and npm trusted publishing are distinct
steps. npm publication requires the repository, workflow identity, npm trusted-publisher
configuration, and an OIDC exchange to agree. Release attestations and registry verification provide
an independent check after publication.

### Least privilege

Ordinary CI receives read-only repository access. Workflows declare permissions, checkout credentials
are not persisted where they are unnecessary, and the release job receives write and OIDC permissions
only for release work. Pantoken packages themselves do not request elevated operating-system
privileges.

### Least common mechanism

Packages are individually consumable, so users do not need to install the entire integration set.
Heavy or side-effectful integrations remain subpaths rather than eager imports. Temporary release
data uses per-operation directories instead of a shared predictable file.

### Psychological acceptability

Unsafe or unsupported cases produce direct error messages where validation exists. The contribution
guide provides one standard development gate, while release and verification commands are documented
for maintainers and consumers. Security reporting has a private GitHub path and an email fallback.

### Limited attack surface

Consumer packages do not fetch the GitHub-only upstream at runtime. Browser-facing component graphs
remain Node-free. The project does not implement authentication, cryptography, or network protocols.
Sandboxed iframes constrain demonstrations, and users can install only the package they need.

### Input validation

Pantoken applies allowlists at several constrained entry points: CLI commands and targets, native
platform selections, DTCG dangerous-key filtering, expected file extensions, path containment,
CSS custom property name pattern for plugin-contributed tokens, and an SVG script-injection strip
for decoded icon SVGs and plugin-contributed SVG assets.
Tokens Studio colour modifiers accept only `alpha`, `darken`, or `lighten` in HSL or CIE LCH with a
finite amount from zero through one. The transformer verifies that modified references resolve
through colour-typed tokens to a concrete colour, detects missing references and cycles, and blocks
generated artifact replacement until every malformed modifier has an explicit reviewed ledger
rewrite.
Browser interaction helpers that consume numeric configuration validate it before scheduling work;
missing, non-finite, and non-positive alert timeouts leave the element mounted. In-place edit's
numeric input type is only an editing hint, so consumers remain responsible for validation.
ProgressCircle animation delays are normalized to a finite, non-negative millisecond value.
Progress web-component values are normalized to a finite range between a minimum and larger maximum.
TinyMCE named presets use a versioned localStorage envelope and require the host application to
validate caller-owned state before restoring it. Blocked, malformed, or full browser storage fails
without replacing the working document.
The Canvas theme editor's one-time session draft uses the same preset-state validation before
restoration and does not replace named presets. Its custom preview width accepts and persists only
positive safe integers before using the value as a pixel constraint.
HTML attributes are escaped at the output boundary.
Custom brand colors accept only `#rgb` or `#rrggbb`; anything else throws before derivation, and the
CSS written out contains only the derived `#rrggbb` values, never the raw input. Demo frames and the
Canvas theme editor accept a posted custom scale or hex only when every value matches that pattern,
since the runner writes the scale into a generated `srcdoc` attribute.

## Common implementation weaknesses and countermeasures

| Canvas authoring control         | Evidence                                                                                                                                                                                                                                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local inline conversion          | The generic inliner does not fetch resources. Browser snapshots use a script-disabled iframe and bounded glyph canvases; author images/CSS can still request resources. Tests cover authored/generated declarations and nodes, scoped resolution, and removal of private tracking attributes from exports. |
| Optional generated behavior      | Include interactions controls generated Pantoken scripts outside Inline. Portable Inline disables generated/custom preview JavaScript and materializes static visuals; the app shell remains active.                                                                                                       |
| Contributor accessibility audits | Local built assets and explicitly tagged examples define coverage; subprocess argument arrays avoid shell interpolation. Missing targets and reports fail execution rather than appearing clean.                                                                                                           |

| Weakness                              | Countermeasure                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prototype pollution                   | Null-prototype DTCG root, dangerous-key exclusions, `validatePlugin` structural checks, example tests, and property tests over arbitrary token names.                                                                                                                                                                                                                                                                         |
| Path traversal                        | Canonical path resolution followed by a relative-path containment check before file reads. CLI warns when output path escapes cwd.                                                                                                                                                                                                                                                                                            |
| Command injection                     | Child-process argument arrays, `shell: false`, and temporary files for release notes instead of shell interpolation.                                                                                                                                                                                                                                                                                                          |
| Markup and attribute injection        | Output-boundary attribute escaping; `sanitizeSvg` strip on decoded icon SVGs and plugin SVG output; editor picker grids built with DOM construction rather than markup strings; documented trusted-content boundary for raw HTML. Editor glyph normalization parses pasted or set HTML in an inert `<template>` and only adds `contenteditable`/zero-width-space to glyph spans, leaving TinyMCE's schema filtering in place. |
| Plugin output injection               | Token names validated against CSS custom property pattern; `<image>` SVG sanitized; `</style>` check on CSS contributions; invalid tokens dropped with a warning.                                                                                                                                                                                                                                                             |
| Untrusted active content              | Explicit iframe sandbox capabilities for rendered and self-hosted demonstrations.                                                                                                                                                                                                                                                                                                                                             |
| Cross-frame message confusion         | Theme messages are addressed to frames a scope explicitly owns rather than every frame on the page, carry an instance identifier that receivers check, and keep origin-scoped targets (`"*"` only for opaque-origin `srcdoc` frames).                                                                                                                                                                                         |
| Persisted browser content             | Versioned preset envelopes, host-supplied state validation before restore, origin-local storage documentation, instance-namespaced keys so co-hosted instances cannot overwrite one another, and non-destructive storage failures.                                                                                                                                                                                            |
| Regular-expression denial of service  | Non-ambiguous expressions, bounded property-test inputs, high-iteration scheduled property tests, CodeQL, and Snyk Code.                                                                                                                                                                                                                                                                                                      |
| Unsafe object mutation                | Frozen public mapping tables where mutation would alter global behavior, null-prototype generated maps, and immutable inputs where practical.                                                                                                                                                                                                                                                                                 |
| Malformed browser numeric input       | Alert timeouts and ProgressCircle delays accept only finite values; Progress web-component values clamp between zero and a positive maximum; the Canvas preview width accepts only positive safe integers.                                                                                                                                                                                                                    |
| Malformed or missing generated output | Build-before-test ordering, generated-output validation, reference-integrity checks, package export checks, and failure aggregation.                                                                                                                                                                                                                                                                                          |
| Dependency vulnerabilities            | Renovate and Dependabot monitoring, a dependency release-age delay, Snyk dependency scanning, CodeQL, and OpenSSF Scorecard.                                                                                                                                                                                                                                                                                                  |
| Release tampering                     | npm registry signatures, Sigstore provenance, npm OIDC trusted publishing, GitHub immutable releases, and public verification instructions.                                                                                                                                                                                                                                                                                   |
| Credential persistence                | Token-free npm publishing through short-lived OIDC credentials; secrets remain in GitHub's secret store rather than source or generated packages.                                                                                                                                                                                                                                                                             |
| Regression reintroduction             | Automated tests on every pull request and push to `main`, an 85% statement-coverage floor, property tests, and regression tests for corrected defects.                                                                                                                                                                                                                                                                        |

## Verification evidence

The principal continuous evidence is:

- [CI workflow](.github/workflows/ci.yml): build, type checking, tests, coverage, linting,
  generated-output validation, package validation, documentation build, and aggregate status.
- [CodeQL workflow](.github/workflows/codeql.yml): automated semantic static analysis.
- [`scripts/quality/snyk-code-gate.ts`](scripts/quality/snyk-code-gate.ts): reviewed Snyk Code policy
  and explicit handling of accepted findings.
- [`vite.config.ts`](vite.config.ts): test discovery, V8 coverage, enforced thresholds, property-test
  setup, and the development gate.
- [`codecov.yml`](codecov.yml): project and patch coverage reporting.
- [`tools/validate-generated/index.ts`](tools/validate-generated/index.ts): generated-file,
  reference-integrity, CLI-target, and published-CSS checks.
- [`scripts/release/check-repository-metadata.ts`](scripts/release/check-repository-metadata.ts):
  package metadata, provenance configuration, engine, license, and export prerequisites.
- [Release workflow](.github/workflows/release.yml): scoped release permissions, build and package
  gates, OIDC publishing, and immutable GitHub releases.
- [`SECURITY.md`](SECURITY.md): supported versions, security requirements, reporting and response,
  supply-chain controls, and release-verification instructions.

## Residual risks and limitations

The following risks remain or are deliberately outside the security claim:

- **Accessibility fixture execution.** Audit examples and their production behavior scripts execute
  in Chrome/Chromium with local-process privileges. They are trusted repository code, not isolated
  untrusted content. Audit reports may contain authored markup. Accessibility findings, conditions
  checks, and simulated screen-reader output don't prove security or WCAG conformance.

- **Automated maintenance evidence.** Compatibility tests do not establish visual equivalence,
  upstream intent, or absence of malicious dependency behavior. Disposable worktrees and sanitized
  environments are not a process sandbox. Test failures that cannot be positively identified as
  compatibility assertions retain existing support rather than automatically dropping it. Bot
  token scopes, protected required checks, and npm trusted-publisher settings need live validation
  at rollout; unit fixtures and workflow linting do not prove the entire GitHub event chain.
  Descriptor-based reads prevent final-path symlink substitution, but do not isolate ancestor
  directories or stop another process from modifying an already-open file's contents.

1. **Trusted transformation inputs.** Token values, configuration, plugins, Markdown, and raw HTML
   can produce active CSS, JavaScript, markup, or source code. Pantoken does not sanitize
   attacker-controlled transformation inputs. Defense-in-depth: `sanitizeSvg` strips `<script>`
   elements and event-handler attributes from decoded icon SVGs (`@pantoken/icons`) and from
   plugin-contributed SVG at the IR boundary (`@pantoken/core`). This is a defense-in-depth
   measure for trusted-but-pinned sources, not a general untrusted-input sanitizer.
2. **Plugin authority.** Plugins execute with the loading process's privileges. `validatePlugin`
   asserts structural integrity (non-empty name, function hooks, no unrecognised keys) before any
   plugin is run. Plugin output is validated at the IR boundary: token names are checked against the
   CSS custom property pattern, `<image>` token SVG data-URIs are sanitized, and plugin-contributed
   icon SVGs are sanitized before encoding. Full execution sandboxing (Worker thread heap isolation
   and child-process `--permission` model) is planned; the API redesign required to make hook
   contexts serializable is a prerequisite.
3. **CLI validation gaps.** ~~Closed.~~ `--theme`, `--class`, `--format` (rust target), and all
   unknown flags are now validated against allowlists at parse time and rejected with a descriptive
   error. Regression tests cover each rejection case. The CLI warns when the output path escapes the
   current working directory.
4. **Caller-selected output paths.** The CLI intentionally writes to the path selected by its caller.
   Operating-system permissions, workspace isolation, and review of build configuration protect the
   surrounding filesystem.
5. **Development file server.** The workspace file server is intended for local Vite development. It
   is not a production server and does not provide rate limiting or authentication.
6. **Consumer security controls.** Authentication, authorization, Content Security Policy, safe
   handling of user content, and output encoding remain the consuming application's responsibility.
   Application-controlled Pendo guide classes, compact color/glyph suffixes, and layout attributes
   select presentation rules only; they do not validate or sanitize Pendo-injected guide HTML.
7. **Static-analysis availability.** CodeQL runs in CI. The Snyk Code pre-push gate requires local
   authentication and warns when it cannot run, so it is supplementary rather than the sole control.
   Intentional loopback HTTP (T-22) and opaque-preview message delivery (T-23) remain visible as
   advisories, accepted only by exact rule, file, and reported source-call matching. A different
   call site or changed call remains blocking and needs review.
   The former social-card network-to-file flow (T-13) has been removed by vendoring the verified
   fonts and licenses. Upstream font updates still require source, digest, and license review;
   vendoring does not establish that a font parser or an upstream binary is vulnerability-free.
8. **Generated GitHub source archives.** GitHub can verify an immutable release tag and attached
   assets. Each release now has an attached package tarball and SLSA `*.sigstore.json` provenance
   bundle; the automatically-generated source archives are separate and not covered by those
   signatures. npm packages are additionally covered by registry signatures and Sigstore provenance.
9. **Registry item mutability.** The public shadcn namespace resolves to latest JSON served from
   `pantoken.app`; those manifests are not independently signed or version-addressable. HTTPS,
   generated-output tests, schema checks, `shadcn view`, and consumer diff review reduce this risk,
   while npm provenance applies only to package dependencies installed by an item.
10. **Named editor presets.** TinyMCE presets intentionally persist trusted author HTML, CSS, and
    JavaScript in origin-local browser storage. localStorage is not encrypted, secret, synchronized,
    or isolated from other scripts on the same origin. Restoring custom JavaScript reactivates it in
    the Canvas editor's existing preview context. Schema validation prevents malformed records from
    being applied, but does not sanitize intentionally authored active content.
    Inline conversion does not change this trust boundary. Its temporary snapshot frame disables
    scripts, but referenced author resources may still access the network; the generic interactions
    toggle in other providers is not a sandbox for custom scripts or authored active content.
11. **Agent transcript scanning.** Entire's checkpoint transcripts are dense with structural UUIDs,
    which GitHub's legacy npm-token detector matches whenever the keyword `npm` appears nearby. In
    an npm monorepo that fires constantly and blocks the checkpoint push, so
    `.github/secret_scanning.yml` excludes `full.jsonl`, `transcript.jsonl`, and `prompt.txt` from
    GitHub secret scanning. Redaction at capture time (T-17) is therefore the primary control for
    credentials in transcripts, and GitHub scanning no longer backstops it on those paths. The
    exclusion is scoped to file names the repository does not otherwise track, and takes effect only
    once present on the default branch.
12. **Platform release monitoring.** External feeds can be stale, unavailable, or incorrectly mapped
    to an adapter; packages without a trustworthy version feed still need manual review. A scheduled
    issue is a prompt to test a release, not a compatibility attestation or automatic package update.

13. **Local translation transport.** The HTTP shim is restricted to IPv4 loopback and rejects
    browser-origin and unexpected-host requests. It does not provide TLS or authenticate other
    local processes; it must not be exposed through a proxy or used as a remote translation service.
14. **Opaque preview origins.** Sandboxed `srcdoc` frames without `allow-same-origin` require wildcard
    target origins. Scope and docs broadcasts restrict that exception to those frames and carry
    only public presentation settings. Callers must never use these channels for secrets or
    confidential application state.

These limitations do not weaken the narrower requirements in SR-1 through SR-6 because they are
included in the documented scope and trust model. They do prevent Pantoken from claiming that it
safely accepts arbitrary untrusted transformation input.

## Maintenance of this assurance case

The maintainer should review this document:

- When a new public input surface, plugin type, network operation, or privileged workflow is added.
- When the trust model or security requirements in `SECURITY.md` change.
- After a confirmed vulnerability reveals a missing threat or ineffective control.
- When release, signing, dependency, or CI infrastructure changes materially.
- At least annually as part of the roadmap and security-documentation review.

Changes to security claims must update the corresponding evidence links. A control that is planned but
not implemented must remain in the residual-risk section and must not be presented as evidence.
