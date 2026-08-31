[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / alert

# Variable: alert

> `const` **alert**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-alert&gt;` — en inline-statusmeddelelse med `role="alert"`. Attributten `variant` kortlægges til
`-color-&lt;variant&gt;` modifikatoren (`info`, `success`, `warning`, `danger`). Advarsler er forhøjet som standard;
indstil `has-shadow="false"` for at flade en ud (→ `-without-shadow`, spejler InstUI's `hasShadow={false}`).
Attributten `timeout` (millisekunder) lukker automatisk advarslen efter den forsinkelse — den forsvinder gradvist,
fjerner sig selv fra DOM'en og udløser en aflysbar bubblingbegivenhed `dismiss` (kald `preventDefault()`
på den for at holde advarslen monteret). Fades-staterne bruger `@pantoken/components`' `transition` utility;
indlæs dens stylesheet, når du bruger timeout-afvisning. Slot-indhold er meddelelsesteksten.

## Example

```html
<instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
<instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
<!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
<!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
```
