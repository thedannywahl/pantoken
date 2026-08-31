# CSS: visual-debug

`.-with-visual-debug` — Un contorn de depuració de disseny: apliqueu `.-with-visual-debug` a qualsevol element per delinear la caixa i els seus fills immediats, de manera que la estructura d'un disseny sigui visible a primera vista.

**Grup:** Connectors · **Font:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

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

| Property                        | Type | Default | Description                                                                                                      |
| ------------------------------- | ---- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `--pantoken-visual-debug-color` | —    | —       | El color del contorn (per defecte un magenta brillant); canvieu-lo per modificar tots els contorns de depuració. |
