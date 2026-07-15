/* Answer key and checking logic */
const ANSWERS = {
  q1: {
    type: "text",
    answers: [
      'Once a month. / She goes once a month.'
    ]
  },
  q2: { type: "mc", answer: "B" },
  q3: {
    type: "text",
    answers: [
      '"It" refers to the way some older libraries are integrated into municipal\n     buildings or wet markets. (Accept: the integration of libraries into\n     municipal buildings/wet markets.)'
    ]
  },
  q4: {
    type: "text",
    answers: [
      '(a) F (visits dropped from 34.7 million in 2019 to 21.5 million in 2023)\n    (b) F (e-book use soared to 3.39 million in 2020, and demand remained; in\n       2024 it was 2.32 million – still high)\n    (c) T (paragraph 24 mentions door-to-door book couriers in mainland China)'
    ]
  },
  q5: {
    type: "text",
    answers: [
      '(1) to escape the hot weather\n    (2) to escape the noisy streets\n    (Accept: to find quiet / a respect for quiet)'
    ]
  },
  q6: {
    type: "text",
    answers: [
      '"Underscore" means to emphasise / highlight / draw attention to something.'
    ]
  },
  q7: {
    type: "text",
    answers: [
      '(a) flavour\n    (b) municipal\n    (c) ditch\n    (d) colour'
    ]
  },
  q8: {
    type: "text",
    answers: [
      'Because after years of pandemic restrictions kept visitors away, libraries\n    are struggling to bring them back. / Physical visits have not yet recovered\n    from the pandemic decline.'
    ]
  },
  q9: {
    type: "text",
    answers: [
      'A dual strategy means libraries should continue enhancing digital services\n    (such as e-lending and databases) while also making their physical spaces\n    more attractive.'
    ]
  },
  q10: {
    type: "text",
    answers: [
      'Similarity: Both are seeing similar trends – in-person visits have\n     rebounded slightly while e-resource use has hit new highs.\n     Difference: (Accept any reasonable difference, e.g. mainland China\n     libraries offer door-to-door book couriers / Shanghai Library East\n     functions as a community hub with art and performances.)'
    ]
  },
  q11: {
    type: "text",
    answers: [
      'Stratman is concerned that student study areas are "quite drab, almost like\n     a hospital" with bad lighting, and that they need more colour to be\n     welcoming for young people.'
    ]
  },
  q12: {
    type: "text",
    answers: [
      '(1) Door-to-door book couriers\n     (2) Integrating library services with art and museums / Shanghai Library\n         East functions as a community hub blending library services with art,\n         performances and learning spaces.'
    ]
  },
  q13: {
    type: "text",
    answers: [
      'Stratman\'s videos sparked a renewed appreciation among Hongkongers for\n     their neighbourhood libraries. / They made people see their local libraries\n     in a new way.'
    ]
  },
  q14: { type: "mc", answer: "B" },
  q15: {
    type: "text",
    answers: [
      'The title suggests the article focuses on a content creator (Steven\n     Stratman) who highlights the unusual and distinctive features (quirks)\n     that make Hong Kong\'s public libraries unique compared to libraries\n     elsewhere.\n\n================================================================================'
    ]
  },
};

const QUESTION_GROUPS = [
  { id: "q1", fields: ["q1"] },
  { id: "q2", fields: ["q2"] },
  { id: "q3", fields: ["q3"] },
  { id: "q4", fields: ["q4"] },
  { id: "q5", fields: ["q5"] },
  { id: "q6", fields: ["q6"] },
  { id: "q7", fields: ["q7"] },
  { id: "q8", fields: ["q8"] },
  { id: "q9", fields: ["q9"] },
  { id: "q10", fields: ["q10"] },
  { id: "q11", fields: ["q11"] },
  { id: "q12", fields: ["q12"] },
  { id: "q13", fields: ["q13"] },
  { id: "q14", fields: ["q14"] },
  { id: "q15", fields: ["q15"] },
];



// Load saved answers from localStorage
function loadSavedAnswers() {
  const saved = localStorage.getItem('dse-reading-answers');
  if (!saved) return;
  try {
    const answers = JSON.parse(saved);
    Object.keys(answers).forEach(name => {
      const val = answers[name];
      // For radio buttons, find the one with matching value
      const radios = document.querySelectorAll(`input[name="${name}"]`);
      let found = false;
      radios.forEach(radio => {
        if (radio.value === val) {
          radio.checked = true;
          found = true;
        }
      });
      // If not radio, it's text input
      if (!found) {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) input.value = val;
      }
    });
  } catch(e) {
    console.error('Failed to load saved answers', e);
  }
}

