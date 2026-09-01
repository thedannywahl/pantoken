# CDN e distribuição

pantoken publica cada pacote no npm, então você pode puxar tokens, componentes e web components diretamente
de um CDN — sem passo de build, sem bundler. Esta página cobre a URL combinada de CSS (com um construtor
interativo), além dos drop-ins de web-component.

## A base de tokens

Todo componente pantoken lê `--instui-*` propriedades customizadas de uma folha de tokens na página. Duas
variantes são fornecidas:

- `@pantoken/css/dist/style.lean.css` — a fundação CDN recomendada. Carrega todos os tokens exceto o
  conjunto completo de ícones, então tem cerca de 23 KB gzipados.
- `@pantoken/css/dist/style.css` — a folha completa, incluindo cerca de ~1.777 tokens de glifo de ícone
  (`--instui-icon-*`). Cerca de 140 KB gzipados. Carregue isto se você referenciar ícones amplamente via
  `var(--instui-icon-*)`.

A escala de elevação e as variáveis do anel de foco estão presentes em ambas as folhas, então sombras e o anel de foco funcionam com
apenas a fundação carregada.

## Escolha seus componentes e ícones

O [seletor CDN interativo](/guide/cdn-picker) constrói URLs combinadas do jsDelivr para CSS e trechos para pacotes JavaScript. Abra-o, marque o que precisa e copie a saída gerada.

- **Aba Components** — escolha folhas de estilo de componentes individuais ou o todo do barril `components.css`. Adicione o reset base ou utilitários de espaçamento/cores se precisar.
- **Aba JS** — copie um trecho de import ESM para `@pantoken/interactions`.
- **Aba Icons** — escolha ícones individuais do conjunto InstUI (~1.800 ícones) ou do Simple Icons (~3.300 glifos de marca). O seletor gera uma URL combinada separada para os arquivos CSS de ícones para que você carregue apenas os ícones que realmente usa.
- **Aba Web Components** — gere trechos `@pantoken/web-components` (registro seletivo ESM ou bootstrap clássico via script).

Cada arquivo de componente é pequeno — a maioria tem cerca de 2 KB. Um componente que renderiza ícones (`alert`, `checkbox`,
e alguns outros) precisa desses glifos, então o construtor adiciona `@pantoken/components/dist/component-icons.css` (cerca de
0,5 KB gzipados — os 11 ícones que o conjunto de componentes usa) sempre que você escolhe a folha enxuta. A folha completa
já os contém.

### Ordem de carregamento e fontes

Carregue a fundação de tokens primeiro, depois o reset base opcional, depois os arquivos de componente e por último os utilitários — eles são utilitários de sobrescrita, então só sobrescrevem a regra de um componente quando chegam
após ela na cascata. A URL combinada acima já os ordena para você. Fontes são a única exceção:
`@pantoken/components/dist/fonts.css` aponta para arquivos de fonte por caminho relativo, então o combine não pode reescrevê-los — carregue-o como seu próprio `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tudo de uma vez

Marque **All components** no seletor para trocá-lo para o barril, ou aponte para ele você mesmo (cerca de 141 KB
gzipados) junto com a folha de tokens:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registra elementos customizados `<instui-*>` agnósticos a framework. Eles embutem seu
próprio CSS, mas ainda leem tokens de uma folha na página, então carregue também uma fundação de tokens.

### Módulos ES (recomendado)

Um CDN ESM resolve as dependências do pacote para você. Isso registra todos os elementos:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Use a folha de tokens completa (ou a folha enxuta mais `component-icons.css`) para que elementos que renderizam ícones como
`<instui-alert>` resolvam seus glifos.

Para registrar apenas alguns elementos — e suas dependências aninhadas — importe `register` e passe `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Uma tag de script clássica

Para um drop-in sem modules, carregue a build IIFE. Ela agrupa suas dependências e auto-registra cada
elemento ao carregar, expondo um global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

É maior que o caminho ESM — embute `@pantoken/components` e `@pantoken/icons` — então use-o
apenas quando não for possível usar módulos.

## Fixando versões

As URLs acima — e as que o seletor escreve — rastream o release mais recente. Fixe uma major (ou versão exata)
para produção — por exemplo `@pantoken/css@0` — para que uma atualização nunca te surpreenda.
