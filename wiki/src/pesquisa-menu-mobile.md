---
title: Pesquisa: Menu mobile — Wiki Hangar Network
nav: pesquisa-menu-mobile
led: steel
status: hangar network // wiki · pesquisas · menu mobile
placard: key insights · <b>2026-07-07</b>
crumb: // wiki · pesquisas · <b>menu mobile</b>
h1: Menu mobile: o padrão <em>Netflix</em>
lead: >
  Pesquisa rápida sobre como apps de mídia resolvem navegação visível em
  telas estreitas — origem do padrão adotado nos menus de setor do template.
foot_sys: hangar network // wiki · pesquisas · <b>menu mobile</b>
foot_placard: <a class="fliplink" href="./pesquisas.html">← pesquisas</a>
---
<div class="callout callout--ok"><span class="ico">✓</span>
  <div><b>Decisão adotada no template</b>
    <p>Menus de navegação em mobile nunca quebram linha: <b>linha única com scroll lateral</b> (swipe), scrollbar escondida e <b>fade na borda direita</b> como pista de que há mais itens. Aplicado ao menu dos setores (.mainnav ≤860px) e já era o padrão da barra de sintonia da TV (.tvnav).</p></div>
</div>

## Key insights

- **Linha única com swipe é o padrão da indústria** — Netflix, YouTube, App
  Store e Play Store usam fileiras horizontais deslizáveis para categorias e
  filtros; o menu nunca quebra em múltiplas linhas
- **Swipe lateral é natural no touch** (NN/g): usuários mobile deslizam sem
  fricção; o problema do scroll horizontal é no desktop, onde exigem-se setas
  ou outra affordance visível
- **A affordance certa no mobile é o corte/fade na borda** — um item
  parcialmente visível (ou um gradiente de fade) comunica "tem mais para o
  lado" sem UI extra; setas só se justificam com ponteiro/hover
- **Scrollbar escondida** — a barra nativa suja o visual e não agrega no
  touch; o conteúdo cortado já é o indicador

## Como ficou no tema

{.steel}

- `.mainnav ul` ≤860px: flex nowrap + overflow-x auto + scrollbar-width none
  + mask-image com fade de 34px à direita; o casco do painel holográfico fica
  fixo, só os itens rolam
- `.tvnav` (Hnet TV): mesmo conceito, com fade próprio — as duas navegações
  falam o mesmo idioma
- Detecção de overflow em QA: elementos dentro de um scroller horizontal
  intencional não contam como estouro de viewport

## Referências

{.steel}

- **Pesquisa Claude · 07/07/2026** — busca web rápida (não robusta)
- NN/g — Beware Horizontal Scrolling and Mimicking Swipe on Desktop
  (nngroup.com/articles/horizontal-scrolling/)
- Netflix Help Center — Updated layout, navigation for the Netflix mobile app
  (help.netflix.com/en/node/575087423404644)
