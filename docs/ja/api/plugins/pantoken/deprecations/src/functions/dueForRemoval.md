[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# 関数: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
must now be retired. The upgrade pipeline fails a bless while any are present.

## パラメーター

### ledger

`DeprecationLedger`

The deprecation ledger.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

The current resolved upstream versions.

## 戻り値

`DeprecationEntry`[]

The entries due for removal.
