[pantoken](../../../../../index.md) / [plugins/pantoken/deprecations/src](../index.md) / dueForRemoval

# Function: dueForRemoval()

> **dueForRemoval**(`ledger`, `current`): `DeprecationEntry`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Les entrades la versió menor de sobrecost de les quals ha estat assolida per la construcció actual — és a dir, compatibilitats que
han de ser retirades. La canonada d'actualització falla una validació mentre n'hi ha alguna.

## Parameters

### ledger

`DeprecationLedger`

El registre de desaprovació.

### current

[`UpstreamVersions`](../interfaces/UpstreamVersions.md)

Les versions de sobrecost resoltes actuals.

## Returns

`DeprecationEntry`[]

Les entrades pendent de supressió.
