# CSS: visual-debug

`.-with-visual-debug` — A layout-debugging outline: compound `.-with-visual-debug` onto any element to outline the box and its immediate children, so a layout's structure is visible at a glance.

**Group:** Plugins · **Source:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

## Usage

```css
@import "@pantoken/plugin-visual-debug/visual-debug.css";
```

## Examples

```html
<div class="instui-view -with-visual-debug">
  <span>Outlined child.</span>
</div>
```

## Custom properties

| Property                        | Type | Default | Description                                                                             |
| ------------------------------- | ---- | ------- | --------------------------------------------------------------------------------------- |
| `--pantoken-visual-debug-color` | —    | —       | The outline colour (default a bright magenta); retint it to change every debug outline. |
