# Contributing to pantoken

Thanks for your interest in contributing. This guide covers the practical steps to get a change
from idea to merged PR.

## Before you start

- Check [open issues](https://github.com/thedannywahl/pantoken/issues) and
  [open PRs](https://github.com/thedannywahl/pantoken/pulls) to avoid duplicating work.
- For significant changes, open an issue first to discuss the approach.
- For security issues, follow the [security policy](SECURITY.md) — don't open a public issue.

## Setup

```sh
git clone https://github.com/thedannywahl/pantoken.git
cd pantoken
vp install
```

`vp` is the project's unified CLI (Vite+). Run `vp help` for a full command list.

## Making changes

1. Create a branch from `main`.
2. Make your changes.
3. Add or update tests for any changed behaviour.
4. For user-facing package refinements or enhancements, evaluate whether `@pantoken/ai` asset content
   should be updated in the same PR (package recommendations, CLI targets, and usage conventions).
5. Run the full check suite before pushing:

   ```sh
   vp check   # format, lint, typecheck
   vp test    # unit tests
   ```

6. If your change affects a published package, add a changeset:

   ```sh
   vp exec changeset add
   ```

   Pick the affected packages and describe the change. Patch for bug fixes, minor for new
   features, major for breaking changes.

## Developer Certificate of Origin (DCO)

By contributing to this project, you certify that you have the right to submit your contribution under the project's license.

All non-trivial commits must include a Signed-off-by line:

Signed-off-by: Your Name <your.email@example.com>

The easiest way to do this is to commit with:

git commit -s

The project uses the Developer Certificate of Origin (DCO) version 1.1:
[developercertificate.org](https://developercertificate.org/)

## Commit messages

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
type(scope): short summary

Optional body.
```

Common types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`. The scope is the affected
package name (e.g. `components`, `core`, `css`). The commit-msg hook enforces this format.

## Pull requests

- Keep PRs focused — one concern per PR.
- The PR title must also follow Conventional Commits format.
- All CI checks must pass before merge.
- A maintainer will review and merge.

## Coding standards

Contributions must follow the project’s coding standards and pass the automated formatting, linting, type-checking, and documentation checks before being merged. The checked-in configuration files are the authoritative project style guides.

- **TypeScript and TSX:** Code is formatted by Oxfmt and linted by Oxlint using the repository’s Vite+ configuration. TypeScript strict checking is required. Exported APIs must use valid TSDoc comments as configured by `eslint.config.js` and `tsdoc.json`.
- **CSS:** CSS must comply with `stylelint.config.js`. Component and web-component CSS documentation must also satisfy the cssdoc rules configured by `cssdoc.json` and `eslint.config.js`. Project-specific component authoring conventions are documented in `docs/conventions/authoring.md`.
- **Markdown:** Markdown must comply with markdownlint using `.markdownlint.json` and `.markdownlint-cli2.yaml`.
- **Generated files:** Files under generated-output directories must be changed through their source generators rather than edited manually.

Run the complete project gate before submitting a pull request:

```sh
vp run ready:all
```

Formatting can normally be applied automatically with:

```sh
vp check --fix
```

Project-specific conventions and checked-in configuration take precedence over tool defaults.

## Authoring components or records

See [docs/conventions/authoring.md](docs/conventions/authoring.md) for the full authoring rules
covering records, modifiers, aliases, and the CSS API.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
