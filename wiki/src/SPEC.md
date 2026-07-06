# Wiki Hangar Network — especificação de conteúdo (OBRIGATÓRIA)

**Regra dura: todo conteúdo da wiki nasce e evolui em Markdown.** Os arquivos
`wiki/*.html` são **gerados** — nunca editar à mão. Quem edita HTML gerado perde
o trabalho no próximo build.

## Fluxo

1. Editar/criar `wiki/src/<página>.md`
2. Nova página? Adicionar entrada em `NAV` no `build.mjs` (ordem única do menu)
3. Rodar `npm run wiki:build` (na raiz do repo) — regenera todos os `wiki/*.html`
4. Conferir localmente, commitar **fonte + gerado juntos**
5. Sincronizar com `Hangarnet/theme-preview` e push (deploy via GitHub Actions)

## Formato da página

```markdown
---
title: Título da aba — Wiki Hangar Network
nav: chave-do-nav            # mesma chave do NAV em build.mjs
led: steel                   # steel | plain | none
status: hangar network // wiki · seção
placard: plano de construção · <b>estado</b>
crumb: // wiki · seção x
h1: Título com <em>ênfase</em>       # OU logo: + logo_alt: (páginas de setor)
lead: >
  Parágrafo de abertura (multilinha com >).
foot_sys: hangar network // wiki · <b>seção</b>
foot_placard: atualizada em AAAA-MM-DD   # ou link <a class="fliplink" ...>
---
Corpo em Markdown…
```

## Corpo — o que usar

- **Prosa, `## títulos`, listas e tabelas** → Markdown puro. `**negrito**` vira
  `<b>` (voz do tema) automaticamente.
- **Células com classe**: prefixar `@k:` (mono/aço) ou `@pts:` (números laranja)
  → `| @k: Vercel | ... |`
- **Lista steel** (bullets azuis): linha `{.steel}` + linha em branco antes da lista.
- **Shortcodes** (funcionam também no `lead`):
  - `{{chip:cloud|Hangar Cloud}}` — setores: network, cloud, sites, games, tv;
    modificador sm: `{{chip:games sm|HCA}}`
  - `{{cat:pro|profissional}}` — pro, hobby, partner
  - `{{linear:HNG-42}}` ou `{{linear:HNG-42|título da task}}` — badge de ticket
    Linear; abre no app desktop (fallback web). Workspace configurado em
    `LINEAR_WORKSPACE` no `build.mjs`.
- **Componentes ricos** (netmap, authmap, badge-row, statrow, callout, cardrow,
  logogrid) → ilhas de HTML cru dentro do .md, **sem linha em branco interna**
  (linha em branco encerra o bloco HTML no Markdown). Copiar exemplos das
  páginas existentes; estilos vivem em `wiki.css`.

## Proibições

- Editar `wiki/*.html` diretamente (gerados)
- Duplicar o menu de navegação em página (vem do `NAV`)
- CSS inline novo além dos padrões já usados — componente novo entra em `wiki.css`
- Conteúdo sensível: a wiki é **pública** (theme-preview)
