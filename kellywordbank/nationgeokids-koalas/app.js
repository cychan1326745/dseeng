/* Answer key and checking logic for DSE 2012 Part A Reading */

const ANSWERS = {
  q1: { type: "text", answers: ["they are marsupials that raise babies in a belly pouch rather than true bear species", "they are marsupials not bears"] },
  q2: { type: "mc", answer: "A" },
  q3: { type: "text", answers: ["they absorb liquid from the moist eucalyptus leaves they eat", "from moist eucalyptus leaves"] },
  q4: { type: "multi-mc", parts: {q4i: "F", q4ii: "T", q4iii: "F"} },
  q5: { type: "text", answers: ["land clearing for housing and farms climate change bushfires and drought chlamydia bacterial disease", "deforestation bushfires and disease"] },
  q6: { type: "text", answers: ["two fused toes forming a single grooming claw on each hind foot", "a grooming claw made of fused toes"] },
  q7: { type: "text", answers: ["reserves"] },
  q8: { type: "multi-text", parts: {q8i: ["corridors"], q8ii: ["forests"], q8iii: ["ecosystems"], q8iv: ["woodlands"]} },
  q9: { type: "text", answers: ["run wildlife hospitals for injured and sick koalas create protected eucalyptus reserves plant eucalyptus saplings to reconnect separated groups", "wildlife hospitals reserves and replanting"] },
  q10: { type: "multi-text", parts: {q10i: ["adult males mark territory with scent glands and chase strangers joeys stay protected on their mothers back", "adults mark territory joeys stay on mother"], q10ii: ["both rely entirely on eucalyptus leaves as their only food source", "both eat eucalyptus leaves"]} },
  q11: { type: "text", answers: ["they mark trees with scent secretions and chase unfamiliar koalas away from their territory", "mark trees with scent and chase strangers"] },
  q12: { type: "text", answers: ["join eucalyptus tree planting volunteer events share koala conservation knowledge with family avoid brands that use timber from cleared australian native forests", "plant trees share facts avoid bad brands"] },
  q13: { type: "text", answers: ["eucalyptus leaves have very low calories and contain poison long sleep reduces energy use to match their weak diet", "to conserve energy because eucalyptus leaves are low in calories"] },
  q14: { type: "mc", answer: "B" },
  q15: { type: "text", answers: ["koalas are pouch-bearing australian mammals that live exclusively in eucalyptus forests and eat only eucalyptus foliage", "australian marsupials living in eucalyptus forests eating only eucalyptus"] }
};

const QUESTION_GROUPS = [
  { id: "q1", fields: ["q1"] }, { id: "q2", fields: ["q2"] }, { id: "q3", fields: ["q3"] },
  { id: "q4", fields: ["q4i", "q4ii", "q4iii"] }, { id: "q5", fields: ["q5"] }, { id: "q6", fields: ["q6"] },
  { id: "q7", fields: ["q7"] }, { id: "q8", fields: ["q8i", "q8ii", "q8iii", "q8iv"] },
  { id: "q9", fields: ["q9"] }, { id: "q10", fields: ["q10i", "q10ii"] }, { id: "q11", fields: ["q11"] },
  { id: "q12", fields: ["q12"] }, { id: "q13", fields: ["q13"] }, { id: "q14", fields: ["q14"] },
  { id: "q15", fields: ["q15"] }
];

function loadSavedAnswers() {
  const saved = localStorage.getItem('dse-reading-answers');
  if (!saved) return;
  try {
    const answers = JSON.parse(saved);
    Object.keys(answers).forEach(name => {
      const val = answers[name];
      const radios = document.querySelectorAll(`input[name="${name}"]`);
      let found = false;
      radios.forEach(radio => {
        if (radio.value === val) { radio.checked = true; found = true; }
      });
      if (!found) {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) input.value = val;
      }
    });
  } catch(e) { console.error(e); }
}

function saveAnswers() {
  const answers = {};
  const names = new Set();
  document.querySelectorAll('input[name]').forEach(input => names.add(input.name));
  names.forEach(name => {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    if (radio) answers[name] = radio.value;
    else {
      const text = document.querySelector(`input[name="${name}"]`);
      if (text && text.type !== 'radio') answers[name] = text.value;
    }
  });
  localStorage.setItem('dse-reading-answers', JSON.stringify(answers));
}

function normalize(text) {
  return (text || '').toLowerCase().trim().replace(/['']/g, "'").replace(/\s+/g, ' ');
}

function textMatches(userAnswer, acceptedAnswers) {
  const normalized = normalize(userAnswer);
  if (!normalized) return false;
  return acceptedAnswers.some((ans) => {
    const a = normalize(ans);
    return normalized === a || normalized.includes(a) || a.includes(normalized);
  });
}

function getFieldValue(name) {
  const radio = document.querySelector(`input[name="${name}"]:checked`);
  if (radio) return radio.value;
  const input = document.querySelector(`input[name="${name}"]`);
  if (input && input.type !== 'radio') return input.value;
  return '';
}

function isFieldAnswered(name) { return getFieldValue(name).trim().length > 0; }

function isQuestionAnswered(qId) {
  const group = QUESTION_GROUPS.find((g) => g.id === qId);
  if (!group) return false;
  return group.fields.every(isFieldAnswered);
}

