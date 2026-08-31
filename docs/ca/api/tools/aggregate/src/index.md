[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'agregador del paquet meta unificat `pantoken`. Analitza les dependències del paquet meta
buscant el camp `pantoken`, després genera el barril (`export * as &lt;key&gt; from "&lt;pkg&gt;"`), un fitxer d'entrada de camí secundari per objectiu, i el mapa meta `package.json` `exports` — de manera que afegir un nou paquet objectiu amb un camp `pantoken` l'auto-registra, sense edicions manuals del barril.

## Interfaces

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## Functions

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
