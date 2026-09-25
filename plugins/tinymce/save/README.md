# @pantoken/tinymce-save

Named TinyMCE presets stored in the current browser origin. The plugin adds one toolbar menu with
**Save**, **Save as...**, **Open...**, **Delete...**, **New**, **Export...**, and **Import...**
commands. It is separate from TinyMCE's Autosave plugin: Autosave recovers transient drafts, while
this plugin manages explicit snapshots and portable import/export.

## Usage

```ts
import tinymce from "tinymce";
import { createSavePlugin, SAVE_PLUGIN_NAME, SAVE_TOOLBAR_NAME } from "@pantoken/tinymce-save";

interface DocumentPreset {
  html: string;
}

tinymce.PluginManager.add(
  SAVE_PLUGIN_NAME,
  createSavePlugin<DocumentPreset>({
    capture: () => ({ html: tinymce.activeEditor?.getContent() ?? "" }),
    restore: ({ html }) => tinymce.activeEditor?.resetContent(html),
    reset: () => tinymce.activeEditor?.resetContent(""),
    isValid: (value): value is DocumentPreset =>
      typeof value === "object" &&
      value !== null &&
      typeof (value as { html?: unknown }).html === "string",
  }),
);

tinymce.init({
  selector: "#editor",
  license_key: "gpl",
  plugins: `${SAVE_PLUGIN_NAME} autosave`,
  toolbar: SAVE_TOOLBAR_NAME,
});
```

The callback state may include data outside TinyMCE, such as application settings or companion
CodeMirror documents. Validate every persisted field in `isValid` before restoration.

## Storage

Presets use the versioned `pantoken-tinymce-save-presets` localStorage key by default. Pass
`storageKey` to isolate applications on the same origin or `storage` to provide another synchronous
storage implementation. Preset names are unique without regard to case, and replacing an existing
name requires confirmation.

The active preset is kept in memory. Reloading does not open a preset or supersede Autosave draft
recovery. localStorage is origin-local, is not secret storage, is not synchronized to a server, and
may be unavailable or full; write failures leave the working document unchanged.
