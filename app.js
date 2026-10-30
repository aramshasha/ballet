const STORAGE_KEY = 'ballet-journal-v1';
const DEFAULT_SESSIONS = ['개인레슨'];
const CATEGORIES = ['바', '센터', '점프', '턴', '포즈', '팔·상체', '스트레칭'];

// [이름, 프랑스어/별칭] — 검색은 둘 다 본다
const LIBRARY = {
  바: [
    ['드미 플리에', 'Demi plié'], ['그랑 플리에', 'Grand plié'], ['바뜨망 탄듀', 'Battement tendu'],
    ['바뜨망 제떼', 'Battement jeté / Dégagé'], ['롱 드 잠브 아 테르', 'Rond de jambe à terre'],
    ['롱 드 잠브 앙 레르', "Rond de jambe en l'air"], ['바뜨망 퐁뒤', 'Battement fondu'],
    ['바뜨망 프라뻬', 'Battement frappé'], ['쁘띠 바뜨망', 'Petit battement'], ['아다지오', 'Adagio'],
    ['데벨로뻬', 'Développé'], ['그랑 바뜨망', 'Grand battement'], ['를르베', 'Relevé'],
    ['에샤뻬 를르베', 'Échappé relevé'], ['한손 바', 'One hand barre'], ['양손 바', 'Two hands barre'],
  ],
  센터: [
    ['탕 리에', 'Temps lié'], ['발랑세', 'Balancé'], ['파 드 부레', 'Pas de bourrée'],
    ['샤세', 'Chassé'], ['글리사드', 'Glissade'], ['꾸뻬', 'Coupé'], ['파 드 바스크', 'Pas de basque'],
    ['프롬나드', 'Promenade'], ['부레', 'Bourrée / Couru'], ['센터 아다지오', 'Center adagio'],
    ['센터 탄듀', 'Center tendu'], ['왈츠 스텝', 'Waltz step'], ['레베랑스', 'Révérence'],
  ],
  점프: [
    ['소떼', 'Sauté / Temps levé'], ['샹즈망', 'Changement'], ['에샤뻬 소떼', 'Échappé sauté'],
    ['아상블레', 'Assemblé'], ['쥬떼', 'Jeté'], ['그랑 쥬떼', 'Grand jeté'], ['시손', 'Sissonne'],
    ['파 드 샤', 'Pas de chat'], ['앙트르샤', 'Entrechat'], ['발로네', 'Ballonné'],
    ['소 드 바스크', 'Saut de basque'], ['탕 드 뀌스', 'Temps de cuisse'],
  ],
  턴: [
    ['스팟팅', 'Spotting'], ['수띠뉴', 'Soutenu'], ['피케 턴', 'Piqué turn'], ['쉐네', 'Chaînés'],
    ['피루엣 앙 데오르', 'Pirouette en dehors'], ['피루엣 앙 드당', 'Pirouette en dedans'],
    ['더블 피루엣', 'Double pirouette'], ['파세 를르베 밸런스', 'Passé relevé balance'],
    ['앙 드당 피케', 'Piqué en dedans'], ['푸에떼', 'Fouetté'], ['투르 앙 레르', "Tour en l'air"],
  ],
  포즈: [
    ['1번 포지션', 'First position'], ['2번 포지션', 'Second position'], ['3번 포지션', 'Third position'],
    ['4번 포지션', 'Fourth position'], ['5번 포지션', 'Fifth position'], ['쿠드피에', 'Cou-de-pied'],
    ['파세 (르띠레)', 'Passé / Retiré'], ['아라베스크', 'Arabesque'], ['애티튜드', 'Attitude'],
    ['크루아제', 'Croisé'], ['에파세', 'Effacé'], ['에카르떼', 'Écarté'], ['아 라 스공드', 'À la seconde'],
    ['턴아웃', 'Turn-out'],
  ],
  '팔·상체': [
    ['앙 바', 'En bas / Bras bas'], ['앙 아방', 'En avant'], ['앙 오', 'En haut'],
    ['팔 2번', 'Second arms'], ['포르 드 브라', 'Port de bras'], ['캄브레', 'Cambré'],
    ['에폴망', 'Épaulement'], ['시선 처리', 'Head / Eyes'],
  ],
  스트레칭: [
    ['소도구 스트레칭', 'Props / Ball / Band'], ['폼롤러', 'Foam roller'], ['밴드 운동', 'Theraband'],
    ['플로어 바', 'Floor barre'], ['포인 앤 플렉스', 'Point & flex'], ['코어 운동', 'Core'],
    ['개구리 자세', 'Frog stretch'], ['다리 찢기', 'Split'], ['발등 스트레칭', 'Instep / Arch'],
    ['햄스트링 스트레칭', 'Hamstring'], ['고관절 스트레칭', 'Hip opener'], ['매트 운동', 'Mat work'],
  ],
};

// 엘로디발레 반. minutes는 한 번 수업 길이, ink는 진한 색 위 글자색(없으면 진한 글씨).
const CLASSES = {
  bab: {
    name: 'Begin a Ballet', minutes: 50, color: 'var(--c-bab)', info: '정원 6명 · 50분 · 시그니처 수업',
    desc: '처음 시작하는 분, 운동이 익숙하지 않은 분을 위한 소규모 수업. 기본 동작, 바른 정렬과 코어, 소도구 스트레칭. 타 수업 보강 불가.',
  },
  lv1: {
    name: 'Lv1 초급', minutes: 60, color: 'var(--c-lv1)', info: '정원 12명 · 60분 · 매트 + 바(양손·한손) + 쉬운 센터',
    after: 'Begin a Ballet 3개월 이상', desc: '발레 입문. 매주 체계적으로 기본 동작을 익히고 한손·양손 바로 포르 드 브라에 익숙해진다.',
  },
  bridge: {
    name: 'Lv1.5 Bridge', minutes: 60, color: 'var(--c-bridge)', info: '정원 12명 · 60분 · 바(한손) + 센터',
    after: 'Lv1 4~6개월 이상', desc: 'Lv1 4주 차 수준으로 매트 없이 진행. 다양한 동작·방향, 빠른 템포로 초중급을 준비한다.',
  },
  lv15: {
    name: 'Lv1.5 초중급', minutes: 70, color: 'var(--c-lv15)', info: '정원 12명 · 70분 · 매트 + 바(한손) + 센터',
    after: 'Bridge 3개월 이상', desc: '중급반 준비반. 더 빠른 템포, 포르 드 브라와 시선, 다양한 동작을 천천히 배운다.',
  },
  lv2: { name: 'Lv2 중급', minutes: 80, color: 'var(--c-lv2)', ink: 'var(--white)' },
  pointe1: { name: 'Lv1 토슈즈', minutes: 60, color: 'var(--c-pointe)' },
  pointe2: { name: 'Lv2 토슈즈', minutes: 60, color: 'var(--c-pointe)' },
  piece: { name: '작품반', minutes: 70, color: 'var(--c-piece)', ink: 'var(--pink-300)' },
};
// 맨 위 카드 리본의 단계 (Lv1 → Lv2). Begin a Ballet는 입문 수업이라 단계에 넣지 않는다.
const LEVELS = ['lv1', 'bridge', 'lv15', 'lv2'];
// 설정의 "지금 듣는 반"에서 고르는 순서
const LEVEL_CHOICES = ['bab', ...LEVELS];

// 요일(0=일)별 [반, 시작, 끝]. 정규반(A 스튜디오)만 넣는다. Begin a Ballet(B 스튜디오) 일정은 쓰지 않는다.
const TIMETABLE = {
  A: {
    1: [['lv1', '10:00', '11:00'], ['pointe2', '12:20', '13:20'], ['lv1', '18:50', '19:50'], ['bridge', '20:00', '21:00'], ['lv15', '21:00', '22:10']],
    2: [['lv1', '11:00', '12:00'], ['lv15', '12:20', '13:30'], ['lv1', '18:10', '19:10'], ['lv1', '19:20', '20:20'], ['pointe1', '20:30', '21:30']],
    3: [['lv1', '10:00', '11:00'], ['lv2', '11:00', '12:20'], ['bridge', '12:30', '13:30'], ['lv1', '18:50', '19:50'], ['bridge', '20:00', '21:00'], ['lv15', '21:00', '22:10']],
    4: [['lv1', '11:00', '12:00'], ['lv15', '12:20', '13:30'], ['lv1', '18:10', '19:10'], ['lv1', '19:20', '20:20'], ['lv15', '20:30', '21:40']],
    5: [['lv2', '11:00', '12:20'], ['bridge', '19:00', '20:00']],
    6: [['bridge', '11:00', '12:00'], ['lv15', '12:10', '13:20'], ['piece', '13:40', '14:50']],
  },
};

