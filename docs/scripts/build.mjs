import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const root = path.resolve(import.meta.dirname, '..');
const contentDir = path.join(root, 'content');
const chaptersDir = path.join(root, 'chapters');
const navigation = JSON.parse(await readFile(path.join(root, 'navigation.json'), 'utf8'));
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
const renderFence = md.renderer.rules.fence;
md.renderer.rules.fence = (...args) => `<div class="doc-code"><button class="doc-copy-btn" type="button" data-copy-code>複製</button>${renderFence(...args)}</div>`;
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const slugify = value => value.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

function parseDocument(raw, source) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${source} requires front matter.`);
  const metadata = Object.fromEntries(match[1].trim().split('\n').map(line => {
    const [key, ...rest] = line.split(':'); return [key.trim(), rest.join(':').trim()];
  }));
  const tokens = md.parse(match[2], {});
  const headings = [];
  for (let index = 0; index < tokens.length; index += 1) {
    if (tokens[index].type === 'heading_open' && ['h1', 'h2', 'h3'].includes(tokens[index].tag)) {
      const inline = tokens[index + 1]; const title = inline.content;
      const id = slugify(title) || `section-${headings.length + 1}`;
      tokens[index].attrSet('id', id);
      headings.push({ id, title, level: tokens[index].tag });
    }
  }
  return { metadata, headings, html: md.renderer.render(tokens, md.options, {}) };
}

const pages = [];
for (const entry of navigation.pages) {
  const filename = path.join(contentDir, `${entry.slug}.md`);
  const parsed = parseDocument(await readFile(filename, 'utf8'), filename);
  if (parsed.metadata.title !== entry.title || parsed.metadata.group !== entry.group) throw new Error(`Navigation metadata does not match ${entry.slug}.`);
  pages.push({ ...entry, ...parsed });
}

function navMarkup(currentSlug, prefix) {
  return navigation.groups.map(group => {
    const children = pages.filter(page => page.group === group.id);
    if (!children.length) return '';
    return `<details class="doc-nav-group"${children.some(page => page.slug === currentSlug) ? ' open' : ''}><summary>${escapeHtml(group.title)}</summary><ul class="doc-nav-list">${children.map(page => `<li><a data-nav-link href="${prefix}chapters/${page.slug}.html" class="${page.slug === currentSlug ? 'active' : ''}">${escapeHtml(page.title)}</a></li>`).join('')}</ul></details>`;
  }).join('');
}

function pageShell({ title, currentSlug, body, prefix, searchIndex, previous, next }) {
  const previousLink = previous ? `<a class="btn btn-outline-secondary btn-sm" href="${prefix}chapters/${previous.slug}.html">← ${escapeHtml(previous.title)}</a>` : '';
  const nextLink = next ? `<a class="btn btn-primary btn-sm" href="${prefix}chapters/${next.slug}.html">${escapeHtml(next.title)} →</a>` : '';
  const localSearchIndex = searchIndex.map(item => ({ ...item, href: `${prefix}chapters/${item.slug}.html#${item.anchor}` }));
  return `<!doctype html><html lang="zh-Hant" data-academy-font-size="sm"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="三種應用架構教學"><title>${escapeHtml(title)}｜架構教學網站</title><link rel="stylesheet" href="${prefix}assets/bootstrap.min.css"><link rel="stylesheet" href="${prefix}assets/academy.css"><link rel="stylesheet" href="${prefix}assets/site.css"></head><body><div class="academy-app-shell docs-shell"><aside class="academy-sidebar docs-sidebar" aria-label="課程導覽"><div class="docs-brand"><a class="docs-brand-mark" href="${prefix}index.html"><span class="docs-brand-logo">A</span><span><span class="docs-brand-title d-block">架構教學網站</span><span class="docs-brand-subtitle d-block">Business First · AI Write · Human Review</span></span></a></div><nav class="academy-sidebar-nav academy-scroll-thin"><div class="academy-nav-label">課程導覽</div>${navMarkup(currentSlug, prefix)}</nav><div class="docs-sidebar-footer p-3"><div>字級</div><div class="docs-font-size"><button data-font-size="sm">小</button><button data-font-size="md">中</button><button data-font-size="lg">大</button></div></div></aside><main class="academy-main docs-main"><header class="docs-toolbar"><button class="btn btn-outline-secondary btn-sm docs-menu-btn" data-menu-toggle>目錄</button><span class="docs-toolbar-title">${escapeHtml(title)}</span><div class="docs-search-wrap"><span class="docs-search-icon">⌕</span><input id="docsSearch" class="form-control form-control-sm" placeholder="搜尋所有章節（Ctrl+K）" autocomplete="off"><div id="docsSearchResults" class="docs-search-results"></div></div><div class="docs-toolbar-actions"><a class="btn btn-outline-secondary btn-sm" href="${prefix}index.html">課程首頁</a></div></header><div class="docs-overlay"></div><div class="docs-content-wrap"><article class="doc-article">${body}</article><nav class="docs-chapter-pager" aria-label="章節切換">${previousLink}${nextLink}</nav></div></main></div><button id="backTop" class="btn btn-primary docs-back-top" aria-label="回到頂端">↑</button><script>window.ACADEMY_SEARCH_INDEX=${JSON.stringify(localSearchIndex)};</script><script src="${prefix}assets/bootstrap.bundle.min.js"></script><script src="${prefix}assets/site.js"></script></body></html>`;
}

