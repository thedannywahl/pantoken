[pantoken](../../../index.md) / vite

# vite

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/vite` — et Vite plugin til pantoken.

Det eksponerer to virtuelle moduler, så apps kan konsumere tokens uden at importere de store pakker direkte, og kan automatisk injicere stylesheettet ind i HTML-indgangen:

- `virtual:pantoken/css` — stylesheet-strengen (default export).
- `virtual:pantoken/tokens` — det løste token IR (`tokens` navngivet + default export).

## Interfaces

- [PantokenViteOptions](interfaces/PantokenViteOptions.md)

## Funktioner

- [pantoken](functions/pantoken.md)

## Referencer

### default

Omdøber og re-eksporterer [pantoken](functions/pantoken.md)
