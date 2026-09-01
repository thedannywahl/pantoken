# Generoitavat tulosteet

Useat pantoken-paketit tuottavat tiedostoja build-aikana — tyylitaulukon, `theme.json`n, upotetun token‑moduulin. Pidettäessä repositorio siistinä ja tuotokset rehellisinä, jokainen paketti noudattaa yhtä konventiota ja workspace-tehtävä validoi kokonaisuuden.

## `generated/` -konventio

Jokainen paketti, joka tuottaa build-artifaktin, kirjoittaa sen per-paketin `generated/` -hakemistoon, eikä siellä asu mitään muuta. Yksi sääntö `.gitignore` -tiedostossa kattaa ne kaikki:

```txt
**/generated/
```

Siispä yhtään generoitu tiedostoa ei sitoudu — build toistaa sen. Kaksi tyyppiä tuloksia päätyy sinne:

- **Julkaistavat staattiset tiedostot** — tiedostot, joita kuluttaja tuo, kuten `@pantoken/css`'n `style.css` tai
  `@pantoken/scss`'n `tokens.scss`. Paketin `exports` -kartta säilyttää julkisen avaimen
  (`"./style.css"`) mutta osoittaa sen `generated/`:iin, joten kuluttajan API ei koskaan muutu.
- **Build-välituotteet** — tiedostot, joita paketin oma lähdekoodi tuo ja jolla kootaan `dist`, kuten
  `@pantoken/tokens`'n vendoroitu JSON. Näitä ei julkaista erikseen; ne käännetään mukaan.

## Tulosten validointi

`@pantoken/validate-generated` (yksityinen työkalu) suoritetaan buildin jälkeen ja tarkistaa kolme asiaa:

1. jokainen generaattoripaketti todella kirjoitti ei-tyhjän `generated/` -hakemiston,
2. `pantoken` CLI tuottaa vähintään yhden tiedoston jokaista tuettua kohdetta varten, ja
3. mikään generoitu tyylitaulukko ei poikkea token‑IR:stä — `danglingReferences` itsenäisille
   taulukoille, ja `unknownReferences` silloille, jotka vain viittaavat muualla määriteltyihin tokeneihin.

## Komennot

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validoija on myös kytketty `pnpm run ready`:iin, joten poikkeamat havaitaan tavanomaisessa portissa.
