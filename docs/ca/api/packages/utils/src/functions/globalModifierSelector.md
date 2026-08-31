[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / globalModifierSelector

# Function: globalModifierSelector()

> **globalModifierSelector**(`p`, `name`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix un selector modificador d'utilitat global: `:where(*).--name.--name.--name`. La classe modificadora
repetida 3 vegades dóna la regla (0,3,0) especificitat, que supera determinísticament qualsevol compost
real de 2 classes (`.instui-view.-mod`, 0,2,0) independentment de l'ordre de la font — l'embolcall `:where(*)`
contribueix zero especificitat per si sol, així que és purament documentació que aquest és un modificador global,
no una condició d'abast. Un selector de classe simple ja coincideix autònom (`--mt-lg` sense
una altra classe) o encadenat a qualsevol component, núcli o autoritzat per plugin, sense necessitat d'enumeració
per component. Reemplaça el vell patró de classe nua més compost enumerat per component
(`globalSelectors`/`chainTargets`), que no podia arribar als components autoritzats per plugin i no escalava
als utilitaris d'alta cardinalitat com l'espaiat.

## Parameters

### p

`string`

### name

`string`

## Returns

`string`