// 그날 요일의 수업 (시작 시간순). 기록에는 "반 이름 시작시간"으로 남긴다.
const slotsOn = (weekday) => (TIMETABLE.A[weekday] || [])
  .map(([cls, start, end]) => ({ cls, start, end }))
  .sort((a, b) => a.start.localeCompare(b.start));
const slotLabel = (slot) => `${CLASSES[slot.cls].name} ${slot.start}`;
// 기록된 수업 이름 → 반 (직접 추가한 수업이면 null)
const classOf = (session) => Object.values(CLASSES)
  .find((c) => session === c.name || session.startsWith(`${c.name} `)) || null;
const classNameOf = (session) => classOf(session)?.name || session;

const BASE_TECHS = CATEGORIES.flatMap((cat) =>
  LIBRARY[cat].map(([name, en]) => ({ id: `${cat}:${name}`, name, en, cat })),
);

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, '0');
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

// 한국 공휴일 (대체공휴일·선거일 포함). 음력 공휴일과 대체공휴일은 해마다 달라서 연도별로 적어 둔다.
const FIXED_HOLIDAYS = {
  '01-01': '신정', '03-01': '삼일절', '05-05': '어린이날', '06-06': '현충일',
  '08-15': '광복절', '10-03': '개천절', '10-09': '한글날', '12-25': '성탄절',
};
const YEAR_HOLIDAYS = {
  2025: {
    '01-27': '임시공휴일', '01-28': '설날 연휴', '01-29': '설날', '01-30': '설날 연휴', '03-03': '대체공휴일',
    '05-06': '대체공휴일', '06-03': '대통령 선거', '10-05': '추석 연휴', '10-06': '추석', '10-07': '추석 연휴', '10-08': '대체공휴일',
  },
  2026: {
    '02-16': '설날 연휴', '02-17': '설날', '02-18': '설날 연휴', '03-02': '대체공휴일', '05-24': '부처님오신날',
    '05-25': '대체공휴일', '06-03': '지방선거', '08-17': '대체공휴일', '09-24': '추석 연휴', '09-25': '추석',
    '09-26': '추석 연휴', '10-05': '대체공휴일',
  },
  2027: {
    '02-06': '설날 연휴', '02-07': '설날', '02-08': '설날 연휴', '02-09': '대체공휴일', '05-13': '부처님오신날',
    '08-16': '대체공휴일', '09-14': '추석 연휴', '09-15': '추석', '09-16': '추석 연휴', '10-04': '대체공휴일',
    '10-11': '대체공휴일', '12-27': '대체공휴일',
  },
  2028: {
    '01-26': '설날 연휴', '01-27': '설날', '01-28': '설날 연휴', '04-12': '국회의원 선거', '05-02': '부처님오신날',
    '10-02': '추석 연휴', '10-03': '추석·개천절', '10-04': '추석 연휴', '10-05': '대체공휴일',
  },
  2029: {
    '02-12': '설날 연휴', '02-13': '설날', '02-14': '설날 연휴', '05-07': '대체공휴일', '05-20': '부처님오신날',
    '05-21': '대체공휴일', '09-21': '추석 연휴', '09-22': '추석', '09-23': '추석 연휴', '09-24': '대체공휴일',
  },
};
const holidayName = (key) => YEAR_HOLIDAYS[key.slice(0, 4)]?.[key.slice(5)] || FIXED_HOLIDAYS[key.slice(5)] || '';
const dayLabel = (k) => { const d = fromKey(k); return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEK[d.getDay()]})`; };
const fullLabel = (k) => `${fromKey(k).getFullYear()}년 ${dayLabel(k)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 초성 검색: "ㅇㅂ" → 암바
const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const chosung = (s) => [...s].map((ch) => {
  const code = ch.charCodeAt(0) - 0xac00;
  return code >= 0 && code < 11172 ? CHO[Math.floor(code / 588)] : ch;
}).join('');
const norm = (s) => s.toLowerCase().replace(/\s+/g, '');

function matches(tech, query) {
  if (!query) return true;
  const q = norm(query);
  const name = norm(tech.name);
  return name.includes(q) || norm(tech.en || '').includes(q) || chosung(name).includes(q);
}

/* ---------- 저장소 ---------- */

// 반 이름은 레벨을 앞에 쓴다. 예전 이름("토슈즈 Lv1")으로 남은 기록도 새 이름으로 바꾼다.
const OLD_NAMES = [['토슈즈 Lv1', 'Lv1 토슈즈'], ['토슈즈 Lv2', 'Lv2 토슈즈']];

function migrateEntries(entries) {
  for (const e of Object.values(entries)) {
    if (!Array.isArray(e?.sessions)) continue;
    e.sessions = e.sessions.map((s) => OLD_NAMES.reduce((v, [from, to]) => (v === from || v.startsWith(`${from} `) ? to + v.slice(from.length) : v), s));
  }
  return entries;
}

function normalize(raw) {
  return {
    entries: raw && typeof raw.entries === 'object' ? migrateEntries(raw.entries) : {},
    custom: Array.isArray(raw?.custom) ? raw.custom : [],
    sessions: Array.isArray(raw?.sessions) && raw.sessions.length ? raw.sessions : [...DEFAULT_SESSIONS],
    startDate: typeof raw?.startDate === 'string' ? raw.startDate : '',
    classMinutes: Number(raw?.classMinutes) > 0 ? Number(raw.classMinutes) : 60,
    weeklyGoal: Number(raw?.weeklyGoal) >= 1 ? Math.min(7, Number(raw.weeklyGoal)) : 3,
    level: CLASSES[raw?.level] ? raw.level : 'bab',
    nickname: typeof raw?.nickname === 'string' ? raw.nickname.slice(0, 12) : '',
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalize(JSON.parse(raw));
  } catch (err) {
    console.warn('저장된 기록을 읽지 못했습니다.', err);
  }
  return normalize(null);
}

let data = load();

// 온라인(Claude 아티팩트)에서는 계정별 개인 저장소에 날짜마다 문서 하나씩 저장하고,
// 로컬에서 열면 이 브라우저(localStorage)에만 저장한다.
let cloud = null;
let writeChain = Promise.resolve();

const settingsBody = () => ({
  sessions: data.sessions,
  custom: data.custom,
  startDate: data.startDate,
  classMinutes: data.classMinutes,
  weeklyGoal: data.weeklyGoal,
  level: data.level,
  nickname: data.nickname,
});

function queueWrite(fn) {
  writeChain = writeChain.then(fn).catch((err) => {
    console.warn('동기화 실패', err);
    flashSaved(err?.code === 'quota_exceeded' ? '저장 공간이 가득 찼어요' : '동기화 실패 · 다음 수정 때 다시 저장돼요');
  });
}

function persist({ entries = [], settings = false } = {}) {
  let localOk = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    localOk = false;
  }
  if (cloud) {
    for (const key of entries) {
      const ref = cloud.doc(`d-${key}`);
      const body = data.entries[key];
      queueWrite(() => (body ? ref.set(body) : ref.delete()));
    }
    if (settings) {
      const body = structuredClone(settingsBody());
      queueWrite(() => cloud.doc('settings').set(body));
    }
    flashSaved('저장됨');
  } else {
    flashSaved(localOk ? '저장됨' : '저장 실패 · 백업을 내보내 주세요');
  }
}

async function connectCloud() {
  if (!window.claude?.use) return;
  const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
  const uid = db && user ? await user.id() : null;
  if (!uid) return;
  const col = db.collection(`data/users/${uid}`);
  let checked = false;
  col.onSnapshot((snap) => {
    if (!checked && snap.metadata.fromCache) return;
    if (!checked) {
      checked = true;
      cloud = col;
      setSyncState(true);
      // 첫 연결인데 저장소가 비어 있으면 이 기기 기록을 올린다
      if (snap.empty && Object.keys(data.entries).length) {
        persist({ entries: Object.keys(data.entries), settings: true });
        return;
      }
    }
    let settings = null;
    const entries = {};
    for (const d of snap.docs) {
      if (d.id === 'settings') settings = d.data();
      else if (d.id.startsWith('d-')) entries[d.id.slice(2)] = d.data();
    }
    data = normalize(structuredClone({ ...(settings || {}), entries }));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (err) { /* 캐시일 뿐 */ }
    renderAll();
  }, () => {
    cloud = null;
    setSyncState(false);
    flashSaved('동기화가 끊겼어요 · 이 기기에만 저장돼요');
  });
}

