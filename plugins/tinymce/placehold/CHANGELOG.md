# @pantoken/tinymce-placehold

## 0.2.0

### Minor Changes

- f475012: Add merged message-source support to the localization pipeline and add a TinyMCE Placehold PNG
  image plugin to the Canvas theme editor scaffold.
- f475012: Upgrade the peer dependency and catalog pin from TinyMCE 5 to TinyMCE 8. Self-hosted consumers must now set a `license_key` option (`"gpl"` for the open-source license, or a commercial key) when calling `tinymce.init()`.

### Patch Changes

- f475012: Add opt-in pantoken-aware TinyMCE commands and automatic component classes for authored content.
  Apply the image component class to placeholder and product-logo images, and enable the integration
  in the Canvas theme editor scaffold.
