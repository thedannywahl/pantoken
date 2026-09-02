[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / FULLSCREEN\_BUTTON\_HTML

# Variabel: FULLSCREEN\_BUTTON\_HTML

> `const` **FULLSCREEN\_BUTTON\_HTML**: `string`

En svævende "se fuld skærm" knap, overlejret på en demo/eksempel-ramme på samme måde som VitePress's egen
code-blok "kopier" knap åbenbares ved hover. Rent markup — forbind en delegeret klik-handler på din
vertside (`button.closest(...).querySelector("iframe")?.requestFullscreen()`; se pantoken docs
tema for den reference-forbindelse) og stil reveal-on-hover med `@pantoken/demo/demo.css`.
