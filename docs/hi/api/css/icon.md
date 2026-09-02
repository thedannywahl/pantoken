# CSS: icon

`.instui-icon` — The icon system: `.instui-icon` sizing plus the shared `-icon-&lt;name&gt;` painter that masks a glyph (in `currentColor`) before any element.

**Source:** [icon.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/icon/icon.css)

## एक्सेसिबिलिटी

The glyph is decorative, so mark it `aria-hidden="true"`; give it a `role` or label only when the icon conveys meaning on its own.

## उपयोग

```css
@import "@pantoken/components/components.css";
```

## उदाहरण

```html
<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
```

## मॉडिफायर

| मॉडिफायर | विवरण |
| --- | --- |
| `.-icon-*` | Set the glyph token (`--pantoken-glyph`) and render it via the shared painter (for example `-icon-search`). |

## स्यूडो-एलिमेंट्स

| स्यूडो-एलिमेंट | विवरण |
| --- | --- |
| `::before` | The glyph itself: a 1em box masked from `--pantoken-glyph` and filled with `currentColor`. |

## उपयोग किये गए टोकन

| टोकन | प्रकार | मान |
| --- | --- | --- |
| `--pantoken-glyph` | `<url>` | `url("data:image/svg+xml` |

