[pantoken](../../../index.md) / drupal

# drupal

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

`@pantoken/drupal` — emit an Instructure-themed Drupal sub-theme.

Produces the token stylesheet (from `@pantoken/css`) and an InstUI-look prose stylesheet (from
`@pantoken/components`, styling content in a `.pantoken-prose` region), plus the `*.info.yml`
and `*.libraries.yml` a Drupal 10/11 theme needs to load them. Drop the files into
`themes/custom/&lt;machine&gt;/`.

## インターフェース

- [DrupalFile](interfaces/DrupalFile.md)
- [ToDrupalThemeOptions](interfaces/ToDrupalThemeOptions.md)

## 関数

- [machineName](functions/machineName.md)
- [toDrupalTheme](functions/toDrupalTheme.md)
