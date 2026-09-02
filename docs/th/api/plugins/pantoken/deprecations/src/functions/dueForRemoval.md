[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# ฟังก์ชัน: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
must now be retired. The upgrade pipeline fails a bless while any are present.

## พารามิเตอร์

### ledger

`DeprecationLedger`

The deprecation ledger.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

The current resolved upstream versions.

## คืนค่า

`DeprecationEntry`[]

The entries due for removal.
