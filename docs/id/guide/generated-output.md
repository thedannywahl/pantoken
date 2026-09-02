# Output yang dihasilkan

Beberapa paket pantoken menerbitkan berkas saat build — sebuah stylesheet, sebuah `theme.json`, sebuah modul token tertanam. Untuk menjaga repositori tetap bersih dan output tetap jujur, setiap paket mengikuti satu konvensi dan sebuah tugas workspace memvalidasi semuanya.

## Konvensi `generated/`

Setiap paket yang menghasilkan artefak build menulisnya ke direktori per-paket `generated/`, dan tidak ada yang lain tinggal di sana. Satu aturan di `.gitignore` mencakup semuanya:

```txt
**/generated/
```

Jadi tidak ada berkas yang dihasilkan yang dikomit — sebuah build mereproduksinya. Dua jenis output mendarat di sana:

- **Statik yang dapat dikirim** — berkas yang diimpor konsumen, seperti `@pantoken/css`'s `style.css` atau
  `@pantoken/scss`'s `tokens.scss`. Peta `exports` paket menyimpan kunci publik
  (`"./style.css"`) tetapi menunjuknya ke `generated/`, sehingga API konsumen tidak pernah berubah.
- **Intermediat build** — berkas yang diimpor oleh sumber paket itu sendiri dan dibundel ke dalam `dist`, seperti
  JSON vendored milik `@pantoken/tokens`. Ini tidak diterbitkan sendiri; mereka dikompilasi di dalamnya.

## Memvalidasi output

`@pantoken/validate-generated` (sebuah alat privat) berjalan setelah sebuah build dan memeriksa tiga hal:

1. setiap paket generator benar-benar menulis sebuah direktori `generated/` yang tidak kosong,
2. CLI `pantoken` menerbitkan setidaknya satu berkas untuk setiap target yang didukung, dan
3. tidak ada stylesheet yang dihasilkan yang menyimpang dari IR token — `danglingReferences` untuk lembar yang berdiri sendiri,
   dan `unknownReferences` untuk jembatan yang hanya mereferensi token yang didefinisikan di tempat lain.

## Perintah

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validator juga terhubung ke `pnpm run ready`, sehingga drift tertangkap dalam gate standar.
