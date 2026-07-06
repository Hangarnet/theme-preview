---
title: Hangar Sites — Wiki Hangar Network
nav: projeto-sites
status: hangar network // wiki · projeto · sites
led: plain
placard: plano de construção · <b>produto em operação</b>
crumb: // wiki · projeto · <b>hangar sites</b>
logo: ../logo/hangar-sites.svg
logo_alt: Hangar Sites
lead: >
  O subprojeto mais maduro da rede — o produto já existe e
  opera. Criador de lojas self-service com IA.
  {{cat:pro|profissional}}
foot_sys: hangar network // wiki · projeto · <b>sites</b>
foot_placard: <a class="fliplink" href="./projeto.html">← projeto</a>
---
## O que já temos

Capabilities construídas e funcionando (por isso esta página dispensa specs longas — o produto evolui direto no repositório):

- **Lojas multi-tenant** — cada lojista ganha sua loja em subdomínio próprio, rodando na infra da rede
- **Dois modos de loja** — catálogo de produtos ou agenda de serviços, à escolha do lojista
- **Criação com IA** — a IA monta a loja e o tema; o lojista ajusta visualmente
- **Pagamentos prontos** — Pix e cartão configurados, com split automático por venda
- **Conta única da rede** — o login do comprador vale na plataforma e em todas as lojas (sessão compartilhada)
- **Dashboard do lojista** — pedidos, catálogo e configurações, com onboarding guiado
- **Área do comprador** — histórico e acompanhamento de pedidos
- **Customização da loja** — aparência e identidade por lojista
- **Emails transacionais** — confirmação de conta, recuperação de senha, magic link

## Modelo de negócio

| item | valor |
|---|---|
| Assinatura mensal | @pts: R$ 9,90/mês |
| Taxa por venda | @pts: 2,5% |
| Período de teste | 1 mês grátis, sem cartão de crédito |

<div class="callout callout--info"><span class="ico">🔗</span>
  <div><b>Papel na rede</b>
    <p>O Sites é a porta de entrada do público leigo — bundle tudo-incluso,
      como manda a pesquisa de empacotamento. Roda multi-tenant na infra do
      <a class="fliplink" href="./projeto-cloud.html">Hangar Cloud</a>.</p></div>
</div>

## Plano ativo

O resgate da base sob a marca nova — criação expressa de loja + admin
remodelado, prontos para smoke test — está planejado e rastreado:
<a class="fliplink" href="./projeto-sites-plano.html">plano: base funcional →</a>
