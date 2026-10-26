/* ===== 永無島的失落篇章：公主、謊言與隱密樹屋 — 遊戲主程式 ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const IMG = n => `assets/img/${n}.webp`;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];

/* ---------- 角色與台詞 ---------- */
const PARTNERS = {
  tiger: { name: '虎蓮公主', img: 'tiger_lily', tag: '帶著刺青地圖的勇敢公主',
    hello: '我是虎蓮。叢林裡每一條路，都刻在我手臂的刺青上。跟緊我，別讓海盜的謊言騙了你！',
    right: ['很好！我的刺青又亮了一條林道，叢林之神都在為你點頭。', '你的眼睛像老鷹一樣銳利，海盜的陷阱騙不了你！', '哈！史密要是看到，一定氣得把帽子吃掉。', '答得漂亮！今晚營火會，我請你吃最大塊的烤玉米！'],
    wrong: ['別洩氣，連最厲害的獵人也會踩到樹枝。深呼吸，再看一次。', '哼，又是海盜的詭計！記住這個陷阱，下次就不會上當了。', '刺青暗了一下……沒關係，勇士是在跌倒中長大的。', '這題連老鷹都會看走眼，我們下一題討回來！'] },
  john: { name: '約翰', img: 'john_darling', tag: '推眼鏡、握雨傘的小智囊',
    hello: '咳咳，在下約翰·達林。根據我的精密計算，跟著我答題的正確率會提高百分之八十七……大概。',
    right: ['（推眼鏡）完全正確！這跟我在百科全書上讀到的一模一樣。', '精彩！容我用雨傘向你致上最高敬意。', '邏輯嚴謹、推理清楚——你簡直是我的知己！', '答對了！我要把這一題記進我的冒險筆記第三十七頁。'],
    wrong: ['嗯……（推眼鏡）根據我的觀察，這應該是海盜故意寫錯的。', '別緊張，紳士偶爾也會失手，重點是保持優雅。', '我的眼鏡起霧了……喔不，是這題真的很難。', '依我推論，錯誤是通往真理的必經之路！……書上是這麼說的。'] },
  twins: { name: '雙胞胎', img: 'the_twins', tag: '一起說話的馬默杜克與墨斯',
    hello: '我是馬默杜克！——我是墨斯！——我們被困在沼澤好久了，你一定要救我們出去喔！',
    right: ['「答對了！」「我先說的！」「明明是我！」……總之你超厲害！', '馬默杜克：好帥！墨斯：比我還帥！馬默杜克：那不可能。', '我們兩個一起給你雙倍的掌聲！啪啪！啪啪！', '耶～迷霧散掉一點了！我們好像看到你頭上有光環！'],
    wrong: ['「是你害的！」「明明是你！」……啊，原來是史密的告示牌害的。', '沒關係，我們兩個加起來也常常答錯，嘿嘿。', '馬默杜克：我也選那個！墨斯：我也是！……我們三個都錯了。', '別難過，我們在沼澤裡迷路了一百次，還不是好好的！'] },
  wendy: { name: '溫蒂', img: 'wendy_darling', tag: '溫柔會說故事的大姊姊',
    hello: '你好，我是溫蒂。不管叢林多黑多可怕，只要我們在一起，就像在講一個勇敢的故事喔。',
    right: ['太棒了！這一段我一定要寫進今晚的睡前故事裡。', '你真了不起！連約翰都會想跟你請教呢。', '答得好！我好像看見故事裡的主角，正是你呀。', '好厲害！麥克要是在，一定會抱著小熊為你歡呼！'],
    wrong: ['沒關係，每個好故事裡，主角都會遇到小小的挫折。', '慢慢來，我陪著你。我們一起把題目再讀一遍好嗎？', '別擔心，媽媽說過，錯誤是讓我們變聰明的小禮物。', '深呼吸～想一想快樂的事，下一題你一定可以的！'] },
};
const CAST = { tiger: 'tiger_lily', john: 'john_darling', twins: 'the_twins', wendy: 'wendy_darling', smee: 'pirate_smee', hook: 'captain_hook', michael: 'michael_darling', slightly: 'slightly', tootles: 'tootles', peter: 'peter_pan', tink: 'tinker_bell', boys: 'lost_boys' };

