# @pantoken/canvas-theme-editor

Upload-ready `theme.css`/`theme.js` for Canvas LMS's **Theme Editor** — pre-populated with
pantoken's CDN imports (defaulting to its `rebrand-light` design, currently the only theme it
ships) and a loader for `@pantoken/interactions` (wires up component behaviors like modal, tooltip,
and drilldown).

This is the source of truth `@pantoken/scaffold`'s `canvas-theme-editor` platform scaffolds from;
it's also usable standalone.

```ts
import { THEME_CSS, THEME_JS } from "@pantoken/canvas-theme-editor";
```

Upload the two files to [Canvas's Theme Editor](https://community.instructure.com/en/kb/articles/661411-how-do-i-upload-custom-javascript-and-css-files-to-an-account) under **Advanced → CSS / JavaScript**.