function setSyncState(on) {
  document.body.classList.toggle('synced', on);
}

let savedTimer;
function flashSaved(text) {
  const el = $('save-state');
  el.textContent = text;
  clearTimeout(savedTimer);
  savedTimer = setTimeout(() => { el.textContent = ''; }, 1500);
}

const emptyEntry = () => ({ sessions: [], techs: [], memo: '', practice: 0, photos: [], videos: [] });
const getEntry = (key) => ({ ...emptyEntry(), ...data.entries[key] });
const isEmpty = (e) => !e.sessions.length && !e.techs.length && !e.memo.trim()
  && !e.practice && !e.photos.length && !e.videos.length;

function updateEntry(key, fn, { settings = false } = {}) {
  const entry = { ...emptyEntry(), ...structuredClone(getEntry(key)) };
  fn(entry);
  if (isEmpty(entry)) delete data.entries[key];
  else data.entries[key] = { ...entry, updatedAt: Date.now() };
  persist({ entries: [key], settings });
  renderCalendar();
  renderSummary();
}

const allTechs = () => [...BASE_TECHS, ...data.custom];
const techMap = () => new Map(allTechs().map((t) => [t.id, t]));
const sessionColor = (name) => {
  const c = classOf(name);
  if (c) return c.color;
  const i = data.sessions.indexOf(name);
  return `var(--s${(i < 0 ? 3 : i) % 4})`;
};
// 밝은 반 색은 진한 글씨, 진한 반 색은 반마다 정한 글씨, 직접 추가한 수업은 흰 글씨
const sessionInk = (name) => { const c = classOf(name); return c ? c.ink || 'var(--navy)' : 'var(--white)'; };
const sessionMinutes = (name) => classOf(name)?.minutes || data.classMinutes;
const minutesOf = (entries) => entries.reduce((n, e) => n + e.sessions.reduce((m, s) => m + sessionMinutes(s), 0), 0);
const toHours = (min) => Math.round(min / 6) / 10;

function techCounts() {
  const counts = new Map();
  for (const [key, e] of Object.entries(data.entries)) {
    for (const id of e.techs) {
      const c = counts.get(id) || { n: 0, last: '' };
      c.n += 1;
      if (key > c.last) c.last = key;
      counts.set(id, c);
    }
  }
  return counts;
}

/* ---------- 상태 ---------- */

const today = toKey(new Date());
const state = {
  view: 'calendar',
  month: (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })(),
  selected: today,
  cat: '전체',
  query: '',
  addingSession: false,
};

/* ---------- 달력 ---------- */

function renderCalendar() {
  const { month } = state;
  $('year-label').textContent = month.getFullYear();
  $('month-label').textContent = `${month.getMonth() + 1}월`;

  const first = month.getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i += 1) cells.push('<span class="day blank"></span>');

  for (let d = 1; d <= days; d += 1) {
    const key = toKey(new Date(month.getFullYear(), month.getMonth(), d));
    const e = data.entries[key];
    const wd = (first + d - 1) % 7;
    const mark = e ? (e.sessions.length ? 'has' : 'note') : '';
    const cls = ['day', mark, key === today && 'today', key === state.selected && 'selected']
      .filter(Boolean).join(' ');
    const holiday = holidayName(key);
    const title = [holiday, ...(e ? e.sessions : []), e && e.techs.length ? `동작 ${e.techs.length}개` : ''].filter(Boolean).join(' · ');
    cells.push(`<button type="button" class="${cls}" data-key="${key}" style="--fill:${circleFill(e)};--ink:${e && e.sessions.length ? sessionInk(e.sessions[0]) : 'inherit'}" title="${esc(title)}">
      <span class="num ${wd === 0 || holiday ? 'red' : ''}">${d}</span>
    </button>`);
  }
  $('grid').innerHTML = cells.join('');

  // 범례: 이번 달에 기록한 반만, 반 순서대로 (Begin a Ballet는 넣지 않는다)
  const prefix = `${month.getFullYear()}-${pad(month.getMonth() + 1)}`;
  const order = Object.values(CLASSES).map((c) => c.name);
  const rank = (n) => { const i = order.indexOf(n); return i < 0 ? order.length : i; };
  const names = [...new Set(Object.entries(data.entries).filter(([k]) => k.startsWith(prefix))
    .flatMap(([, e]) => e.sessions.map(classNameOf)))]
    .filter((n) => n !== CLASSES.bab.name)
    .sort((x, y) => rank(x) - rank(y));
  $('legend').innerHTML = names
    .map((s) => `<span><i class="dot" style="background:${sessionColor(s)}"></i>${esc(s)}</span>`)
    .join('') + '<span><i class="dot note"></i>메모만</span>';
}

// 수업 하나면 그 색, 여러 개면 동그라미를 나눠 칠한다
function circleFill(e) {
  if (!e || !e.sessions.length) return 'transparent';
  if (e.sessions.length === 1) return sessionColor(e.sessions[0]);
  const step = 360 / e.sessions.length;
  const stops = e.sessions.map((s, i) => `${sessionColor(s)} ${i * step}deg ${(i + 1) * step}deg`);
  return `conic-gradient(from 180deg, ${stops.join(', ')})`;
}

$('grid').addEventListener('click', (ev) => {
  const btn = ev.target.closest('.day[data-key]');
  if (!btn) return;
  const key = btn.dataset.key;
  if (data.entries[key]) {
    // 팝업이 뜨는 동안 달력을 다시 그리면 모션이 끊기므로, 선택 표시는 팝업이 다 열린 뒤에 바꾼다
    openDetail(key);
    setTimeout(() => selectDate(key), 300);
  } else {
    openDay(key);
  }
});

function openDay(key) {
  selectDate(key);
  showView('day');
  window.scrollTo(0, 0);
}

let toastTimer;
function showToast(text) {
  $('toast').textContent = text;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 2000);
}

function closeDay(done) {
  flushMemo();
  const key = state.selected;
  showView('calendar');
  if (done) {
    showToast(data.entries[key] ? `${dayLabel(key)} 기록 완료` : `${dayLabel(key)}은 비워 두었어요`);
  }
}

$('day-back').addEventListener('click', () => closeDay(false));
$('done-day').addEventListener('click', () => closeDay(true));

// 달력을 좌우로 밀어 달 넘기기
let touchStart = null;
$('grid').addEventListener('touchstart', (ev) => {
  const t = ev.touches[0];
  touchStart = { x: t.clientX, y: t.clientY };
}, { passive: true });
$('grid').addEventListener('touchend', (ev) => {
  if (!touchStart) return;
  const t = ev.changedTouches[0];
  const dx = t.clientX - touchStart.x;
  const dy = t.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) shiftMonth(dx < 0 ? 1 : -1);
});

function shiftMonth(delta) {
  state.month = new Date(state.month.getFullYear(), state.month.getMonth() + delta, 1);
  renderCalendar();
}

$('prev').addEventListener('click', () => shiftMonth(-1));
$('next').addEventListener('click', () => shiftMonth(1));
$('today').addEventListener('click', () => selectDate(today));

function selectDate(key) {
  if (key !== state.selected) disarmClear();
  state.selected = key;
  const d = fromKey(key);
  state.month = new Date(d.getFullYear(), d.getMonth(), 1);
  renderCalendar();
  renderEditor();
}

/* ---------- 하루 기록 ---------- */

function renderEditor() {
  const key = state.selected;
  const e = getEntry(key);
  const d = fromKey(key);
  const holiday = holidayName(key);
  $('day-label').textContent = (key === today ? `오늘 · ${d.getMonth() + 1}월 ${d.getDate()}일` : fullLabel(key)) + (holiday ? ` · ${holiday}` : '');
  // 입력 중인 메모는 동기화로 덮어쓰지 않는다
  if (document.activeElement !== $('memo')) $('memo').value = e.memo;
  $('rolls').textContent = e.practice || 0;
  renderSessions();
  renderSelectedTechs();
  renderCats();
  renderTechList();
  renderPhotos();
  renderVideos();
}

