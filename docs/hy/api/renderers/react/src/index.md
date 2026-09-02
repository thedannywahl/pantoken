[pantoken](../../../index.md) / react

# react

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/react` — բարակ React օգնականներ `@pantoken/web-components`-ի և թոկեն CSS-ի վրա:

- `&lt;Icon&gt;` պատկերում է `&lt;instui-icon&gt;` custom տարրը (React 19 փոխանցում է props custom տարրերին):
- `useToken` կարդում է լուծված `--instui-*` արժեքը շարակցման ժամանակ (SSR-ապահով՝ վերադարձ ընկուսի արժեքը
  սերվերում):
- `&lt;TokenProvider&gt;` գրանցում է տարրերը և դա այն տեղն է, որտեղ հավելվածը կարող է ներարկել ոճի թերթիկ:

## Ինտերֆեյսներ

- [IconProps](interfaces/IconProps.md)
- [TokenProviderProps](interfaces/TokenProviderProps.md)

## Ֆունկցիաներ

- [readToken](functions/readToken.md)
- [useToken](functions/useToken.md)
- [Icon](functions/Icon.md)
- [TokenProvider](functions/TokenProvider.md)

## Հղումներ

### register

Վերաարտահանում [register](../../angular/src/functions/register.md)

***

### registerLocalized

Վերաարտահանում [registerLocalized](../../svelte/src/functions/registerLocalized.md)
