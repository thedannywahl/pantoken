# CSS: screen-reader-content

`.instui-screen-reader-content` — Oculta visualment el contingut mantenint-lo disponible per a la tecnologia d'assistència (el patró estàndard de clip).

**Font:** [screen-reader-content.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/utilities/screen-reader-content/screen-reader-content.css)

## Accessibilitat

Manté el text a l'arbre d'accessibilitat per als lectors de pantalla mentre l'elimina del disseny visual.

## Ús

```css
@import "@pantoken/components/components.css";
```

## Exemples

```html
<a class="instui-link" href="#examples" target="_blank">example</a>
<span class="instui-screen-reader-content">Opens in a new window</span>
```

