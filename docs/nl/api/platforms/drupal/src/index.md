[pantoken](../../../index.md) / drupal

# drupal

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/drupal` — emit an Instructure-themed Drupal sub-theme.

Produces the token stylesheet (from `@pantoken/css`) and an InstUI-look prose stylesheet (from
`@pantoken/components`, styling content in a `.pantoken-prose` region), plus the `*.info.yml`
and `*.libraries.yml` a Drupal 10/11 theme needs to load them. Drop the files into
`themes/custom/<machine>/`.

## Interfaces

- [DrupalFile](interfaces/DrupalFile.md)
- [ToDrupalThemeOptions](interfaces/ToDrupalThemeOptions.md)

## Functions

- [machineName](functions/machineName.md)
- [toDrupalTheme](functions/toDrupalTheme.md)
