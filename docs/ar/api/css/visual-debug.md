# CSS: visual-debug

`.-with-visual-debug` — ملخص تصحيح التخطيط: مركب `.-with-visual-debug` على أي عنصر لرسم تخطيط الصندوق والعناصر المباشرة، بحيث يكون هيكل التخطيط مرئيًا في لمحة.

**المجموعة:** الإضافات · **المصدر:** [visual-debug.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/visual-debug/visual-debug.css)

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
| `--pantoken-visual-debug-color` | —    | —       | لون المخطط التفصيلي (افتراضيًا أرجواني مشرق)؛ أعد تلوينه لتغيير كل مخطط تفصيلي للتصحيح. |
