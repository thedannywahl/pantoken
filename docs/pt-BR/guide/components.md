# Componentes

`@pantoken/components` inclui estilos de componentes baseados em classes construídos a partir dos tokens do Instructure. Importe a folha de estilos e marque sua marcação — nenhum framework necessário.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Prefere elementos personalizados? `@pantoken/web-components` empacota esses mesmos estilos como `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, e mais — veja o
> [mapa de pacotes](/guide/packages).

## Convenções

As convenções de CSS neste pacote são baseadas em uma versão modificada de [RSCSS](https://ricostacruz.com/rscss/index.html).

Modificadores são **chave-valor** — `-<prop>-<val>`, alinhados aos nomes de props do InstUI — então eles se leem por si: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Props booleanas são apenas o nome da prop, onde a presença significa `true` (`-has-shadow`, `-clickable`); um booleano padrão-ativado desligado inverte (`-without-background`, `-without-border`). Tamanhos aceitam grafias curtas e longas (`-size-sm` = `-size-small`). Quando um nome diverge do InstUI, a classe semântica do InstUI ainda funciona mas está depreciada (por exemplo `-variant-info` → use `-color-info`).

### Exemplo

Componente React do Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

componentes pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

Para a prop `timeout` do InstUI, defina a propriedade customizada sem unidade `--timeout` em milissegundos e carregue a interação Alert. Um valor positivo agenda o descarte; `0` (o padrão) deixa o alerta no lugar. Adicione as classes `transition` da utilidade `instui-transition -fade-entered` para o fade do InstUI; omita-as para remoção imediata. A interação conduz o estado `-fade-exiting` e dispara um evento cancelável e em bubbling `dismiss` antes da remoção, então uma aplicação pode chamar `preventDefault()` para manter o alerta montado.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Barras de progresso aceitam escalas arbitrárias através de `--min` (`0` por padrão), `--value`, e `--max`
(`100` por padrão), com aliases depreciados `--value-now` e `--value-max`. Adicione `-should-animate`
para aplicar a transição de meio segundo do InstUI sempre que um valor mudar. `.value` fica ao lado de `.bar` como
um filho da raiz; adicione `-render-value-inside` para renderizá-lo sobre a trilha, alinhado ao seu início,
em vez disso (estilize para legibilidade contra a cor do medidor). Use um `<progress>` nativo para uma
faixa baseada em zero e `<meter>` quando o mínimo for diferente de zero; os web components selecionam entre eles
automaticamente a partir do atributo `min`. O InstUI não tem estado indeterminado, então um `<progress>`
sem seu atributo `value` é um palpite apenas do pantoken: `progress-bar` anima `.bar` como um
segmento deslizante e `progress-circle` gira seu anel em um arco fixo, ambos escondendo `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Círculos de progresso aceitam as mesmas escalas arbitrárias através de `--min`, `--value`, e `--max`.
`--value-now` e `--value-max` permanecem como aliases funcionais depreciados. Adicione `-should-animate` e
carregue o bundle de interação focada para reproduzir a animação de montagem do InstUI; `--animation-delay` é um
atraso sem unidade em milissegundos. As grafias depreciadas `-should-animate-on-mount` e
`-shold-animate-on-mount` permanecem aliases funcionais.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Prefixo de classe

