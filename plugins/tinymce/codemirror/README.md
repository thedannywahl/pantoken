# @pantoken/tinymce-codemirror

A CodeMirror 6 source-view toggle for TinyMCE — syntax-highlighted HTML editing with a live
preview, dark-mode theming, pretty-print, and fullscreen support. Replaces TinyMCE's stock `code`
plugin, which edits in a one-shot modal dialog with no live preview, no dark-mode theming, and no
formatting.

## Usage

```ts
import tinymce from "tinymce";
import {
  createSourceTogglePlugin,
  SOURCE_TOGGLE_PLUGIN_NAME,
  SOURCE_TOGGLE_TOOLBAR_NAME,
  SOURCE_FORMAT_TOOLBAR_NAME,
} from "@pantoken/tinymce-codemirror";

tinymce.PluginManager.add(SOURCE_TOGGLE_PLUGIN_NAME, createSourceTogglePlugin({ height: 400 }));

tinymce.init({
  selector: "#editor",
  license_key: "gpl",
  plugins: SOURCE_TOGGLE_PLUGIN_NAME,
  toolbar: `${SOURCE_TOGGLE_TOOLBAR_NAME} ${SOURCE_FORMAT_TOOLBAR_NAME}`,
});
```

## Dark mode

The source view reacts automatically to the `data-pantoken-scheme="dark"` attribute on
`document.documentElement` — the same attribute pantoken's TinyMCE skins already use.

## Pretty-print

The format button (`SOURCE_FORMAT_TOOLBAR_NAME` in toolbar mode, or a `{ }` statusbar button when
`display` includes `"footer"`) runs the current doc through `prettier`'s standalone HTML parser
(`prettier/standalone` + `prettier/plugins/html`) and is enabled only while the source view is
active. Entering source mode also auto-formats once. `SourceTogglePluginApi.format()` is async
since prettier's standalone API returns a promise; a failed format surfaces a TinyMCE notification
rather than failing silently.

## Extending

Pass extra CodeMirror extensions (a linter, autocompletion, etc.) via `extensions`:

```ts
createSourceTogglePlugin({
  height: 400,
  extensions: [myLinter(), myCompletion()],
});
```

`@pantoken/tinymce` layers its own pantoken-aware HTML linter/autocomplete on top this way, since
this package has no knowledge of pantoken's component or utility model.

## Insertion API

Other TinyMCE plugins can write into the CodeMirror doc while source mode is active, via
`editor.plugins[SOURCE_TOGGLE_PLUGIN_NAME]`:

```ts
const sourceToggle = editor.plugins[SOURCE_TOGGLE_PLUGIN_NAME] as SourceTogglePluginApi | undefined;
if (sourceToggle?.isSourceMode()) {
  sourceToggle.insertAtCursor("<p>Hello</p>");
}
```
