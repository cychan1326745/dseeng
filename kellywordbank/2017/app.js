/* Answer key and checking logic for DSE 2017 Reading Part A - The Myth of Recycling */

const ANSWERS = {
  q1: { type: 'mc', answer: 'E-WASTE' },
  q2: {
    type: 'text',
    answers: [
      'helping the community and protecting the environment',
      'helping community and protecting environment',
      'protecting the environment and helping community'
    ]
  },
  q3: {
    type: 'multi-text',
    parts: {
      q3i: [
        'recycling was wasteful',
        'recycling was costly and ineffectual',
        'the recycling process was wasteful costly and ineffectual'
      ],
      q3ii: [
        'the industry was still new it would improve when it matured',
        'it was unfair to rush to judgment recycling would improve as industry matured',
        'modern recycling movement had just begun it would flourish when mature'
      ]
    }
  },
  q4: {
    type: 'multi-mc',
    parts: { q4i: 'F', q4ii: 'NG', q4iii: 'F', q4iv: 'T' }
  },
  q5: {
    type: 'text',
    answers: [
      'recycled materials',
      'recycled materials exported overseas',
      'recycled materials are in less demand'
    ]
  },
  q6: { type: 'mc', answer: 'A' },
  q7: {
    type: 'text',
    answers: [
      'because it is promoted as a virtue from kindergarten through university people are indoctrinated not taught costs and benefits',
      'recycling is relentlessly promoted as a virtue in education people don\'t learn real costs and benefits',
      'they are indoctrinated in schools from a young age'
    ]
  },
  q8: {
    type: 'multi-text',
    parts: {
      q8i: ['carbon', 'carbon emissions', 'emissions'],
      q8ii: ['recycle', 'recycle plastic'],
      q8iii: ['difference'],
      q8iv: ['hot water', 'heated water'],
      q8v: ['coal']
    }
  },
  q9: { type: 'mc', answer: 'B' },
  q10: { type: 'mc', answer: 'C' },
  q11: {
    type: 'multi-text-mc',
    parts: {
      q11i: [
        'because it is a moral issue not cost-benefit for politicians',
        'politicians see it as a question of morality not cost-benefit',
        'to appear environmentally friendly'
      ],
      q11ii: 'D'
    }
  },
  q12: { type: 'mc', answer: 'A' },
  q13: {
    type: 'multi-text',
    parts: {
      q13i: ['34', '34%'],
      q13ii: ['25', '25%'],
      q13iii: ['50', '50%'],
      q13iv: ['35', '35%']
    }
  },
  q14: {
    type: 'multi-mc',
    parts: { q14i: 'Some', q14ii: 'None', q14iii: 'All' }
  },
  q15: {
    type: 'multi-text',
    parts: {
      q15i: ['landfills', 'modern landfills', 'landfill'],
      q15ii: [
        'little environmental impact captured methane for electricity',
        'relatively little environmental impact can generate electricity from methane'
      ],
      q15iii: ['incinerators', 'modern incinerators', 'incineration'],
      q15iv: [
        'few pollutants can generate clean energy',
        'releases very few pollutants can generate clean energy'
      ]
    }
  },
  q16: {
    type: 'text',
    answers: [
      'recycling is supposed to be good for environment but it creates environmental problems',
      'ironic that recycling which is supposed to help environment actually causes pollution odors rats'
    ]
  },
  q17: {
    type: 'text',
    answers: [
      'because it reduces demand for new products which hurts mining drilling logging industries',
      'workers in mining drilling logging oppose it because less new manufacturing means less work'
    ]
  },
  q18: {
    type: 'text',
    answers: [
      'paper cardboard and aluminum',
      'only a few materials paper cardboard aluminum'
    ]
  },
  q19: {
    type: 'multi-text',
    parts: {
      q19a: ['F', 'f'],
      q19b: ['D', 'd'],
      q19c: ['B', 'b'],
      q19d: ['A', 'a']
    }
  },
  q20: {
    type: 'text',
    answers: [
    ]
  },
  q21: { type: 'mc', answer: 'C' }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3i', 'q3ii'] },
  { id: 'q4', fields: ['q4i', 'q4ii', 'q4iii', 'q4iv'] },
  { id: 'q5', fields: ['q5'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7'] },
  { id: 'q8', fields: ['q8i', 'q8ii', 'q8iii', 'q8iv', 'q8v'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10'] },
  { id: 'q11', fields: ['q11i', 'q11ii'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13i', 'q13ii', 'q13iii', 'q13iv'] },
  { id: 'q14', fields: ['q14i', 'q14ii', 'q14iii'] },
  { id: 'q15', fields: ['q15i', 'q15ii', 'q15iii', 'q15iv'] },
  { id: 'q16', fields: ['q16'] },
  { id: 'q17', fields: ['q17'] },
  { id: 'q18', fields: ['q18'] },
  { id: 'q19', fields: ['q19a', 'q19b', 'q19c', 'q19d'] },
  { id: 'q20', fields: ['q20'] },
  { id: 'q21', fields: ['q21'] }
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
      const radios = document.querySelectorAll(`input[name=\"${name}\"]`);
      let found = false;
      radios.forEach(radio => {
        if (radio.value === val) {
          radio.checked = true;
          found = true;
        }
      });
      // If not radio, it's text input
      if (!found) {
        const input = document.querySelector(`input[name=\"${name}\"]`);
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
    const radio = document.querySelector(`input[name=\"${name}\"]:checked`);
    if (radio) {
      answers[name] = radio.value;
    } else {
      const text = document.querySelector(`input[name=\"${name}\"]`);
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
    .replace(/\\s+/g, ' ');
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
  const radio = document.querySelector(`input[name=\"${name}\"]:checked`);
  if (radio) return radio.value;
  // No radio checked → return empty string, NOT the first option's value
  const input = document.querySelector(`input[name=\"${name}\"]`);
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

  if (key.type === 'multi-text-mc') {
    return group.fields.every((field) => {
      if (field.endsWith('ii') && key.parts[field] && typeof key.parts[field] === 'string') {
        return getFieldValue(field) === key.parts[field];
      } else {
        const val = getFieldValue(field);
        return textMatches(val, key.parts[field]);
      }
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