Toda classe é namespaced como `instui-` por padrão. Construa uma folha de estilos com seu próprio prefixo — ou nenhum — passando
`prefix` a qualquer builder. Qualquer valor falsy (`null`, `undefined`, `""`, ou omitindo) remove o
prefixo inteiramente, então você pode autoria `class="heading -level-h1"` em vez de `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Os modificadores com prefixo traço (`.-color-secondary`, `.-level-h1`) permanecem inalterados de qualquer forma. As
folhas de estilo fornecidas pelo pacote mantêm o prefixo `instui`.

## Base

`base.css` é um reset opt-in que define padrões globais do documento a partir dos tokens: `box-sizing`, um
reset `body`, a superfície da página, cor e fonte de texto base, `color-scheme` (para que tokens `light-dark()` e controles nativos
acompanhem o tema), e um link base. Carregue-o uma vez, antes das folhas de componentes e prose,
quando o pantoken for responsável pela página.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Omitir quando estiver incorporando componentes em um host que já tema seu próprio `html` e `body` —
o reset pinta a superfície da página, então você não quer que ele dispute com o host. Tudo o que ele define usa
seletores de baixa especificidade `:where()`, então suas próprias regras sempre vencem.

`base.css` _aplica_ a fonte da marca (`font-family: var(--instui-font-family-base)`, com fallbacks do sistema); para _carregá-la_, importe o opt-in `fonts.css` — as regras `@font-face` para Atkinson Hyperlegible
Next, apontando para os woff2s fornecidos no pacote. É separado porque as faces são ~350 kB e
self-hosting de fontes é uma escolha deliberada.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Conteúdo para leitores de tela

<p>Há uma mensagem oculta após esta sentença.<span class="instui-screen-reader-content">Apenas leitores de tela anunciam isto.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` oculta um elemento visualmente mantendo-o na árvore de acessibilidade
— para labels e textos de status que a tecnologia assistiva deve ler mas o design não deve mostrar.

## Utilitários

