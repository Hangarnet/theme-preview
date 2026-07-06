---
title: Guidelines do tema — Wiki Hangar Network
nav: design-guidelines
status: hangar network // wiki · design · guidelines
led: plain
placard: tema único · <b>vigente</b>
crumb: // wiki · design · <b>guidelines</b>
h1: Guidelines do <em>tema</em>
lead: >
  As regras que mantêm a rede coesa: três vozes de cor,
  três vozes de tipo e o metal construído em camadas.
foot_sys: hangar network // wiki · design · <b>guidelines</b>
foot_placard: <a class="fliplink" href="./design.html">← design</a>
---
## A regra das três vozes

| voz | cor | onde usar | nunca em |
|---|---|---|---|
| @k: Ação | Laranja #F26522 | CTAs, indicadores ativos, preço/valor, destaque de manchete | rótulos de sistema |
| @k: Sistema | Aço-azul #69AAD7 | códigos de setor, telemetria, tags técnicas, navegação holográfica | botões e ações |
| @k: Neutros | Gunmetal 950–200 | todo o resto — casco, painéis, texto | — |

<div class="callout callout--warn"><span class="ico">⚠</span>
  <div><b>Se as vozes disputarem, o laranja vence</b>
    <p>É a cor de conversão — isolamento total: nada mais na página é
      laranja. Cores de convidados (verde NVIDIA, vermelho HCA) vivem
      contidas dentro dos seus badges/logos e não vazam para a UI.</p></div>
</div>

## Vozes tipográficas

| voz | fonte | papel |
|---|---|---|
| @k: Display | Oxanium 800 | manchetes, títulos, wordmark — o letreiro techno herdado de 2001 |
| @k: Corpo/UI | Saira | texto corrido e interface (fallback Verdana, o corpo original) |
| @k: Mono | Share Tech Mono | placards, sys, tags, terminal — os rótulos gravados no metal |

- **Placa de seção** (subtítulo A) organiza; **manchete de bloco** (subtítulo B, com uma palavra em brasa) vende — nunca as duas no mesmo bloco
- **Breadcrumb B**: a linha de contexto acima da manchete, sempre começando em <span class="k" style="font-family:var(--hcn-font-mono)">//</span>
- **Link ver-todos**: o escape do bloco, sempre com seta → no fim

## Componentes principais

| componente | o quê |
|---|---|
| @k: plate / seal | placa usinada com parafusos; o selo octogonal guarda o ano em latão serifado |
| @k: panel / strip | painéis de metal escovado e baias conectadas (nunca cards soltos) |
| @k: btn | laranja anodizado com varredura especular; ghost para ação secundária |
| @k: led | domo de vidro: laranja ativo, aço neutro, vermelho ao vivo |
| @k: holonav | painel holográfico de navegação — scanlines, glow e blur em aço |
| @k: conduit | divisor de energia: trilhos que mergulham num V apontando o conteúdo |
| @k: chips / cats / badges | pills de produto (uma cor por setor), categorias tracejadas e insígnias de comunidade |

## Metal de alta definição

Toda superfície metálica é composta por camadas, nesta ordem:

{.steel}

- **1 · Grão** — ruído fino (feTurbulence, 3.5% alfa)
- **2 · Escovação** — streaks horizontais + fios de 1px
- **3 · Varredura especular** — o brilho diagonal que atravessa
- **4 · Base** — gradiente vertical do gunmetal
- **5 · Bordas usinadas** — luz em cima/esquerda, sombra embaixo/direita, sombra externa dupla (contato + ambiente)

<div class="callout callout--info"><span class="ico">⚙</span>
  <div><b>Fonte da verdade</b>
    <p>O CSS canônico (hangar-theme.css) e o guia completo (THEME.md) vivem
      no acervo interno em docs/design/theme — esta página é o resumo
      navegável.</p></div>
</div>
