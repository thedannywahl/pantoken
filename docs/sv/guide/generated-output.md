# Genererad utdata

Flera pantoken-paket genererar filer vid byggtid — ett stylesheet, en `theme.json`, en inbäddad token
modul. För att hålla repo rent och utdata ärliga följer varje paket en konvention och
ett workspace-uppgift validerar alltihopa.

## Konventionen `generated/`

Varje paket som producerar ett byggartefakt skriver det till en per-paket `generated/`-katalog, och
inget annat finns där. En regel i `.gitignore` täcker dem alla:

```txt
**/generated/
```

Så ingen genererad fil committas — en build reproducerar den. Två typer av utdata hamnar där:

- **Publicerbara statiska filer** — filer en konsument importerar, såsom `@pantoken/css`'s `style.css` eller
  `@pantoken/scss`'s `tokens.scss`. Paketets `exports`-karta behåller den publika nyckeln
  (`"./style.css"`) men pekar den mot `generated/`, så konsumentens API ändras aldrig.
- **Bygg-intermediärer** — filer paketets egna källkod importerar och bundle:ar in i `dist`, såsom
  `@pantoken/tokens`'s vendoriserade JSON. Dessa publiceras inte själva; de kompileras in.

## Validering av utdata

`@pantoken/validate-generated` (ett privat verktyg) körs efter en build och kontrollerar tre saker:

1. varje generatorpaket faktiskt skrev en icke-tom `generated/`-katalog,
2. `pantoken`-CLI:n emitterar åtminstone en fil för varje stödd målplattform, och
3. ingen genererad stylesheet avviker från token-IR — `danglingReferences` för fristående
   sheets, och `unknownReferences` för bridge:arna som bara refererar tokens definierade någon annanstans.

## Kommandon

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validatorn är också kopplad in i `pnpm run ready`, så drift fångas upp i standard-gaten.
