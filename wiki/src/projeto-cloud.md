---
title: Hangar Cloud — Wiki Hangar Network
nav: projeto-cloud
status: hangar network // wiki · projeto · cloud
led: steel
placard: plano de construção · <b>em spec</b>
crumb: // wiki · projeto · <b>hangar cloud</b>
logo: ../logo/hangar-cloud.svg
logo_alt: Hangar Cloud
lead: >
  A infraestrutura da rede: hospedagem self-service de ótimo
  custo-benefício, deploy por IA e VMs sob medida.
  {{cat:pro|profissional}}
foot_sys: hangar network // wiki · projeto · <b>cloud</b>
foot_placard: <a class="fliplink" href="./projeto.html">← projeto</a>
---
## Perfil e público-alvo

O Cloud atende dois perfis que nenhum provedor brasileiro serve bem ao mesmo tempo:

<div class="netmap-grid" style="margin: 16px 0 8px;">
  <div class="node">
    <span class="chip chip--cloud">Devs</span>
    <p>Querem <b style="color:var(--text-primary)">controle</b>: montar a
      máquina do jeito deles, preço transparente, sem ticket e sem
      consultor. Self-service de verdade — do painel ao SSH.</p>
  </div>
  <div class="node">
    <span class="chip chip--cloud">Vibe coders</span>
    <p>Constroem apps <b style="color:var(--text-primary)">conversando com a
      IA</b> — e não querem tocar em infra. O deploy precisa acontecer de
      dentro da própria conversa, sem painel, sem terminal.</p>
  </div>
</div>

## Deploy de apps — dois caminhos

Todo app chega ao ar no Cloud por um destes caminhos:

<div class="authmap">
  <div class="netmap-grid">
    <div class="node">
      <span class="chip chip--sites">via Hangar Sites</span>
      <p><b style="color:var(--text-primary)">Multi-tenant:</b> cada loja ou
        site criado no Hangar Sites roda automaticamente na infra do Cloud —
        o cliente do Sites nem sabe que o Cloud existe. Um deploy, milhares
        de tenants.</p>
    </div>
    <div class="node">
      <span class="chip chip--cloud">via MCP (sua IA)</span>
      <p><b style="color:var(--text-primary)">Deploy pela IA:</b> o usuário
        conecta o MCP do Hangar Cloud na IA dele (Claude, etc.) e pede o
        deploy na conversa. A IA provisiona, publica e devolve a URL.</p>
    </div>
  </div>
  <div class="link"><span>os dois caminhos aterrissam na mesma infra</span></div>
  <div class="acct">
    <img src="../logo/hangar-emblem.svg" alt="">
    <div>
      <b>Infra Hangar Cloud</b>
      <small>hospedagem multi-tenant · VMs sob medida · borda global</small>
    </div>
  </div>
</div>

<div class="callout callout--info"><span class="ico">🔗</span>
  <div><b>O Sites é o primeiro (e maior) cliente do Cloud</b>
    <p>A integração multi-tenant faz o Cloud nascer com escala e caso de uso
      real — e mantém a regra da pesquisa: um plano com capacidades, não
      três produtos fragmentados.</p></div>
</div>
