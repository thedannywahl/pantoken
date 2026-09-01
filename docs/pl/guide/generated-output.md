# Wygenerowany output

Kilka pakietów pantoken emituje pliki podczas budowania — arkusz stylów, `theme.json`, osadzony moduł tokenów. Aby repozytorium pozostało czyste, a outputy uczciwe, każdy pakiet stosuje jedną konwencję, a zadanie workspace weryfikuje całość.

## Konwencja `generated/`

Każdy pakiet, który produkuje artefakt builda, zapisuje go w katalogu per-pakiet `generated/`, i nic innego tam nie istnieje. Jedna reguła w `.gitignore` obejmuje je wszystkie:

```txt
**/generated/
```

Zatem żaden wygenerowany plik nie jest zatwierdzany — build go reprodukuje. Dwa rodzaje outputu trafiają tam:

- **Pliki statyczne do wysyłki** — pliki, które konsument importuje, takie jak `@pantoken/css`'s `style.css` lub
  `@pantoken/scss`'s `tokens.scss`. Mapa `exports` pakietu przechowuje publiczny klucz
  (`"./style.css"`), ale wskazuje go na `generated/`, więc API konsumenta nigdy się nie zmienia.
- **Pośrednie pliki budowania** — pliki, które źródło pakietu samo importuje i pakuje do `dist`, takie jak
  vendorowany JSON `@pantoken/tokens`. Nie są one publikowane samodzielnie; są kompilowane w trakcie builda.

## Walidacja outputu

`@pantoken/validate-generated` (narzędzie prywatne) uruchamia się po buildzie i sprawdza trzy rzeczy:

1. każdy pakiet generatora faktycznie zapisał niepusty katalog `generated/`,
2. CLI `pantoken` emituje co najmniej jeden plik dla każdego obsługiwanego targetu, oraz
3. żaden wygenerowany arkusz styli nie odbiega od IR tokenów — `danglingReferences` dla samodzielnych
   arkuszy, oraz `unknownReferences` dla mostków, które jedynie odwołują się do tokenów zdefiniowanych gdzie indziej.

## Polecenia

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Weryfikator jest także podłączony do `pnpm run ready`, więc drift jest wykrywany w standardowym gate.