function checkQuestion(qId) {
  const key = ANSWERS[qId];
  const group = QUESTION_GROUPS.find((g) => g.id === qId);
  if (key.type === 'mc') return getFieldValue(group.fields[0]) === key.answer;
  if (key.type === 'text') return textMatches(getFieldValue(group.fields[0]), key.answers);
  if (key.type === 'multi-text') return group.fields.every((field) => textMatches(getFieldValue(field), key.parts[field]));
  if (key.type === 'multi-mc') return group.fields.every((field) => getFieldValue(field) === key.parts[field]);
  return false;
}

function updatePalette() {
  const palette = document.getElementById('questionPalette');
  palette.innerHTML = '';
  QUESTION_GROUPS.forEach((group, index) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.textContent = index + 1;
    btn.dataset.q = group.id;
    if (isQuestionAnswered(group.id)) btn.classList.add('answered');
    if (submitted) btn.classList.add(checkQuestion(group.id) ? 'correct-result' : 'incorrect-result');
    btn.addEventListener('click', () => {
      document.getElementById(group.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentQuestion(group.id);
    });
    palette.appendChild(btn);
  });
  updateAnsweredCount();
}

function setCurrentQuestion(qId) {
  document.querySelectorAll('.question-block').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.palette-btn').forEach((el) => el.classList.remove('current'));
  const block = document.getElementById(qId);
  if (block) block.classList.add('active');
  const index = QUESTION_GROUPS.findIndex((g) => g.id === qId);
  const btns = document.querySelectorAll('.palette-btn');
  if (btns[index]) btns[index].classList.add('current');
}

function updateAnsweredCount() {
  const count = QUESTION_GROUPS.filter((g) => isQuestionAnswered(g.id)).length;
  const el = document.getElementById('answeredCount');
  if (el) el.textContent = count;
}

function startTimer() {
  const timerEl = document.getElementById('timer');
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);
}

function initDivider() {
  const divider = document.getElementById('divider');
  const container = document.getElementById('mainContainer');
  const passage = document.getElementById('passagePanel');
  let dragging = false;
  divider.addEventListener('mousedown', (e) => { dragging = true; divider.classList.add('dragging'); e.preventDefault(); });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    passage.style.flex = `0 0 ${Math.min(0.7, Math.max(0.3, ratio)) * 100}%`;
  });
  document.addEventListener('mouseup', () => { dragging = false; divider.classList.remove('dragging'); });
}

let submitted = false;

function markResults() {
  submitted = true;
  QUESTION_GROUPS.forEach((group) => {
    const block = document.getElementById(group.id);
    const correct = checkQuestion(group.id);
    block.classList.add(correct ? 'correct' : 'incorrect');
    const qNum = parseInt(group.id.replace('q', ''));
    const solutionDiv = document.getElementById(`solution-q${qNum}`);
    if (solutionDiv) solutionDiv.style.display = 'block';
  });
  updatePalette();
}

function calculateScore() { return QUESTION_GROUPS.filter((g) => checkQuestion(g.id)).length; }

function submitTest() {
  markResults();
  const score = calculateScore();
  const total = QUESTION_GROUPS.length;
  const pct = Math.round((score / total) * 100);
  document.getElementById('scoreNumber').textContent = `${score}/${total}`;
  document.getElementById('scorePercent').textContent = `${pct}% correct`;
  document.getElementById('scoreModal').classList.add('show');
  document.getElementById('submitModal').classList.remove('show');
}

function resetTest() {
  submitted = false;
  localStorage.removeItem('dse-reading-answers');
  document.querySelectorAll('input').forEach((input) => {
    if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
    else input.value = '';
  });
  document.querySelectorAll('.question-block').forEach((el) => el.classList.remove('correct', 'incorrect', 'active'));
  document.querySelectorAll('.inline-solution').forEach((el) => el.style.display = 'none');
  document.getElementById('scoreModal').classList.remove('show');
  updatePalette();
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedAnswers();
  updatePalette();
  startTimer();
  initDivider();
  document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => { saveAnswers(); updatePalette(); });
    input.addEventListener('input', () => { saveAnswers(); updatePalette(); });
  });
  document.getElementById('btnSubmit').addEventListener('click', () => { document.getElementById('submitModal').classList.add('show'); updateAnsweredCount(); });
  document.getElementById('btnCancelSubmit').addEventListener('click', () => { document.getElementById('submitModal').classList.remove('show'); });
  document.getElementById('btnConfirmSubmit').addEventListener('click', submitTest);
  document.getElementById('btnCloseScore').addEventListener('click', () => { document.getElementById('scoreModal').classList.remove('show'); });
  document.getElementById('btnReview').addEventListener('click', () => {
    const firstUnanswered = QUESTION_GROUPS.find((g) => !isQuestionAnswered(g.id));
    const target = firstUnanswered || QUESTION_GROUPS[0];
    document.getElementById(target.id).scrollIntoView({ behavior: 'smooth' });
    setCurrentQuestion(target.id);
  });
  document.getElementById('btnReset').addEventListener('click', () => { if (confirm('Reset all answers and start again?')) resetTest(); });
  document.getElementById('btnLargerText').addEventListener('click', () => { document.body.classList.toggle('larger-text'); });
  const observer = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setCurrentQuestion(entry.target.dataset.q); }); },
    { root: document.getElementById('questionsPanel'), threshold: 0.5 }
  );
  document.querySelectorAll('.question-block').forEach((block) => observer.observe(block));
});
