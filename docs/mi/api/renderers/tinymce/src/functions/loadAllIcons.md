[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / loadAllIcons

# Mahi: loadAllIcons()

> **loadAllIcons**(): `Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>

Load and merge all available icons from both sources.
Returns a sorted array tagged with the source package.

NOTE: Component icon names are derived from the model's `-icon-*` modifier.
This needs to be populated from either `docs/public/icon-manifest.json` (if consumable)
or a manifest published alongside formats/components model.json.
For now, only simple-icons are included.

## Whakahokia

`Promise`\<[`TaggedIcon`](../interfaces/TaggedIcon.md)[]\>
