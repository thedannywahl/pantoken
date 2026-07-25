# Security policy

## Supported versions

pantoken publishes many small packages from this monorepo, all versioned together. We support the
latest published release of each package. Fixes land on `main` and ship in the next release; we don't
backport to older lines.

## Reporting a vulnerability

Please report security issues privately. Don't open a public issue for anything security-sensitive.

- Use GitHub's [private vulnerability reporting](https://github.com/thedannywahl/pantoken/security/advisories/new)
  to open a draft advisory. This is the preferred channel.
- If you can't use GitHub, email <dwahl@instructure.com>.

Please include enough detail to reproduce the issue: affected package and version, a description of the
impact, and steps or a proof of concept. We'll acknowledge your report within five business days and
keep you updated as we work on a fix.

## Supply-chain hardening

This repo already takes several supply-chain precautions, and this policy documents them so reporters
know what's in place:

- **npm provenance.** Every package publishes with `--provenance` through npm OIDC trusted publishing,
  so each release is cryptographically linked to the workflow run and commit that produced it.
- **Install delay.** The pnpm workspace sets `minimumReleaseAge`, so newly published dependency
  versions aren't installed until they've been public for a few days.
- **Pinned actions.** CI workflows pin third-party GitHub Actions to commit SHAs, and Dependabot keeps
  those pins current.
- **Automated scanning.** CodeQL, OpenSSF Scorecard, and Dependabot alerts run against the repository.

## Disclosure

We follow coordinated disclosure. Once a fix ships, we'll publish an advisory crediting the reporter
unless you'd rather stay anonymous.
