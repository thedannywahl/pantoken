# CSS: visual-debug

`.-with-visual-debug` — Դասավորության վրիպազերծման ուրվածք՝ compound `.-with-visual-debug` ցանկացած տարրի վրա տուփը և դրա անմիջական հատկներին հետամուծել, այնպես որ դասավորման կառուցվածքը տեսանելի լինի առաջին հայացքից:

**Խումբ:** Plugins · **Աղբյուր:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

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

| Property                        | Type | Default | Description                                                                                           |
| ------------------------------- | ---- | ------- | ----------------------------------------------------------------------------------------------------- |
| `--pantoken-visual-debug-color` | —    | —       | Ուրվածքի գույնը (լռելյայն պայծառ մագենտա); վերաներկեք այն՝ յուրաքանչյուր վրիպազերծման ուրվածքը փոխել: |
