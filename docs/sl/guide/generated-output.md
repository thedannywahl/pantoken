# Generiran izhod

Več paketov pantoken pri gradnji izpusti datoteke — slogovni list, `theme.json`, vgrajen modul z enotami. Da ostane repozitorij čist in izpisi pošteni, vsak paket sledi eni konvenciji in opravilo v delovnem prostoru vse preveri.

## Konvencija `generated/`

Vsak paket, ki ustvari artefakt med gradnjo, ga zapiše v mapo na paket (`generated/`), in tam ni nič drugega. Ena pravila v `.gitignore` jih pokriva vseh:

```txt
**/generated/
```

Torej nobena generirana datoteka ni obvezno vključena v repozitorij — gradnja jo reproducira. Tam pristajata dve vrsti izhodov:

- **Pošiljljivi statični viri** — datoteke, ki jih uporabnik uvozi, kot so `@pantoken/css`'s `style.css` ali
  `@pantoken/scss`'s `tokens.scss`. Mapa `exports` paketa hrani javni ključ
  (`"./style.css"`), a ga kaže na `generated/`, zato API za potrošnika nikoli ne spremeni.
- **Prehodi gradnje** — datoteke, ki jih paket sam uvozi in vključi v `dist`, kot je
  vendoriziran JSON iz `@pantoken/tokens`. Te same po sebi niso objavljene; so skompilirane v paket.

## Preverjanje izhoda

`@pantoken/validate-generated` (zasebno orodje) teče po gradnji in preveri tri stvari:

1. da je vsak generator paket dejansko zapisal ne-prazno mapo `generated/`,
2. da CLI `pantoken` izpiše vsaj eno datoteko za vsak podprt cilj, in
3. da noben generiran slogovni list ne odstopa od IR enot — `danglingReferences` za samostojne
   liste in `unknownReferences` za mostove, ki samo referencirajo enote, definirane drugje.

## Ukazi

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validator je tudi povezan z `pnpm run ready`, zato odstopanja ujame standardni prehod.
