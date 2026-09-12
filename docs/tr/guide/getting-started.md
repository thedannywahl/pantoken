# Başlarken

Pantoken, [Instructure UI](https://instructure.design) tasarım token'larını ve simgelerini alır, bunları bir kez çözer ve bu tek modeli birçok platform için paketlere yeniden şekillendirir: düz stiller, SCSS ve Less, React ve Vue ve Svelte, Tailwind ve Panda, native Swift ve Kotlin, WordPress ve Drupal, Figma ve daha fazlası.

İhtiyacınıza uygun en küçük paketi yükleyin. Her şey ayrıca birleşik `pantoken` paketi tarafından yeniden dışa aktarılır, bu yüzden oradan başlayıp daha sonra daraltabilirsiniz.

## Başlangıç projesi oluşturma

Pantoken'i denemenin en hızlı yolu: zaten yüklü ve bağlanmış bir başlangıç projesi oluşturmak.

```sh
npx create-pantoken-app
```

Platformlar: `components` (düz HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `@pantoken/scaffold` için [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) adresine bakın ve programatik kullanım için `--dir <path>`.

Bir AI kodlama ajanı mı kullanılıyor? Kurulum gerekmez — doğrudan skill'e yönlendirin:

```prompt
create.pantoken.app/SKILL.md dosyasını al ve bu projede pantoken'i kurmak için içindekileri takip et.
```

Eğer pantoken'in ajan kurallarını depo içine kalıcı olarak bağlamak isterseniz (AGENTS.md, editör kuralları, bu skill'in yerel bir kopyası), onun yerine `npx @pantoken/ai init` çalıştırın.

## Token modeli

Token'lar `--instui-<group>-<name>` olarak adlandırılan CSS özel özellikleridir; örneğin `--instui-color-background-brand` veya `--instui-spacing-space-md`. Üç tema gönderilir: varsayılan olan `rebrand` (`light-dark()` ile açık ve koyu farklılıkları yer alır), `canvas` ve `canvasHighContrast`. Simgeler, Lucide'den ve Instructure'ın özel gliflerinden türetilen `<image>` token'larıdır (`--instui-icon-<name>`).

## Bir web uygulamasını stilize etme

Stil sayfasını yükleyin ve bir kere içe aktarın. Her `--instui-*` özelliğini tanımlar, böylece bunlara kendi CSS'inizden doğrudan başvurabilirsiniz.

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

## Simgeleri her yerde kullanma

Web bileşeni herhangi bir framework'te çalışır, portlama gerektirmez.

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

Simgeler CSS özel özellikleri (`--instui-icon-<name>`) olarak gelir. Stil sayfasını bir kez yükleyin ve herhangi bir simgeye `mask-image` veya `background-image` olarak başvurun — her simge için ayrı bir import gerekmez.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — tek simge vs. tüm set

`@pantoken/icons` iki isimlendirilmiş dışa aktarma sunar. Tam dizi üzerinde dolaşmadan tek bir simge çekmek için `iconsByName` kullanın:

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

Her iki dışa aktarma da modül başlatılmasında tam IR'yi yükler — bu seviyede simge başına tree-shaking yoktur. İnce, yalnızca CSS yüklemesi için yalnızca ihtiyacınız olan simgeleri içeren bir birleşik URL üretmek üzere [CDN seçicisini](/guide/cdn-picker) kullanın.

## Native platform için üretim

CLI, token kaynağını hedef bir depoya yazar. Çalıştırıcı dışında kurulum gerekmez:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Her hedef için [pantoken CLI](/guide/cli)'ye bakın.

## VS Code yazım ipuçları

`@pantoken/pantoken` artık VS Code özel-veri dosyalarını gönderir, böylece tüketici projeler pantoken'e özgü bir eklenti yüklemeden HTML/CSS içinde sınıf ve token tamamlama alabilir.

1. Birleşik paketi yükleyin:

```sh
npm i @pantoken/pantoken
```

1. Tüketici çalışma alanınızdan gönderilen custom-data JSON'a VS Code'u yönlendirin:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Yeni veriyi uygulamak için VS Code'u yeniden yükleyin (veya "Developer: Reload Window" komutunu çalıştırın).

Bu, `instui-*` sınıf token'ları (ve `-modifier` sınıf token'ları) ile `--instui-*` özel özellikleri için önerileri etkinleştirir.

## Sonraki adımlar

- [Paket haritası](/api/) — göreve göre hangi paketin kullanılacağı.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tüketici depoda ajan varlıklarını ve kurallarını yükleyin.
- [Mimari](/guide/architecture) — token modeli, çekirdek ve çıktıların nasıl uyum sağladığı.
- [API referansı](/api/) — kaynak koddan üretilen her dışa aktarılan simge.
