[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# Variabel: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Elementer, hvis shadow-markup gengiver et andet element, så registrering af et kræver også dets afhængigheder
too: `&lt;instui-date-time-input&gt;` gengiver en `&lt;instui-date-input&gt;`, som gengiver en `&lt;instui-calendar&gt;`.
[register](../functions/register.md)'s `only` filter udvides gennem dette (transitivt), så en udvalgt delmængde stadig
fungerer. Nøglede efter basisnavn; værdier er direkte afhængigheder.
