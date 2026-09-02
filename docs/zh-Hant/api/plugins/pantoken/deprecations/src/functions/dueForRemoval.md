[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# 函式: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
must now be retired. The upgrade pipeline fails a bless while any are present.

## 參數

### ledger

`DeprecationLedger`

The deprecation ledger.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

The current resolved upstream versions.

## 回傳

`DeprecationEntry`[]

The entries due for removal.
