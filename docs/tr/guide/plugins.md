# Eklentiler

Bir pantoken eklentisi, bir paketi çatallamadan token veya CSS çıktısını genişletir. Bir eklenti, `definePlugin` ile `@pantoken/plugin-kit`'den oluşturulur ve sonra `buildTokens` veya `toCss`'e geçirilir.

## Bir eklenti yazma

Uyguladığınız kancaları `definePlugin`'e verin. Bu, bu kancalardan türetilen yeteneklerle markalanmış normal bir eklenti döndürür. Bir eklenti IR'i (`tokens`, `icons`), CSS çıktısını (`css`) veya her ikisini genişletebilir.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Yetenek farkında kayıt

`buildTokens` ve `toCss`, ilettiğiniz eklentiler üzerinde `checkPlugins`'u çalıştırır. Bir eklentinin kayıtlı olduğu aşama için eşleşen bir kancası olmadığında uyarır — asla hata fırlatmaz — bu nedenle token-sadece bir eklenti `toCss`'e geçirilirse, sessizce hiçbir şey yapmaktansa bir not ile atlanır.

## Eklentileri birleştirme

Başka bir eklentinin üzerine `extendPlugin` ile inşa edin veya eş düzeyleri `mergePlugin` ile birleştirin:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Aynı aşamaya ait kancalar birleşir: `tokens` önce temel olanı sonra eklentiyi çalıştırır, `css` iki katkıyı birleştirir ve `icons` her ikisini çalıştırır.

## Eklentinizin çıktısını doğrulayın

Bir yazım hatası veya yeniden adlandırılmış bir token'ın hızlı ve yerel olarak başarısız olması için testinizde eklentinizin kendi çıktısı üzerinde `@pantoken/utils`'den paylaşılan drift kontrollerini çalıştırın:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Paketlenmiş eklentiler

- `@pantoken/plugin-simple-icons` — simple-icons'dan marka ikonları, ikon tokenları olarak kayıtlı.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonları, `--instui-icon-*` image tokenları olarak kayıtlı.
- `@pantoken/plugin-logos` — Instructure ürün logoları SVG, data URI ve `--instui-logo-*` image tokenları olarak.
- `@pantoken/plugin-prune-custom-props` — kullanılmayan özel özellikleri bir stil sayfasından kaldıran bir PostCSS eklentisi (pantoken eklentisi değildir).

Lucide Lab kayıt defteri tembel yüklenebilir, sonra eşzamanlı token kancasına geçirilebilir:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Eskiden eklenti olarak dağıtılan ama şimdi `@pantoken/components` içinde gelen birkaç şey var, çünkü pek çok bileşen bunlara kutudan çıktığı gibi ihtiyaç duyuyor: elevation gölgeleri (`--instui-elevation-*`, `components.css` içinde), odak-çerçeve (focus-outline) yüzüğü (pantoken sayfaya sahip olduğunda her odaklanabilir öğe bunu alır — `base.css` içinde), ve Instructure marka yazı tipleri (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` uygular; isteğe bağlı `@pantoken/components/fonts.css` `@font-face` woff2 dosyalarını yükler).

Her eklentinin ihracı için [API referansına](/api/) bakın.
