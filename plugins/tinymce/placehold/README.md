# @pantoken/tinymce-placehold

A TinyMCE plugin for inserting PNG placeholder images from [placehold.co](https://placehold.co/).

## Usage

```ts
import tinymce from "tinymce";
import {
  createPlaceholdPlugin,
  PLACEHOLD_PLUGIN_NAME,
  PLACEHOLD_TOOLBAR_NAME,
} from "@pantoken/tinymce-placehold";

tinymce.PluginManager.add(PLACEHOLD_PLUGIN_NAME, createPlaceholdPlugin());

tinymce.init({
  selector: "#editor",
  // Required for self-hosted TinyMCE 6+; use a commercial key instead of "gpl" if licensed.
  license_key: "gpl",
  plugins: PLACEHOLD_PLUGIN_NAME,
  toolbar: PLACEHOLD_TOOLBAR_NAME,
});
```

The dialog accepts width, height, background color, text color, custom image text, and alt text. It defaults to a 600 by 400 image with `#eeeeee` and `#31343c`. Placehold supports dimensions from 10 through 4000 pixels. This plugin always emits an explicit `.png` URL.

When alt text is blank, the plugin uses the custom image text or a localized dimension-based fallback. Author-entered image text and alt text are never translated. All plugin-owned interface strings participate in pantoken's `tinymce.strings` localization pipeline.

Use `onInsert` to react after an image is inserted:

```ts
createPlaceholdPlugin({
  defaults: { width: 800, height: 450 },
  onInsert(image) {
    console.log(image.url);
  },
});
```

Rendered placeholders require network access to `https://placehold.co`.
