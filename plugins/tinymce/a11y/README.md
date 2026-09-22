# @pantoken/tinymce-a11y

A TinyMCE plugin that checks editable content for common accessibility issues.

## Usage

```ts
import tinymce from "tinymce";
import { createA11yPlugin, A11Y_PLUGIN_NAME, A11Y_TOOLBAR_NAME } from "@pantoken/tinymce-a11y";

tinymce.PluginManager.add(A11Y_PLUGIN_NAME, createA11yPlugin());

tinymce.init({
  selector: "#editor",
  // Required for self-hosted TinyMCE 6+; use a commercial key instead of "gpl" if licensed.
  license_key: "gpl",
  plugins: A11Y_PLUGIN_NAME,
  toolbar: A11Y_TOOLBAR_NAME,
});
```

The initial rule set checks image alt text, image filename and length, heading structure, table headers and captions, adjacent links, and list structure. The checker skips elements inside `[data-ignore-a11y-check]`.

## Display options

`createA11yPlugin` registers the toolbar and menu controls by default. Set `display` to control where the checker appears:

- `"toolbar"` (default): register the toolbar and menu controls.
- `"footer"`: register an updating, clickable statusbar issue count, including zero issues.
- `"both"`: register toolbar, menu, and statusbar controls.
- `"none"`: register only the plugin command and API.

The footer checks content after typing pauses and opens the same checker dialog when clicked. TinyMCE controls toolbar placement, so include `A11Y_TOOLBAR_NAME` in the editor's `toolbar` option when using `"toolbar"` or `"both"`.

```ts
tinymce.PluginManager.add(A11Y_PLUGIN_NAME, createA11yPlugin({ display: "both" }));
```

Use the command for a programmatic scan:

```ts
editor.execCommand("pantokenCheckAccessibility", false, {
  done(issues) {
    console.log(issues);
  },
});
```

Additional rules can be supplied through `scanAccessibility` or `createA11yPlugin`. A rule receives the element and the scan context and returns `true` when the element passes.
