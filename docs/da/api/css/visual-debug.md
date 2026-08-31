# CSS: visual-debug

`.-with-visual-debug` — En layout-fejlfinde omrids: sammensat `.-with-visual-debug` på ethvert element for at tegne boksen og dens umiddelbare børn, så en layouts struktur er synlig på et øjeblik.

**Gruppe:** Plugins · **Kilde:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

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

| Property                        | Type | Default | Description                                                                                  |
| ------------------------------- | ---- | ------- | -------------------------------------------------------------------------------------------- |
| `--pantoken-visual-debug-color` | —    | —       | Omrids farven (som standard en lys magenta); omfarv den for at ændre hvert fejlfinde omrids. |
