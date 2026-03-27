/* Portfolio — Aashika Dallakoti — script.js */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Live clear errors on input — Demo Form
  [['demoName', 'demoNameErr'], ['demoEmail', 'demoEmailErr']].forEach(([id, eid]) => {
    const el = document.getElementById(id);
    const er = document.getElementById(eid);
    if (!el || !er) return;
    el.addEventListener('input', () => {
      el.classList.remove('input-error');
      er.textContent = '';
      er.style.display = 'none';
    });
  });

  // Live clear errors on input — Contact Form
  [['cName', 'cNameErr'], ['cEmail', 'cEmailErr'], ['cMsg', 'cMsgErr']].forEach(([id, eid]) => {
    const el = document.getElementById(id);
    const er = document.getElementById(eid);
    if (!el || !er) return;
    el.addEventListener('input', () => {
      el.classList.remove('input-error');
      er.textContent = '';
      er.style.display = 'none';
    });
  });

  // Skill bars
  document.querySelectorAll('.skill-bar').forEach(el => {
    el.style.width = (el.dataset.w || 50) + '%';
  });

  // CSS range display
  ['R', 'P', 'Fs'].forEach(k => {
    const inp = document.getElementById('d' + k);
    const out = document.getElementById('d' + k + 'v');
    if (inp && out) inp.addEventListener('input', () => { out.textContent = inp.value; });
  });

  // Seed to-do list
  const inp = document.getElementById('todoInput');
  if (inp) {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
    seedTodos();
  }
});


/* ─── HELPER ─────────────────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(fieldEl, errEl, msg) {
  fieldEl.classList.add('input-error');
  errEl.textContent = msg;
  errEl.style.display = 'block';
}

function clearError(fieldEl, errEl) {
  fieldEl.classList.remove('input-error');
  errEl.textContent = '';
  errEl.style.display = 'none';
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


/* ─── DEMO FORM ──────────────────────────────────────── */
function submitDemoForm() {
  const n   = document.getElementById('demoName');
  const e   = document.getElementById('demoEmail');
  const ne  = document.getElementById('demoNameErr');
  const ee  = document.getElementById('demoEmailErr');
  const ok  = document.getElementById('demoSuccess');
  const btn = document.getElementById('demoSubmitBtn');

  // Guard — elements might not exist on this page
  if (!n || !e || !ne || !ee || !ok || !btn) return;

  // Reset previous state
  clearError(n, ne);
  clearError(e, ee);
  ok.style.display = 'none';

  let hasError = false;

  // Name validation
  if (!n.value.trim()) {
    showError(n, ne, '⚠ Name is required.');
    hasError = true;
  }

  // Email validation
  if (!e.value.trim()) {
    showError(e, ee, '⚠ Email is required.');
    hasError = true;
  } else if (!EMAIL_REGEX.test(e.value.trim())) {
    showError(e, ee, '⚠ Please enter a valid email (e.g. you@email.com).');
    hasError = true;
  }

  if (hasError) return;

  // Simulate submission
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Submit';
    btn.disabled = false;
    n.value = '';
    e.value = '';
    ok.style.display = 'flex';
    setTimeout(() => ok.style.display = 'none', 4500);
  }, 900);
}


