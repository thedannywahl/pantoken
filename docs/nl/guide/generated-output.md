# Gegenereerde uitvoer

Meerdere pantoken-pakketten genereren bestanden tijdens build — een stylesheet, een `theme.json`, een ingesloten token
module. Om de repo schoon te houden en de output eerlijk, volgt elk pakket één conventie en een
workspace-task valideert alles.

## De `generated/` conventie

Elk pakket dat een build-artifact produceert schrijft het naar een per-pakket `generated/` directory, en
er leeft verder niets anders daar. Eén regel in `.gitignore` dekt ze allemaal:

```txt
**/generated/
```

Dus wordt geen gegenereerd bestand gecommit — een build reproduceert het. Twee soorten output belanden daar:

- **Shippable statics** — bestanden die een afnemer importeert, zoals `@pantoken/css`'s `style.css` of
  `@pantoken/scss`'s `tokens.scss`. De `exports` map van het pakket bewaart de publieke sleutel
  (`"./style.css"`) maar wijst die naar `generated/`, zodat de consumer-API nooit verandert.
- **Build-intermediates** — bestanden die de eigen bron van het pakket importeert en bundelt in `dist`, zoals
  de gebundelde JSON van `@pantoken/tokens`. Deze worden niet afzonderlijk gepubliceerd; ze worden gecompileerd.

## Valideren van de output

`@pantoken/validate-generated` (een privé-tool) draait na een build en controleert drie dingen:

1. elk generator-pakket schreef daadwerkelijk een niet-lege `generated/` directory,
2. de `pantoken` CLI produceert ten minste één bestand voor elk ondersteund target, en
3. geen gegenereerde stylesheet wijkt af van de token-IR — `danglingReferences` voor zelf-omhullende
   sheets, en `unknownReferences` voor de bruggen die alleen naar elders gedefinieerde tokens verwijzen.

## Commando's

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

De validator is ook aangesloten op `pnpm run ready`, zodat drift in de standaard gate wordt opgevangen.
