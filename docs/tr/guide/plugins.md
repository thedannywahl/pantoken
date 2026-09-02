# Eklentiler

Bir pantoken eklentisi, bir paketi çatallamadan token veya CSS çıktısını genişletir. Bir tane `definePlugin` ile `@pantoken/plugin-kit`'den oluşturur, sonra onu `buildTokens` veya `toCss`'e geçirirsiniz.

## Bir eklenti yazın

Uyguladığınız hook'ları `definePlugin`'e verin. O, bu hook'lardan çıkarılan yeteneklerle markalanmış normal bir eklenti döner. Bir eklenti IR'yi (`tokens`, `icons`), CSS çıktısını (`css`) veya her ikisini genişletebilir.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Yetenek-bilinçli kayıt

`buildTokens` ve `toCss`, geçirdiğiniz eklentiler üzerinde `checkPlugins` çalıştırır. Bir eklentinin kayıtlı olduğu aşama için eşleşen bir hook'u yoksa uyarır — asla hata fırlatmaz — bu yüzden token-only bir eklenti `toCss`'e geçirildiğinde, sessizce hiçbir şey yapmaktansa bir notla atlanır.

## Eklentileri birleştirin

Başka bir eklentinin üzerine `extendPlugin` ile inşa edin veya eşleri `mergePlugin` ile birleştirin:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Aynı aşama hook'ları bileşiklenir: `tokens` önce temelini sonra ekleyeni çalıştırır, `css` iki katkıyı birleştirir ve `icons` her ikisini çalıştırır.

## Eklentinizin çıktısını doğrulayın

Bir yazım hatası veya yeniden adlandırılmış bir token'ın hızlı ve yerelde hata vermesi için, eklentinizin kendi çıktısı üzerinde testte paylaşılmış drift kontrollerini `@pantoken/utils` üzerinden çalıştırın:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Paketlenmiş eklentiler

- `@pantoken/plugin-simple-icons` — simple-icons'dan marka simgeleri, icon token'ları olarak kayıtlı.
- `@pantoken/plugin-logos` — Instructure ürün logoları SVG, data URI ve `--instui-logo-*` image token'ları olarak.
- `@pantoken/plugin-prune-custom-props` — kullanılmayan özel özellikleri bir stil sayfasından kaldıran bir PostCSS eklentisi (pantoken eklentisi değildir).

Eskiden eklenti olan birkaç şey artık `@pantoken/components` içinde dağıtılıyor, çünkü birçok bileşenin bunlara kutudan çıktığı gibi ihtiyacı var: elevation gölgeleri (`--instui-elevation-*`, `components.css` içinde), focus-outline yüzüğü ( `base.css` içinde — pantoken sayfaya sahip olduğunda her focusable buna sahip olur) ve Instructure marka fontları (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` uygular; opt-in olan `@pantoken/components/fonts.css` `@font-face` woff2'leri yükler).

Her eklentinin dışa aktarımları için [API referansına](/api/) bakın.
