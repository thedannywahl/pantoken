# CDN és terjesztés

A pantoken minden csomagot közzétesz az npm-en, így közvetlenül egy CDN-ből lekérheti a tokeneket, komponenseket és webes komponenseket – nincs szükség fordítási lépésre vagy csomagolóra. Ez az oldal a CSS kombinált URL-t (interaktív szerkesztővel) és a webes komponensek csatlakozásait ismerteti.

## A token alapja

Minden pantoken komponens `--instui-*` egyéni tulajdonságokat olvas az oldalon lévő tokenlapból. Két variáns érkezik:

- `@pantoken/css/style.lean.css` — az ajánlott CDN alapja. Minden tokent tartalmaz a teljes ikontárgykészlet kivételével, így körülbelül 23 KB tömörítve.
- `@pantoken/css/style.css` — a teljes lap, amely az összes ~1 777 ikonglif tokent tartalmazza (`--instui-icon-*`). Körülbelül 140 KB tömörítve. Töltse be ezt, ha széles körűen hivatkozik az ikonokra az `var(--instui-icon-*)` segítségével.

Az emelkedési skála és a fókuszgyűrű változók mindkét lapon megmaradnak, így az árnyékok és a fókuszgyűrű csak az alappal működik.

## Válassza ki komponenseit

A jsDelivr kombinált végpontja lehívja a token alapját, valamint csak azokat a komponensmodelleket, amelyekre szüksége van, egyetlen kérésben. Jelölje be a kívánt komponenseket, és az szerkesztő kiírja az URL-t:

<CdnPicker />

Minden komponensfájl kicsi – legtöbb körülbelül 2 KB. Az ikonokat megjelenítő komponens (`alert`, `checkbox` és néhány másik) szüksége van ezekre a glifekre, így az szerkesztő hozzáadja az `@pantoken/components/component-icons.css` (körülbelül 0,5 KB tömörítve — az 11 ikonok, amelyeket a komponenskészlet használ) amikor kiválasztja a karcsú lapot. A teljes lap már tartalmazza azokat.

### Betöltési sorrend és betűtípusok

Először töltse be a token alapját, majd az opcionális alaphelyzetbe állítást, majd a komponensfájlokat. A fenti kombinált URL már rendezte őket az Ön számára. A betűtípusok az egyetlen kivétel: az `@pantoken/components/fonts.css` relatív elérési út szerint mutat a betűtípusfájlokra, így a kombinálás nem tudja őket felülírni — töltse be saját `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/fonts.css" />
```

### Minden egyszerre

Jelölje be az **All components** (Összes komponens) lehetőséget az választóban, hogy átváltson a hordóra, vagy mutasson rá maga (körülbelül 141 KB tömörítve) a tokenlappal együtt:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/style.css,npm/@pantoken/components/components.css"
/>
```

## Webes komponensek

Az `@pantoken/web-components` keretrendszer-agnosztikus `<instui-*>` egyéni elemeket regisztrál. Beépítik saját CSS-üket, de továbbra is tokeneket olvasnak az oldalon lévő lapból, így töltsön be egy token alapot is.

### ES modulok (ajánlott)

Egy ESM CDN feloldja a csomag függőségeit az Ön számára. Ez regisztrál minden elemet:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Használja a teljes tokenlapot (vagy a karcsú lapot plus `component-icons.css`) így az ikonmegjelenítő elemek, mint az `<instui-alert>` feloldják a glifeket.

Csak néhány elem regisztrálásához – és azok beágyazott függőségeit – importálja az `register` és adja át az `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Egy klasszikus parancsfájl-címke

Modulok nélküli csatlakozáshoz töltse be az IIFE buildet. Becsomagolja függőségeit és automatikusan regisztrál minden elemet a betöltéskor, kitéve egy `PantokenWebComponents` globális:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ez nagyobb, mint az ESM útvonal — beágyazza az `@pantoken/components` és `@pantoken/icons` — így csak akkor használja, ha nem tudja modulok használni.

## Verziók rögzítése

A fenti URL-ek – és amelyeket az választó ír – nyomon követik a legújabb kiadást. Rögzítse a fő (vagy pontos) verziót a gyártáshoz – például `@pantoken/css@0` – így egy frissítés soha nem lepne meg.

## Mi nincs itt

Nincs `?components=button,badge` lekérdezési paraméter: egyetlen nyilvános CDN sem állít össze egy csomagot a lekérdezési paraméterekből. A kombinált URL a legközelebbi egyenértékű, és az választó kiírja az Ön számára.
