---
title: Users, auth, points & tiers — Wiki Hangar Network
nav: users
status: hangar network // wiki · users
led: steel
placard: plano de construção · <b>em digestão</b>
crumb: // wiki · seção b
h1: Users, auth, points &amp; <em>tiers</em>
lead: >
  Uma identidade para toda a rede, uma economia de pontos
  que premia participação, e patentes que contam a história de cada piloto.
foot_sys: hangar network // wiki · <b>users</b>
foot_placard: detalhamento completo: plano 007 (interno)
---
## Login universal

Você cria a conta **uma vez** — e ela vale na rede inteira. Entrou no Games? Já está logado no Cloud, no Sites e na TV, sem novo cadastro. Dá para entrar com email e senha, ou com um clique usando a **conta Google**.

<div class="authmap">
  <div class="acct">
    <img src="../logo/hangar-emblem.svg" alt="">
    <div>
      <b>Sua conta Hangar</b>
      <small>avatar · patente · pontos · badges</small>
    </div>
    <div class="methods">
      <span class="gbtn">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continuar com Google
      </span>
      <span class="or">ou email e senha</span>
    </div>
  </div>
  <div class="link"><span>um login · mesma sessão em toda a rede</span></div>
  <div class="netmap-grid">
    <div class="node">
      <span class="chip chip--sites">Sites</span>
      <p>Cria e gerencia sua loja; compra em qualquer loja da rede</p>
    </div>
    <div class="node">
      <span class="chip chip--cloud">Cloud</span>
      <p>Contrata e pilota hospedagem, VMs e deploy por IA</p>
    </div>
    <div class="node">
      <span class="chip chip--games">Games</span>
      <p>Participa do fórum, inscreve equipe no HCA, acumula pontos</p>
    </div>
    <div class="node">
      <span class="chip chip--tv">TV</span>
      <p>Segue streams e creators; vincula seu canal</p>
    </div>
  </div>
</div>

- Em **todos os sites da rede**, o topo mostra você: seu avatar com patente e pontos — ou o botão "Entrar", se estiver deslogado
- A base já existe e funciona hoje (conta única + login Google + sessão compartilhada); falta só a mudança para o domínio definitivo da rede

## Patentes

Nomes que só a nossa comunidade entende. **Patente nunca desce** — é pontuação acumulada na vida, não saldo.

| patente | faixa |
|---|---|
| @k: Visitante | deslogado |
| @k: Peão | 0 – 199 |
| @k: Marine | 200 – 999 |
| @k: Zealot | 1.000 – 2.999 |
| @k: Carrier | 3.000 – 3.999 |
| @k: Invoker | 4.000 – 4.999 |
| @k: Zeratul | 5.000+ |

## Badges

Badges dizem o que a pessoa **é**; patentes dizem o quanto ela **participou**.

<div class="badge-row">
  <span class="hbadge hbadge--streamer"><i>◉</i>
    <span><b>streamer</b><small>vinculou seu canal Twitch</small></span></span>
  <span class="hbadge hbadge--youtuber"><i>▶</i>
    <span><b>youtuber</b><small>cadastrou seu YouTube ou podcast</small></span></span>
  <span class="hbadge hbadge--admin"><i>★</i>
    <span><b>admin</b><small>hnet community admin</small></span></span>
  <span class="hbadge hbadge--cm"><i>✦</i>
    <span><b>community manager</b><small>hnet community manager</small></span></span>
</div>

## Economia de pontos

| ação | pontos | regra |
|---|---|---|
| Cadastro | @pts: +10 | única vez, email verificado |
| Login | @pts: +1 | máx. 1/dia |
| Chamar amigo | @pts: +100 | por convite · cap 10/mês |
| Amigo se cadastrou | @pts: +500 | após verificação + 1º login |
| Compartilhar conteúdo | @pts: +100 | link próprio · cap 3/dia |
| Comprar um serviço | @pts: +2.500 | após pagamento · estorno remove |

{.steel}

- **Earned-only**: pontos nunca são compráveis — território "fidelidade", fora da zona regulatória
- **Sinks desde o dia 1**: a moeda precisa circular (status, cosméticos, acesso)
- Ledger de eventos com idempotência; saldo é view, nunca campo editável

## Integrações

- **X é o megafone** — vincular (+150), seguir oficiais (+50), compartilhar conquistas com card gerado (+100), hashtag do HCA (+150), repost oficial (+250)
- **Steam é a prova de jogo** — vincular (+200), badges por jogo da biblioteca, marcos de horas, check-in de partida HCA (+25); conta ≥ 6 meses p/ HCA (anti-smurf)
- **Twitch é a ponte** — a única conversão real do mercado: viewer resgata channel points no canal parceiro e recebe pontos hnet (+500, via webhook)

## Fases

| fase | entrega |
|---|---|
| @k: f1 · identidade | Conta única no domínio novo · avatar/login no topo de todos os sites · pontos base · patente no perfil |
| @k: f2 · crescimento | Convites/referral · compartilhamentos · badges manuais |
| @k: f3 · vínculos | Twitch/YouTube · X · Steam · ponte channel points · HCA exigindo Steam |
| @k: f4 · sinks | Títulos, molduras, emotes, cargo Discord · depois desconto em Cloud/Sites |
