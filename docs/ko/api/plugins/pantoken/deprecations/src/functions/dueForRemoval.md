[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# 함수: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
must now be retired. The upgrade pipeline fails a bless while any are present.

## 매개변수

### ledger

`DeprecationLedger`

The deprecation ledger.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

The current resolved upstream versions.

## 반환값

`DeprecationEntry`[]

The entries due for removal.
