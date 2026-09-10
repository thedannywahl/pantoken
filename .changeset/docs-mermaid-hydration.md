---
"@pantoken/docs": patch
---

Fix a hydration mismatch on pages with a mermaid diagram. Importing mermaid arms a `load` listener that renders every `.mermaid` element, and VitePress hydrates after `load`, so the diagram's source text was replaced with an SVG before Vue hydrated it. The container is now `.mermaid-diagram`, outside mermaid's default selector, and the first render happens in `onMounted` rather than during setup.
