---
layout: home
hero:
  name: pantoken
  text: Instructure design tokenek, mindenhol
  tagline: Egy feloldott tokenmodell, amelyet stíluslapokká, framework-kötésekké, natív kóddá és designeszköz-payloadokká alakítunk.
  actions:
    - theme: brand
      text: Kezdés
      link: /hu/guide/getting-started
    - theme: alt
      text: A csomagtérkép
      link: /hu/guide/packages
    - theme: alt
      text: API referencia
      link: /hu/api
    - theme: alt
      text: CSS referencia
      link: /hu/api/css
features:
  - title: Egyetlen igaz forrás
    details: Minden csomag ugyanazt a feloldott token IR-t olvassa. Ha egy token változik, ugyanúgy jut el CSS-be, SCSS-be, natív kódba és Figmába.
  - title: A legkisebb csomag választása
    details: Telepíts csak `@pantoken/css` csomagot stíluslaphoz, `@pantoken/react` csomagot hookokhoz és ikonokhoz, vagy bundler presetet Tailwindhez, Pandához és MUI-hoz. Az egységes pantoken csomag mindet újraexportálja.
  - title: Generálás bármely platformra
    details: Futtasd a pantoken generate parancsot, hogy Swift, Kotlin, Compose, Flutter, Rust, WordPress és további kimenetek készüljenek ugyanabból a tokenmodellből.
  - title: Nincs upstream csatolás
    details: A tokenek statikus JSON-ként vannak csomagolva, így az npm i pantoken nem függ GitHub-only forrástól. Kiadható, semver-kompatibilis, offline-barát.
---
