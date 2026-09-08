# Başlarken

Pantoken, [Instructure UI](https://instructure.design) tasarım token'larını ve ikonlarını alır, bunları bir kez çözer ve bu tek modeli birçok platform için paketlere dönüştürür: düz stil sayfaları, SCSS ve Less, React ve Vue ve Svelte, Tailwind ve Panda, yerel Swift ve Kotlin, WordPress ve Drupal, Figma ve daha fazlası.

İşinize en uygun en küçük paketi yüklersiniz. Her şey ayrıca birleşik `pantoken` paketi tarafından yeniden ihraç edilir, bu yüzden oradan başlayıp sonra daraltabilirsiniz.

## Bir başlangıç projesi iskeleti oluşturma

Pantoken'i denemenin en hızlı yolu: zaten yüklü ve yapılandırılmış bir başlangıç projesi iskeleti oluşturmak.

```sh
npx create-pantoken-app
```

Platformlar: `components` (düz HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `--dir <path>` ve programatik kullanım için [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) adresine bakın.

Bir AI kodlama ajanı mı kullanıyorsunuz? Kurulum gerekmez — doğrudan yeteneğe yönlendirin:

```prompt
create.pantoken.app/SKILL.md dosyasını alın ve bu projede pantoken'ı kurmak için içindeki talimatları uygulayın.
```

Eğer pantoken'in ajan kurallarını depoya kalıcı olarak (AGENTS.md, editör kuralları, bu yeteneğin yerel bir kopyası) bağlamak isterseniz, onun yerine `npx @pantoken/ai init` çalıştırın.

## Token modeli

Token'lar `--instui-<group>-<name>` gibi adlandırılmış CSS özel özellikleridir; örneğin `--instui-color-background-brand` veya `--instui-spacing-space-md`. Üç tema bulunur: `rebrand`
(varsayılan, açık ve koyu arasındaki farkların olduğu yerde `light-dark()`), `canvas`, ve `canvasHighContrast`.
İkonlar Lucide'den ve Instructure'ın özel gliflerinden türetilmiş `<image>` token'larıdır (`--instui-icon-<name>`).

## Bir web uygulamasını stillendirme

Stil sayfasını yükleyin ve bir kez içe aktarın. Her `--instui-*` özelliğini tanımlar, böylece bunlara kendi CSS'inizden doğrudan başvurabilirsiniz.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## İkonları her yerde kullanma

Web bileşeni herhangi bir çerçevede çalışır, taşımaya gerek yoktur.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS token'ları

İkonlar CSS özel özellikleridir (`--instui-icon-<name>`). Stil sayfasını bir kez yükleyin ve herhangi bir ikona `mask-image` veya `background-image` olarak başvurun — her ikon için ayrı bir içe aktarma gerekmez.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — tek ikon vs. tüm set

`@pantoken/icons` iki isimlendirilmiş ihraç sunar. Tam dizi üzerinde yineleme yapmadan tek bir ikon çekmek için `iconsByName` kullanın:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Bir seçici oluşturmak gibi tüm sete ihtiyaç duyduğunuzda `icons` kullanın:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Her iki ihraç da modül başlatılmasında tam IR'yi yükler — bu seviyede ikon başına ağaç sarsma (tree-shaking) yoktur. İnce CSS-sadece yükleme için yalnızca ihtiyacınız olan ikonları içeren bir birleştirilmiş URL üretmek üzere [CDN seçicisini](/guide/cdn-picker) kullanın.

## Yerel bir platform için üretme

CLI, hedef depoya token kaynağını yazar. Koşucu dışında bir kurulum gerekmez:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Her hedef için pantoken CLI'ına bakın: [pantoken CLI](/guide/cli).

## VS Code yazarlık ipuçları

`@pantoken/pantoken` artık VS Code özel-veri dosyalarını paketler, böylece tüketici projeler pantoken-özel bir eklenti yüklemeden HTML/CSS'de sınıf ve token tamamlama alabilir.

1. Birleşik paketi yükleyin:

```sh
npm i @pantoken/pantoken
```

1. VS Code'u tüketici çalışma alanınızdan gönderilen custom-data JSON'a yönlendirin:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Yeni verileri uygulamak için VS Code'u yeniden yükleyin (veya "Developer: Reload Window" komutunu çalıştırın).

Bu, `instui-*` sınıf token'ları (ve `-modifier` sınıf token'ları) ile `--instui-*` özel özellikleri için önerileri etkinleştirir.

## Bundan sonra nereye bakmalı

- [Paket haritası](/guide/packages) — görev bazında hangi pakete ulaşılacağı.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tüketici repoya ajan varlıklarını ve kurallarını yükleyin.
- [Mimari](/guide/architecture) — token modeli, çekirdek ve çıktıların nasıl birleştiği.
- [API referansı](/api/) — kaynaktan üretilmiş her ihraç edilen sembol.