/* ---------- 關卡設定 ---------- */
const STAGES = [
  { name: '第一關　虎蓮公主的刺青解密', short: '刺青解密', bg: 'native_american_camp', inds: ['4-Ⅱ-2', '4-Ⅱ-3', '4-Ⅱ-4'],
    story: [
      { who: '旁白', text: '男孩們來到錯綜複雜的叢林入口，一塊古老的石碑擋住了去路，上面的字被塗改得亂七八糟。' },
      { who: '約翰', img: 'john', side: 'left', text: '（推眼鏡）這些字全是錯的！一定是海盜搞的鬼……我們需要一張真正的地圖！' },
      { who: '虎蓮公主', img: 'tiger', side: 'right', text: '別慌。看，我手臂上的刺青在發光——它對應著石碑上的字。' },
      { who: '虎蓮公主', img: 'tiger', side: 'right', text: '{name}，幫我分辨哪些字被海盜寫錯了。每答對一題，刺青就會在地圖上開出一條正確的林道！' } ] },
  { name: '第二關　海盜史密的混亂告示牌', short: '混亂告示牌', bg: 'misty_forest', inds: ['4-Ⅱ-1', '4-Ⅱ-5', '四字語詞'],
    story: [
      { who: '旁白', text: '林道通往一片充滿迷霧的藤蔓沼澤，四周插滿了歪歪斜斜的告示牌。' },
      { who: '史密', img: 'smee', side: 'right', text: '嘿嘿嘿～「危險」寫成「安全」、「前進」寫成「後退」，船長一定會誇獎我的！' },
      { who: '雙胞胎', img: 'twins', side: 'left', text: '救命啊——！我們照著告示牌走，結果越走越深，出不去啦！' },
      { who: '虎蓮公主', img: 'tiger', side: 'left', text: '是史密顛倒是非的告示牌！{name}，把錯誤的詞語改回來，迷霧就會散開！' } ] },
  { name: '第三關　隱密樹屋的對聯機關', short: '對聯機關', bg: 'lost_boys_underground_home', inds: ['5-Ⅱ-2', '5-Ⅱ-4', '5-Ⅱ-5', '5-Ⅱ-6', '5-Ⅱ-8'],
    story: [
      { who: '旁白', text: '救出雙胞胎後，大家終於來到通往失落男孩總部的巨石機關門前。' },
      { who: '虎克船長', img: 'hook', side: 'right', text: '哈哈哈！我已經在門上施了魔法，所有句子都碎得七零八落，你們永遠進不去啦！' },
      { who: '溫蒂', img: 'wendy', side: 'left', text: '別怕，句子碎了，我們就把它們拼回來。好故事一定有圓滿的結局！' },
      { who: '虎蓮公主', img: 'tiger', side: 'left', text: '找出門上的修辭，把碎掉的句子重組好，神祕之門就會打開！' } ] },
];
const ENDING = [
  { who: '旁白', text: '最後一句話拼好的瞬間，巨石門轟隆隆地打開了，溫暖的燈光從樹屋裡灑出來！' },
  { who: '虎克船長', img: 'hook', side: 'right', text: '可、可惡！竟然被一群小鬼破解了！史密，撤退——！' },
  { who: '虎蓮公主', img: 'tiger', side: 'left', text: '{name}，你看穿了海盜所有的謊言。從今天起，你就是我們部落的榮譽勇士！' },
  { who: '約翰', img: 'john', side: 'left', text: '（推眼鏡）根據我的紀錄，這是永無島史上最精彩的一次保衛戰！' },
  { who: '彼得潘', img: 'peter', side: 'right', text: '幹得好，{name}！樹屋保住了！這張證書是給你的！' } ];
