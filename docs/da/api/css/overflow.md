# CSS: overflow

`.--overflow-x-hidden` — `overflow-x`/`overflow-y` som sammensætbare, globale klasser — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — kan bruges på egen hånd eller kædet til enhver komponent.

**Kilde:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/overflow/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--overflow-y-auto">…</div>
```

## Modifiers

| Modifier                | Description          |
| ----------------------- | -------------------- |
| `.--overflow-x-auto`    | overflow-x: auto.    |
| `.--overflow-x-clip`    | overflow-x: clip.    |
| `.--overflow-x-hidden`  | overflow-x: hidden.  |
| `.--overflow-x-scroll`  | overflow-x: scroll.  |
| `.--overflow-x-visible` | overflow-x: visible. |
| `.--overflow-y-auto`    | overflow-y: auto.    |
| `.--overflow-y-clip`    | overflow-y: clip.    |
| `.--overflow-y-hidden`  | overflow-y: hidden.  |
| `.--overflow-y-scroll`  | overflow-y: scroll.  |
| `.--overflow-y-visible` | overflow-y: visible. |
