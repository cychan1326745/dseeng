/* Answer key for DSE 2012 Part A Reading */

const ANSWERS = {
  q1: { type: "text", answers: ["they need to rise to the surface to breathe air through their blowholes", "they must swim to the surface to breathe air"] },
  q2: { type: "mc", answer: "A" },
  q3: { type: "text", answers: ["greenish-brown algae", "algae"] },
  q4: { type: "multi-mc", parts: {q4i: "F", q4ii: "T", q4iii: "F"} },
  q5: { type: "text", answers: ["motorboat propeller injuries trapping fishing nets cold stress from low water temperatures", "boat propellers fishing nets cold water"] },
  q6: { type: "text", answers: ["the springs keep a steady warm temperature all winter and help manatees escape freezing coastal seawater", "warm springs serve as winter shelters"] },
  q7: { type: "text", answers: ["sanctuaries"] },
  q8: { type: "multi-text", parts: {q8i: ["shelters"], q8ii: ["nets", "gear"], q8iii: ["ecosystems"], q8iv: ["chain"]} },
  q9: { type: "text", answers: ["lower boat speed limits ban dangerous trapping fishing gear create no-entry protected wildlife sanctuaries", "slow boats ban harmful nets create sanctuaries"] },
  q10: { type: "multi-text", parts: {q10i: ["manatees are air-breathing mammals fish breathe underwater with gills", "manatees breathe air fish have gills"], q10ii: ["both live permanently in shallow coastal and river water environments", "both live in water"]} },
  q11: { type: "text", answers: ["they treat propeller wounds and nurse weak cold-stressed manatees back to full health", "treat wounds and nurse sick manatees"] },
  q12: { type: "text", answers: ["teach family boat owners slow speed rules avoid seafood caught with harmful drift nets donate to manatee rescue charities", "share boat rules avoid harmful seafood donate to charities"] },
  q13: { type: "text", answers: ["their heavy grazing thins seagrass beds so sunlight can reach small water creatures living below the plants", "they keep seagrass thin for sunlight to reach small creatures"] },
  q14: { type: "mc", answer: "B" },
  q15: { type: "text", answers: ["manatees are calm harmless marine animals that feed only on underwater grass like cows on land", "they are gentle plant-eating marine mammals"] },
};

const QUESTION_GROUPS = [
  { id: "q1", fields: ["q1"] },
  { id: "q2", fields: ["q2"] },
  { id: "q3", fields: ["q3"] },
  { id: "q4", fields: ["q4i", "q4ii", "q4iii"] },
  { id: "q5", fields: ["q5"] },
  { id: "q6", fields: ["q6"] },
  { id: "q7", fields: ["q7"] },
  { id: "q8", fields: ["q8i", "q8ii", "q8iii", "q8iv"] },
  { id: "q9", fields: ["q9"] },
  { id: "q10", fields: ["q10i", "q10ii"] },
  { id: "q11", fields: ["q11"] },
  { id: "q12", fields: ["q12"] },
  { id: "q13", fields: ["q13"] },
  { id: "q14", fields: ["q14"] },
  { id: "q15", fields: ["q15"] },
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
      radios.forEach(radio => { if (radio.value === val) { radio.checked = true; found = true; } });
      if (!found) { const input = document.querySelector(`input[name="${name}"]`); if (input) input.value = val; }
    });
  } catch(e) {}
}

function saveAnswers() {
  const answers = {};
  const names = new Set();
  document.querySelectorAll('input[name]').forEach(input => names.add(input.name));
  names.forEach(name => {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    if (radio) answers[name] = radio.value;
    else { const text = document.querySelector(`input[name="${name}"]`); if (text && text.type !== 'radio') answers[name] = text.value; }
  });
  localStorage.setItem('dse-reading-answers', JSON.stringify(answers));
}

function normalize(text) { return (text||'').toLowerCase().trim().replace(/['']/g,"'").replace(/\s+/g,' '); }

function textMatches(userAnswer, acceptedAnswers) {
  const n = normalize(userAnswer);
  if (!n) return false;
  return acceptedAnswers.some(a => { const na = normalize(a); return n===na || n.includes(na) || na.includes(n); });
}

function getFieldValue(name) {
  const radio = document.querySelector(`input[name="${name}"]:checked`);
  if (radio) return radio.value;
  const input = document.querySelector(`input[name="${name}"]`);
  if (input && input.type !== 'radio') return input.value;
  return '';
}

function isFieldAnswered(name) { return getFieldValue(name).trim().length > 0; }
function isQuestionAnswered(qId) { const g = QUESTION_GROUPS.find(g=>g.id===qId); return g ? g.fields.every(isFieldAnswered) : false; }

function checkQuestion(qId) {
  const key = ANSWERS[qId], group = QUESTION_GROUPS.find(g=>g.id===qId);
  if (key.type==='mc') return getFieldValue(group.fields[0])===key.answer;
  if (key.type==='text') return textMatches(getFieldValue(group.fields[0]), key.answers);
  if (key.type==='multi-text') return group.fields.every(f=>textMatches(getFieldValue(f), key.parts[f]));
  if (key.type==='multi-mc') return group.fields.every(f=>getFieldValue(f)===key.parts[f]);
  return false;
}

