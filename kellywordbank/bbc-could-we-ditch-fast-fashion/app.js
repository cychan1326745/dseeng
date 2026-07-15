/* Answer key and checking logic for Could we ditch fast fashion? — DSE Reading Practice */

const ANSWERS = {
  q1: {
    type: 'text',
    answers: [
      'it means brands constantly search for manufacturers with lower production costs',
      'brands chase cheapest labor and production costs'
    ]
  },
  q2: { type: 'mc', answer: 'B' },
  q3: {
    type: 'multi-mc',
    parts: { q3i: 'T', q3ii: 'F', q3iii: 'NG' }
  },
  q4: {
    type: 'text',
    answers: [
      'invisible social pressure from social media',
      'social pressure to wear new clothes for online photos'
    ]
  },
  q5: {
    type: 'multi-text',
    parts: {
      q5i: [
        'water waste',
        'toxic dye pollution',
        'carbon emissions'
      ],
      q5ii: [
        'landfill waste',
        'synthetic fabric pollution',
        'poisoning water supplies'
      ]
    }
  },
  q6: {
    type: 'text',
    answers: [
      'the 2013 rana plaza factory collapse',
      'rana plaza collapse'
    ]
  },
  q7: {
    type: 'text',
    answers: [
      'fast fashion brands',
      'clothing brands',
      'big fashion brands'
    ]
  },
  q8: {
    type: 'multi-text',
    parts: {
      q8i: ['market'],
      q8ii: ['repair'],
      q8iii: ['circular'],
      q8iv: ['greenwashing']
    }
  },
  q9: {
    type: 'text',
    answers: [
      'celebrities promote thrifting on mainstream tv shows',
      'celebrities have changed public opinion'
    ]
  },
  q10: {
    type: 'multi-text',
    parts: {
      q10i: [
        'repairing old clothes',
        'borrowing from clothing libraries',
        'circular fashion'
      ],
      q10ii: [
        'repairing old clothes',
        'borrowing from clothing libraries',
        'circular fashion'
      ]
    }
  },
  q11: {
    type: 'multi-text',
    parts: {
      q11i: [
        'circular uses biodegradable recycled materials',
        'circular is designed for recycling'
      ],
      q11ii: [
        'both are produced and sold by fashion brands',
        'both are sold to consumers'
      ]
    }
  },
  q12: {
    type: 'text',
    answers: [
      'brands use vague words without proof of real change',
      'it tricks buyers into thinking brands are ethical when they still produce mostly fast fashion'
    ]
  },
  q13: {
    type: 'text',
    answers: [
      'it is just greenwashing',
      'the small collection does not fix the core harm of fast fashion',
      'it is misleading marketing'
    ]
  },
  q14: { type: 'mc', answer: 'C' },
  q15: {
    type: 'text',
    answers: [
      'most people currently rely heavily on fast fashion',
      'it asks if we can give up fast fashion because we currently use it a lot'
    ]
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3i', 'q3ii', 'q3iii'] },
  { id: 'q4', fields: ['q4'] },
  { id: 'q5', fields: ['q5i', 'q5ii'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7'] },
  { id: 'q8', fields: ['q8i', 'q8ii', 'q8iii', 'q8iv'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10i', 'q10ii'] },
  { id: 'q11', fields: ['q11i', 'q11ii'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13'] },
  { id: 'q14', fields: ['q14'] },
  { id: 'q15', fields: ['q15'] }
];

// Get unique storage key for this specific page (different page = different key)
function getStorageKey() {
  // Use page path + title to generate unique key for each practice page
  return `dse-reading-answers-${window.location.pathname}-${document.title}`.replace(/\s+/g, '-');
}

// Load saved answers from localStorage
function loadSavedAnswers() {
  const storageKey = getStorageKey();
  const saved = localStorage.getItem(storageKey);
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
  const storageKey = getStorageKey();
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
  
  localStorage.setItem(storageKey, JSON.stringify(answers));
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
  // If this is a radio group but nothing is checked → return empty string, DO NOT return first option's value
  if (document.querySelector(`input[name="${name}"][type="radio"]`)) {
    return '';
  }
  // Only for text inputs
  const input = document.querySelector(`input[name="${name}"]`);
  return input ? input.value : '';
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
  const storageKey = getStorageKey();
  localStorage.removeItem(storageKey);
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
  // Check if there are saved answers and ask user what to do
  const saved = localStorage.getItem('dse-reading-answers');
  if (saved && saved !== '{}') {
    const restore = confirm('Found previously saved answers from your last visit.\n\nDo you want to RESTORE your previous answers?\n• OK = Restore previous answers\n• Cancel = Start with ALL BLANK answers');
    if (restore) {
      loadSavedAnswers();
    } else {
      // User wants blank slate, clear saved answers
      localStorage.removeItem('dse-reading-answers');
    }
  } else {
    // No saved answers, just load blank
    loadSavedAnswers();
  }
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
