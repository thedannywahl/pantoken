[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# Variable: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-alert&gt;` — un missatge d'estat en línia amb `role="alert"`. L'atribut `variant` es mapeja al modificador `-color-&lt;variant&gt;` (`info`, `success`, `warning`, `danger`). Les alertes s'eleven per defecte; estableix `has-shadow="false"` per aplanar-la (→ `-without-shadow`, reflegint InstUI's `hasShadow={false}`). L'atribut `timeout` (mil·lisegons) descarta automàticament l'alerta després d'aquest retard — s'esvaeix, es treu del DOM i genera un event bubollant cancelable `dismiss` (crida `preventDefault()` per mantenir l'alerta muntada). Els estats d'esvaïment utilitzen la utilitat `@pantoken/components`' `transition`; carrega la seva fulla d'estils quan s'utilitza la dismissió per temps límit. El contingut amb slot és el cos del missatge.

## Exemple

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