/* ---------- 개인 연습 ---------- */

function changeRolls(delta) {
  updateEntry(state.selected, (e) => { e.practice = Math.max(0, (e.practice || 0) + delta); });
  $('rolls').textContent = getEntry(state.selected).practice;
}

$('rolls-minus').addEventListener('click', () => changeRolls(-1));
$('rolls-plus').addEventListener('click', () => changeRolls(1));

/* ---------- 사진 ---------- */

// 온라인에서는 아티팩트 파일 저장소에 올리고, 로컬에서는 작게 줄여 기록 안에 넣는다
const photoSrc = (p) => p.url || (p.id ? `/_blob/${p.id}` : p.src);

async function shrinkImage(file, maxSide, quality) {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return await new Promise((res) => canvas.toBlob((b) => res(b || file), 'image/jpeg', quality));
  } catch (err) {
    return file;
  }
}

const blobToDataUrl = (blob) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = rej;
  r.readAsDataURL(blob);
});

$('photo-input').addEventListener('change', async (ev) => {
  const files = [...ev.target.files];
  ev.target.value = '';
  if (!files.length) return;
  const key = state.selected;
  const assets = window.claude?.use ? await claude.use('assets') : null;
  let done = 0;
  for (const file of files) {
    $('photo-state').textContent = `사진 올리는 중… (${done + 1}/${files.length})`;
    try {
      const blob = await shrinkImage(file, assets ? 1600 : 720, assets ? 0.85 : 0.7);
      let photo;
      if (assets) {
        const r = await assets.upload(blob);
        photo = { id: r.id, url: r.url };
      } else {
        photo = { src: await blobToDataUrl(blob) };
      }
      updateEntry(key, (e) => { e.photos = [...e.photos, photo]; });
      done += 1;
    } catch (err) {
      console.warn('사진 업로드 실패', err);
      $('photo-state').textContent = '사진을 올리지 못했어요. 잠시 후 다시 해 주세요.';
      if (key === state.selected) renderPhotos();
      return;
    }
  }
  $('photo-state').textContent = '';
  if (key === state.selected) renderPhotos();
});

let photoArmed = -1;
function renderPhotos() {
  const { photos } = getEntry(state.selected);
  $('photos').innerHTML = photos.map((p, i) => `<figure class="photo">
    <button type="button" class="photo-open" data-photo="${i}" aria-label="사진 크게 보기"><img src="${esc(photoSrc(p))}" alt="" loading="lazy"></button>
    <button type="button" class="photo-del ${photoArmed === i ? 'armed' : ''}" data-photo-del="${i}" aria-label="사진 삭제">${photoArmed === i ? '삭제' : '✕'}</button>
  </figure>`).join('');
}

$('photos').addEventListener('click', async (ev) => {
  const open = ev.target.closest('[data-photo]');
  if (open) {
    const p = getEntry(state.selected).photos[Number(open.dataset.photo)];
    $('lightbox-img').src = photoSrc(p);
    $('lightbox').hidden = false;
    return;
  }
  const del = ev.target.closest('[data-photo-del]');
  if (!del) return;
  const i = Number(del.dataset.photoDel);
  // 두 번 눌러야 지운다
  if (photoArmed !== i) {
    photoArmed = i;
    renderPhotos();
    return;
  }
  photoArmed = -1;
  const photo = getEntry(state.selected).photos[i];
  updateEntry(state.selected, (e) => { e.photos = e.photos.filter((_, j) => j !== i); });
  renderPhotos();
  if (photo?.id) {
    const assets = await claude.use('assets');
    assets?.delete(photo.id).catch((err) => console.warn('사진 파일 삭제 실패', err));
  }
});

$('lightbox').addEventListener('click', () => {
  $('lightbox').hidden = true;
  $('lightbox-img').removeAttribute('src');
});

/* ---------- 영상 ---------- */

