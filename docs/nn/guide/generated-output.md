# Generert utdata

Fleire pantoken-pakkar genererer filer under bygging — eit stilark, ein `theme.json`, ein innebygd token-modul. For å halde repoet reint og utdata ærlege, følgjer kvar pakke éin konvensjon og ei arbeidsoppgåve i arbeidsområdet validerer alt.

## Konvensjonen `generated/`

Kvar pakke som produserer eit byggeartefakt skriv det til ei per-pakke `generated/`-mappe, og ingenting anna bur der. Éi regel i `.gitignore` dekkjer dei alle:

```txt
**/generated/
```

Så ingen generert fil blir sjekka inn — eit bygg reproduserer han. To typar utdata hamnar der:

- **Distribuerbare statiske filer** — filer ein konsument importerer, som `@pantoken/css` sin `style.css` eller `@pantoken/scss` sin `tokens.scss`. Pakka si `exports`-mappe held den offentlege nøkkelen (`"./style.css"`) men peikar ho på `generated/`, så konsument-API-et endrar seg aldri.
- **Byggemellomprodukt** — filer pakka si eiga kjelde importerer og bundlar inn i `dist`, slik som `@pantoken/tokens` sin vendored JSON. Desse blir ikkje publiserte for seg sjølve; dei blir kompilerte inn.

## Validering av utdata

`@pantoken/validate-generated` (eit privat verktøy) køyrer etter eit bygg og sjekkar tre ting:

1. at kvar generatorpakke faktisk skreiv ei ikkje-tom `generated/`-mappe,
2. at `pantoken`-CLI-en emitterer minst ein fil for kvart støtta mål, og
3. at ingen genererte stilark avvik frå token-IR — `danglingReferences` for sjølvstendige ark, og `unknownReferences` for broar som berre refererer token definerte andre stader.

## Kommandoar

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validatoren er òg kopla inn i `pnpm run ready`, så avvik blir oppdaga i standardporten.
