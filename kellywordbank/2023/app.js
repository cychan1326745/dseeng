/* Answer key and checking logic for DSE 2023 Reading Part A - Flash Fiction */

const ANSWERS = {
  q1: {
    type: 'multi-mc',
    parts: { q1i: 'B', q1ii: 'B', q1iii: 'C' }
  },
  q2: {
    type: 'text',
    answers: [
      'unfortunately'
    ]
  },
  q3: {
    type: 'text',
    answers: [
      'technology has made many people have shorter attention spans',
      'people now have shorter attention spans because of technology',
      'technology resulted in shorter attention spans'
    ]
  },
  q4: {
    type: 'text',
    answers: [
      'snippets',
      'snippet'
    ]
  },
  q5: {
    type: 'multi-text',
    parts: {
      q5i: ['limit', 'limits'],
      q5ii: ['solid'],
      q5iii: ['overkill']
    }
  },
  q6: {
    type: 'multi-text',
    parts: {
      q6i: ['opposes', 'antagonist', 'opposition'],
      q6ii: ['✓', 'tick', 'correct'],
      q6iii: ['possibility', 'might', 'may'],
      q6iv: ['if']
    }
  },
  q7: {
    type: 'multi-text',
    parts: {
      q7i: ['limited'],
      q7ii: ['complex'],
      q7iii: ['end', 'final'],
      q7iv: ['scene']
    }
  },
  q8: {
    type: 'text',
    answers: [
      'the theme',
      'your theme',
      'the theme of the story',
      'the moral argument of the story'
    ]
  },
  q9: { type: 'mc', answer: 'D' },
  q10: {
    type: 'text',
    answers: [
      'review your writing',
      'edit and revise your draft',
      'go back to edit your work',
      'remove unnecessary words'
    ]
  },
  q11: { type: 'mc', answer: 'A' },
  q12: {
    type: 'text',
    answers: [
      'timothy\'s eyes nearly popped out of his head',
      'eyes nearly popped out of his head'
    ]
  },
  q13: {
    type: 'text',
    answers: [
      'the other competitors',
      'the other contestants',
      'other people in the laboratory'
    ]
  },
  q14: {
    type: 'multi-text',
    parts: {
      q14i: ['chemistry', 'class'],
      q14ii: ['gave', 'mumbled'],
      q14iii: ['enthusiastic', 'enthused'],
      q14iv: ['class thug']
    }
  },
  q15: {
    type: 'text',
    answers: [
      'to decline the invitation',
      'to withdraw from the competition',
      'to say no to volunteering',
      'to change his answer'
    ]
  },
  q16: {
    type: 'multi-mc',
    parts: { q16i: 'F', q16ii: 'NG', q16iii: 'T', q16iv: 'T' }
  },
  q17: {
    type: 'text',
    answers: [
      'the bad smell from his mixture',
      'the thick grey smoke from his mixture',
      'the unexpected reaction of the chemicals he mixed'
    ]
  },
  q18: {
    type: 'text',
    answers: [
      'mixed random chemicals together',
      'mixed the contents of randomly picked bottles',
      'mixed different chemicals he picked at random'
    ]
  },
  q19: {
    type: 'text',
    answers: [
      'timothy winning the young scientist competition',
      'that his student timothy won the competition',
      'the biggest bang that won the competition'
    ]
  },
  q20: {
    type: 'multi-text',
    parts: {
      q20i: ['B', 'b'],
      q20ii: ['D', 'd'],
      q20iii: ['A', 'a']
    }
  },
  q21: {
    type: 'multi-text',
    parts: {
      q21i: [
        'it focuses on one main character',
        'it focuses on one scene',
        'it focuses on one conflict',
        'it is under 1000 words'
      ],
      q21ii: [
        'it focuses on one main character',
        'it focuses on one scene',
        'it focuses on one conflict',
        'it is under 1000 words'
      ]
    }
  },
  q22: {
    type: 'multi-text',
    parts: {
      q22i: ['D', 'd'],
      q22ii: ['E', 'e'],
      q22iii: ['B', 'b']
    }
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1i', 'q1ii', 'q1iii'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3'] },
  { id: 'q4', fields: ['q4'] },
  { id: 'q5', fields: ['q5i', 'q5ii', 'q5iii'] },
  { id: 'q6', fields: ['q6i', 'q6ii', 'q6iii', 'q6iv'] },
  { id: 'q7', fields: ['q7i', 'q7ii', 'q7iii', 'q7iv'] },
  { id: 'q8', fields: ['q8'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10'] },
  { id: 'q11', fields: ['q11'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13'] },
  { id: 'q14', fields: ['q14i', 'q14ii', 'q14iii', 'q14iv'] },
  { id: 'q15', fields: ['q15'] },
  { id: 'q16', fields: ['q16i', 'q16ii', 'q16iii', 'q16iv'] },
  { id: 'q17', fields: ['q17'] },
  { id: 'q18', fields: ['q18'] },
  { id: 'q19', fields: ['q19'] },
  { id: 'q20', fields: ['q20i', 'q20ii', 'q20iii'] },
  { id: 'q21', fields: ['q21i', 'q21ii'] },
  { id: 'q22', fields: ['q22i', 'q22ii', 'q22iii'] }
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
