# Başlarken

pantoken, Instructure UI'nin tasarım token'larını ve simgelerini alır, bunları bir kez çözer ve o tek modeli birçok platform için paketlere yeniden şekillendirir: sade stil sayfaları, SCSS ve Less, React ve Vue ve Svelte, Tailwind ve Panda, native Swift ve Kotlin, WordPress ve Drupal, Figma ve daha fazlası.

İhtiyacınıza en uygun en küçük paketi yükleyin. Her şey ayrıca birleşik `pantoken` paketi tarafından yeniden ihraç edildiğinden, oradan başlayıp daha sonra daraltabilirsiniz.

## Başlangıç projesi iskeleti oluşturma

pantoken'i denemenin en hızlı yolu: içinde zaten kurulu ve bağlı halde bir başlangıç projesi iskeleti oluşturmak.

```sh
npx create-pantoken-app react
```

Platformlar: `components` (sade HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. `@pantoken/scaffold` için [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) adresine bakın — `--dir <path>` ve programatik kullanım için.

Bir AI kodlama ajanı mı kullanılıyor? Kurulum gerekmez — yeteneği doğrudan gösterin:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI ve Amazon Q Developer CLI için de aynı şekilde çalışır — `claude` yerine sırasıyla `gemini`, `agent`, `codex`, `copilot -p` veya `q chat` koyun. Eğer pantoken'in ajan kurallarını depoya kalıcı olarak (AGENTS.md, editör kuralları, bu yeteneğin yerel bir kopyası) bağlamak isterseniz, bunun yerine `npx @pantoken/ai init` çalıştırın.

## Token modeli

Token'lar `--instui-<group>-<name>` adlı CSS özel değişkenleridir; örneğin `--instui-color-background-brand` veya `--instui-spacing-space-md`. Üç tema paketlenir: `rebrand` (varsayılan, açık ve koyu arasında farklılık olan yerlerde `light-dark()`), `canvas` ve `canvasHighContrast`. Simgeler, Lucide'den ve Instructure'ın özel gliflerinden türetilen `<image>` token'larıdır (`--instui-icon-<name>`).

## Bir web uygulamasını stilize etme

Stil sayfasını yükleyin ve bir kez içe aktarın. Her `--instui-*` özelliğini tanımlar, böylece bunlara kendi CSS'inizden doğrudan referans verebilirsiniz.

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

Simgeler CSS özel değişkenleridir (`--instui-icon-<name>`). Stil sayfasını bir kez yükleyin ve herhangi bir simgeyi `mask-image` veya `background-image` olarak referans verin — simge başına ayrı bir import gerekmez.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — tek simge vs tüm set

`@pantoken/icons` iki isimli ihracat sunar. Tüm diziyi dolaştırmadan tek bir simge çekmek için `iconsByName` kullanın:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Bir seçim aracı oluşturmak gibi tüm sete ihtiyaç duyduğunuzda `icons` kullanın:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Her iki ihracat da modül başlangıcında tam IR'yi yükler — bu seviyede simge başına tree-shaking yoktur. Sadece gerekli simgeler için daha ince CSS-yalnız yükleme istiyorsanız, yalnızca ihtiyacınız olan simgeler için birleşik bir URL oluşturmak üzere [CDN picker](/guide/cdn-picker) kullanın.

## Native bir platform için üretme

CLI, token kaynaklarını hedef depoya yazar. Runner dışında ek bir kurulum gerekmez:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Her hedef için [pantoken CLI](/guide/cli) bölümüne bakın.

## VS Code yazarlık ipuçları

`@pantoken/pantoken` artık downstream projelerin pantoken-spesifik bir uzantı yüklemeden HTML/CSS'de sınıf ve token tamamlaması alabilmesi için VS Code özel-veri dosyaları gönderir.

1. Birleşik paketi yükleyin:

```sh
npm i @pantoken/pantoken
```

1. Tüketici çalışma alanınızdan gönderilen custom-data JSON'a VS Code'un işaret etmesini sağlayın:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Yeni veriyi uygulamak için VS Code'u yeniden yükleyin (veya "Developer: Reload Window" çalıştırın).

Bu, `instui-*` sınıf token'ları (ve `-modifier` sınıf token'ları) artı `--instui-*` özel değişkenleri için önerileri etkinleştirir.

## Sonraki adımlar

- [Paket haritası](/guide/packages) — göreve göre hangi pakete ulaşılacağı.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — tüketici depoda ajan varlıklarını ve kuralları yükleyin.
- [Mimari](/guide/architecture) — token modeli, çekirdek ve çıktılar nasıl bir araya geliyor.
- [API referansı](/api/) — kaynaklardan üretilen her ihracat edilmiş sembol.
