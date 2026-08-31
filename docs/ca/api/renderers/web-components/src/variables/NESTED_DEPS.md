[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# Variable: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Els elements el markup de shadow dels quals renderitza un altre element, de manera que registrar-ne un requereix que se'n registrin també les dependències: `&lt;instui-date-time-input&gt;` renderitza un `&lt;instui-date-input&gt;`, que renderitza un `&lt;instui-calendar&gt;`. El filtre `only` de [register](../functions/register.md) s'expandeix mitjançant això (de manera transitiva) perquè un subconjunt seleccionat manualment segueixi funcionant. Indexat per nom base; els valors són dependències directes.
