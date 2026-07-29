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
- pantoken plugins execute with the privileges of the Node.js build or application process that loads them. Only trusted plugins and configuration should be used.
- The CLI writes generated files to caller-selected locations. Do

## Reporting a vulnerability

Please report security issues privately. Don't open a public issue for anything security-sensitive.

- Use GitHub's [private vulnerability reporting](https://github.com/thedannywahl/pantoken/security/advisories/new)
  to open a draft advisory. This is the preferred channel.
- If you can't use GitHub, email <danny@iywahl.com>.

Please include enough detail to reproduce the issue: affected package and version, a description of the
impact, and steps or a proof of concept. We'll acknowledge your report within five business days and
keep you updated as we work on a fix.

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

## Disclosure

We follow coordinated disclosure. Once a fix ships, we'll publish an advisory crediting the reporter
unless you'd rather stay anonymous.