// Save current answers to localStorage
function saveAnswers() {
  const answers = {};
  // Collect unique names
  const names = new Set();
  document.querySelectorAll('input[name]').forEach(input => names.add(input.name));
  
  names.forEach(name => {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    if (radio) {
      answers[name] = radio.value;
    } else {
      const text = document.querySelector(`input[name="${name}"]`);
      if (text && text.type !== 'radio') {
        answers[name] = text.value;
      }
    }
  });
  
  localStorage.setItem('dse-reading-answers', JSON.stringify(answers));
}

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ');
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
  // No radio checked → return empty string, NOT the first option's value
  const input = document.querySelector(`input[name="${name}"]`);
  if (input && input.type !== 'radio') {
    return input.value;
  }
  return '';
}

function isFieldAnswered(name) {
  const val = getFieldValue(name);
  return val.trim().length > 0;
}

function isQuestionAnswered(qId) {
  const group = QUESTION_GROUPS.find((g) => g.id === qId);
  if (!group) return false;
  return group.fields.every(isFieldAnswered);
}

function checkQuestion(qId) {
  const key = ANSWERS[qId];
  const group = QUESTION_GROUPS.find((g) => g.id === qId);

  if (key.type === 'mc') {
    const val = getFieldValue(group.fields[0]);
    return val === key.answer;
  }

  if (key.type === 'text') {
    const val = getFieldValue(group.fields[0]);
    return textMatches(val, key.answers);
  }

  if (key.type === 'multi-text') {
    return group.fields.every((field) => {
      const val = getFieldValue(field);
      return textMatches(val, key.parts[field]);
    });
  }

  if (key.type === 'multi-mc') {
    return group.fields.every((field) => getFieldValue(field) === key.parts[field]);
  }

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
    if (submitted) {
      btn.classList.add(checkQuestion(group.id) ? 'correct-result' : 'incorrect-result');
    }

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

  divider.addEventListener('mousedown', (e) => {
    dragging = true;
    divider.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(0.7, Math.max(0.3, ratio));
    passage.style.flex = `0 0 ${clamped * 100}%`;
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    divider.classList.remove('dragging');
  });
}

let submitted = false;

function markResults() {
  submitted = true;
  QUESTION_GROUPS.forEach((group) => {
    const block = document.getElementById(group.id);
    const correct = checkQuestion(group.id);
    block.classList.add(correct ? 'correct' : 'incorrect');
    // Show the inline solution for this question
    const qNum = parseInt(group.id.replace('q', ''));
    const solutionDiv = document.getElementById(`solution-q${qNum}`);
    if (solutionDiv) {
      solutionDiv.style.display = 'block';
    }
  });

  updatePalette();
}

function calculateScore() {
  return QUESTION_GROUPS.filter((g) => checkQuestion(g.id)).length;
}

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
  document.querySelectorAll('.question-block').forEach((el) => {
    el.classList.remove('correct', 'incorrect', 'active');
  });
  // Hide all inline solutions
  document.querySelectorAll('.inline-solution').forEach((el) => {
    el.style.display = 'none';
  });
  document.getElementById('scoreModal').classList.remove('show');
  updatePalette();
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedAnswers();
  updatePalette();
  startTimer();
  initDivider();

  document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', () => {
      saveAnswers();
      updatePalette();
    });
    input.addEventListener('input', () => {
      saveAnswers();
      updatePalette();
    });
  });

  document.getElementById('btnSubmit').addEventListener('click', () => {
    document.getElementById('submitModal').classList.add('show');
    updateAnsweredCount();
  });

  document.getElementById('btnCancelSubmit').addEventListener('click', () => {
    document.getElementById('submitModal').classList.remove('show');
  });

  document.getElementById('btnConfirmSubmit').addEventListener('click', submitTest);

  document.getElementById('btnCloseScore').addEventListener('click', () => {
    document.getElementById('scoreModal').classList.remove('show');
  });

  document.getElementById('btnReview').addEventListener('click', () => {
    const firstUnanswered = QUESTION_GROUPS.find((g) => !isQuestionAnswered(g.id));
    const target = firstUnanswered || QUESTION_GROUPS[0];
    document.getElementById(target.id).scrollIntoView({ behavior: 'smooth' });
    setCurrentQuestion(target.id);
  });

  document.getElementById('btnReset').addEventListener('click', () => {
    if (confirm('Reset all answers and start again?')) resetTest();
  });

  document.getElementById('btnLargerText').addEventListener('click', () => {
    document.body.classList.toggle('larger-text');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentQuestion(entry.target.dataset.q);
        }
      });
    },
    { root: document.getElementById('questionsPanel'), threshold: 0.5 }
  );

  document.querySelectorAll('.question-block').forEach((block) => observer.observe(block));
});