const searchData = pages.flatMap(page => page.headings.map(heading => ({ title: heading.title, level: heading.level, slug: page.slug, pageTitle: page.title, anchor: heading.id })));
await rm(chaptersDir, { recursive: true, force: true });
await mkdir(chaptersDir, { recursive: true });
for (const [index, page] of pages.entries()) {
  const body = `<p class="docs-breadcrumb"><a href="../index.html">課程首頁</a> / ${escapeHtml(navigation.groups.find(group => group.id === page.group).title)}</p>${page.html}`;
  await writeFile(path.join(chaptersDir, `${page.slug}.html`), pageShell({ title: page.title, currentSlug: page.slug, body, prefix: '../', searchIndex: searchData, previous: pages[index - 1], next: pages[index + 1] }), 'utf8');
}
const cards = navigation.groups.filter(group => group.id !== 'reference').map(group => { const first = pages.find(page => page.group === group.id); return `<section class="docs-track-card"><h2>${escapeHtml(group.title)}</h2><p>${escapeHtml(first.title)}</p><a href="chapters/${first.slug}.html">開始閱讀 →</a></section>`; }).join('');
const home = `<section class="docs-hero"><div class="docs-hero-eyebrow">Architecture Academy</div><h1>從 Business Problem 開始，選對 Sample，再讀懂系統。</h1><p>這是一套由可獨立閱讀章節組成的教學網站。先選適合的架構路線，再用範例、驗證與 Review 建立可維護的實作能力。</p></section><section class="docs-track-grid">${cards}</section><section class="doc-article"><h2 id="sample-selection">三個 Sample 怎麼選</h2><div class="doc-table-wrap"><table class="table"><thead><tr><th>Sample</th><th>適用對象</th><th>適用情境</th></tr></thead><tbody><tr><td>Citizen Python</td><td>Citizen Developer</td><td>輕量、受治理的本機業務工具</td></tr><tr><td>Vue + Spring Boot</td><td>IT 團隊</td><td>團隊採 Vue 的 SPA Golden Path</td></tr><tr><td>React + Spring Boot</td><td>IT 團隊</td><td>團隊採 React 與 TanStack Query 的 SPA Golden Path</td></tr></tbody></table></div></section>`;
await writeFile(path.join(root, 'index.html'), pageShell({ title: '課程首頁', currentSlug: null, body: home, prefix: '', searchIndex: searchData, previous: null, next: null }), 'utf8');
console.log(`Built ${pages.length} chapter pages.`);
