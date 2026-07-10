/* Answer key and checking logic for BBC Learning English: What makes a modern-day curriculum — DSE Reading Practice */

const ANSWERS = {
  q1: {
    type: 'text',
    answers: [
      'she is an educational researcher',
      'an educational researcher who has spent 15 years studying curriculum reform across europe'
    ]
  },
  q2: {
    type: 'text',
    answers: [
      'textbook knowledge becomes outdated quickly',
      'hard-earned textbook knowledge might become out-of-date within just a few years'
    ]
  },
  q3: { type: 'mc', answer: 'A' },
  q4: {
    type: 'multi-text',
    parts: {
      q4i: [
        'focused mainly on academic knowledge'
      ],
      q4ii: [
        'designed to produce office-workers and factory employees'
      ]
    }
  },
  q5: {
    type: 'text',
    answers: [
      'because many high-scoring students cannot distinguish true news from fake online',
      'because they are essential for daily modern life that traditional curricula do not teach'
    ]
  },
  q6: {
    type: 'text',
    answers: [
      'practical life-skills and emotional intelligence',
      'practical life skills and eq',
      'the new soft skills that should be added to the curriculum'
    ]
  },
  q7: {
    type: 'text',
    answers: [
      'that adding new topics will reduce time for exam-related subjects',
      'that eq lessons take time away from academic study'
    ]
  },
  q8: {
    type: 'multi-text',
    parts: {
      q8i: [
        'eq teaches practical soft skills which academic study does not focus on',
        'eq is about life skills while academic is about knowledge'
      ],
      q8ii: [
        'they complement each other: eq helps students get better grades',
        'both help students improve academic performance'
      ]
    }
  },
  q9: {
    type: 'multi-mc',
    parts: { q9i: 'T', q9ii: 'NG', q9iii: 'F' }
  },
  q10: {
    type: 'text',
    answers: [
      'they are unwilling to change',
      'they resist reform',
      'they value exam results above everything else'
    ]
  },
  q11: {
    type: 'multi-text',
    parts: {
      q11i: ['practical'],
      q11ii: ['reduce'],
      q11iii: ['complement'],
      q11iv: ['conservative-minded'],
      q11v: ['examples']
    }
  },
  q12: {
    type: 'text',
    answers: [
      'ai and digital change make textbook knowledge outdated quickly',
      'textbook knowledge becomes out-of-date within just a few years in a rapidly changing job market'
    ]
  },
  q13: {
    type: 'text',
    answers: [
      'some parents',
      'the parents who complained about adding new topics'
    ]
  },
  q14: {
    type: 'text',
    answers: [
      'to make each other better',
      'to work well together and improve the overall result',
      'to go well together and complement each other'
    ]
  },
  q15: {
    type: 'text',
    answers: [
      'because conservative-minded policymakers still value exam results above everything else',
      'because policymakers resist change'
    ]
  },
  q16: {
    type: 'text',
    answers: [
      'to produce independent thoughtful young adults who can adapt to change',
      'to train not just exam takers but adaptable young people'
    ]
  },
  q17: {
    type: 'text',
    answers: [
      'old curricula are outdated and need to be revised',
      'they do not prepare students adequately for modern challenges'
    ]
  },
  q18: {
    type: 'text',
    answers: [
      'she is supportive but realistic/optimistic',
      'she supports reform but admits progress is slow',
      'she is hopeful that more will change in the future'
    ]
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3'] },
  { id: 'q4', fields: ['q4i', 'q4ii'] },
  { id: 'q5', fields: ['q5'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7'] },
  { id: 'q8', fields: ['q8i', 'q8ii'] },
  { id: 'q9', fields: ['q9i', 'q9ii', 'q9iii'] },
  { id: 'q10', fields: ['q10'] },
  { id: 'q11', fields: ['q11i', 'q11ii', 'q11iii', 'q11iv', 'q11v'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13'] },
  { id: 'q14', fields: ['q14'] },
  { id: 'q15', fields: ['q15'] },
  { id: 'q16', fields: ['q16'] },
  { id: 'q17', fields: ['q17'] },
  { id: 'q18', fields: ['q18'] }
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
    .replace(/['’]/g, "'")
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