const ytSearchUrl = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`${q || ''} 발레`.trim())}`;

function updateYoutubeLink() {
  $('yt-search').href = ytSearchUrl(state.query);
  $('yt-search').textContent = state.query ? `▶ 유튜브에서 “${state.query}” 찾기` : '▶ 유튜브에서 동작 영상 찾기';
}

function videoLabel(url) {
  try {
    const u = new URL(url);
    if (/youtu\.?be/.test(u.hostname)) return 'YouTube';
    return u.hostname.replace(/^www\./, '');
  } catch (err) {
    return '영상';
  }
}

function renderVideos() {
  const { videos } = getEntry(state.selected);
  $('videos').innerHTML = videos.map((v, i) => `<li>
    <a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer"><span class="play">▶</span><span class="v-text"><b>${esc(v.label)}</b><small>${esc(videoLabel(v.url))}</small></span></a>
    <button type="button" class="v-del" data-video-del="${i}" aria-label="영상 링크 빼기">✕</button>
  </li>`).join('');
  updateYoutubeLink();
}

$('video-form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const raw = $('video-url').value.trim();
  const found = raw.match(/https?:\/\/\S+/);
  if (!found) {
    $('video-state').textContent = '영상 링크(https://…)를 붙여 넣어 주세요.';
    return;
  }
  const label = $('video-label').value.trim() || state.query || '참고 영상';
  updateEntry(state.selected, (e) => { e.videos = [...e.videos, { url: found[0], label }]; });
  $('video-url').value = '';
  $('video-label').value = '';
  $('video-state').textContent = '';
  renderVideos();
});

$('videos').addEventListener('click', (ev) => {
  const del = ev.target.closest('[data-video-del]');
  if (!del) return;
  const i = Number(del.dataset.videoDel);
  updateEntry(state.selected, (e) => { e.videos = e.videos.filter((_, j) => j !== i); });
  renderVideos();
});

// 그날 요일 시간표의 수업 + 이미 기록된 다른 수업 + 직접 추가한 수업
const sessionOptions = (key) => {
  const slots = holidayName(key) ? [] : slotsOn(fromKey(key).getDay()).map(slotLabel);
  return [...new Set([...slots, ...getEntry(key).sessions, ...data.sessions])];
};
const sessionOrder = (key) => { const opts = sessionOptions(key); return (s) => opts.indexOf(s); };

function renderSessions() {
  const e = getEntry(state.selected);
  const empty = holidayName(state.selected) ? '공휴일이라 시간표가 없어요' : fromKey(state.selected).getDay() === 0 ? '일요일은 개인레슨·소그룹만 있어요' : '';
  $('sessions').innerHTML = (empty ? `<p class="chips-note">${empty}</p>` : '') + sessionOptions(state.selected).map((s) => {
    const on = e.sessions.includes(s);
    const c = classOf(s);
    const time = c && s !== c.name ? s.slice(c.name.length + 1) : '';
    const label = time ? `${esc(c.name)} <small class="chip-time">${esc(time)}</small>` : esc(s);
    return `<button type="button" class="chip ${on ? 'on' : ''}" style="--c:${sessionColor(s)};--ci:${sessionInk(s)}" data-session="${esc(s)}">${on ? '✓ ' : ''}${label}</button>`;
  }).join('') + (state.addingSession
    ? `<form class="session-form" id="session-form">
        <input id="session-name" class="input" type="text" placeholder="예: 소그룹, 보강" maxlength="20" autocomplete="off">
        <button type="submit" class="pill-btn">추가</button>
        <button type="button" class="pill-btn" data-session-cancel>취소</button>
      </form>`
    : '<button type="button" class="chip add" data-session-add>+ 수업 추가</button>');
  if (state.addingSession) $('session-name').focus();
}

$('sessions').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = $('session-name').value.trim();
  state.addingSession = false;
  if (name) {
    if (!data.sessions.includes(name)) data.sessions.push(name);
    updateEntry(state.selected, (e) => { if (!e.sessions.includes(name)) e.sessions.push(name); }, { settings: true });
  }
  renderSessions();
});

$('sessions').addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if (!btn) return;
  if (btn.type === 'submit') return;
  if (btn.hasAttribute('data-session-add') || btn.hasAttribute('data-session-cancel')) {
    state.addingSession = btn.hasAttribute('data-session-add');
  } else {
    const name = btn.dataset.session;
    updateEntry(state.selected, (e) => {
      e.sessions = e.sessions.includes(name) ? e.sessions.filter((s) => s !== name) : [...e.sessions, name];
      const order = sessionOrder(state.selected);
      e.sessions.sort((a, b) => order(a) - order(b));
    });
  }
  renderSessions();
});

function renderSelectedTechs() {
  const e = getEntry(state.selected);
  const map = techMap();
  $('tech-count').textContent = e.techs.length ? `${e.techs.length}개` : '';
  $('selected-techs').innerHTML = e.techs.map((id) => {
    const t = map.get(id);
    if (!t) return '';
    return `<button type="button" class="chip tech" data-remove="${esc(id)}" title="빼기"><small>${esc(t.cat)}</small>${esc(t.name)}<span class="x">✕</span></button>`;
  }).join('');
}

$('selected-techs').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-remove]');
  if (!btn) return;
  toggleTech(btn.dataset.remove);
});

function toggleTech(id) {
  updateEntry(state.selected, (e) => {
    e.techs = e.techs.includes(id) ? e.techs.filter((t) => t !== id) : [...e.techs, id];
  });
  renderSelectedTechs();
  renderTechList();
}

function renderCats() {
  $('cats').innerHTML = ['전체', ...CATEGORIES]
    .map((c) => `<button type="button" data-cat="${c}" class="${c === state.cat ? 'active' : ''}">${c}</button>`)
    .join('');
}

$('cats').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-cat]');
  if (!btn) return;
  state.cat = btn.dataset.cat;
  renderCats();
  renderTechList();
});

$('tech-search').addEventListener('input', (ev) => {
  state.query = ev.target.value.trim();
  renderTechList();
  updateYoutubeLink();
});

// 검색어 없이 열면 최근에 배운 기술을 한 번에 다시 체크할 수 있게
function renderRecentTechs() {
  const el = $('recent-techs');
  if (state.query || state.cat !== '전체') { el.innerHTML = ''; return; }
  const e = getEntry(state.selected);
  const map = techMap();
  const ids = [...techCounts()]
    .filter(([id]) => !e.techs.includes(id) && map.has(id))
    .sort((a, b) => b[1].last.localeCompare(a[1].last) || b[1].n - a[1].n)
    .slice(0, 8)
    .map(([id]) => id);
  el.innerHTML = ids.length
    ? `<span class="recent-label">최근 배운 동작</span>${ids.map((id) => `<button type="button" class="chip recent" data-recent="${esc(id)}">+ ${esc(map.get(id).name)}</button>`).join('')}`
    : '';
}

$('recent-techs').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-recent]');
  if (btn) toggleTech(btn.dataset.recent);
});

function renderTechList() {
  renderRecentTechs();
  const e = getEntry(state.selected);
  const counts = techCounts();
  const list = allTechs().filter((t) => (state.cat === '전체' || t.cat === state.cat) && matches(t, state.query));
  const rows = list.map((t) => {
    const c = counts.get(t.id);
    const meta = c ? `${c.n}회 · 최근 ${dayLabel(c.last).replace(/ \(.\)/, '')}` : '';
    return `<li><label>
      <input type="checkbox" data-tech="${esc(t.id)}" ${e.techs.includes(t.id) ? 'checked' : ''}>
      <span class="name">${esc(t.name)}<span class="en">${esc(t.en || '')}</span></span>
      <span class="meta">${state.cat === '전체' ? esc(t.cat) : ''}${state.cat === '전체' && meta ? ' · ' : ''}${meta}</span>
    </label></li>`;
  });

  const exact = allTechs().some((t) => norm(t.name) === norm(state.query));
  if (state.query && !exact) {
    const defCat = state.cat === '전체' ? CATEGORIES[0] : state.cat;
    rows.push(`<li class="add-row">
      <span>“${esc(state.query)}” 새 동작으로 추가</span>
      <select id="new-cat">${CATEGORIES.map((c) => `<option ${c === defCat ? 'selected' : ''}>${c}</option>`).join('')}</select>
      <button type="button" class="pill-btn" id="add-tech">추가</button>
      <a class="yt-inline" href="${esc(ytSearchUrl(state.query))}" target="_blank" rel="noopener noreferrer">▶ 유튜브에서 찾아보기</a>
    </li>`);
  }
  if (!rows.length) rows.push('<li class="empty">검색어를 입력하거나 분류를 골라 보세요.</li>');
  $('tech-list').innerHTML = rows.join('');
}

$('tech-list').addEventListener('change', (ev) => {
  if (ev.target.matches('[data-tech]')) toggleTech(ev.target.dataset.tech);
});

$('tech-list').addEventListener('click', (ev) => {
  if (ev.target.id !== 'add-tech') return;
  const cat = $('new-cat').value;
  const tech = { id: `custom:${Date.now()}`, name: state.query, en: '', cat };
  data.custom.push(tech);
  state.query = '';
  $('tech-search').value = '';
  persist({ settings: true });
  toggleTech(tech.id);
});

let memoTimer;
let memoPending = null;
$('memo').addEventListener('input', (ev) => {
  const key = state.selected;
  const value = ev.target.value;
  clearTimeout(memoTimer);
  memoPending = () => { memoPending = null; updateEntry(key, (e) => { e.memo = value; }); };
  memoTimer = setTimeout(memoPending, 300);
});

function flushMemo() {
  clearTimeout(memoTimer);
  if (memoPending) memoPending();
}

// 실수로 지우지 않게 두 번 눌러야 지운다
let clearArmed = null;
function disarmClear() {
  clearTimeout(clearArmed);
  clearArmed = null;
  $('clear-day').textContent = '이 날 기록 지우기';
}

$('clear-day').addEventListener('click', () => {
  if (!data.entries[state.selected]) return;
  if (!clearArmed) {
    $('clear-day').textContent = `한 번 더 누르면 ${dayLabel(state.selected)} 기록이 지워져요`;
    clearArmed = setTimeout(disarmClear, 4000);
    return;
  }
  disarmClear();
  delete data.entries[state.selected];
  persist({ entries: [state.selected] });
  renderCalendar();
  renderSummary();
  renderEditor();
});

/* ---------- 일기 목록 ---------- */

// 하루 기록 내용(개인 연습·동작·메모·사진·영상). 일기 목록과 달력 팝업이 같이 쓴다.
// 팝업 아래쪽: 메모·사진·영상 (수업·개인 연습·동작은 날짜 아래 한 줄에 따로 보인다)
function entryBodyHtml(e) {
  return `${e.memo.trim() ? `<p class="memo-text">${esc(e.memo)}</p>` : ''}
      ${(e.photos || []).length ? `<div class="ds-photos">
        <div class="ds-track">${e.photos.map((p) => `<img src="${esc(photoSrc(p))}" alt="" data-zoom>`).join('')}</div>
        ${e.photos.length > 1 ? `<span class="ds-count">1 / ${e.photos.length}</span>` : ''}
      </div>` : ''}
      ${(e.videos || []).length ? `<ul class="video-list">${e.videos.map((v) => `<li><a href="${esc(v.url)}" target="_blank" rel="noopener noreferrer"><span class="play">▶</span><span class="v-text"><b>${esc(v.label)}</b><small>${esc(videoLabel(v.url))}</small></span></a></li>`).join('')}</ul>` : ''}`;
}

/* ---------- 달력 팝업: 기록한 날 내용 보기 ---------- */

function openDetail(key) {
  const e = getEntry(key);
  const d = fromKey(key);
  const holiday = holidayName(key);
  $('ds-title').textContent = `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEK[d.getDay()]})${holiday ? ` · ${holiday}` : ''}`;
  // 날짜 아래 한 줄: 수업 · 개인 연습 · 동작(분류 + 이름)
  const map = techMap();
  $('ds-pills').innerHTML = [
    ...e.sessions.map((s) => `<span class="pill" style="--c:${sessionColor(s)};--ci:${sessionInk(s)}">${esc(s)}</span>`),
    e.practice ? `<span class="pill info-pill">개인 연습 <b>${e.practice}</b>회</span>` : '',
    ...e.techs.map((id) => map.get(id)).filter(Boolean)
      .map((t) => `<span class="pill tech-pill"><small>${esc(t.cat)}</small> ${esc(t.name)}</span>`),
  ].join('');
  $('ds-body').innerHTML = entryBodyHtml(e).trim() || (e.sessions.length || e.practice || e.techs.length ? '' : '<p class="empty-state">아직 적은 내용이 없어요.</p>');
  $('ds-edit').dataset.key = key;
  openSheet($('day-sheet'));
}

$('ds-edit').addEventListener('click', () => {
  const key = $('ds-edit').dataset.key;
  closeSheet($('day-sheet'), () => openDay(key));
});
$('ds-close').addEventListener('click', () => closeSheet($('day-sheet')));
$('day-sheet').addEventListener('click', (ev) => {
  if (ev.target === $('day-sheet') || ev.target.classList.contains('sheet-wrap')) closeSheet($('day-sheet'));
});

// 팝업 사진을 옆으로 넘기면 몇 번째 사진인지 표시
document.addEventListener('scroll', (ev) => {
  const track = ev.target;
  if (!(track instanceof Element) || !track.classList.contains('ds-track')) return;
  const count = track.parentElement.querySelector('.ds-count');
  if (!count) return;
  const i = Math.round(track.scrollLeft / track.clientWidth);
  count.textContent = `${i + 1} / ${track.children.length}`;
}, true);

// 사진을 누르면 크게 보기 (일기 목록·팝업 공통)
document.addEventListener('click', (ev) => {
  const img = ev.target.closest('img[data-zoom]');
  if (!img) return;
  $('lightbox-img').src = img.src;
  $('lightbox').hidden = false;
});

// 아래에서 올라오는 창 열고 닫기 (닫을 때는 내려가는 모션이 끝난 뒤 숨긴다)
function openSheet(el) {
  clearTimeout(el._closeTimer);
  el.classList.remove('closing');
  el.hidden = false;
  document.body.classList.add('sheet-open');
}

function closeSheet(el, after) {
  el.classList.add('closing');
  clearTimeout(el._closeTimer);
  el._closeTimer = setTimeout(() => {
    el.hidden = true;
    el.classList.remove('closing');
    document.body.classList.remove('sheet-open');
    if (after) after();
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
}

function renderDiary() {
  const map = techMap();
  const q = norm($('diary-search').value.trim());
  const keys = Object.keys(data.entries).sort().reverse().filter((k) => {
    if (!q) return true;
    const e = data.entries[k];
    const hay = [e.memo, ...e.sessions, ...e.techs.map((id) => map.get(id)?.name || '')].join(' ');
    return norm(hay).includes(q) || chosung(norm(hay)).includes(q);
  });

  if (!keys.length) {
    $('diary-list').innerHTML = `<div class="card pink tab"><p class="empty-state">${q ? '검색 결과가 없어요.' : '아직 기록이 없어요. 달력에서 날짜를 골라 첫 기록을 남겨 보세요.'}</p></div>`;
    return;
  }

  // 날짜는 카드 왼쪽 바깥에, 카드는 모두 같은 높이(제목·부제·아래 줄)로. 달이 바뀌면 달 제목을 넣는다.
  const BOW_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 11c-2.5-3.5-7-5.5-8.5-3.5S5 13.5 12 11z"/><path d="M12 11c2.5-3.5 7-5.5 8.5-3.5S19 13.5 12 11z"/><path d="M12 11l-3.5 9M12 11l3.5 9"/></svg>';
  let lastMonth = '';
  $('diary-list').innerHTML = keys.map((k) => {
    const e = data.entries[k];
    const d = fromKey(k);
    const month = k.slice(0, 7);
    const monthHead = month !== lastMonth ? `<h3 class="dl-month">${d.getFullYear()}년 ${d.getMonth() + 1}월</h3>` : '';
    lastMonth = month;
    const names = e.techs.map((id) => map.get(id)?.name).filter(Boolean);
    const memoLine = e.memo.trim().split('\n')[0];
    const photos = e.photos || [];
    // 한 줄 정보: 개인 연습·사진·영상 → 동작 (들은 수업은 앞의 리본 아이콘 색으로 보인다)
    const tags = [
      e.practice ? `<span class="pill info-pill">개인 연습 <b>${e.practice}</b>회</span>` : '',
      (e.photos || []).length ? `<span class="pill info-pill">사진 <b>${e.photos.length}</b>장</span>` : '',
      (e.videos || []).length ? `<span class="pill info-pill">영상 <b>${e.videos.length}</b>개</span>` : '',
      ...names.map((n) => `<span class="pill tech-pill">${esc(n)}</span>`),
    ].join('');
    const holiday = holidayName(k);
    return `${monthHead}<div class="diary-row">
      <div class="dr-date${d.getDay() === 0 || holiday ? ' red' : ''}"><b>${d.getDate()}</b><span>${WEEK[d.getDay()]}</span></div>
      <article class="diary-card${photos.length ? ' has-photo' : ''}" data-open="${k}" role="button" tabindex="0" aria-label="${fullLabel(k)} 기록 보기">
        ${photos.length ? `<div class="dc-photo"><img src="${esc(photoSrc(photos[0]))}" alt="" loading="lazy">${photos.length > 1 ? `<span class="dc-count">+${photos.length - 1}</span>` : ''}</div>` : ''}
        <div class="dc-row">
          <span class="dc-icon${e.sessions.length ? ' on' : ''}" style="--fill:${circleFill(e)}">${BOW_ICON}</span>
          ${memoLine ? `<b class="dc-title">${esc(memoLine)}</b>` : ''}
          <div class="pills">${tags}</div>
        </div>
      </article>
    </div>`;
  }).join('');
}

$('diary-search').addEventListener('input', renderDiary);
$('diary-list').addEventListener('click', (ev) => {
  const card = ev.target.closest('[data-open]');
  if (!card) return;
  openDetail(card.dataset.open);
});
$('diary-list').addEventListener('keydown', (ev) => {
  const card = ev.target.closest('[data-open]');
  if (card && (ev.key === 'Enter' || ev.key === ' ')) {
    ev.preventDefault();
    openDetail(card.dataset.open);
  }
});

/* ---------- 통계 ---------- */

function renderStats() {
  const entries = Object.entries(data.entries);
  const counts = techCounts();
  const map = techMap();
  // 반별 횟수 (시간이 달라도 같은 반으로 묶는다). 아직 기록이 없으면 지금 듣는 반을 0으로 보여 준다.
  const sessionTotals = new Map();
  for (const [, e] of entries) for (const s of e.sessions) sessionTotals.set(classNameOf(s), (sessionTotals.get(classNameOf(s)) || 0) + 1);
  if (!sessionTotals.size) sessionTotals.set(CLASSES[data.level].name, 0);

  const hours = toHours(minutesOf(entries.map(([, e]) => e)));
  // 맨 위는 누적 수련 시간을 크게, 나머지는 바둑판으로. 숫자는 크게, 단위는 작게.
  const tile = (label, n, unit, cls) => `<div class="card ${cls}"><b>${n}<em>${unit}</em></b><span>${esc(label)}</span></div>`;
  const tiles = [
    tile('누적 수련 시간', hours, '시간', 'lime wide').replace('</div>', `<img class="stat-buddy" src="${BUDDY_SRC}" alt="" width="480" height="405"></div>`),
    ...[
      ...[...sessionTotals].map(([s, n]) => [s, n, '번']),
      ['배운 동작 종류', counts.size, '개'],
      ['개인 연습', entries.reduce((n, [, e]) => n + (e.practice || 0), 0), '번'],
    ].map(([label, n, unit], i) => tile(label, n, unit, ['pink', 'mint', 'mint', 'pink'][i % 4])),
  ].join('');

  const blocks = CATEGORIES.map((cat) => {
    const items = [...counts].map(([id, c]) => ({ t: map.get(id), ...c }))
      .filter((x) => x.t && x.t.cat === cat)
      .sort((a, b) => b.n - a.n || b.last.localeCompare(a.last));
    if (!items.length) return '';
    const max = items[0].n;
    return `<section class="cat-block"><h3><span>${cat}</span><span class="muted">${items.length}개</span></h3>
      <ul class="bar-list">${items.map((x) => `<li>
        <span>${esc(x.t.name)}</span>
        <span class="bar"><i style="width:${(x.n / max) * 100}%"></i></span>
        <span class="meta">${x.n}회 · ${dayLabel(x.last).replace(/ \(.\)/, '')}</span>
      </li>`).join('')}</ul></section>`;
  }).join('');

  $('stats').innerHTML = `<div class="stat-grid">${tiles}</div>
    ${monthlyChart()}
    ${radarChart(counts, map)}
    ${weekdayChart()}
    <div class="card mint tab">${blocks || '<p class="empty-state">동작을 체크하면 여기에서 많이 연습한 동작을 볼 수 있어요.</p>'}</div>`;
}

// 통계 맨 위 카드의 캔 든 친구 (그림 위아래가 잘려 있어서 카드 위아래 끝에 맞춘다)
const BUDDY_SRC = 'stat-buddy.png';

/* ---------- 그래프 (SVG) ---------- */

// 최근 8개월: 진한 막대 = 수업 들은 날, 빗금 막대 = 개인 연습 횟수
function monthlyChart() {
  const base = fromKey(today);
  const months = Array.from({ length: 8 }, (_, i) => new Date(base.getFullYear(), base.getMonth() - 7 + i, 1));
  const rows = months.map((m) => {
    const prefix = `${m.getFullYear()}-${pad(m.getMonth() + 1)}`;
    const list = Object.entries(data.entries).filter(([k]) => k.startsWith(prefix)).map(([, e]) => e);
    return {
      label: `${m.getMonth() + 1}월`,
      days: list.filter((e) => e.sessions.length).length,
      rolls: list.reduce((n, e) => n + (e.practice || 0), 0),
      classes: list.reduce((n, e) => n + e.sessions.length, 0),
    };
  });
  const max = Math.max(4, ...rows.map((r) => Math.max(r.days, r.rolls)));
  const W = 340; const H = 210; const top = 18; const bottom = 26; const plot = H - top - bottom;
  const slot = W / rows.length;
  const bw = Math.min(16, slot * 0.34);
  const bars = rows.map((r, i) => {
    const x = i * slot + slot / 2;
    const hd = (r.days / max) * plot;
    const hr = (r.rolls / max) * plot;
    return `<g>
      ${r.days ? `<rect x="${x - bw - 1}" y="${top + plot - hd}" width="${bw}" height="${hd}" rx="2" class="bar-solid"><title>${r.label} 수업 ${r.days}일</title></rect>` : ''}
      ${r.rolls ? `<rect x="${x + 1}" y="${top + plot - hr}" width="${bw}" height="${hr}" rx="2" fill="url(#hatch)" class="bar-hatch"><title>${r.label} 개인 연습 ${r.rolls}회</title></rect>` : ''}
      ${r.days ? `<text x="${x - bw / 2 - 1}" y="${top + plot - hd - 5}" class="bar-num" text-anchor="middle">${r.days}</text>` : ''}
      <text x="${x}" y="${H - 8}" class="axis" text-anchor="middle">${r.label}</text>
    </g>`;
  }).join('');
  const thisYear = String(base.getFullYear());
  const yearHours = toHours(minutesOf(Object.entries(data.entries).filter(([k]) => k.startsWith(thisYear)).map(([, e]) => e)));
  return `<section class="card pink chart">
    <h2 class="chart-title">월별 활동<span>올해 ${yearHours}시간</span></h2>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="최근 8개월 수업일과 개인 연습 횟수">
      <defs><pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="5" height="5" class="hatch-bg"/><line x1="0" y1="0" x2="0" y2="5" class="hatch-line"/>
      </pattern></defs>
      <line x1="0" y1="${top + plot}" x2="${W}" y2="${top + plot}" class="baseline"/>
      ${bars}
    </svg>
    <div class="chart-legend"><span><i class="lg-solid"></i>수업 들은 날</span><span><i class="lg-hatch"></i>개인 연습 횟수</span></div>
  </section>`;
}

// 동작 분류별 연습 횟수를 레이더로
function radarChart(counts, map) {
  const totals = CATEGORIES.map((cat) => [...counts].reduce((n, [id, c]) => n + (map.get(id)?.cat === cat ? c.n : 0), 0));
  const max = Math.max(1, ...totals);
  const W = 340; const H = 300; const cx = W / 2; const cy = H / 2; const R = 100;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / CATEGORIES.length;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const ring = (f) => CATEGORIES.map((_, i) => pt(i, R * f).join(',')).join(' ');
  const shape = totals.map((v, i) => pt(i, R * Math.max(0.06, v / max)).join(',')).join(' ');
  const labels = CATEGORIES.map((cat, i) => {
    const [x, y] = pt(i, R + 24);
    const anchor = Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end';
    return `<text x="${x}" y="${y + 4}" text-anchor="${anchor}" class="axis">${cat} <tspan class="axis-num">${totals[i]}</tspan></text>`;
  }).join('');
  const top = CATEGORIES[totals.indexOf(Math.max(...totals))];
  return `<section class="card mint chart">
    <h2 class="chart-title">동작 밸런스<span>${totals.some(Boolean) ? `${top} 위주로 연습 중` : '동작을 체크하면 채워져요'}</span></h2>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="동작 분류별 연습 횟수">
      ${[1, 2 / 3, 1 / 3].map((f) => `<polygon points="${ring(f)}" class="grid-ring"/>`).join('')}
      ${CATEGORIES.map((_, i) => `<line x1="${cx}" y1="${cy}" x2="${pt(i, R)[0]}" y2="${pt(i, R)[1]}" class="grid-ring"/>`).join('')}
      <polygon points="${shape}" class="radar-shape"/>
      ${labels}
    </svg>
  </section>`;
}

// 요일별로 수업 들은 날 수: 노란 캡슐 높이
function weekdayChart() {
  const byDay = Array(7).fill(0);
  for (const [k, e] of Object.entries(data.entries)) if (e.sessions.length) byDay[fromKey(k).getDay()] += 1;
  const max = Math.max(1, ...byDay);
  const W = 340; const H = 190; const w = 34; const gap = (W - w * 7) / 6; const floor = 160;
  const caps = byDay.map((n, i) => {
    const h = w + (n / max) * (floor - w - 6);
    const x = i * (w + gap);
    return `<rect x="${x}" y="${floor - h}" width="${w}" height="${h}" rx="${w / 2}" class="${n ? 'cap' : 'cap empty'}"><title>${WEEK[i]}요일 ${n}일</title></rect>
      <text x="${x + w / 2}" y="${floor - 12}" text-anchor="middle" class="cap-num">${n}</text>
      <text x="${x + w / 2}" y="${H - 8}" text-anchor="middle" class="axis">${WEEK[i]}</text>`;
  }).join('');
  const best = byDay.some(Boolean) ? `${WEEK[byDay.indexOf(max)]}요일에 가장 많이 나왔어요` : '수업을 기록하면 채워져요';
  return `<section class="card lime chart">
    <h2 class="chart-title">요일별 출석<span>${best}</span></h2>
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="요일별 수업 들은 날 수">${caps}</svg>
  </section>`;
}

function renderSummary() {
  const prefix = today.slice(0, 7);
  const monthDays = Object.entries(data.entries).filter(([k, e]) => k.startsWith(prefix) && e.sessions.length).length;
  const total = Object.values(data.entries).filter((e) => e.sessions.length).length;
  const hours = toHours(minutesOf(Object.values(data.entries)));
  const learned = new Set(Object.values(data.entries).flatMap((e) => e.techs)).size;
  $('summary').innerHTML = [
    [hours, '시간', '누적 수련'],
    [learned, '개', '배운 동작'],
    [monthDays, '일', '이번 달'],
  ].map(([n, unit, label]) => `<div><b>${n}<em>${unit}</em></b><span>${label}</span></div>`).join('');
  renderDday();
  renderBelt();
}

function renderBeltPicker() {
  $('bp-colors').innerHTML = LEVEL_CHOICES.map((id) => `<button type="button" class="bp-stripe level-pick ${id === data.level ? 'on' : ''}" data-level="${id}" style="--c:${CLASSES[id].color}"><i></i>${esc(CLASSES[id].name)}</button>`).join('');
}

// 맨 위 카드의 값은 설정 창에서만 바꾼다
function openSettings() {
  renderBeltPicker();
  $('start-date').value = data.startDate;
  $('nickname').value = data.nickname;
  clearTimeout(sheetCloseTimer);
  $('settings-sheet').classList.remove('closing');
  $('settings-sheet').hidden = false;
  document.body.classList.add('sheet-open');
}

let sheetCloseTimer;
function closeSettings() {
  document.activeElement?.blur();
  renderSummary();
  // 아래로 내려가는 모션이 끝난 뒤에 숨긴다
  const sheet = $('settings-sheet');
  sheet.classList.add('closing');
  clearTimeout(sheetCloseTimer);
  sheetCloseTimer = setTimeout(() => {
    sheet.hidden = true;
    sheet.classList.remove('closing');
    $('settings-hint').hidden = true;
    document.body.classList.remove('sheet-open');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
}

$('open-settings').addEventListener('click', openSettings);
$('close-settings').addEventListener('click', closeSettings);
$('settings-sheet').addEventListener('click', (ev) => {
  if (ev.target === $('settings-sheet') || ev.target.classList.contains('sheet-wrap')) closeSettings();
});
document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  if (!$('settings-sheet').hidden) closeSettings();
  if (!$('day-sheet').hidden) closeSheet($('day-sheet'));
});

$('bp-colors').parentElement.addEventListener('click', (ev) => {
  const c = ev.target.closest('[data-level]');
  if (!c) return;
  data.level = c.dataset.level;
  persist({ settings: true });
  renderBelt();
  renderBeltPicker();
});

// 지금 듣는 반: 리본 칸 (Lv1 → Lv2 중 몇 단계인지, Begin a Ballet면 빈 칸) + 반 이름
function renderBelt() {
  const c = CLASSES[data.level];
  const step = LEVELS.indexOf(data.level);
  $('belt-view').innerHTML = LEVELS.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('');
  $('belt-label').textContent = `${c.name}반`;
}

function renderDday() {
  // "아람님 Brava 2026.03.02 시작"
  $('nick').textContent = data.nickname ? `${data.nickname}님 ` : '';
  $('start-date').value = data.startDate;
  $('start-date').max = today;
  if (!data.startDate) {
    $('dday').textContent = 'D+?';
    $('dday-sub').textContent = '설정에서 시작일을 정해 주세요';
    return;
  }
  // 시작한 날을 D+1로 센다
  const days = Math.round((fromKey(today) - fromKey(data.startDate)) / 86400000) + 1;
  const s = fromKey(data.startDate);
  $('dday').textContent = days > 0 ? `D+${days.toLocaleString()}` : 'D-DAY';
  $('dday-sub').textContent = `${s.getFullYear()}.${pad(s.getMonth() + 1)}.${pad(s.getDate())} 시작`;
}

$('start-date').addEventListener('change', (ev) => {
  data.startDate = ev.target.value;
  persist({ settings: true });
  renderDday();
});

// 그림 파일이 없거나 못 불러오면 깨진 그림 대신 아예 숨긴다
document.querySelectorAll('img').forEach((img) => {
  // 스크립트보다 먼저 실패한 경우도 잡는다
  if (img.complete && !img.naturalWidth) img.hidden = true;
  img.addEventListener('error', () => { img.hidden = true; });
});

/* ---------- 시간표 ---------- */

// 요일 하나씩: 그날 수업을 시간순 목록으로. 처음엔 오늘 요일(일요일이면 월요일).
let ttDay = fromKey(today).getDay() || 1;

function renderTimetable() {
  const todayWd = fromKey(today).getDay();
  $('tt-days').innerHTML = [1, 2, 3, 4, 5, 6].map((wd) => `<button type="button" role="tab" data-day="${wd}"
    class="${wd === ttDay ? 'active' : ''}${wd === todayWd ? ' today' : ''}" aria-selected="${wd === ttDay}">${WEEK[wd]}</button>`).join('');
  const slots = slotsOn(ttDay);
  // 지금 듣는 반은 굵은 노랑 줄로
  $('timetable').innerHTML = slots.length ? slots.map((slot) => {
    const c = CLASSES[slot.cls];
    return `<li class="tt-row${slot.cls === data.level ? ' mine' : ''}">
      <span class="tt-time"><b>${slot.start}</b><small>~${slot.end}</small></span>
      <i class="tt-dot" style="--c:${c.color}"></i>
      <span class="tt-name">${esc(c.name)}${slot.cls === data.level ? '<em>내 반</em>' : ''}</span>
    </li>`;
  }).join('') : '<li class="tt-empty">수업 없음</li>';

  $('class-guide').innerHTML = Object.entries(CLASSES).filter(([, c]) => c.desc).map(([id, c]) => `<section class="guide${id === data.level ? ' mine' : ''}" style="--c:${c.color}">
    <h4><i></i>${esc(c.name)}${c.after ? `<small>${esc(c.after)} 수강</small>` : ''}</h4>
    <p class="guide-info">${esc(c.info)}</p>
    <p>${esc(c.desc)}</p>
  </section>`).join('');
}

$('tt-days').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-day]');
  if (!btn) return;
  ttDay = Number(btn.dataset.day);
  renderTimetable();
});

/* ---------- 탭 ---------- */

// 탭 순서대로 오른쪽/왼쪽에서 밀려 들어오고, 기록 화면은 늘 오른쪽에서 들어온다
const VIEW_ORDER = ['calendar', 'diary', 'timetable', 'stats'];

function showView(view) {
  const prev = state.view;
  if (prev === 'day' && view !== 'day') flushMemo();
  state.view = view;
  document.body.classList.toggle('in-day', view === 'day');
  document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === `view-${view}`));
  const tabIndex = VIEW_ORDER.indexOf(view);
  if (tabIndex >= 0) document.querySelector('.tabs').style.setProperty('--tab', tabIndex);
  if (view === 'diary') renderDiary();
  if (view === 'stats') renderStats();
  if (view === 'timetable') renderTimetable();

  if (prev !== view) {
    let dir = 'right';
    if (prev === 'day') dir = 'left';
    else if (view !== 'day' && VIEW_ORDER.indexOf(view) < VIEW_ORDER.indexOf(prev)) dir = 'left';
    const el = $(`view-${view}`);
    el.classList.remove('enter-right', 'enter-left');
    void el.offsetWidth; // 같은 애니메이션을 다시 시작하려면 한 번 끊어 준다
    el.classList.add(`enter-${dir}`);
    window.scrollTo(0, 0);
  }
}

document.querySelector('.tabs').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-view]');
  if (btn) showView(btn.dataset.view);
});

/* ---------- 백업 ---------- */

$('export').addEventListener('click', async () => {
  const filename = `ballet-journal-${today.replace(/-/g, '')}.json`;
  const json = JSON.stringify(data, null, 2);
  const downloads = window.claude?.use ? await claude.use('downloads') : null;
  if (downloads) {
    try {
      await downloads.save({ filename, data: json });
      $('backup-state').textContent = '백업 파일을 저장했어요.';
    } catch (err) {
      $('backup-state').textContent = err?.code === 'declined' ? '저장을 취소했어요.' : '백업 파일을 저장하지 못했어요.';
    }
    return;
  }
  const blob = new Blob([json], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
});

$('import').addEventListener('change', async (ev) => {
  const file = ev.target.files[0];
  ev.target.value = '';
  if (!file) return;
  try {
    const incoming = normalize(JSON.parse(await file.text()));
    data.entries = { ...data.entries, ...incoming.entries };
    const ids = new Set(data.custom.map((t) => t.id));
    data.custom.push(...incoming.custom.filter((t) => !ids.has(t.id)));
    data.sessions = [...new Set([...data.sessions, ...incoming.sessions])];
    if (incoming.startDate && !data.startDate) data.startDate = incoming.startDate;
    persist({ entries: Object.keys(incoming.entries), settings: true });
    renderAll();
    $('backup-state').textContent = `${Object.keys(incoming.entries).length}일치 기록을 불러왔어요. 같은 날짜는 백업 내용으로 바뀌었어요.`;
  } catch (err) {
    $('backup-state').textContent = '백업 파일을 읽지 못했어요. ballet-journal-*.json 파일인지 확인해 주세요.';
  }
});

function renderAll() {
  renderSummary();
  renderCalendar();
  renderEditor();
  if (state.view === 'diary') renderDiary();
  if (state.view === 'stats') renderStats();
  if (state.view === 'timetable') renderTimetable();
}

$('nickname').addEventListener('change', (ev) => {
  data.nickname = ev.target.value.trim().slice(0, 12);
  ev.target.value = data.nickname;
  persist({ settings: true });
  renderDday();
});

/* ---------- 일반 웹(GitHub Pages)에서 앱처럼 쓰기 ---------- */

// Claude 아티팩트 밖에서 열었을 때만: 오프라인 캐시, 저장 공간 보호, 처음 온 친구 안내
if (!window.claude) {
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  navigator.storage?.persist?.().catch(() => {});
  if (!data.nickname && !data.startDate && !Object.keys(data.entries).length) {
    openSettings();
    $('settings-hint').hidden = false;
  }
}

renderAll();
connectCloud();
