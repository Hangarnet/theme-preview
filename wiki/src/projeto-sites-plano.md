---
title: Plano Sites base funcional — Wiki Hangar Network
nav: projeto-sites-plano
led: plain
status: hangar network // wiki · projeto · sites · plano
placard: plano de execução · <b>em andamento</b>
crumb: // wiki · projeto · hangar sites · <b>plano: base funcional</b>
h1: Sites — <em>base funcional</em>
lead: >
  O plano de resgate da base do Hangar Sites: pegar a plataforma herdada
  (~90% pronta) e recolocar as duas capabilities centrais no ar sob a marca
  nova — criação expressa de loja e administração da rede — prontas para
  smoke test. {{cat:pro|profissional}}
foot_sys: hangar network // wiki · projeto · sites · <b>plano</b>
foot_placard: <a class="fliplink" href="./projeto-sites.html">← hangar sites</a> · atualizada em 2026-07-06
---
## Objetivo

Base funcionando fim-a-fim para o smoke test, em duas frentes:

- **Criação expressa de site** — clicar em "criar loja" e cair direto no onboarding. Sem conta? Cria na hora — e a conta é **global da rede** (um login vale na plataforma e em todas as lojas), virando owner/admin da loja criada.
- **Hangar Sites admin** — a administração da rede (ver todas as lojas/sites, criar novas manualmente) remodelada com a marca e o tema novos.

Com a base validada no smoke, os próximos ajustes viram novas issues.

## Ponto de partida

A plataforma (ex-Brazas) já entrega multi-tenant por subdomínio, conta única da rede, onboarding self-service e um admin completo — o grosso é **encaixe e remodel**, não construção. A análise do código (2026-07-06) confirmou os ~90% e revelou os buracos que o plano ataca: a loja criada pelo fluxo expresso não fica ativa de cara, o fluxo de retorno ao onboarding tem um beco sem saída, e restos da marca antiga ainda apontam para o domínio velho.

## As frentes

| ticket | frente | prioridade |
|---|---|---|
| {{linear:HAN-6|Ativação da loja no fluxo expresso}} | @k: criação expressa | Alta |
| {{linear:HAN-7|Criar loja → conta global → onboarding → dashboard}} | @k: criação expressa | Alta |
| {{linear:HAN-8|Landing nova do Hangar Sites no app}} | @k: criação expressa | Alta |
| {{linear:HAN-10|Admin remodelado como Hangar Sites}} | @k: admin | Alta |
| {{linear:HAN-9|Subdomínios no domínio hangar}} | @k: domínio | Alta |
| {{linear:HAN-11|Wizard admin: pré-requisitos de prod}} | @k: admin | Média |
| {{linear:HAN-12|Smoke test da base (roteiro fim-a-fim)}} | @k: validação | Alta |
| {{linear:HAN-13|Limpeza final do rebrand}} | @k: pós-smoke | Baixa |

## Sequência

{.steel}
- **1 — núcleo:** {{linear:HAN-6}} + {{linear:HAN-7}} destravam a criação expressa; {{linear:HAN-8}} e {{linear:HAN-10}} vestem landing e admin com a marca nova
- **2 — smoke:** {{linear:HAN-12}} roda o roteiro completo (visitante → conta → loja no ar → admin) e gera a lista de próximos ajustes
- **em paralelo:** {{linear:HAN-9}} confirma o domínio definitivo e prepara o cutover (desenhado para ser só env var + DNS); {{linear:HAN-11}} destrava a criação manual em produção
- **depois:** {{linear:HAN-13}} — faxina do rebrand, sem bloquear a base

<div class="callout callout--info"><span class="ico">🎯</span>
  <div><b>Acompanhamento</b>
    <p>O detalhamento técnico de cada frente vive nas issues do
      <a class="fliplink" href="https://linear.app/hangar-network/project/hangar-sites-base-funcional-6de3a57c0696" target="_blank" rel="noopener">projeto no Linear →</a>
      Esta página é o mapa; o Linear é o dia a dia.</p></div>
</div>