const PROLOGUE = '當男孩們漸漸適應了島上的生活，真正的冒險開始了。\n海盜史密奉虎克船長的命令，在密林裡四處張貼錯誤的告示牌，想把島上的居民通通弄暈，好趁機佔領整座島。\n約翰推了推眼鏡：「我們需要一張真正的地圖！」強悍的虎蓮公主現身了，她手臂上的古老刺青正是破案的關鍵。你，願意一起修正海盜的文字陷阱、保衛隱密樹屋嗎？';
const DIFF = { 25: { name: '叢林探險隊', lives: 5 }, 40: { name: '部落勇士', lives: 7 }, 50: { name: '樹屋守護者', lives: 10 } };
const FEATHER_COLORS = [['#ff7a45', '#c2410c'], ['#3ecf9a', '#0f7a55'], ['#5aa9ff', '#1d5fb8']];
const gummy = (k, lost) => { const [c, d] = FEATHER_COLORS[k % 3]; return `<svg class="gummy feather${lost ? ' lost' : ''}" viewBox="0 0 24 48" aria-hidden="true"><path d="M12 2 C22 12 22 30 12 40 C2 30 2 12 12 2 Z" fill="${c}" stroke="${d}" stroke-width="1.4"/><path d="M12 6 L12 46" stroke="#fff3d6" stroke-width="1.6" stroke-linecap="round"/><path d="M12 14 L6 10 M12 20 L5 16 M12 26 L6 23 M12 14 L18 10 M12 20 L19 16 M12 26 L18 23" stroke="${d}" stroke-width="1" opacity=".7"/><path d="M12 30 C14 33 16 34 18 34 M12 30 C10 33 8 34 6 34" stroke="#f7c948" stroke-width="1.4" fill="none"/></svg>`; };
const IND_NAME = { '4-Ⅱ-1': '常用字詞', '4-Ⅱ-2': '共同部件', '4-Ⅱ-3': '查字辭典', '4-Ⅱ-4': '形近音近字', '4-Ⅱ-5': '字義推詞義', '5-Ⅱ-2': '標點符號', '5-Ⅱ-4': '句子與段落', '5-Ⅱ-5': '文本特徵', '5-Ⅱ-6': '摘要大意', '5-Ⅱ-8': '閱讀理解', '四字語詞': '成語與四字語詞' };
const TYPE_NAME = { mc: '選擇題', match: '拖曳配對', fill: '拖曳填空', cat: '分類題', order: '排序題' };

/* ---------- 狀態 ---------- */
const S = { name: '', n: 0, partner: null, qs: [], i: 0, right: 0, lives: 0, stage: -1, answered: false };

/* ---------- 畫面切換 ---------- */
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id)); }
function setBg(n) { $('#bg').style.backgroundImage = `url(${IMG(n)})`; }

/* ---------- 打字機 ---------- */
let typeTimer = null, typeDone = null;
function typeText(el, text, speed = 28) {
  clearInterval(typeTimer); el.textContent = ''; let k = 0;
  return new Promise(res => {
    typeDone = () => { clearInterval(typeTimer); el.textContent = text; typeDone = null; res(); };
    typeTimer = setInterval(() => { el.textContent = text.slice(0, ++k); if (k >= text.length) typeDone && typeDone(); }, speed);
  });
}

/* ---------- 封面 ---------- */
function initTitle() {
  setBg('cover'); show('scr-title'); typeText($('#prologue'), PROLOGUE, 35);
  document.querySelectorAll('.diff').forEach(b => b.onclick = () => {
    document.querySelectorAll('.diff').forEach(x => x.classList.remove('on')); b.classList.add('on'); S.n = +b.dataset.n; $('#title-err').textContent = '';
  });
  $('#btn-start').onclick = () => {
    const nm = $('#inp-name').value.trim();
    if (!nm) { $('#title-err').textContent = '⚠ 請先輸入你的名字，奇妙仙子才知道要叫誰喔！'; $('#inp-name').focus(); return; }
    if (!S.n) { $('#title-err').textContent = '⚠ 請選擇一種冒險難度！'; return; }
    S.name = nm; initPartner();
  };
  $('#inp-name').onkeydown = e => { if (e.key === 'Enter') $('#btn-start').click(); };
}

/* ---------- 選夥伴 ---------- */
function initPartner() {
  show('scr-partner'); setBg('neverland');
  const g = $('#partner-grid'); g.innerHTML = '';
  Object.entries(PARTNERS).forEach(([k, p]) => {
    const c = document.createElement('button'); c.className = 'pcard'; c.id = 'partner-' + k;
    c.innerHTML = `<img src="${IMG(p.img)}" alt="${p.name}"><div class="pc-cap"><b>${p.name}</b><small>${p.tag}</small></div>`;
    c.onclick = () => {
      g.querySelectorAll('.pcard').forEach(x => x.classList.remove('on')); c.classList.add('on');
      S.partner = k; $('#pv-name').textContent = p.name; typeText($('#pv-text'), p.hello); $('#btn-partner-go').disabled = false;
    };
    g.appendChild(c);
  });
  $('#btn-partner-go').onclick = startGame;
}

