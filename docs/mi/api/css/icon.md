# CSS: icon

`.instui-icon` — The icon system: `.instui-icon` sizing plus the shared `-icon-&lt;name&gt;` painter that masks a glyph (in `currentColor`) before any element.

**Source:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## Wātea mō te katoa

The glyph is decorative, so mark it `aria-hidden="true"`; give it a `role` or label only when the icon conveys meaning on its own.

## Ngā Whakamahi

```css
@import "@pantoken/components/components.css";
```

## Ngā tauira

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## Ngā Kaitī

| Kaiwhakatikatika | Whakamārama |
| --- | --- |
| `.-icon-*` | Set the glyph token (`--pantoken-glyph`) and render it via the shared painter (for example `-icon-search`). |

## Ngā pseudo-kōwae

| Pseudo-kōwae | Whakamārama |
| --- | --- |
| `::before` | The glyph itself: a 1em box masked from `--pantoken-glyph` and filled with `currentColor`. |

## Ngā tohu i whakamahia

| Tohu | Momo | Uara |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

