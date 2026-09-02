# Keluaran yang dijana

Beberapa pakej pantoken menjana fail semasa binaan — sebuah helaian gaya, sebuah `theme.json`, sebuah modul token terbenam. Untuk mengekalkan repo kemas dan output jujur, setiap pakej mengikut satu konvensyen dan satu tugas ruang kerja mengesahkan semuanya.

## Konvensyen `generated/`

Setiap pakej yang menghasilkan artifak binaan menulisnya ke direktori `generated/` per-pakej, dan tiada apa-apa lagi tinggal di situ. Satu peraturan dalam `.gitignore` merangkumi semuanya:

```txt
**/generated/
```

Jadi tiada fail yang dijana akan dikomit — binaan menghasilkan semula fail itu. Dua jenis output mendarat di sana:

- **Statik boleh-hantar** — fail yang diimport pengguna, seperti `@pantoken/css`'s `style.css` atau
  `@pantoken/scss`'s `tokens.scss`. Peta `exports` pakej menyimpan kunci awam
  (`"./style.css"`) tetapi menunjuknya ke `generated/`, jadi API pengguna tidak berubah.
- **Perantaraan binaan** — fail yang diimport sumber pakej sendiri dan dibundel ke dalam `dist`, seperti
  JSON vendor dari `@pantoken/tokens`. Ini tidak diterbitkan sendiri; ia dikompilasikan bersama.

## Mengesahkan keluaran

`@pantoken/validate-generated` (alat persendirian) dijalankan selepas binaan dan memeriksa tiga perkara:

1. setiap pakej penjana benar-benar menulis direktori `generated/` yang tidak kosong,
2. CLI `pantoken` mengeluarkan sekurang-kurangnya satu fail untuk setiap sasaran yang disokong, dan
3. tiada helaian gaya yang dijana menyimpang dari IR token — `danglingReferences` untuk helaian berdikari,
   dan `unknownReferences` untuk jambatan yang hanya merujuk token yang ditakrifkan di tempat lain.

## Arahan

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Pemeriksa juga dipautkan ke dalam `pnpm run ready`, jadi penyimpangan dikesan dalam pintu gerbang standard.
