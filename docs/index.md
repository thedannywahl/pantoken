---
layout: home
hero:
  name: pantoken
  text: Instructure design tokens, everywhere
  tagline: One resolved token model, reshaped into stylesheets, framework bindings, native code, and design-tool payloads.
  actions:
    - theme: brand
      text: Getting started
      link: /guide/getting-started
    - theme: alt
      text: The package map
      link: /guide/packages
    - theme: alt
      text: API reference
      link: /api
    - theme: alt
      text: CSS reference
      link: /api/css
features:
  - title: One source of truth
    details: Every package reads the same resolved token IR. Change a token upstream and it flows to CSS, SCSS, native code, and Figma the same way.
  - title: Pick the smallest package
    details: Install just @pantoken/css for a stylesheet, @pantoken/react for hooks and icons, or a bundler preset for Tailwind, Panda, or MUI. The unified pantoken package re-exports them all.
  - title: Generate for any platform
    details: Run pantoken generate to emit Swift, Kotlin, Compose, Flutter, Rust, WordPress, and more. The same tokens, in each ecosystem's idiom.
  - title: No upstream coupling
    details: The tokens ship vendored as static JSON, so npm i pantoken never reaches for a GitHub-only source. Publishable, semver'd, offline-friendly.
---
