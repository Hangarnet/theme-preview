---
title: Pesquisa: Gamificação — Wiki Hangar Network
nav: pesquisa-gamificacao
status: hangar network // wiki · pesquisas · gamificação
led: steel
placard: key insights · <b>2026-07-03</b>
crumb: // wiki · pesquisas · <b>gamificação</b>
h1: Gamificação: moeda, tiers e <em>integrações</em>
lead: >
  Evidências de plataformas de games (Twitch, Steam, Roblox,
  Duolingo) sobre moeda de pontos, níveis e pontes com plataformas
  externas.
foot_sys: hangar network // wiki · pesquisas · <b>gamificação</b>
foot_placard: <a class="fliplink" href="./pesquisas.html">← pesquisas</a>
---
<div class="statrow">
  <div class="stat"><b>1,8x</b><span>ROI de fidelidade com tiers vs sem tiers</span></div>
  <div class="stat"><b>+25%</b><span>conclusão de lições com as Leagues do Duolingo</span></div>
  <div class="stat"><b>47→28%</b><span>queda do churn do Duolingo com gamificação</span></div>
  <div class="stat"><b>+18%</b><span>tempo assistido com Channel Points na Twitch</span></div>
</div>

<div class="callout callout--ok"><span class="ico">✓</span>
  <div><b>Earned-only é a receita segura</b>
    <p>Pontos nunca compráveis, gastáveis em status/cosméticos/conveniência —
      fora da zona regulatória (UE 2025, loot boxes) e zero pay-to-win.</p></div>
</div>
<div class="callout callout--info"><span class="ico">⇄</span>
  <div><b>Hub-and-spoke: ler de fora, premiar dentro</b>
    <p>Não existe troca de moeda entre plataformas. A Twitch é a única ponte
      real (channel points → pontos hnet via recompensa autorizada); a Steam
      é só leitura de atividade (biblioteca, horas, conquistas).</p></div>
</div>
<div class="callout callout--warn"><span class="ico">⚠</span>
  <div><b>Nunca exportar pontos para valor real</b>
    <p>Venda ou gift card quebra ToS de parceiros e atrai o regulador. A moeda
      hnet é beco sem saída de valor: entra atividade, sai status.</p></div>
</div>

## Key insights

- **Moeda vale a pena se circula**: o valor está no ciclo ganhar → acumular → gastar; sem sinks, vira número morto e inflaciona
- **Moeda + tiers se completam**: a moeda dá o loop de curto prazo, os tiers o arco de longo prazo (dupla usada por Twitch e Duolingo)
- **Steam Points não tem API** — nunca prometer "importar pontos" no marketing
- **Como funciona a ponte Twitch**: streamer autoriza via OAuth → criamos a custom reward no canal → resgate dispara webhook (EventSub) → creditamos na conta vinculada. 100% dentro do ToS

## Referência

{.steel}

- **Pesquisa Claude (instância separada) · 03/07/2026** — inclui X/Twitter, Twitch (Channel Points/EventSub), Steam (Web API/OpenID), Roblox, Duolingo Leagues e regulação de moedas virtuais (UE 2025). Arquivo completo: *references/research/2026-07-03-gamificacao-moeda-tiers-integracoes.md*