function updatePalette() {
  const palette = document.getElementById('questionPalette');
  palette.innerHTML = '';
  QUESTION_GROUPS.forEach((g,i)=>{
    const btn = document.createElement('button');
    btn.className='palette-btn'; btn.textContent=i+1; btn.dataset.q=g.id;
    if (isQuestionAnswered(g.id)) btn.classList.add('answered');
    if (submitted) btn.classList.add(checkQuestion(g.id)?'correct-result':'incorrect-result');
    btn.addEventListener('click',()=>{ document.getElementById(g.id).scrollIntoView({behavior:'smooth',block:'start'}); setCurrentQuestion(g.id); });
    palette.appendChild(btn);
  });
  updateAnsweredCount();
}

function setCurrentQuestion(qId) {
  document.querySelectorAll('.question-block').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.palette-btn').forEach(el=>el.classList.remove('current'));
  const block = document.getElementById(qId); if(block) block.classList.add('active');
  const idx = QUESTION_GROUPS.findIndex(g=>g.id===qId);
  const btns = document.querySelectorAll('.palette-btn');
  if(btns[idx]) btns[idx].classList.add('current');
}

function updateAnsweredCount() { const el = document.getElementById('answeredCount'); if(el) el.textContent = QUESTION_GROUPS.filter(g=>isQuestionAnswered(g.id)).length; }

function startTimer() {
  const el = document.getElementById('timer'); let s=0;
  setInterval(()=>{ s++; el.textContent = String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); },1000);
}

function initDivider() {
  const d=document.getElementById('divider'), c=document.getElementById('mainContainer'), p=document.getElementById('passagePanel');
  let drag=false;
  d.addEventListener('mousedown',e=>{drag=true;d.classList.add('dragging');e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!drag)return;const r=c.getBoundingClientRect();p.style.flex=`0 0 ${Math.min(0.7,Math.max(0.3,(e.clientX-r.left)/r.width))*100}%`;});
  document.addEventListener('mouseup',()=>{drag=false;d.classList.remove('dragging');});
}

let submitted = false;

function markResults() {
  submitted = true;
  QUESTION_GROUPS.forEach(g=>{
    const b=document.getElementById(g.id), c=checkQuestion(g.id);
    b.classList.add(c?'correct':'incorrect');
    const sd=document.getElementById('solution-'+g.id); if(sd) sd.style.display='block';
  });
  updatePalette();
}

function calculateScore() { return QUESTION_GROUPS.filter(g=>checkQuestion(g.id)).length; }

function submitTest() {
  markResults();
  const s=calculateScore(), t=QUESTION_GROUPS.length;
  document.getElementById('scoreNumber').textContent=s+'/'+t;
  document.getElementById('scorePercent').textContent=Math.round((s/t)*100)+'% correct';
  document.getElementById('scoreModal').classList.add('show');
  document.getElementById('submitModal').classList.remove('show');
}

function resetTest() {
  submitted=false; localStorage.removeItem('dse-reading-answers');
  document.querySelectorAll('input').forEach(i=>{if(i.type==='radio'||i.type==='checkbox')i.checked=false;else i.value='';});
  document.querySelectorAll('.question-block').forEach(e=>e.classList.remove('correct','incorrect','active'));
  document.querySelectorAll('.inline-solution').forEach(e=>e.style.display='none');
  document.getElementById('scoreModal').classList.remove('show');
  updatePalette();
}

document.addEventListener('DOMContentLoaded',()=>{
  loadSavedAnswers(); updatePalette(); startTimer(); initDivider();
  document.querySelectorAll('input').forEach(i=>{i.addEventListener('change',()=>{saveAnswers();updatePalette();});i.addEventListener('input',()=>{saveAnswers();updatePalette();});});
  document.getElementById('btnSubmit').addEventListener('click',()=>{document.getElementById('submitModal').classList.add('show');updateAnsweredCount();});
  document.getElementById('btnCancelSubmit').addEventListener('click',()=>{document.getElementById('submitModal').classList.remove('show');});
  document.getElementById('btnConfirmSubmit').addEventListener('click',submitTest);
  document.getElementById('btnCloseScore').addEventListener('click',()=>{document.getElementById('scoreModal').classList.remove('show');});
  document.getElementById('btnReview').addEventListener('click',()=>{const u=QUESTION_GROUPS.find(g=>!isQuestionAnswered(g.id))||QUESTION_GROUPS[0];document.getElementById(u.id).scrollIntoView({behavior:'smooth'});setCurrentQuestion(u.id);});
  document.getElementById('btnReset').addEventListener('click',()=>{if(confirm('Reset all answers?'))resetTest();});
  document.getElementById('btnLargerText').addEventListener('click',()=>{document.body.classList.toggle('larger-text');});
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setCurrentQuestion(e.target.dataset.q);});},{root:document.getElementById('questionsPanel'),threshold:0.5});
  document.querySelectorAll('.question-block').forEach(b=>obs.observe(b));
});
