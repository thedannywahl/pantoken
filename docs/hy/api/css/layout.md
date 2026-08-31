# CSS: layout

`.--display-flex` — Ցուցադրել և տեքստ-հավասարեցնել ծառայություններ — `.--display-&lt;value&gt;` և `.--text-align-&lt;value&gt;` — որպես կազմակերպվածի, գլոբալ դասեր, օգտագործելի վերն կամ շղթայված ցանկացած բաղադրիչի հետ:

**Աղբյուր:** [index.ts](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/layout/index.ts)

## Usage

```css
@import "@pantoken/components/utilities.css";
```

## Examples

```html
<div class="--display-flex --text-align-center">
  <span>One</span>
  <span>Two</span>
</div>
```

## Modifiers

| Modifier          | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `.--display-flex` | Սահմանում է `display: flex`:                                                                   |
| `.--display-*`    | Ցուցադրման ծառայություններ. `block`, `inline-block`, `inline`, `flex`, `inline-flex` և `none`: |
| `.--text-align-*` | Տեքստ-հավասարեցման ծառայություններ. `start`, `center`, `end` և `justify`:                      |
