# Security policy

## Supported versions

pantoken publishes many small packages from this monorepo, all versioned together. We support the
latest published release of each package. Fixes land on `main` and ship in the next release; we don't
backport to older lines.

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
