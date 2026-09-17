---
aside: false
editLink: false
title: Agent Tools
---

# Agent tools

Pantoken ships agent-facing files so coding agents can set up and use the design-token packages
without guessing at package names or conventions.

## Bootstrap a project

For a new project, fetch the setup skill and follow its instructions:

```prompt
Fetch https://create.pantoken.app/SKILL.md and follow it to set up pantoken in this project.
```

The skill covers package selection, starter-project setup, and the first working example.

## Add agent guidance to a repository

To install the agent rules and supporting files in an existing repository:

```sh
npx @pantoken/ai init
```

The command adds the Pantoken guidance files to the consumer repository. Keep those files with the
project so future agents can follow the same package and styling conventions.

## Other entry points

- The [Getting Started guide](/guide/getting-started) covers the first manual setup.
- The [Pantoken CLI guide](/guide/cli) covers generated platform output.
- The [API reference](/api/) lists the exports available to agents and applications.
