# Plugins

Um plugin do pantoken estende a saída de tokens ou CSS sem bifurcar um pacote. Ele é criado com
`definePlugin` de `@pantoken/plugin-kit`, e então passado para `buildTokens` ou `toCss`.

## Autorando um plugin

Dê a `definePlugin` os hooks que você implementou. Ela retorna um plugin normal, marcado com as
capacidades inferidas desses hooks. Um plugin pode estender a IR (`tokens`, `icons`), a saída CSS
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

## Registro sensível a capacidades

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passa. Eles avisam — nunca lançam —
quando um plugin não tem um hook correspondente para o estágio em que foi registrado, então um plugin só de tokens passado
para `toCss` é ignorado com uma anotação em vez de silenciosamente não fazer nada.

## Compor plugins

Construa sobre outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks do mesmo estágio se compõem: `tokens` executa a base e depois a adição, `css` mescla as duas
contribuições, e `icons` executa ambas.

## Valide a saída do seu plugin

Execute as verificações de drift compartilhadas de `@pantoken/utils` sobre a própria saída do seu plugin no seu teste, assim um
erro de digitação ou um token renomeado falha rápido e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Os plugins empacotados

- `@pantoken/plugin-simple-icons` — marcas de ícones do simple-icons, registradas como tokens de ícone.
- `@pantoken/plugin-lucide-lab` — ícones do Lucide Lab, registrados como tokens de imagem `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos de produtos Instructure como SVGs, URIs de dados, e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin pantoken) que remove
  propriedades customizadas não usadas de uma folha de estilo.
- `@pantoken/plugin-custom-theme-colors` — rebrandiza uma página definindo um atributo
  (`data-pantoken-color`) para uma das 13 paletas, ou para `custom` para qualquer hex de marca. Veja
  [Cores do tema](#theme-colors).

O registro do Lucide Lab pode ser carregado sob demanda, então passado ao hook síncrono de token:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algumas coisas que antes eram plugins agora embarcam em `@pantoken/components`, já que muitos componentes as precisam
prontas: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de outline de foco (em `base.css` — todo elemento focável o recebe quando o pantoken controla a página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

## Cores do tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emite um bloco `[data-pantoken-color="…"]` por paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloco aponta as primitivas da marca (`--instui-primitive-color-navy-*` e `-blue-*`)
para a paleta escolhida. Ele também rederiva as superfícies da marca que upstream achatou para hex literal,
preservando seu alfa embutido através de `color-mix()`. Cores semânticas de status, acentos azuis explícitos, e
sombras de elevação permanecem. Experimente no
[demo de theming baseado em swatches](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Cor personalizada da marca

Defina `data-pantoken-color="custom"` para rebrandizar a partir de qualquer hex, como a cor primária que um admin do Canvas
digita no Editor de Tema. o pantoken deriva uma escala completa de 10–200 `--instui-primitive-color-custom-*`
a partir dela:

1. **Curva de referência.** A luminosidade alvo de cada passo é a média OKLCH da luminosidade das 13
   paletas naquele passo, com 0 fixo em branco e 210 em preto. Assim o espaçamento da escala personalizada
   casa com o das paletas fornecidas.
2. **Âncora.** a entrada cai no passo cuja luminosidade alvo é a mais próxima da sua, então é ajustada para
   essa luminosidade exata. `#cccccc` torna-se `custom-40` em `#c9c9c9`: próximo da entrada, mas nem
   sempre idêntico. "Mais próximo" significa o passo mais próximo na curva, não a cor existente mais próxima
   de uma paleta.
3. **Preenchimento.** Cada outro passo mantém o matiz da entrada. Sua saturação segue a curva média de saturação das paletas
   em relação à âncora, e é reduzida apenas onde uma cor sai do espaço sRGB.

Somente `#rgb` e `#rrggbb` são aceitos; qualquer outra coisa lança um `TypeError`, então um hex vindo de um formulário
não pode injetar CSS.

Em tempo de build, emita toda a regra com as primitivas derivadas já declaradas:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Para escolher a cor em tempo de execução sem enviar o conjunto de tokens, pré-compute a curva e a regra de remapeamento em tempo de build. Então use a entrada sem dependências `/scale` no navegador, e defina apenas as 20
primitivas derivadas:

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

O seletor de tema do site de docs, o editor de tema do Canvas, e a demo acima todos funcionam assim.

Veja a [referência da API](/api/) para as exportações de cada plugin.
