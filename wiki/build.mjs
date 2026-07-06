// Wiki Hangar Network — bridge md → html
// Fonte canônica: src/*.md (frontmatter + markdown + ilhas de HTML).
// Os .html desta pasta são GERADOS — nunca editar à mão.
// Uso: node build.mjs  (ou: npm run wiki:build na raiz do repo)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const WIKI = dirname(fileURLToPath(import.meta.url));
const SRC = join(WIKI, 'src');

// Workspace do Linear (slug real das URLs do app)
const LINEAR_WORKSPACE = 'hangar-network';
const LINEAR_LOGO_PATH =
  'M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z';

// Navegação — ordem única, replicada em todas as páginas
const NAV = [
  { key: 'index', href: './index.html', label: 'Início' },
  { key: 'projeto', href: './projeto.html', label: 'Projeto' },
  { key: 'projeto-cloud', href: './projeto-cloud.html', label: 'Hangar Cloud', sub: true },
  { key: 'projeto-sites', href: './projeto-sites.html', label: 'Hangar Sites', sub: true },
  { key: 'projeto-sites-plano', href: './projeto-sites-plano.html', label: 'Plano: base funcional', sub: true },
  { key: 'projeto-games', href: './projeto-games.html', label: 'Hangar Games', sub: true },
  { key: 'dominios', href: './dominios.html', label: 'Domínios', sub: true },
  { key: 'users', href: './users.html', label: 'Users, auth, points &amp; tiers' },
  { key: 'pesquisas', href: './pesquisas.html', label: 'Pesquisas' },
  { key: 'pesquisa-empacotamento', href: './pesquisa-empacotamento.html', label: 'Empacotamento', sub: true },
  { key: 'pesquisa-gamificacao', href: './pesquisa-gamificacao.html', label: 'Gamificação', sub: true },
  { key: 'design', href: './design.html', label: 'Design' },
  { key: 'design-logos', href: './design-logos.html', label: 'Logos', sub: true },
  { key: 'design-template', href: './design-template.html', label: 'Template', sub: true },
  { key: 'design-guidelines', href: './design-guidelines.html', label: 'Guidelines do tema', sub: true },
];

// ---------- frontmatter (subset de YAML: chave: valor · multilinha com >) ----------
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error('frontmatter ausente');
  const meta = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z0-9_]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      meta[key] = kv[2] === '>' ? '' : kv[2];
    } else if (key && /^\s+\S/.test(line)) {
      meta[key] = (meta[key] ? meta[key] + ' ' : '') + line.trim();
    }
  }
  return { meta, body: raw.slice(m[0].length) };
}

// ---------- shortcodes ----------
function expandShortcodes(text) {
  return text
    // {{chip:cloud|Hangar Cloud}} · {{chip:games sm|HCA}}
    .replace(/\{\{chip:([a-z-]+)((?:\s+[a-z]+)*)\|([^}]+)\}\}/g, (_, kind, mods, label) => {
      const extra = mods.trim().split(/\s+/).filter(Boolean).map((m) => ` chip--${m}`).join('');
      return `<span class="chip chip--${kind}${extra}">${label}</span>`;
    })
    // {{cat:pro|profissional}}
    .replace(/\{\{cat:([a-z-]+)\|([^}]+)\}\}/g, '<span class="cat cat--$1">$2</span>')
    // {{linear:HNG-42}} · {{linear:HNG-42|título da task}}
    .replace(/\{\{linear:([A-Za-z]+-\d+)(?:\|([^}]+))?\}\}/g, (_, id, label) => {
      const lbl = label ? `<span class="lbl">${label}</span>` : '';
      return (
        `<a class="linbadge" href="https://linear.app/${LINEAR_WORKSPACE}/issue/${id.toUpperCase()}"` +
        ` target="_blank" rel="noopener" title="Abrir no Linear">` +
        `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${LINEAR_LOGO_PATH}"/></svg>` +
        `${id.toUpperCase()}${lbl}</a>`
      );
    });
}

// ---------- markdown ----------
marked.use({ gfm: true, breaks: false });

