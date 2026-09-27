
(() => {
  const html = document.documentElement;
  const sidebar = document.querySelector('.docs-sidebar');
  const overlay = document.querySelector('.docs-overlay');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const search = document.querySelector('#docsSearch');
  const results = document.querySelector('#docsSearchResults');
  const backTop = document.querySelector('#backTop');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const searchable = [...document.querySelectorAll('.doc-article h1, .doc-article h2, .doc-article h3')];

  // Font size uses the native academy.css preference token.
  const savedSize = localStorage.getItem('wut1-font-size') || 'sm';
  html.dataset.academyFontSize = savedSize;
  document.querySelectorAll('[data-font-size]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.fontSize === savedSize);
    btn.addEventListener('click', () => {
      const size = btn.dataset.fontSize;
      html.dataset.academyFontSize = size;
      localStorage.setItem('wut1-font-size', size);
      document.querySelectorAll('[data-font-size]').forEach(x => x.classList.toggle('active', x === btn));
    });
  });

  function closeMenu() {
    sidebar?.classList.remove('is-open');
    overlay?.classList.remove('show');
  }
  menuBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('is-open');
    overlay?.classList.toggle('show');
  });
  overlay?.addEventListener('click', closeMenu);
  navLinks.forEach(a => a.addEventListener('click', closeMenu));

  // Copy code blocks.
  document.querySelectorAll('[data-copy-code]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.parentElement?.querySelector('pre code')?.innerText || '';
      try {
        await navigator.clipboard.writeText(code);
        const old = btn.textContent;
        btn.textContent = '已複製';
        setTimeout(() => btn.textContent = old, 900);
      } catch {
        btn.textContent = '請手動複製';
      }
    });
  });

  // A generated cross-chapter index keeps search available even from file://.
  const generatedIndex = Array.isArray(window.ACADEMY_SEARCH_INDEX) ? window.ACADEMY_SEARCH_INDEX : null;
  const index = generatedIndex || searchable.map(h => {
    let text = h.textContent.replace('#','').trim();
    let node = h.nextElementSibling;
    let count = 0;
    while (node && !/^H[1-3]$/.test(node.tagName) && count < 5) {
      text += ' ' + (node.innerText || '');
      node = node.nextElementSibling;
      count += 1;
    }
    return { id: h.id, title: h.dataset.title || h.textContent.trim(), text: text.toLowerCase(), level: h.tagName };
  });

  function renderSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { results.classList.remove('show'); results.innerHTML=''; return; }
    const matches = index.filter(x => x.text.includes(q)).slice(0, 18);
    results.innerHTML = matches.length ? matches.map(x =>
      `<a class="docs-search-item" href="${x.href || `#${x.id}`}"><strong>${escapeHtml(x.title)}</strong><small>${x.pageTitle || (x.level === 'H1' ? 'Part' : x.level === 'H2' ? '章節' : '小節')}</small></a>`
    ).join('') : '<div class="p-3 text-secondary small">找不到符合內容。</div>';
    results.classList.add('show');
    results.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { results.classList.remove('show'); search.value=''; }));
  }
  function escapeHtml(s) { return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  search?.addEventListener('input', e => renderSearch(e.target.value));
  search?.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.remove('show'); search.blur(); }
    if (e.key === 'Enter') { const first = results.querySelector('a'); if (first) first.click(); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.docs-search-wrap')) results.classList.remove('show'); });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); search?.focus(); }
  });

  // Scrollspy without Bootstrap dependency on dynamic nested details.
  const sections = [...document.querySelectorAll('.doc-article h1[id], .doc-article h2[id]')];
  const sectionLinks = navLinks.filter(a => a.getAttribute('href').startsWith('#'));
  const linkById = new Map(sectionLinks.map(a => [a.getAttribute('href').slice(1), a]));
  let activeId = null;
  function updateActive() {
    const y = 90;
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top <= y) current = sec.id;
      else break;
    }
    if (current && current !== activeId) {
      activeId = current;
      sectionLinks.forEach(a => a.classList.remove('active'));
      const a = linkById.get(current);
      if (a) {
        a.classList.add('active');
        const details = a.closest('details');
        if (details) details.open = true;
      }
    }
    const scroller = document.querySelector('.docs-main');
    const top = scroller ? scroller.scrollTop : window.scrollY;
    backTop?.classList.toggle('show', top > 700);
  }
  const scroller = document.querySelector('.docs-main');
  (scroller || window).addEventListener('scroll', updateActive, {passive:true});
  updateActive();

  backTop?.addEventListener('click', () => (scroller || window).scrollTo({top:0, behavior:'smooth'}));
})();
