# Output generato

Diversi pacchetti pantoken emettono file al momento della build — un foglio di stile, un `theme.json`, un modulo di token incorporato. Per mantenere il repository pulito e gli output onesti, ogni pacchetto segue una convenzione e un task di workspace valida il tutto.

## La convenzione `generated/`

Ogni pacchetto che produce un artefatto di build lo scrive in una directory per-pacchetto `generated/`, e
null'altro vive lì. Una regola in `.gitignore` le copre tutte:

```txt
**/generated/
```

Quindi nessun file generato viene committato — una build lo riproduce. Due tipi di output finiscono lì:

- **Statici distribuibili** — file che un consumer importa, come il `@pantoken/css` di `style.css` o
  il `@pantoken/scss` di `tokens.scss`. La mappa `exports` del pacchetto conserva la chiave pubblica
  (`"./style.css"`) ma la punta a `generated/`, così l'API del consumer non cambia mai.
- **Intermedi di build** — file che la sorgente del pacchetto importa e bundlea in `dist`, come il JSON vendorizzato di
  `@pantoken/tokens`. Questi non vengono pubblicati da soli; sono compilati al loro interno.

## Validare l'output

`@pantoken/validate-generated` (uno strumento privato) viene eseguito dopo una build e verifica tre cose:

1. ogni pacchetto generatore ha effettivamente scritto una directory `generated/` non vuota,
2. la CLI `pantoken` emette almeno un file per ogni target supportato, e
3. nessun foglio di stile generato deriva dall'IR dei token — `danglingReferences` per fogli auto-contenuti,
   e `unknownReferences` per i bridge che fanno solo riferimento a token definiti altrove.

## Comandi

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Il validator è anche collegato a `pnpm run ready`, quindi la deriva viene catturata nel gate standard.
