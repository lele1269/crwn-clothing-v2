/* ==========================================================================
   CRWN Learning Lab — motore condiviso (vanilla JS, nessuna dipendenza)
   Componenti: nav, tema, glossario, codice, ispettore, stepper, quiz,
   esercizi, calcolo XP/livelli.
   ========================================================================== */
(function () {
  const ROOT = document.body.dataset.root || '.';
  const MODULE = document.body.dataset.module || null;

  const store = {
    get(k, d) { try { const v = localStorage.getItem('lab:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('lab:' + k, JSON.stringify(v)); } catch (e) { /* storage non disponibile */ } },
  };

  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- XP & livelli (solo dal registro ufficiale) ---------------- */
  function allExercises() {
    return Object.values(window.LAB_EXERCISES || {}).flat();
  }
  function bestGrades() {
    const best = {};
    for (const v of (window.REGISTRO || {}).voti || []) {
      if (!best[v.ex] || v.voto > best[v.ex].voto) best[v.ex] = v;
    }
    return best;
  }
  function xpFor(ex, voto) { return voto >= 6 ? Math.round(ex.stars * 100 * voto / 10) : 0; }
  function totalXP() {
    const best = bestGrades();
    return allExercises().reduce((s, ex) => s + (best[ex.id] ? xpFor(ex, best[ex.id].voto) : 0), 0);
  }
  function levelFor(xp) {
    const L = window.LAB_LEVELS || [];
    let cur = L[0], next = null;
    for (let i = 0; i < L.length; i++) { if (xp >= L[i].xp) { cur = L[i]; next = L[i + 1] || null; } }
    return { cur, next };
  }
  function moduleStatus(mid) {
    const exs = (window.LAB_EXERCISES || {})[mid] || [];
    if (!exs.length) return { label: '—', done: 0, total: 0 };
    const best = bestGrades();
    const graded = exs.filter((e) => best[e.id]);
    const passed = exs.filter((e) => best[e.id] && best[e.id].voto >= 6);
    const avg = graded.length ? graded.reduce((s, e) => s + best[e.id].voto, 0) / graded.length : 0;
    let label = 'Non iniziato';
    if (graded.length) label = 'In corso';
    if (passed.length === exs.length && avg >= 7) label = 'Superato';
    const boss = exs.find((e) => e.stars === 5);
    if (label === 'Superato' && avg >= 8.5 && boss && best[boss.id] && best[boss.id].voto >= 8) label = 'Padroneggiato';
    return { label, done: passed.length, total: exs.length, avg };
  }

  /* ---------------- navigazione ---------------- */
  function buildNav() {
    const nav = document.getElementById('lab-nav');
    if (!nav) return;
    const xp = totalXP();
    const { cur, next } = levelFor(xp);
    const pct = next ? Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100) : 100;
    const here = location.pathname.split('/').slice(-2).join('/');
    const navList = (mods) => h('ul', {}, mods.map((m) => h('li', {},
        m.file
          ? h('a', { href: `${ROOT}/${m.file}`, 'aria-current': here.endsWith(m.file.split('/').slice(-2).join('/')) ? 'page' : false },
              h('b', {}, m.num), m.title, h('span', { class: 'tag' }, moduleStatus(m.id).total ? `${moduleStatus(m.id).done}/${moduleStatus(m.id).total}` : ''))
          : h('span', {}, h('b', {}, m.num), m.title, h('span', { class: 'tag' }, 'presto')))));
    nav.append(
      h('div', { class: 'brand' }, 'CRWN Learning Lab', h('small', {}, 'React · Firebase · Context')),
      h('div', { class: 'rank' },
        h('b', {}, `${cur.ic} ${cur.name}`),
        `${xp} XP ufficiali` + (next ? ` · ${next.xp - xp} al prossimo livello` : ''),
        h('div', { class: 'bar' }, h('i', { style: `width:${pct}%` }))),
      h('h4', {}, 'Percorso'),
      navList((window.LAB_MODULES || []).filter((m) => !m.group)),
      h('h4', {}, 'Toolkit'),
      navList((window.LAB_MODULES || []).filter((m) => m.group === 'toolkit')),
      h('h4', {}, 'Strumenti'),
      h('ul', {},
        h('li', {}, h('a', { href: `${ROOT}/index.html`, 'aria-current': /index\.html$|\/learning\/?$/.test(location.pathname) ? 'page' : false }, '📊 Dashboard e voti')),
        h('li', {}, h('a', { href: `${ROOT}/glossario.html`, 'aria-current': /glossario\.html$/.test(location.pathname) ? 'page' : false }, '📖 Glossario')),
        h('li', {}, h('a', { href: `${ROOT}/come-funziona.html`, 'aria-current': /come-funziona\.html$/.test(location.pathname) ? 'page' : false }, '🎓 Come vieni valutato'))),
      h('div', { class: 'theme' }, themeToggle()),
    );
    const btn = h('button', { class: 'btn menu-btn', 'aria-label': 'Apri menu', onclick: () => nav.classList.toggle('open') }, '☰ Menu');
    document.body.prepend(btn);
  }

  /* ---------------- tema ---------------- */
  function applyTheme(t) { if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.dataset.theme = t; }
  applyTheme(store.get('theme', 'auto'));
  function themeToggle() {
    const wrap = h('div', { class: 'seg', role: 'group', 'aria-label': 'Tema' });
    const cur = store.get('theme', 'auto');
    [['auto', 'Auto'], ['light', 'Chiaro'], ['dark', 'Scuro']].forEach(([v, l]) => {
      const b = h('button', { class: v === cur ? 'on' : '', onclick: () => {
        store.set('theme', v); applyTheme(v); wrap.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      } }, l);
      wrap.append(b);
    });
    return wrap;
  }

  /* ---------------- glossario inline ---------------- */
  function glossary() {
    const G = window.LAB_GLOSSARY || {};
    let pop = null;
    const close = () => { if (pop) { pop.remove(); pop = null; } };
    document.querySelectorAll('dfn[data-term]').forEach((el) => {
      const g = G[el.dataset.term];
      if (!g) return;
      el.tabIndex = 0;
      const open = () => {
        close();
        pop = h('div', { class: 'gloss-pop', role: 'tooltip' }, h('b', {}, g.t), g.d);
        document.body.append(pop);
        const r = el.getBoundingClientRect();
        const left = Math.max(8, Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - 356));
        pop.style.left = left + 'px';
        pop.style.top = (window.scrollY + r.bottom + 6) + 'px';
      };
      el.addEventListener('mouseenter', open);
      el.addEventListener('focus', open);
      el.addEventListener('mouseleave', close);
      el.addEventListener('blur', close);
    });
  }

  /* ---------------- blocchi di codice ---------------- */
  const KW = /\b(const|let|var|async|await|return|if|else|try|catch|throw|new|import|from|export|function|default|for|of|in|typeof|null|undefined|true|false)\b/g;
  function highlight(line) {
    let out = esc(line);
    const parts = [];
    // proteggi commenti e stringhe con segnaposto
    out = out.replace(/(\/\/.*$)/, (m) => { parts.push(`<span class="tk-c">${m}</span>`); return `\u0000${parts.length - 1}\u0000`; });
    out = out.replace(/(&#39;|'|`|&quot;)(.*?)\1/g, (m) => { parts.push(`<span class="tk-s">${m}</span>`); return `\u0000${parts.length - 1}\u0000`; });
    out = out.replace(KW, '<span class="tk-k">$1</span>');
    out = out.replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="tk-f">$1</span>');
    out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => parts[i]);
    return out;
  }
  function renderCode(pre) {
    if (pre.dataset.ready) return;
    const start = +(pre.dataset.start || 1);
    const src = pre.textContent.replace(/^\n/, '').replace(/\s+$/, '');
    pre.innerHTML = src.split('\n').map((l, i) => `<span class="ln" data-n="${start + i}">${highlight(l) || ' '}</span>`).join('');
    pre.dataset.ready = '1';
  }
  function setLines(pre, lines) {
    if (!pre) return;
    const set = new Set();
    (lines || []).forEach((x) => {
      if (Array.isArray(x)) for (let i = x[0]; i <= x[1]; i++) set.add(i); else set.add(x);
    });
    pre.classList.toggle('focus', set.size > 0);
    pre.querySelectorAll('.ln').forEach((ln) => ln.classList.toggle('hl', set.has(+ln.dataset.n)));
    const first = pre.querySelector('.ln.hl');
    if (first) pre.scrollTop = Math.max(0, first.offsetTop - 40);
  }

  /* codice annotato: <div class="annot"><pre class="code">…</pre><ol><li data-lines="3-5">…</li></ol></div> */
  function annotations() {
    document.querySelectorAll('.annot').forEach((box) => {
      const pre = box.querySelector('pre.code');
      box.querySelectorAll('ol li[data-lines]').forEach((li) => {
        const lines = li.dataset.lines.split(',').map((p) => p.includes('-') ? p.split('-').map(Number) : +p);
        const act = () => { box.querySelectorAll('li').forEach((x) => x.classList.toggle('active', x === li)); setLines(pre, lines); };
        li.addEventListener('mouseenter', act);
        li.addEventListener('click', act);
      });
      box.addEventListener('mouseleave', () => { setLines(pre, []); box.querySelectorAll('li').forEach((x) => x.classList.remove('active')); });
    });
  }

  /* ---------------- ispettore dati ----------------
     Convenzioni nei valori: "ƒ nome()" = funzione, "⏳ Promise<…>" = promise pendente,
     chiave che inizia con "~" = evidenziata come appena cambiata. */
  function inspect(value, key, depth = 0) {
    const changed = key && key.startsWith('~');
    const k = changed ? key.slice(1) : key;
    const keyHtml = k != null ? `<span class="k">${esc(k)}</span>: ` : '';
    const wrapCls = changed ? ' changed' : '';
    if (value === null) return `<div class="row${wrapCls}">${keyHtml}<span class="nl">null</span></div>`;
    if (value === undefined) return `<div class="row${wrapCls}">${keyHtml}<span class="nl">undefined</span></div>`;
    if (typeof value === 'string') {
      if (value.startsWith('ƒ ') || value.startsWith('⏳')) return `<div class="row${wrapCls}">${keyHtml}<span class="fn">${esc(value)}</span></div>`;
      return `<div class="row${wrapCls}">${keyHtml}<span class="s">"${esc(value)}"</span></div>`;
    }
    if (typeof value === 'number') return `<div class="row${wrapCls}">${keyHtml}<span class="n">${value}</span></div>`;
    if (typeof value === 'boolean') return `<div class="row${wrapCls}">${keyHtml}<span class="b">${value}</span></div>`;
    const isArr = Array.isArray(value);
    const entries = isArr ? value.map((v, i) => [String(i), v]) : Object.entries(value).filter(([kk]) => kk !== '__type');
    const type = value.__type || (isArr ? `Array(${value.length})` : 'Object');
    const inner = entries.map(([kk, vv]) => inspect(vv, kk, depth + 1)).join('');
    return `<details ${depth < 2 ? 'open' : ''} class="${wrapCls}"><summary>${keyHtml}<span class="ty">${esc(type)}</span></summary>${inner}</details>`;
  }
  function renderInspector(el, obj) { el.innerHTML = `<div class="insp">${obj == null ? '<span class="nl">—</span>' : inspect(obj)}</div>`; }

  /* ---------------- stepper ----------------
     Lab.stepper('#id', { title, svg:'#svgTemplateId', code:'#preId'|null,
       variants:{ key:{label, steps:[…]} } | steps:[…] })
     step = { title, text (html), on:[nodi], hot:[nodi], lines:[n|[a,b]], dataLabel, data } */
  function stepper(sel, cfg) {
    const root = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!root) return;
    root.classList.add('stepper');
    const variants = cfg.variants || { main: { label: '', steps: cfg.steps } };
    let vKey = Object.keys(variants)[0];
    let i = 0, timer = null;

    const svgHost = h('div', { class: 'st-stage' });
    const tpl = document.querySelector(cfg.svg);
    svgHost.innerHTML = tpl ? tpl.innerHTML : '';
    const narr = h('div', { class: 'st-narr' });
    const data = h('div', { class: 'st-data' });
    const codeHost = h('div', { class: 'st-code' });
    if (cfg.code) { const src = document.querySelector(cfg.code); const pre = src.cloneNode(true); pre.removeAttribute('id'); pre.hidden = false; codeHost.append(pre); renderCode(pre); }
    const dots = h('div', { class: 'st-dots' });
    const prev = h('button', { class: 'btn', onclick: () => go(i - 1), 'aria-label': 'Passo precedente' }, '◀');
    const next = h('button', { class: 'btn primary', onclick: () => go(i + 1), 'aria-label': 'Passo successivo' }, 'Avanti ▶');
    const play = h('button', { class: 'btn', onclick: togglePlay }, '▶ Auto');
    const reset = h('button', { class: 'btn', onclick: () => { stop(); go(0); } }, '↺');
    const head = h('div', { class: 'st-head' }, h('div', { class: 'st-title' }, cfg.title || 'Animazione'));
    if (Object.keys(variants).length > 1) {
      const seg = h('div', { class: 'seg' });
      Object.entries(variants).forEach(([k, v]) => {
        seg.append(h('button', { class: k === vKey ? 'on' : '', onclick: (e) => {
          vKey = k; seg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === e.currentTarget)); stop(); buildDots(); go(0);
        } }, v.label));
      });
      head.append(seg);
    }
    head.append(dots, prev, next, play, reset);
    root.append(head, svgHost, h('div', { class: 'st-body' }, narr, data));
    if (cfg.code) root.append(codeHost);

    function steps() { return variants[vKey].steps; }
    function buildDots() {
      dots.innerHTML = '';
      steps().forEach((_, n) => dots.append(h('button', { 'aria-label': `Passo ${n + 1}`, onclick: () => { stop(); go(n); } })));
    }
    function go(n) {
      const S = steps();
      i = Math.max(0, Math.min(S.length - 1, n));
      const s = S[i];
      root.classList.toggle('running', !!(s.on && s.on.length));
      svgHost.querySelectorAll('[data-node]').forEach((el) => {
        const id = el.dataset.node;
        el.classList.toggle('is-on', (s.on || []).includes(id) || (s.hot || []).includes(id));
        el.classList.toggle('is-hot', (s.hot || []).includes(id));
      });
      svgHost.querySelectorAll('[data-flow]').forEach((el) => el.classList.toggle('flow', (s.hot || []).includes(el.dataset.node)));
      narr.innerHTML = `<div class="st-n">PASSO ${i + 1} / ${S.length}</div><h4>${s.title}</h4>${s.text}`;
      data.innerHTML = `<div class="lbl">${s.dataLabel || 'Dati in questo momento'}</div>`;
      const dbox = h('div'); data.append(dbox); renderInspector(dbox, s.data);
      setLines(codeHost.querySelector('pre'), s.lines);
      dots.querySelectorAll('button').forEach((b, n) => b.classList.toggle('on', n === i));
      prev.disabled = i === 0;
      next.disabled = i === S.length - 1;
      if (i === S.length - 1) stop();
    }
    function stop() { clearInterval(timer); timer = null; play.textContent = '▶ Auto'; }
    function togglePlay() {
      if (timer) return stop();
      if (i === steps().length - 1) go(0);
      play.textContent = '❚❚ Pausa';
      timer = setInterval(() => go(i + 1), 3800);
    }
    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
    buildDots(); go(0);
  }

  /* ---------------- quiz ----------------
     Lab.quiz('#id', { id, type:'choice'|'order', question, code?,
        options:[{t, ok, why}]  (choice)
        items:[...in ordine giusto], why  (order)
        explain: spiegazione finale passo-passo (array di stringhe html) })
     Conta SOLO il primo tentativo: è quello che misura cosa sapevi davvero. */
  function quiz(sel, q) {
    const root = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!root) return;
    root.classList.add('quiz');
    root.dataset.quizId = q.id;
    const key = 'quiz:' + q.id;
    const saved = store.get(key, null);
    const res = h('span', { class: 'res' });
    root.append(h('div', { class: 'q-head' }, h('span', {}, q.type === 'order' ? 'Metti in ordine' : 'Domanda'), res));
    root.append(h('div', { class: 'q-text', html: q.question }));
    if (q.code) { const pre = h('pre', { class: 'code' }, q.code); root.append(pre); renderCode(pre); }
    const fb = h('div', { class: 'fb' });
    const showResult = (first) => {
      res.innerHTML = first ? '<span style="color:var(--good)">✔ al primo tentativo</span>' : '<span style="color:var(--bad)">✘ primo tentativo sbagliato</span>';
    };
    const explain = () => (q.explain || []).map((s) => `<span class="step">${s}</span>`).join('');
    const record = (ok) => { if (store.get(key, null) == null) { store.set(key, ok); showResult(ok); } };
    if (saved != null) showResult(saved);

    if (q.type === 'order') {
      const pool = h('div', { class: 'order-pool' });
      const picked = h('div', { class: 'order-picked' });
      const shuffled = q.items.map((t, idx) => ({ t, idx })).sort(() => Math.random() - 0.5);
      const refill = () => {
        pool.innerHTML = ''; picked.innerHTML = '';
        shuffled.forEach((it) => pool.append(h('button', { class: 'chip', onclick: (e) => picked.append(e.currentTarget) }, it.t)));
        shuffled.forEach((it, n) => { pool.children[n].dataset.idx = it.idx; });
      };
      refill();
      const check = h('button', { class: 'btn primary', onclick: () => {
        const order = [...picked.children].map((c) => +c.dataset.idx);
        if (order.length !== q.items.length) { fb.innerHTML = '<div class="callout warn">Metti tutti i blocchi prima di verificare.</div>'; return; }
        const ok = order.every((v, n) => v === n);
        record(ok);
        if (ok) fb.innerHTML = `<div class="callout good"><span class="title">Corretto.</span>${explain()}</div>`;
        else {
          const firstWrong = order.findIndex((v, n) => v !== n);
          fb.innerHTML = `<div class="callout bad"><span class="title">Non ancora. Il primo blocco fuori posto è il n° ${firstWrong + 1}.</span>
            Chiediti: <i>"per fare questo passo, di cosa ho bisogno? È già stato prodotto da un passo precedente?"</i>
            ${q.why ? `<span class="step">${q.why}</span>` : ''}</div>`;
        }
      } }, 'Verifica');
      root.append(h('div', { class: 'muted', style: 'font-size:13px;color:var(--muted)' }, 'Clicca i blocchi nell\'ordine in cui vengono eseguiti:'), pool, h('div', { style: 'font-size:13px;color:var(--muted)' }, 'La tua sequenza:'), picked,
        h('div', { style: 'display:flex;gap:8px' }, check, h('button', { class: 'btn', onclick: () => { refill(); fb.innerHTML = ''; } }, 'Ricomincia')), fb);
      return;
    }

    const opts = h('div', { class: 'opts' });
    q.options.forEach((o) => {
      const b = h('button', { class: 'opt', html: o.t, onclick: () => {
        record(!!o.ok);
        if (o.ok) {
          b.classList.add('right');
          opts.querySelectorAll('.opt').forEach((x) => { x.disabled = true; });
          fb.innerHTML = `<div class="callout good"><span class="title">Corretto.</span>${o.why ? o.why : ''}${explain()}</div>`;
        } else {
          b.classList.add('wrong'); b.disabled = true;
          fb.innerHTML = `<div class="callout bad"><span class="title">No. Vediamo perché questa idea non regge:</span>${o.why || ''}
            <span class="step">Riprova: quale delle risposte rimaste è coerente con quello che hai appena letto?</span></div>`;
        }
      } });
      opts.append(b);
    });
    root.append(opts, fb);
  }

  /* ---------------- esercizi del modulo ---------------- */
  function exercises(sel, mid) {
    const root = document.querySelector(sel);
    if (!root) return;
    const best = bestGrades();
    const all = (window.REGISTRO || {}).voti || [];
    ((window.LAB_EXERCISES || {})[mid] || []).forEach((ex) => {
      const b = best[ex.id];
      const attempts = all.filter((v) => v.ex === ex.id);
      const st = !b ? ['', 'da consegnare'] : b.voto >= 6 ? ['pass', `voto ${b.voto}/10 · ${xpFor(ex, b.voto)} XP`] : ['fail', `voto ${b.voto}/10 · da rifare`];
      const hintsUsed = store.get('hints:' + ex.id, 0);
      const body = h('div', { class: 'ex-body' },
        h('p', {}, h('b', {}, 'Obiettivo: '), ex.goal),
        ex.quiz
          ? h('p', {}, h('b', {}, 'Come si fa: '), 'nel terminale lancia ', h('code', {}, `node learning/esercizi/quiz.mjs ${ex.id}`), '. Un blocco alla volta: prevedi, spiega, confronta. Niente file da modificare; le risposte si salvano da sole.')
          : h('p', {}, h('b', {}, 'File: '), h('code', {}, `learning/${ex.file}`)),
        ex.quiz
          ? h('p', {}, h('b', {}, 'Verifica: '), 'automatica, subito dopo ogni previsione. Apici, virgole e parentesi non contano: contano valori e ordine.')
          : ex.runnable
          ? h('p', {}, h('b', {}, 'Autoverifica: '), h('code', {}, `node learning/esercizi/verifica.mjs ${ex.id}`), ' — i test ti dicono se FUNZIONA. Il voto valuta anche se hai CAPITO.')
          : h('p', {}, h('b', {}, 'Autoverifica: '), 'nessun test automatico, si valuta il ragionamento scritto.'),
        h('p', {}, h('b', {}, 'Consegna: '), 'scrivi in Claude Code ', h('code', {}, `correggi ${ex.id}`), '. Dichiara nel file quanti aiuti hai aperto: incide sul voto di autonomia.'),
      );
      ex.hints.forEach((t, n) => {
        const d = h('details', { class: 'hint' }, h('summary', {}, `Aiuto ${n + 1}${n === ex.hints.length - 1 ? ' (il più esplicito)' : ''}`), h('p', {}, t));
        if (n < hintsUsed) d.open = true;
        d.addEventListener('toggle', () => { if (d.open) store.set('hints:' + ex.id, Math.max(store.get('hints:' + ex.id, 0), n + 1)); });
        body.append(d);
      });
      attempts.forEach((a) => body.append(h('div', { class: 'verdict', html:
        `<b>Tentativo ${a.tentativo} · ${a.data} · voto ${a.voto}/10</b><br>
         Correttezza ${a.rubrica.correttezza}/4 · Logica ${a.rubrica.logica}/3 · Qualità ${a.rubrica.qualita}/2 · Autonomia ${a.rubrica.autonomia}/1<br>
         ${esc(a.verdetto)}${a.feedback ? `<br><a href="${ROOT}/${a.feedback}">Leggi la correzione completa →</a>` : ''}` })));
      root.append(h('details', { class: 'ex' },
        h('summary', {}, h('span', { class: 'stars' }, '★'.repeat(ex.stars) + '☆'.repeat(5 - ex.stars)),
          h('span', { class: 'ex-title' }, ex.title, h('small', {}, ex.id)), h('span', { class: 'status ' + st[0] }, st[1])),
        body));
    });
  }

  /* ---------------- punteggio allenamento (quiz) di pagina ---------------- */
  function quizScore(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    const ids = [...document.querySelectorAll('.quiz')].length;
    const update = () => {
      const qs = [...document.querySelectorAll('[data-quiz-id]')].map((n) => store.get('quiz:' + n.dataset.quizId, null));
      const done = qs.filter((x) => x != null).length;
      const ok = qs.filter((x) => x === true).length;
      el.innerHTML = `<b>Allenamento:</b> ${ok}/${ids} giuste al primo tentativo · ${done}/${ids} affrontate.
        ${done === ids ? (ok / ids >= 0.8 ? ' Base solida: passa agli esercizi.' : ' Sotto l\'80%: rileggi le sezioni dove hai sbagliato PRIMA di fare gli esercizi, altrimenti costruisci su sabbia.') : ''}`;
    };
    document.addEventListener('click', () => setTimeout(update, 0));
    update();
  }

  window.Lab = { h, store, stepper, quiz, exercises, quizScore, renderCode, renderInspector, totalXP, levelFor, bestGrades, xpFor, moduleStatus, allExercises };

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    document.querySelectorAll('pre.code:not([hidden])').forEach(renderCode);
    annotations();
    glossary();
  });
})();