/* ---------- 抽題（指標保證機制） ---------- */
function buildQuiz(n) {
  const all = [...BANK_MC.map(q => ({ ...q })), ...BANK_DRAG.map(q => ({ ...q }))];
  const inds = [...new Set(all.map(q => q.ind))];
  const chosen = new Set();
  // 1) 每個學習表現至少 1 題（優先選拖拉題，讓題型更多元）
  shuffle(inds).forEach((ind, k) => {
    const pool = all.filter(q => q.ind === ind);
    const drags = pool.filter(q => q.type !== 'mc');
    chosen.add(k % 2 === 0 && drags.length ? pick(drags) : pick(pool));
  });
  // 2) 拖拉題約占 30%
  const dragTarget = Math.round(n * 0.3);
  for (const q of shuffle(all.filter(q => q.type !== 'mc'))) { if ([...chosen].filter(x => x.type !== 'mc').length >= dragTarget) break; chosen.add(q); }
  // 3) 其餘以選擇題補足（各指標輪流抽，避免單一指標題數過多）
  const mcBy = {}; shuffle(all.filter(q => q.type === 'mc' && !chosen.has(q))).forEach(q => (mcBy[q.ind] = mcBy[q.ind] || []).push(q));
  let keys = shuffle(Object.keys(mcBy));
  while (chosen.size < n && keys.length) { keys = keys.filter(k => mcBy[k].length); for (const k of keys) { if (chosen.size >= n) break; chosen.add(mcBy[k].pop()); } }
  // 4) 依關卡分組
  const stageOf = q => STAGES.findIndex(s => s.inds.includes(q.ind));
  let list = [...chosen].slice(0, n);
  const out = [];
  STAGES.forEach((_, si) => {
    let grp = shuffle(list.filter(q => stageOf(q) === si));
    // 同一篇閱讀的題目排在一起
    grp.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    grp.forEach(q => { q.stage = si; out.push(q); });
  });
  return out;
}

function startGame() {
  S.qs = buildQuiz(S.n); S.i = 0; S.right = 0; S.stage = -1; S.lives = DIFF[S.n].lives;
  const p = PARTNERS[S.partner]; $('#fb-name').textContent = p.name; setFace(p.img);
  nextQuestion();
}

/* ---------- 劇情播放 ---------- */
function playStory(lines, bg, banner) {
  return new Promise(res => {
    show('scr-story'); setBg(bg); $('#st-banner').textContent = banner; $('#st-banner').hidden = !banner;
    const L = $('#st-left'), R = $('#st-right'); L.className = 'stand left'; R.className = 'stand right';
    let k = 0, busy = false;
    const step = async () => {
      if (typeDone) { typeDone(); return; }
      if (k >= lines.length) { $('#scr-story').onclick = null; res(); return; }
      const ln = lines[k++];
      const text = ln.text.replace(/\{name\}/g, S.name);
      $('#st-name').textContent = ln.who;
      if (ln.img) {
        const el = ln.side === 'left' ? L : R, other = ln.side === 'left' ? R : L;
        el.style.backgroundImage = `url(${IMG(CAST[ln.img])})`;
        el.className = `stand ${ln.side} show${ln.angry ? ' angry' : ''}`;
        if (other.classList.contains('show')) other.classList.add('dim');
      }
      typeText($('#st-text'), text);
    };
    $('#scr-story').onclick = step; step();
  });
}

/* ---------- 題目流程 ---------- */
async function nextQuestion() {
  if (S.i >= S.qs.length) return finish();
  const q = S.qs[S.i];
  if (q.stage !== S.stage) {
    S.stage = q.stage; const st = STAGES[S.stage];
    await playStory(st.story, st.bg, st.name);
    setBg(st.bg); $('#hud-stage').textContent = st.short;
  }
  show('scr-quiz'); renderQuestion(q);
}

function updateHud() {
  $('#hud-bar').style.width = (S.i / S.qs.length * 100) + '%';
  $('#hud-count').textContent = `第 ${S.i + 1} / ${S.qs.length} 題`;
  $('#hud-score').textContent = Math.round(S.right / S.qs.length * 100);
  $('#hud-name').textContent = '🧭 ' + S.name;
  $('#hud-diff').textContent = DIFF[S.n].name;
  const life = $('#hud-life');
  if (DIFF[S.n].lives) { const L = DIFF[S.n].lives; life.innerHTML = Array.from({ length: L }, (_, k) => gummy(k, k >= S.lives)).join(''); }
  else life.innerHTML = '';
}

