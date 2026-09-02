[pantoken](../../../index.md) / aggregate

# aggregate

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aggregatoren for det ensartede `pantoken` meta-pakke. Den scanner meta-pakkens afhængigheder
for `pantoken` feltet, og genererer derefter barrel (`export * as &lt;key&gt; from "&lt;pkg&gt;"`), en
undergsti-postfil pr. mål, og meta `package.json` `exports` kort — så tilføjelse af en ny målpakke med et
`pantoken` felt auto-registrerer den, uden manuelle barrel-redigeringer.

## Interfaces

- [Target](interfaces/Target.md)
- [AggregateOptions](interfaces/AggregateOptions.md)

## Funktioner

- [discoverTargets](functions/discoverTargets.md)
- [aggregate](functions/aggregate.md)