/* ─── CONTACT FORM ───────────────────────────────────── */
function handleContact(ev) {
  ev.preventDefault();

  const n   = document.getElementById('cName');
  const e   = document.getElementById('cEmail');
  const m   = document.getElementById('cMsg');
  const ne  = document.getElementById('cNameErr');
  const ee  = document.getElementById('cEmailErr');
  const me  = document.getElementById('cMsgErr');
  const ok  = document.getElementById('formOk');
  const btn = document.getElementById('sendBtn');

  // Guard — elements might not exist on this page
  if (!n || !e || !m || !ne || !ee || !me || !ok || !btn) return;

  // Reset previous state
  clearError(n, ne);
  clearError(e, ee);
  clearError(m, me);
  ok.style.display = 'none';

  let hasError = false;

  // Name validation
  if (!n.value.trim()) {
    showError(n, ne, '⚠ Your name is required.');
    hasError = true;
  }

  // Email validation
  if (!e.value.trim()) {
    showError(e, ee, '⚠ Email is required.');
    hasError = true;
  } else if (!EMAIL_REGEX.test(e.value.trim())) {
    showError(e, ee, '⚠ Enter a valid email (e.g. you@company.com).');
    hasError = true;
  }

  // Message validation
  if (!m.value.trim()) {
    showError(m, me, '⚠ Please write a message.');
    hasError = true;
  }

  if (hasError) return;

  // Simulate submission
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message ➤';
    btn.disabled = false;
    ev.target.reset();
    ok.style.display = 'flex';
    setTimeout(() => ok.style.display = 'none', 5000);
  }, 1200);
}


/* ─── COUNTER ────────────────────────────────────────── */
let count = 0;

function changeCount(n) {
  count = n === 0 ? 0 : count + n;
  const el = document.getElementById('counterVal');
  if (!el) return;
  el.textContent = count;
  el.style.color = count > 0 ? '#6dbfa8' : count < 0 ? '#e89090' : '#6e4fa0';
}


/* ─── TO-DO ──────────────────────────────────────────── */
function seedTodos() {
  const seeds = [
    'Learn HTML5 semantics',
    'Practice CSS Flexbox & Grid',
    'Build a JavaScript project',
    'Explore Bootstrap components'
  ];
  seeds.forEach(t => {
    const inp = document.getElementById('todoInput');
    if (!inp) return;
    inp.value = t;
    addTodo();
  });
}

function addTodo() {
  const inp  = document.getElementById('todoInput');
  const list = document.getElementById('todoList');
  if (!inp || !list) return;

  const text = inp.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <input type="checkbox" onchange="this.closest('.todo-item').classList.toggle('done', this.checked)">
    <span>${esc(text)}</span>
    <button class="todo-del" onclick="this.closest('.todo-item').remove()">&#10005;</button>
  `;
  list.appendChild(li);
  inp.value = '';
}


/* ─── COLOUR CHANGER ─────────────────────────────────── */
function pickColor(el) {
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const box = document.getElementById('colorBox');
  if (!box) return;
  box.style.background = el.dataset.color;
  box.textContent = `${el.dataset.name}  ${el.dataset.color}`;
}


/* ─── QUOTES ─────────────────────────────────────────── */
const quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Any fool can write code a computer understands. Good programmers write code humans can understand.', author: 'Martin Fowler' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: "Code is like humour. When you have to explain it, it's bad.", author: 'Cory House' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
];
let lastQ = 0;

function newQuote() {
  let i;
  do { i = Math.floor(Math.random() * quotes.length); } while (i === lastQ);
  lastQ = i;
  const qt = document.getElementById('quoteText');
  const qa = document.getElementById('quoteAuthor');
  if (qt) qt.textContent = `"${quotes[i].text}"`;
  if (qa) qa.textContent = `— ${quotes[i].author}`;
}


/* ─── BOOTSTRAP TAB ──────────────────────────────────── */
function setTab(el) {
  document.querySelectorAll('.bs-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}


/* ─── CSS LIVE EDITOR ────────────────────────────────── */
function updateDemo() {
  const box = document.getElementById('liveBox');
  if (!box) return;
  const bg = document.getElementById('dBg')?.value  || '#d8ccf5';
  const r  = document.getElementById('dR')?.value   || '14';
  const p  = document.getElementById('dP')?.value   || '20';
  const fs = document.getElementById('dFs')?.value  || '16';
  box.style.background    = bg;
  box.style.borderRadius  = r  + 'px';
  box.style.padding       = p  + 'px';
  box.style.fontSize      = fs + 'px';
}