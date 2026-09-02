[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Funktion: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De poster, hvis `removeIn` upstream minor er blevet nået af det aktuelle build — dvs. shims, der
nu skal trækkes tilbage. Upgrade-rørledningen mislykkes en velsignelse, mens nogle er til stede.

## Parametre

### ledger

`DeprecationLedger`

Deprecation-hovedbogen.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

De aktuelle løste upstream-versioner.

## Returnerer

`DeprecationEntry`[]

De poster, der skal fjernes.
