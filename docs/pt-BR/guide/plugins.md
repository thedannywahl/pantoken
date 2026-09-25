# Plugins

Um plugin do pantoken estende a saída de tokens ou CSS sem criar um fork de um pacote. Constrói-se um com
`definePlugin` de `@pantoken/plugin-kit`, depois passe-o para `buildTokens` ou `toCss`.

## Autorando um plugin

Dê a `definePlugin` os hooks que você implementa. Ele retorna um plugin normal, marcado com as
capacidades inferidas a partir desses hooks. Um plugin pode estender a IR (`tokens`, `icons`), a saída CSS
(`css`), ou ambos.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registro consciente de capacidades

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passa. Ele avisa — nunca lança —
quando um plugin não tem um hook correspondente para a etapa em que está registrado, então um plugin só de tokens passado
para `toCss` é ignorado com uma nota em vez de silenciosamente não fazer nada.

## Compor plugins

Construa em cima de outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks da mesma etapa se compõem: `tokens` executa a base e depois a adição, `css` mescla as duas
contribuições, e `icons` executa ambos.

## Valide a saída do seu plugin

Execute as verificações de drift compartilhadas de `@pantoken/utils` sobre a própria saída do seu plugin em seu teste, para que um
erro de digitação ou um token renomeado falhe rápido e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Os plugins empacotados

- `@pantoken/plugin-simple-icons` — marca ícones do simple-icons, registrados como tokens de ícone.
- `@pantoken/plugin-lucide-lab` — ícones Lucide Lab, registrados como tokens de imagem `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos de produtos Instructure como SVGs, data URIs, e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin pantoken) que remove
  custom properties não usadas de uma folha de estilo.
- `@pantoken/plugin-custom-theme-colors` — rebranda uma página definindo um atributo
  (`data-pantoken-color`) para uma das 13 paletas, ou para `custom` para qualquer hex de marca. Veja
  [Cores do tema](#theme-colors).

O registro do Lucide Lab pode ser carregado de forma preguiçosa, depois passado para o hook de token síncrono:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algumas coisas que antes eram plugins agora são entregues em `@pantoken/components`, já que muitos componentes precisam
delas prontos para uso: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de foco-outline
(em `base.css` — todo elemento focável o recebe quando o pantoken gerencia a página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

## Cores do tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emite um bloco `[data-pantoken-color="…"]` por paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloco aponta os primitivos da marca (`--instui-primitive-color-navy-*` e `-blue-*`)
para a paleta escolhida. Ele também re-deriva as superfícies da marca que upstream achatou para hex literal,
mantendo seu alpha incorporado através de `color-mix()`. Cores semânticas de status, acentos azuis explícitos e
sombras de elevação permanecem. Experimente no
[demo de theming baseado em swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Cor de marca personalizada

Defina `data-pantoken-color="custom"` para rebrandear a partir de qualquer hex, como a cor primária que um admin do Canvas
digita no Editor de Tema. o pantoken deriva uma escala completa de 10–200 `--instui-primitive-color-custom-*`
a partir dela:

1. **Curva de referência.** A luminosidade alvo de cada passo é a média da luminosidade OKLCH das 13
   paletas naquele passo, com 0 fixo no branco e 210 no preto. Assim, o espaçamento da escala personalizada
   corresponde ao das paletas fornecidas.
2. **Âncora.** A entrada cai no passo cuja luminosidade alvo é a mais próxima da sua própria, então fixa-se nessa
   luminosidade exata. `#cccccc` torna-se `custom-40` em `#c9c9c9`: próximo da entrada, mas nem
   sempre idêntico. "Mais próximo" significa o passo mais próximo na curva, não a cor existente mais próxima.
3. **Preenchimento.** Cada outro passo mantém o matiz da entrada. Sua saturação segue a curva média de
   saturação das paletas relativa à âncora, e é reduzida apenas onde uma cor cai fora do sRGB.

Somente `#rgb` e `#rrggbb` são aceitos; qualquer outra coisa lança um `TypeError`, então um hex vindo de um formulário
não pode injetar CSS.

No tempo de build, emita toda a regra com os primitivos derivados já declarados:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Para escolher a cor em tempo de execução sem distribuir o conjunto de tokens, pré-compute a curva e a regra de remapeamento
em tempo de build. Então use a entrada sem dependências `/scale` no navegador, e defina somente os 20
primitivos derivados:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

O seletor de tema do site de documentação, o editor de temas do Canvas, e o demo acima funcionam todos dessa forma.

Veja a [referência da API](/api/) para as exportações de cada plugin.