function setFace(img, mood) { const f = $('#fb-face'); f.style.backgroundImage = `url(${IMG(img)})`; f.className = 'face' + (mood ? ' ' + mood : ''); }

function renderQuestion(q) {
  S.answered = false; updateHud();
  $('#q-tag').textContent = `${IND_NAME[q.ind] || q.ind}｜${TYPE_NAME[q.type]}`;
  $('#q-text').textContent = q.q;
  const ps = $('#passage');
  if (q.passage) { ps.hidden = false; $('#ps-title').textContent = q.title || '閱讀短文'; $('#ps-text').textContent = q.passage; } else ps.hidden = true;
  $('#btn-next').hidden = true; $('#btn-check').hidden = q.type === 'mc'; $('#btn-check').disabled = true;
  const p = PARTNERS[S.partner]; setFace(p.img);
  $('#fb-text').textContent = q.type === 'mc' ? '仔細看清楚，選出正確答案吧！' : '把答案卡片拖到框框裡（也可以先點卡片、再點框框）！';
  const area = $('#q-area'); area.innerHTML = '';
  if (q.type === 'mc') renderMC(q, area); else renderDrag(q, area);
}

/* 選擇題 */
function renderMC(q, area) {
  const order = shuffle([0, 1, 2, 3]);
  const box = document.createElement('div'); box.className = 'opts';
  order.forEach((oi, k) => {
    const b = document.createElement('button'); b.className = 'opt'; b.id = 'opt-' + k;
    b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; b.lastChild.textContent = q.opts[oi];
    b.dataset.oi = oi;
    b.onclick = () => {
      if (S.answered) return;
      const ok = oi === q.ans;
      box.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
      b.classList.add(ok ? 'right' : 'wrong');
      judge(ok, q);
    };
    box.appendChild(b);
  });
  area.appendChild(box);
  S.reveal = () => box.querySelector(`[data-oi="${q.ans}"]`).click();
}

/* 拖拉題 */
let selChip = null;
function makeChip(text) { const c = document.createElement('div'); c.className = 'chip'; c.textContent = text; c.dataset.v = text; bindChip(c); return c; }
function renderDrag(q, area) {
  const zones = []; // {el, expect:[...], cap}
  const mkDrop = (expect, cap = 1) => { const d = document.createElement('div'); d.className = 'drop'; d.dataset.cap = cap; zones.push({ el: d, expect, cap }); return d; };
  let chips = [];
  if (q.type === 'match') {
    const g = document.createElement('div'); g.className = 'match-grid';
    q.pairs.forEach(([l, r]) => { const row = document.createElement('div'); row.className = 'mrow'; row.innerHTML = `<span class="lbl"></span><span>→</span>`; row.firstChild.textContent = l; row.appendChild(mkDrop([r])); g.appendChild(row); });
    area.appendChild(g); chips = q.pairs.map(p => p[1]);
  } else if (q.type === 'fill') {
    const t = document.createElement('div'); t.className = 'fill-text'; const parts = q.text.split('{}');
    parts.forEach((s, k) => { t.appendChild(document.createTextNode(s)); if (k < parts.length - 1) t.appendChild(mkDrop([q.answers[k]])); });
    area.appendChild(t); chips = [...q.answers, ...(q.distract || [])];
  } else if (q.type === 'cat') {
    const row = document.createElement('div'); row.className = 'cat-row';
    q.cats.forEach((c, ci) => { const col = document.createElement('div'); col.className = 'cat'; col.innerHTML = '<h4></h4>'; col.firstChild.textContent = c; const exp = q.items.filter(it => it[1] === ci).map(it => it[0]); col.appendChild(mkDrop(exp, exp.length)); row.appendChild(col); });
    area.appendChild(row); chips = q.items.map(it => it[0]);
  } else if (q.type === 'order') {
    const row = document.createElement('div'); row.className = 'order-row';
    q.items.forEach((it, k) => { const d = mkDrop([it]); d.dataset.i = k + 1; row.appendChild(d); });
    area.appendChild(row); chips = q.items.slice();
  }
  const pool = document.createElement('div'); pool.className = 'pool'; pool.id = 'pool';
  let sh = shuffle(chips); if (q.type === 'order' && sh.join() === chips.join()) sh = sh.reverse();
  sh.forEach(t => pool.appendChild(makeChip(t)));
  area.appendChild(pool);
  S.zones = zones; S.pool = pool;
  const chk = $('#btn-check');
  S.refresh = () => { chk.disabled = !zones.every(z => z.el.querySelectorAll('.chip').length >= z.cap); };
  chk.onclick = () => {
    if (S.answered) return;
    let ok = true;
    zones.forEach(z => {
      const got = [...z.el.querySelectorAll('.chip')].map(c => c.dataset.v).sort().join('|');
      const good = got === z.expect.slice().sort().join('|');
      z.el.classList.add(good ? 'ok' : 'ng'); if (!good) ok = false;
    });
    chk.hidden = true; judge(ok, q);
  };
  S.reveal = () => { zones.forEach(z => { z.el.innerHTML = ''; z.expect.forEach(v => { const c = [...pool.children].find(x => x.dataset.v === v); z.el.appendChild(c || makeChip(v)); }); }); S.refresh(); };
}

