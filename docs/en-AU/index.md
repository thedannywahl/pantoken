---
layout: home
hero:
  name: pantoken
  text: InstUI, everywhere
  tagline: One resolved token model, reshaped into stylesheets, framework bindings, native code, and design-tool payloads.
  actions:
    - theme: brand
      text: Getting started
      link: /en-AU/guide/getting-started
    - theme: alt
      text: The package map
      link: /en-AU/guide/packages
    - theme: alt
      text: API reference
      link: /en-AU/api
    - theme: alt
      text: CSS reference
      link: /en-AU/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: One source of truth
    details: Every package reads the same resolved token IR. Change a token upstream and it flows to CSS, SCSS, native code, and Figma the same way.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Use the smallest package
    details: Install just @pantoken/css for a stylesheet, @pantoken/react for hooks and icons, or a bundler preset for Tailwind, Panda, or MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Generate for any platform
    details: Run &grave;pantoken generate&grave; to emit Swift, Kotlin, Compose, Flutter, Rust, WordPress, and more. The same tokens, in each ecosystem's idiom.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: No upstream coupling
    details: The tokens ship vendored as static JSON, so &grave;npm i&grave; never reaches for a GitHub-only source. Publishable, semver'd, offline-friendly.
---
