[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / FULLSCREEN\_BUTTON\_HTML

# Variable: FULLSCREEN\_BUTTON\_HTML

> `const` **FULLSCREEN\_BUTTON\_HTML**: `string`

Un botó "veure a pantalla completa" sobre el qual es pot passar el ratolí, superposat en un marc de demostració/exemple de la mateixa manera que el botó de "copia" del bloc de codi propi de
VitePress es revela en passar-hi el ratolí. Només marques — connecta un gestor de clic delegat a la teva
pàgina amfitriona (`button.closest(...).querySelector("iframe")?.requestFullscreen()`; consulta el tema de la documentació de pantoken
per al cablejat de referència) i estila la revelació en passar-hi el ratolí amb `@pantoken/demo/demo.css`.