function placeChip(chip, target) {
  if (S.answered) return;
  if (target && target.classList.contains('drop')) {
    const cap = +target.dataset.cap, inside = target.querySelectorAll('.chip');
    if (inside.length >= cap) S.pool.appendChild(inside[0]); // 換掉舊的
    target.appendChild(chip);
  } else S.pool.appendChild(chip);
  S.refresh && S.refresh();
}
function bindChip(c) {
  c.addEventListener('pointerdown', e => {
    if (S.answered) return;
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY; let dragging = false; const ghost = $('#ghost');
    const move = ev => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) { dragging = true; ghost.textContent = c.textContent; ghost.hidden = false; c.style.opacity = .35; }
      if (dragging) {
        ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
        document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
        const t = document.elementFromPoint(ev.clientX, ev.clientY); const d = t && t.closest('.drop'); if (d) d.classList.add('hover');
      }
    };
    const up = ev => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
      ghost.hidden = true; c.style.opacity = '';
      if (dragging) {
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const d = t && t.closest('.drop');
        if (d) placeChip(c, d); else if (t && t.closest('.pool')) placeChip(c, null);
        if (selChip) { selChip.classList.remove('sel'); selChip = null; }
      }
      else { // 點選模式
        if (c.parentElement.classList.contains('drop')) { placeChip(c, null); return; }
        if (selChip === c) { c.classList.remove('sel'); selChip = null; return; }
        if (selChip) selChip.classList.remove('sel'); selChip = c; c.classList.add('sel');
      }
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
}
document.addEventListener('click', e => {
  const d = e.target.closest('.drop');
  if (d && selChip && !e.target.closest('.chip')) { selChip.classList.remove('sel'); placeChip(selChip, d); selChip = null; }
});

/* ---------- 判定 ---------- */
function judge(ok, q) {
  S.answered = true;
  const p = PARTNERS[S.partner];
  if (ok) { S.right++; burst(); setFace(p.img, 'happy'); }
  else { if (DIFF[S.n].lives) S.lives--; setFace(p.angry || p.img, p.angry ? 'angry' : ''); }
  const line = pick(ok ? p.right : p.wrong).replace(/\{name\}/g, S.name);
  const fb = $('#fb-text'); fb.textContent = (ok ? '⭕ ' : '❌ ') + line;
  updateHud();
  const nb = $('#btn-next'); nb.hidden = false;
  const dead = DIFF[S.n].lives && S.lives <= 0;
  nb.textContent = dead ? '……' : (S.i === S.qs.length - 1 ? '完成冒險 ▶' : '下一題 ▶');
  nb.onclick = () => { if (dead) return gameOver(); S.i++; nextQuestion(); };
}

function gameOver() {
  show('scr-over'); const p = PARTNERS[S.partner];
  $('#over-face').style.backgroundImage = `url(${IMG(p.angry || p.img)})`;
  $('#over-text').textContent = `${p.name}：「${S.name}，羽毛都被海盜搶走了……不過別灰心，重新整隊，一定能保住樹屋！」（答對 ${S.right} 題）`;
  $('#btn-retry').onclick = () => startGame();
}

