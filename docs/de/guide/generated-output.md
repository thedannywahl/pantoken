# Generierte Ausgabe

Mehrere pantoken-Pakete erzeugen Dateien zur Build-Zeit — ein Stylesheet, ein `theme.json`, ein eingebettetes Token-Modul. Um das Repository sauber und die Ausgaben verlässlich zu halten, folgt jedes Paket einer Konvention und eine Workspace-Task validiert das Ganze.

## Die `generated/` Konvention

Jedes Paket, das ein Build-Artefakt produziert, schreibt dieses in ein pro-Paket `generated/` Verzeichnis, und sonst lebt dort nichts. Eine Regel in `.gitignore` deckt sie alle ab:

```txt
**/generated/
```

Also wird keine generierte Datei committet — ein Build reproduziert sie. Zwei Arten von Ausgaben landen dort:

- **Veröffentlichbare Statics** — Dateien, die ein Consumer importiert, wie `@pantoken/css`'s `style.css` oder
  `@pantoken/scss`'s `tokens.scss`. Die `exports` Map des Pakets behält den öffentlichen Schlüssel
  (`"./style.css"`), zeigt aber auf `generated/`, sodass die Consumer-API sich nie ändert.
- **Build-Intermediates** — Dateien, die der Quellcode des Pakets selbst importiert und in `dist` bündelt, wie
  das vendorisierte JSON von `@pantoken/tokens`. Diese werden nicht einzeln veröffentlicht; sie werden kompiliert.

## Überprüfung der Ausgabe

`@pantoken/validate-generated` (ein privates Tool) läuft nach einem Build und prüft drei Dinge:

1. jedes Generator-Paket hat tatsächlich ein nicht-leeres `generated/` Verzeichnis geschrieben,
2. die `pantoken` CLI erzeugt für jedes unterstützte Ziel mindestens eine Datei, und
3. kein generiertes Stylesheet driftet vom Token-IR ab — `danglingReferences` für eigenständige
   Sheets, und `unknownReferences` für die Bridges, die nur auf anderswo definierte Tokens verweisen.

## Befehle

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Der Validator ist auch in `pnpm run ready` eingebunden, sodass Drift im standardmäßigen Gate erkannt wird.
