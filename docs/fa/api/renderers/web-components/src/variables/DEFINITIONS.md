[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / DEFINITIONS

# متغیر: DEFINITIONS

> `const` **DEFINITIONS**: readonly [`ElementDefinition`](../interfaces/ElementDefinition.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Every element definition, in the canonical registration order. The order is load-bearing:
`date-input` renders a nested `calendar` and `date-time-input` renders a nested `date-input`, and
the `ELEMENTS` tuple / the register-order test both derive from this list.
