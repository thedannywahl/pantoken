# Plugins

Um plugin pantoken estende a saída de tokens ou CSS sem bifurcar um pacote. Construa um com
`definePlugin` de `@pantoken/plugin-kit`, então passe-o para `buildTokens` ou `toCss`.

## Autorando um plugin

Dê a `definePlugin` os hooks que implementar. Ele retorna um plugin normal, marcado com as
capabilidades inferidas desses hooks. Um plugin pode estender a IR (`tokens`, `icons`), a saída CSS
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

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passar. Ele avisa — nunca lança —
quando um plugin não tem um hook correspondente para a etapa em que foi registrado, então um plugin somente-de-token passado
para `toCss` é ignorado com uma nota ao invés de silenciosamente não fazer nada.

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

Execute as checagens de drift compartilhadas de `@pantoken/utils` sobre a saída do seu plugin em seu teste, assim um
erro de digitação ou um token renomeado falham rápido e localmente:

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
- `@pantoken/plugin-logos` — logos de produtos Instructure como SVGs, URIs de dados, e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin pantoken) que remove
  propriedades customizadas não usadas de uma folha de estilos.
- `@pantoken/plugin-custom-theme-colors` — rebranda uma página definindo um atributo
  (`data-pantoken-color`) para uma das 13 paletas, ou para `custom` para qualquer hex de marca. Veja
  [Cores do tema](#theme-colors).
- `@pantoken/plugin-custom-components` — controles personalizados suportados por tokens incluindo SegmentedControl
  e SkeletonLoader.

### Controle segmentado

Use um controle segmentado para duas a cinco visualizações ou filtros relacionados. Cada opção é um rádio nativo rotulado
em um grupo nomeado; marque um como checked inicialmente. Use abas ou um dropdown se as opções não couberem
confortavelmente, e use grupos de botões para ações em vez de escolhas. O estilo `-size-md` é o
padrão, com `-size-sm` e `-size-lg` para contextos mais compactos e mais proeminentes.

Importe `@pantoken/plugin-custom-components/segmented-control.css` para o controle e seus botões de overflow
. Use a classe `-icon-*` em um label de segmento quando o segmento precisar de um glifo; o helper de interação
também promove uma classe `-icon-*` do seu input nativo para o painter do label.
Dê ao fieldset um `aria-label` descritivo ou uma legenda visível. O helper preserva o
anúncio nativo do rádio, adiciona navegação por teclado, e opcionalmente revela um segmento recortado por pressionamento de seta.
Use controles de início/fim lógicos e labels acessíveis de botão em ambas as direções:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Importe `@pantoken/interactions/segmented-control.iife.js` para registro quando o DOM estiver pronto, ou chame
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` de `@pantoken/interactions`
e chame `cleanup()` ao removê-lo. O CSS e as escolhas de rádio nativas funcionam sem JS; setas de overflow
precisam do comportamento. O item selecionado usa a sombra de design de duas camadas das cores semânticas
de drop-shadow; é uma sombra de item-ativo distinta em vez de um composto
`--instui-elevation-*` existente. Botões de overflow usam os tokens de componente elevation3 upstream
através de `--pantoken-segmented-overflow-shadow`.

### Carregamento esqueleto

O subpath `skeleton-loader.css` estiliza uma forma decorativa de Text, Avatar, ou Image. Text aceita
`-size-xxs` através de `-size-xxl`; Avatar e Image são de tamanho médio. Cada `.skeleton-row`
opcional adiciona uma linha de texto sem alterar o tamanho. O shimmer em CSS para após três varreduras de 1,5s e
permanece estático quando o usuário prefere movimento reduzido. Funciona antes do carregamento do JavaScript.

Coloque formas apenas onde conteúdo dependente de consulta aparecerá, não sobre navegação conhecida pelo servidor,
filtros, cabeçalhos, ou controles. Um esqueleto não é um medidor de progresso ou um estado ocupado de ação. Mantenha
o conteúdo existente visível durante atualizações em segundo plano; use um spinner ou estado de botão ocupado para ações.

A aplicação pai é proprietária da marcação loading, loaded, empty e error. Forneça uma região de status vazia por
página e um alerta vazio separado no HTML do servidor, ambos **fora** da região de conteúdo ocupada:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Chame o comportamento de nível pai quando o estado da requisição mudar. Ele atualiza `aria-busy` e os dois
anúncios preexistentes, mas nunca substitui conteúdo ou move foco:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Se estiver usando o bundle de interações por componente em vez da importação direta, despache um
evento `pantoken:skeleton-state` no elemento `[data-skeleton-region]` com
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Atrasar a exibição de
placeholders por 200–500ms para requisições rápidas; o comportamento atrasa independentemente o anúncio de loading por 400ms. Em carregamentos passivos de página, deixe o foco onde está. Só mova o foco para um resultado recém-carregado quando a própria ação do usuário o solicitou. O nó de status anuncia resultados e estados vazios; o nó de alerta anuncia falhas. Não combine `aria-busy`, `role="status"` e
`role="alert"` em um único elemento.

O registro do Lucide Lab pode ser carregado preguiçosamente, então passado para o hook síncrono de tokens:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algumas coisas que antes eram plugins agora são distribuídas em `@pantoken/components`, já que muitos componentes
precisam delas por padrão: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de focus-outline
(em `base.css` — todo elemento focável o recebe quando pantoken controla a página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

## Cores do tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emite um bloco `[data-pantoken-color="…"]` por paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloco aponta os primitivos de marca (`--instui-primitive-color-navy-*` e `-blue-*`)
para a paleta escolhida. Também re-deriva as superfícies de marca que upstream achatou para hex literal,
mantendo seu alpha assado através de `color-mix()`. Cores semânticas de status, acentos azuis explícitos, e
sombras de elevação permanecem inalterados. Teste no
[demo de theming baseado em swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Cor de marca personalizada

Defina `data-pantoken-color="custom"` para rebrandear a partir de qualquer hex, como a cor primária que um administrador do Canvas
digita no Editor de Tema. pantoken deriva uma escala completa de `--instui-primitive-color-custom-*` 10–200
a partir dela:

1. **Curva de referência.** A luminosidade alvo de cada passo é a média OKLCH de luminosidade das 13
   paletas naquele passo, com 0 fixo em branco e 210 em preto. Assim o espaçamento da escala personalizada
   corresponde ao das paletas distribuídas.
2. **Âncora.** A entrada cai no passo cuja luminosidade alvo é a mais próxima da sua própria, então ajusta para
   essa luminosidade exata. `#cccccc` torna-se `custom-40` em `#c9c9c9`: próximo da entrada, mas nem
   sempre idêntico. "Mais próximo" significa o passo mais próximo na curva, não a cor existente de paleta mais próxima.
3. **Preenchimento.** Cada outro passo mantém a matiz (hue) da entrada. Sua saturação segue a curva média de saturação das paletas
   relativa à âncora, e é reduzida apenas quando uma cor cai fora do sRGB.

Apenas `#rgb` e `#rrggbb` são aceitos; qualquer outra coisa lança um `TypeError`, então um hex vindo de um formulário
não pode injetar CSS.

Em tempo de build, emita toda a regra com os primitivos derivados já declarados:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Para escolher a cor em tempo de execução sem enviar o conjunto de tokens, pré-compute a curva e a regra de remapeamento
em tempo de build. Então use a entrada sem dependências `/scale` no navegador, e defina apenas os 20
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

O seletor de tema do site de docs, o editor de tema do Canvas, e o demo acima todos funcionam dessa maneira.

Consulte a [referência da API](/api/) para as exportações de cada plugin.
