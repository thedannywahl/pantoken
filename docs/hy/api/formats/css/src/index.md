[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/css` — արտանետել Instructure դիզայն տոկենները որպես `@property`-տեսակավորված CSS:

[toCss](functions/toCss.md) մեր ցանկացած տոկեն IR-ն վերածում է CSS-ի; [css](variables/css.md)-ը պատրաստ-պատրաստ `rebrand` ոճային թերթ է և [leanCss](variables/leanCss.md)-ը հաշվարկվածly տարբերակ է, որը կամ հանել է `--instui-icon-*` լրիվ հավաքածուն (գերերք ~1,777 պատկերային տվյալ-URIs որոնք գերակայում են թերթում) CDN/embed մատակարարման համար — մոտավորապես վեցերորդ չափը հեղուկի վրա: Երկուսն էլ կրում են բարձրացում + ուշադրության-ուրվագծի հիմքը (կոմպոզիտային հատուկ հատկություններ որոնց մաքուր կառուցիչներն ապրում են `@pantoken/utils`-ում), այնպես որ բաղադրիչ թերթը լուծում է իր ստվերները և ուշադրության օղակ միայն տոկեն թերթի դեմ: DOM կողային-ազդեցության մուտքը ապրում է `@pantoken/css/inject`-ում; ստատիկ ֆայլերը `@pantoken/css/style.css` և `@pantoken/css/style.lean.css`-ում:

## Ինտերֆեյսներ

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## Փոփոխականներ

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## Ֆունկցիաներ

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## Հղումներ

### default

Վերանվանում և վերա-արտահանում [css](variables/css.md)
