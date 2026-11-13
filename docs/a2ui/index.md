---
title: A2UI Catalog
layout: page
---

<A2uiCatalogBrowser />

## Catalog versioning

The v1 catalog ID is stable. Adding an optional component, property, or enum value is additive;
removing or renaming an existing component or property, narrowing an enum, or making an optional
property required is breaking and requires a new catalog version. Only the components and
properties listed above are part of Pantoken's A2UI catalog.

The catalog defines no executable functions and does not authorize actions. A2UI actions are
dispatched through the host application's normal action handling, where the application must enforce
its own permissions.