function renderBody(md) {
  let html = marked.parse(expandShortcodes(md));
  return (
    html
      // vozes do tema usam <b>, não <strong>
      .replace(/<(\/?)strong>/g, '<$1b>')
      // classes de célula: | @pts: +10 | · | @k: f1 |
      .replace(/<td>@(k|pts):\s*/g, '<td class="$1">')
      // classe de lista: linha {.steel} antes da lista
      .replace(/<p>\{\.([\w-]+)\}<\/p>\s*<ul>/g, '<ul class="$1">')
  );
}

// ---------- template ----------
const esc = (s) => s.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;');

function page(meta, bodyHtml) {
  const led =
    meta.led === 'none' ? '' : ` <span class="led${meta.led === 'steel' ? ' led--steel' : ''}"></span>`;
  const nav = NAV.map(
    (n) =>
      `      <a href="${n.href}"${n.sub ? ' class="sub"' : ''}${
        n.key === meta.nav ? ' aria-current="page"' : ''
      }>${n.label}</a>`
  ).join('\n');
  const headerVisual = meta.logo
    ? `      <img src="${meta.logo}" alt="${meta.logo_alt || ''}" style="width:220px;margin:6px 0 16px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.55))">`
    : `      <h1 class="display">${meta.h1}</h1>`;
  const linearJs = bodyHtml.includes('class="linbadge"') || (meta.lead || '').includes('class="linbadge"')
    ? `
<script>
/* linbadge: tenta abrir no app desktop do Linear; cai para a web se não houver app */
document.addEventListener('click', function (e) {
  var a = e.target.closest('a.linbadge');
  if (!a) return;
  e.preventDefault();
  var t = setTimeout(function () { window.open(a.href, '_blank', 'noopener'); }, 900);
  var cancel = function () { clearTimeout(t); };
  document.addEventListener('visibilitychange', cancel, { once: true });
  window.addEventListener('pagehide', cancel, { once: true });
  window.location.href = a.href.replace('https://linear.app/', 'linear://');
});
</script>`
    : '';

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<link rel="icon" href="../logo/hangar-emblem.svg">
<link rel="stylesheet" href="../hangar-theme.css">
<link rel="stylesheet" href="./wiki.css">
</head>
<body class="hangar">

<div class="statusbar">
  <span class="sys">${meta.status}${led}</span>
  <span class="placard">${meta.placard}</span>
</div>

<div class="wikigrid">
  <aside class="sidebar">
    <a class="brand" href="../pages/index.html">
      <img src="../logo/hangar-network.svg" alt="Hangar Network">
    </a>
    <nav class="wnav" aria-label="Wiki">
${nav}
    </nav>
    <a class="back fliplink" href="../pages/index.html">← voltar ao hub</a>
  </aside>

  <main class="content">
    <header>
      <span class="sys sys--crumb">${meta.crumb}</span>
${headerVisual}
      <p class="lead">${expandShortcodes(meta.lead)}</p>
    </header>

${bodyHtml}
    <div class="wikifoot">
      <span class="sys">${meta.foot_sys}</span>
      <span class="placard">${meta.foot_placard}</span>
    </div>
  </main>
</div>
${linearJs}
</body>
</html>
`;
}

// ---------- build ----------
const files = readdirSync(SRC).filter((f) => f.endsWith('.md') && f !== 'SPEC.md');
for (const f of files) {
  const { meta, body } = parseFrontmatter(readFileSync(join(SRC, f), 'utf8'));
  for (const req of ['title', 'nav', 'status', 'placard', 'crumb', 'lead', 'foot_sys', 'foot_placard']) {
    if (!meta[req]) throw new Error(`${f}: campo obrigatório ausente: ${req}`);
  }
  if (!meta.h1 && !meta.logo) throw new Error(`${f}: precisa de h1 ou logo`);
  const out = join(WIKI, basename(f, '.md') + '.html');
  writeFileSync(out, page(meta, renderBody(body)));
  console.log(`✓ ${basename(out)}`);
}
console.log(`\n${files.length} páginas geradas em ${WIKI}`);
