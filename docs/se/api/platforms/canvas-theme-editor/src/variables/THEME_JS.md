[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / THEME\_JS

# Variable: THEME\_JS

> `const` **THEME\_JS**: `string` = "/\*\*\n \* pantoken for Canvas Theme Editor\n \* Upload this file under Theme Editor → Advanced → JavaScript\n \* This script loads pantoken's interactions library, which is required for some components to function correctly\n \* See https://pantoken.app for documentation\n \*/\n(function pantokenTheme() \{\n  \"use strict\";\n\n  var script = document.createElement(\"script\");\n  script.src = \"https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/interactions.iife.js\";\n  document.head.appendChild(script);\n\})();\n\n/\* ---------------------------------------------------------------------------------------------\n \* Your overrides go below this line. Canvas loads Theme Editor JavaScript after its own scripts, so\n \* anything added here can safely override pantoken's defaults too.\n \* ------------------------------------------------------------------------------------------- \*/\n"

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>
