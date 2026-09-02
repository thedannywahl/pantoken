# CSS: img

`.instui-img` — Un `&lt;img&gt;` estilitzat amb modificadors de visualització, retall i efecte que s'apilen.

Els efectes es composen a través de la propietat personalitzada compartida `--pantoken-img-filter`, de manera que `-with-grayscale` i `-with-blur` es poden aplicar juntament; els modificadors de retall `-constrain-*` requereixen que el consumidor dimensioni la caixa explícitament.

**Font:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## Accessibilitat

Proporciona text significatiu de `alt` que descriu la imatge, i utilitza un `alt=""` buit per a imatges purament decoratives perquè la tecnologia d'assistència les salti.

## Ús

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## Exemples

```html
<img class="instui-img" alt="Gradient">
```

## Modificadors

| Modificador | Descripció |
| --- | --- |
| `.-constrain-contain` | Escala per ajustar-se dins de la caixa (contenir). |
| `.-constrain-cover` | Escala per omplir la caixa (cobrir). |
| `.-display-block` | Mostra com a element de bloc. |
| `.-with-blur` | Aplica un efecte de desenfocament. |
| `.-with-grayscale` | Aplica un efecte d'escala de grisos. |

## Propietats personalitzades

| Propietat | Tipus | Predeterminat | Descripció |
| --- | --- | --- | --- |
| `--pantoken-img` | — | — | filter &lt;filter-value-list&gt; \| none — El filtre CSS compost a la imatge; els modificadors d'efecte l'estableixen, i pots sobrescriure'l per a un filtre personalitzat. |

## Tokens consumits

| Token | Tipus | Valor |
| --- | --- | --- |
| `--instui-component-img-effect-transition-duration` | `<time>` | `1s` |
| `--instui-component-img-image-blur-amount` | `<length>` | `0.25em` |
| `--pantoken-img-filter` | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none` |