`utilities.css` é uma camada opt-in de classes transversais: um primitivo `View`, espaçamento na escala de tokens,
e sobrescritas semânticas de cor. Ao contrário das classes `-modifier` de componentes, estas usam um **traço duplo**
(`--mod`) para que nunca colidam com os próprios nomes de modificador de um componente, e elas se aplicam a qualquer
elemento — nu, ou composto sobre um componente.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Superfície accent-blue com texto on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Centralizado com mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` é o `View` do InstUI. É a base sobre a qual você adiciona espaçamento e cor, e carrega modificadores chave-valor para suas próprias props visuais para que você não precise recorrer a utilitários:
`-background-*` (suas superfícies), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, e `-cursor-*` — estes são os modificadores de traço único do `view`, não relacionados aos utilitários de traço-duplo abaixo. Props de valor livre
(width/height/inset) permanecem inline styles; `margin`/`padding` usam os utilitários de espaçamento.

**Espaçamento** — classes por lado na escala de espaçamento. Leia-as como `{m|p}{side}-{step}`: `m` para
margin ou `p` para padding (ou as palavras completas `margin`/`padding`), um lado lógico opcional, então um
passo. Assim `.--m-lg` e `.--margin-lg` são iguais, assim como `.--pt-md` e `.--paddingt-md`.

- Lados: none (todos), `t`/`b` (início/fim de bloco), `s`/`e` (início/fim inline), `x`/`y` (eixo inline/block).
  Lados lógicos permanecem corretos em layouts de direita-para-esquerda.
- Passos: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, mais `auto` apenas para margin.

Compose-os para o atalho `margin="small auto large"` do InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Cor** — sobrescritas semânticas que permanecem na paleta: `.--bg-<name>` (background),
`.--text-<name>` (cor do texto), e `.--border-<name>` (cor da borda). Cada `<name>` é um
token de cor semântico — as intenções (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) mais a paleta `accent-*` (`accent-blue`, `accent-green`, e assim por diante). Um nome só existe se o token existir naquela família, então `text-brand` não é uma classe — texto não tem
token de marca. Não há como alcançar um primitivo ou um hex arbitrário, e toda sobrescrita segue
o tema.

**Famílias de tokens** — cada família "um token, uma propriedade" recebe uma classe por token, nomeada pelo
token. Compose-as livremente:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (e `-depth1`…`-card`) → `box-shadow`

Cada uma define somente sua propriedade, então `border-width`/`border-radius` precisam de uma cor `border-*` e um estilo de borda para realmente desenhar uma borda. Estas usam o nome completo do token (`.--border-radius-md`), enquanto os helpers de cor e espaçamento acima usam aliases curtos (`.--bg-brand`, `.--mt-lg`) — os aliases são atalhos ergonômicos; as classes de token são literais e exaustivas.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) e `.--text-align-<value>` (`start`, `center`, `end`, `justify`) cobrem as props transversais `display` e `textAlign` do InstUI (View, Button, Metric, Tabs, …) como classes compostas —
então essas não são modificadores por componente.

Toda classe de traço-duplo vence a cascata determinísticamente sobre um modificador de componente de mesmo nome e traço-simples, independentemente da ordem de importação das folhas de estilo — veja [Authoring conventions](/conventions/authoring)
para o mecanismo.

Tudo aqui é puro CSS guiado pelos tokens `--instui-*`, então acompanha o InstUI através da camada de tokens. Veja a [referência de API](/api/) para `componentsCss` e os builders por componente.

## Sobreposições: dialog e popover

Os componentes de overlay utilizam primitivos nativos da plataforma, então eles se comportam de forma acessível com pouco ou nenhum
JavaScript.

**Modal** — aplique `.instui-modal` a um `<dialog>` nativo. Ele recebe trapping de foco, fechamento por `Esc` e um
`::backdrop` gratuitamente; o backdrop é esmaecido com o mesmo token `--instui-component-mask-background-color`
que `.instui-mask` (adicione `-blur` para esbranquiçá-lo). Abra e feche com invoker commands — sem script:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — aplique `.instui-context-view` a um elemento `[popover]` e o alterne com
`popovertarget`. Ele fica na camada superior e fecha ao clique externo ou por `Esc`, novamente sem script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — aplique `.instui-drawer-layout` a uma raiz de layout com filhos `.tray` e `.content`.
Adicione o atributo `open` (ou `-open`) para revelar a gaveta, e use `placement="end"`
(ou `-placement-end`) para encaixá-la no lado inline-end — o posicionamento resolve através das propriedades lógicas
`inset-inline-*`/`flex-direction`, então ele inverte automaticamente sob `dir="rtl"` sem regras extras. O bundle de interação focada adiciona roteamento de comandos Invoker e alterna o modo overlay
(`should-overlay-tray`) quando a largura cruza `--drawer-layout-min-width` (padrão
`--instui-breakpoints-sm`, então `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` fica para overlays em fluxo (um spinner sobre um card); o `::backdrop` de um modal
cobre o caso do modal.

Ambos os padrões também são empacotados como elementos comportamentais em `@pantoken/web-components`:
`<instui-modal open>` (um `<dialog>` dirigido pelo atributo `open`) e `<instui-context-view>` (um
popover nativo).

Suporte de navegador: a API de popover e `popovertarget` são Baseline 2024; comandos invoker
(`command`/`commandfor`) são Baseline 2025, então em navegadores mais antigos vincule os botões a `dialog.showModal()`
como fallback de uma linha. Posicionar um popover ao lado de seu trigger usa posicionamento de âncora CSS onde
suportado (Chromium); em outros, ele centraliza na camada superior.

## Formulários

**FormField** — `.instui-form-field` é um wrapper CSS-Grid que posiciona um label, o controle, e quaisquer
mensagens. Aplique-o a um `<label>` para que o label associe-se ao controle nativamente. Ele tem três áreas de grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (padrão) empilha as áreas; `-layout-inline` coloca o label ao lado do controle (ajuste
com `-label-align-{start,end}` e `-v-align-{top,middle,bottom}`). `-readonly` recolore o label.

O **asterisco de obrigatório** aparece quando o campo é obrigatório por _ou_ a classe `-required` _ou_ um
controle nativo `required` dentro dele — então você pode simplesmente definir `required` no input e a marca aparece.
É decorativo (um `::after` no label, fora da árvore de acessibilidade); combine-o com uma nota como
"campos marcados \* são obrigatórios" a menos que o formulário seja autoexplicativo.

**FormFieldGroup** — `.instui-form-field-group` agrupa campos relacionados em um `<fieldset>` com uma
descrição `<legend>`. É apenas layout (sem tokens dedicados): o padrão empilha os campos;
`-layout-columns` / `-layout-inline` os fluxam em colunas responsivas, com `-row-spacing-*` /
`-col-spacing-*` e `-v-align-*` para ajustar o grid.

**RadioInputGroup** — `.instui-radio-input-group` é o mesmo agrupamento `<fieldset>`/`<legend>`,
especializado para radios. Porque os radios filhos compartilham um `name`, a seleção é nativamente de escolha única —
então um conjunto de botões toggle se comporta como um controle, não botões soltos. `-variant-simple` (padrão) organiza
radios padrão (`-layout-columns`/`-inline` os fluxam em uma linha); `-variant-toggle` conecta os
botões filhos `.instui-radio.-variant-toggle` em um único controle segmentado (bordas colapsadas,
extremidades arredondadas):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Mensagens** — `.instui-form-field-messages` é o container; cada `.instui-form-field-message` recebe um
`-type-*`: `-type-hint` (cinza, padrão), `-type-error` (texto vermelho + glifo de alerta em círculo), `-type-success`
(texto verde + glifo de check em círculo), e `-type-screenreader-only` (visualmente recortada, ainda anunciada).
Os glifos pintam em `currentColor`, então eles sempre combinam com a cor da mensagem. `-type-new-error` é um
alias depreciado de `-type-error`. Vincule o container ao controle com `aria-describedby`, e defina
`aria-invalid` no controle quando houver um erro.

Dentro de um FormField, uma mensagem `-type-error` segue a validação do lado do cliente: ela fica oculta até que o
controle do campo esteja `:user-invalid` (nativo, após o usuário interagir) — ou você a force com `-invalid`
no `.instui-form-field` (para um erro do lado do servidor). Um `.instui-form-field-messages` independente (não em
um campo) não é afetado. O anel de foco do controle segue o mesmo padrão: perigo quando `:user-invalid`/`-invalid`,
sucesso em `-success`.

**Controles de texto** — `.instui-text-input` (nativo `<input>`), `.instui-text-area` (nativo `<textarea>`,
redimensionável), e `.instui-simple-select` (nativo `<select>` com um caret) compartilham um visual e os mesmos
estados: `-invalid` (borda de erro), `-success` (borda de sucesso), `-readonly`, `:disabled` nativo, e
`-size-{sm,md,lg}`. Para um ícone à esquerda/direita (InstUI's `renderBeforeInput`/`renderAfterInput`), envolva
o input em `.instui-input-group` e adicione um slot `.before`/`.after` (um glifo `-icon-*`); `-should-not-wrap`
mantém tudo em uma linha. `.instui-number-input` é essa fachada mais uma coluna spinner +/- `.arrows` (nativo
`type="number"`; conecte os botões a `stepUp()`/`stepDown()`). `.instui-range-input` é um
`input[type="range"]` estilizado cujo valor renderiza em um balão inverso `.instui-range-input-value`. Para um combobox rico
com um listbox popover, use `@instructure/ui` — esta biblioteca cobre os controles nativos.

**Select estilizado (experimental)** — um opt-in `select.css` atualiza o _mesmo_
elemento `.instui-simple-select`: ele estiliza o dropdown aberto (o painel e cada opção, com estados hover e
selecionado) usando o modelo CSS Customizable Select.

> [!WARNING]
> `select.css` depende de `appearance: base-select` / `::picker(select)`, o que é **experimental**
> (Chrome 135+, ainda não Baseline). É fornecido como uma folha opt-in separada e cada regra é condicionada
> por `@supports (appearance: base-select)`, então não faz nada em navegadores sem suporte — o
> controle `.instui-simple-select` apenas permanece o select nativo simples. Carregue-o somente se desejar o
> dropdown aprimorado e aceitar o suporte limitado.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
