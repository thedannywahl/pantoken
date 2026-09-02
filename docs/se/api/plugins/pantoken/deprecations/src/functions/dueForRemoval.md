[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Fušla: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
must now be retired. The upgrade pipeline fails a bless while any are present.

## Parametera

### ledger

`DeprecationLedger`

The deprecation ledger.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

The current resolved upstream versions.

## Gullii / Gávdnat

`DeprecationEntry`[]

The entries due for removal.