async function finish() {
  $('#hud-bar').style.width = '100%';
  await playStory(ENDING, 'lost_boys_underground_home', '任務完成！');
  showCert();
}
function showCert() {
  show('scr-cert'); setBg('neverland');
  const total = S.qs.length || S.n, rate = S.right / total;
  $('#c-name').textContent = S.name || '冒險者';
  $('#c-partner').textContent = PARTNERS[S.partner || 'tiger'].name;
  $('#c-diff').textContent = DIFF[S.n || 25].name;
  $('#c-right').textContent = S.right; $('#c-total').textContent = total;
  $('#c-score').textContent = Math.round(rate * 100);
  $('#c-rank').textContent = rate >= .9 ? '★★★ 金色圖騰勳章 ★★★' : rate >= .7 ? '★★ 銀色羽毛勳章 ★★' : '★ 叢林勇氣勳章 ★';
  const d = new Date(); $('#c-date').textContent = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  burst(80);
  $('#btn-print').onclick = () => window.print();
  $('#btn-again').onclick = () => startGame();
}

/* ---------- 仙塵粒子 ---------- */
const cv = $('#dust'), cx = cv.getContext('2d'); let parts = [];
function resize() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener('resize', resize); resize();
for (let k = 0; k < 60; k++) parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .5, vy: Math.random() * .0006 + .0002, t: Math.random() * 6, life: Infinity });
function burst(n = 40) { for (let k = 0; k < n; k++) parts.push({ x: .5 + (Math.random() - .5) * .4, y: .45, r: Math.random() * 3 + 1, vx: (Math.random() - .5) * .012, vy: -Math.random() * .012, t: 0, life: 90, g: true }); }
(function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) {
    if (p.g) { p.x += p.vx; p.y += p.vy; p.vy += .0003; p.life--; } else { p.y -= p.vy; p.t += .03; if (p.y < -.02) p.y = 1.02; }
    const a = p.g ? p.life / 90 : (Math.sin(p.t) + 1) / 2 * .8 + .2;
    const X = (p.x + (p.g ? 0 : Math.sin(p.t) * .003)) * cv.width, Y = p.y * cv.height, R = p.r * devicePixelRatio;
    const gr = cx.createRadialGradient(X, Y, 0, X, Y, R * 3); gr.addColorStop(0, `rgba(255,240,170,${a})`); gr.addColorStop(1, 'rgba(255,200,80,0)');
    cx.fillStyle = gr; cx.beginPath(); cx.arc(X, Y, R * 3, 0, 7); cx.fill();
  }
  requestAnimationFrame(loop);
})();

/* ---------- 開發者快捷鍵 F2 / F3 / F4（僅本地開發） ---------- */
const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:';
function devMsg(t) { const d = $('#dev'); d.textContent = '[DEV] ' + t; d.hidden = false; clearTimeout(devMsg.t); devMsg.t = setTimeout(() => d.hidden = true, 1800); }
addEventListener('keydown', e => {
  if (!isLocal || !['F2', 'F3', 'F4'].includes(e.key)) return;
  e.preventDefault();
  const quizOn = $('#scr-quiz').classList.contains('active');
  if (e.key === 'F2') { if (quizOn && !S.answered && S.reveal) { S.reveal(); devMsg('F2 顯示答案'); } }
  if (e.key === 'F3') {
    if (!S.qs.length) return devMsg('請先開始遊戲');
    const nx = S.qs.findIndex((q, k) => k > S.i && q.stage > S.stage);
    S.i = nx < 0 ? S.qs.length : nx; devMsg('F3 跳到下一關'); nextQuestion();
  }
  if (e.key === 'F4') { if (!S.name) S.name = $('#inp-name').value.trim() || '測試員'; if (!S.n) S.n = 25; if (!S.partner) S.partner = 'tiger'; devMsg('F4 直達證書'); showCert(); }
});

/* 預載圖片 */
['neverland', 'native_american_camp', 'lost_boys_underground_home', 'misty_forest', ...Object.values(CAST)].forEach(n => { const i = new Image(); i.src = IMG(n); });

if (isLocal) window.__dbg = { S, show, setBg, renderQuestion, gameOver, showCert, playStory, STAGES, DIFF, PARTNERS, judge };
initTitle();
})();
