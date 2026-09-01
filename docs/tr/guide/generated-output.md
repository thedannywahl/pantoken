# Oluşturulan çıktı

Birden fazla pantoken paketi derleme zamanında dosyalar üretir — bir stil sayfası, bir `theme.json`, gömülü bir token
modülü. Depoyu temiz tutmak ve çıktıların dürüstlüğünü sağlamak için her paket tek bir sözleşmeyi takip eder ve
bir workspace görevi bunların tamamını doğrular.

## `generated/` kuralı

Bir yapı artefakti üreten her paket bunu paket-başına `generated/` dizinine yazar ve
orada başka hiçbir şey yaşamaz. `.gitignore` içindeki tek bir kural hepsini kapsar:

```txt
**/generated/
```

Böylece hiçbir üretilmiş dosya commit edilmez — bir derleme bunu yeniden üretir. Oraya iki tür çıktı düşer:

- **Gönderilebilir statikler** — bir tüketicinin import ettiği dosyalar, örneğin `@pantoken/css`'ün `style.css`'i veya
  `@pantoken/scss`'nın `tokens.scss`'si. Paketin `exports` haritası genel anahtarı
  (`"./style.css"`) tutar ama onu `generated/`'a işaret eder, böylece tüketici API'si asla değişmez.
- **Derleme ara dosyaları** — paketin kendi kaynağının import edip `dist`'e bundle ettiği dosyalar, örneğin
  `@pantoken/tokens`'nin vendor edilmiş JSON'u. Bunlar tek başına yayınlanmaz; derlemeye dahil edilir.

## Çıktıyı doğrulama

`@pantoken/validate-generated` (özel bir araç) derlemeden sonra çalışır ve üç şeyi kontrol eder:

1. her jeneratör paketinin aslında boş olmayan bir `generated/` dizini yazdığı,
2. `pantoken` CLI'sının her desteklenen hedef için en az bir dosya ürettiği, ve
3. hiçbir üretilmiş stil sayfasının token IR'den sapmadığı — kendi içinde bütünleşik sayfalar için `danglingReferences` ve
   token'ları başka yerlerde tanımlanan köprüler için `unknownReferences`.

## Komutlar

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Doğrulayıcı ayrıca `pnpm run ready` ile bağlanmıştır, böylece sapma standart gate'te yakalanır.
