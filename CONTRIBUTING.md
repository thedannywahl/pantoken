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
4. Run the full check suite before pushing:

   ```sh
   vp check   # format, lint, typecheck
   vp test    # unit tests
   ```

5. If your change affects a published package, add a changeset:

   ```sh
   vp exec changeset add
   ```

   Pick the affected packages and describe the change. Patch for bug fixes, minor for new
   features, major for breaking changes.

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

## Code style

`vp check --fix` auto-formats and fixes most lint issues. The project uses Oxfmt for formatting,
Oxlint for JavaScript/TypeScript, and Stylelint for CSS. TypeScript strict mode is enforced
across all packages.

## Authoring components or records

See [docs/conventions/authoring.md](docs/conventions/authoring.md) for the full authoring rules
covering records, modifiers, aliases, and the CSS API.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
