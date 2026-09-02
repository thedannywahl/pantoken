[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# Variable: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-alert&gt;` — an inline status message with `role="alert"`. The `variant` attribute maps to the
`-color-&lt;variant&gt;` modifier (`info`, `success`, `warning`, `danger`). Alerts are elevated by default;
set `has-shadow="false"` to flatten one (→ `-without-shadow`, mirroring InstUI's `hasShadow={false}`).
The `timeout` attribute (milliseconds) auto-dismisses the alert after that delay — it fades out,
removes itself from the DOM, and fires a cancelable bubbling `dismiss` event (call `preventDefault()`
on it to keep the alert mounted). The fade states use `@pantoken/components`' `transition` utility;
load its stylesheet when using timeout dismissal. Slotted content is the message body.

## Beispiel

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
