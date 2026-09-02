# Arquitetura

pantoken tem um trabalho: resolver os design tokens e ícones da Instructure uma vez, então remodelar esse modelo
para cada destino. As camadas abaixo mantêm esse redesenho honesto e mantêm os pacotes publicados livres
de qualquer upstream exclusivo do GitHub.

## As camadas

```mermaid
flowchart TD
  upstream["@instructure/instructure-design-tokens<br/>(upstream, GitHub-only)"]
  core["@pantoken/core<br/>buildTokens() / toCss() - resolves upstream into the IR"]
  tokens["@pantoken/tokens<br/>the IR, vendored as static JSON per theme<br/>(the decoupling point)"]

  formats["formats/<br/>(css, scss, ...)"]
  renderers["renderers/<br/>(react, vue, web-components, ...)"]
  platforms["platforms/<br/>(swift, wordpress, ...)"]
  design["design/<br/>(figma, swatches)"]
  bundlers["bundlers/<br/>(vite, tailwind, ...)"]

  upstream --> core --> tokens
  tokens --> formats
  tokens --> renderers
  tokens --> platforms
  tokens --> design
  tokens --> bundlers
```

- **`@pantoken/model`** contém os contratos de tipo, e nada mais. É a fonte da verdade para a
  forma `Token` e o contrato do plugin, sem dependências, para que qualquer pacote possa depender dele
  livremente.
- **`@pantoken/core`** é o único pacote que toca a fonte upstream. Ele resolve tokens e
  ícones para a IR canônica e gera CSS.
- **`@pantoken/tokens`** fornece essa IR como JSON estático em tempo de build. Este é o ponto de desacoplamento:
  pacotes downstream leem `@pantoken/tokens`, nunca `@pantoken/core`, então `npm i pantoken` nunca
  alcança o upstream exclusivo do GitHub.
- **`@pantoken/utils`** carrega os helpers compartilhados — o resolvedor `var(--x)`, as regexes de referência,
  conversão de caso e cor, e as checagens de drift que mantêm a saída gerada fiel à IR.

## Por que os tokens são empacotados

O pacote de tokens upstream vive no GitHub, não no npm. Se todo pacote downstream dependesse dele,
`npm i pantoken` falharia para qualquer pessoa sem esse acesso. Em vez disso, `@pantoken/tokens` resolve o
upstream apenas uma vez em tempo de build e grava o resultado em JSON estático. Os pacotes publicados carregam esse
JSON, então eles instalam limpos do npm, fixam semver e funcionam offline.

## Agrupamentos

Cada bucket downstream é uma forma de consumir a IR:

- **formats/** — transforma os tokens em um arquivo (CSS, SCSS, Less, Stylus, DTCG).
- **renderers/** — integrações com frameworks e ferramentas (React, Vue, Svelte, MUI, Pendo, e mais).
- **bundlers/** — plugins e presets para ferramentas de build (Vite, Next, Tailwind, Panda, PostCSS, webpack).
- **platforms/** — alvos nativos e geradores de site (Swift, Kotlin, Rust, WordPress, Drupal).
- **design/** — payloads para ferramentas de design (Figma, paletas de cores).
- **plugins/** — transformações opcionais que estendem o token ou a saída CSS. Veja [Plugins](/guide/plugins).

## Saída gerada

Todo pacote que emite um arquivo o grava em um diretório `generated/` por pacote que um build
reproduz, assim nada gerado é comitado. Uma tarefa do workspace valida tudo isso. Veja
[Generated output](/guide/generated-output).
