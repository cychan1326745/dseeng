/* Answer key and checking logic for DSE Reading Part A - Celebrity Gossip */

const ANSWERS = {
  q1: { type: 'mc', answer: 'A' },
  q2: {
    type: 'text',
    answers: [
      'so many high-profile pairs have called it quits / split up',
      'many celebrities split up / broke up',
      'many high-profile celebrity couples broke up',
      'a large number of famous couples ended their relationships'
    ]
  },
  q3: {
    type: 'multi-text',
    parts: {
      q3i: ['split up', 'split'],
      q3ii: ['called it quits', 'call it quits']
    }
  },
  q4: {
    type: 'text',
    answers: [
      'ordinary people',
      'the general public',
      'readers',
      'us',
      'people like us',
      'non-celebrities',
      'people living ordinary lives'
    ]
  },
  q5: {
    type: 'multi-text',
    parts: {
      q5i: [
        'being interested in celebrity gossip',
        'interest in celebrity gossip',
        'being interested in gossip',
        'our interest in celebrity gossip'
      ],
      q5ii: [
        'finding out that celebrities are getting cheated on or divorcing or breaking up',
        'finding out celebrities are divorcing or breaking up',
        'celebrities getting cheated on or divorcing or breaking up',
        'finding out celebrities have problems'
      ]
    }
  },
  q6: {
    type: 'text',
    answers: [
      'celebrities perform an image that does not align with their authentic selves',
      'the public only saw a happy family image online',
      'celebrities share a false happy image online',
      'celebrities create an artificial sense of intimacy that hides real problems',
      'what the public saw was a happy family but reality was different'
    ]
  },
  q7: {
    type: 'multi-text',
    parts: {
      q7i: ['goals'],
      q7ii: ['problems'],
      q7iii: ['public'],
      q7iv: ['humanizes', 'humanise'],
      q7v: ['have']
    }
  },
  q8: {
    type: 'multi-mc',
    parts: { q8i: 'F', q8ii: 'T', q8iii: 'NG', q8iv: 'F' }
  },
  q9: { type: 'mc', answer: 'B' },
  q10: {
    type: 'text',
    answers: [
      'other people tell you about their encounters with someone so you know what they are like without meeting them directly',
      'you can learn about people from others experiences without direct contact',
      'gossip helps you know what is going on in social environments',
      'other people share information about someone so you are prepared before meeting them'
    ]
  },
  q11: {
    type: 'text',
    answers: ['But', 'but', "But it's not all so innocent"]
  },
  q12: {
    type: 'text',
    answers: ['cut them down', 'cut down']
  },
  q13: { type: 'mc', answer: 'C' },
  q14: {
    type: 'multi-text',
    parts: {
      q14i: ['motive', 'motivation'],
      q14ii: ['act'],
      q14iii: ['promote'],
      q14iv: ['impact', 'result'],
      q14v: ['portrayed']
    }
  },
  q15: {
    type: 'text',
    answers: ['celebrities', 'famous people', 'stars', 'a-list celebrities', 'top celebrities']
  },
  q16: { type: 'mc', answer: 'C' },
  q17: {
    type: 'text',
    answers: [
      'they fill gaps in real-world relationships',
      'they are a risk-free way to feel connected',
      'you cannot be rejected by someone not in a real relationship with you',
      'they help people feel connected without real interaction'
    ]
  },
  q18: {
    type: 'text',
    answers: ['dissatisfaction', 'unhappiness', 'stress']
  },
  q19: { type: 'mc', answer: 'C' },
  q20: {
    type: 'multi-mc',
    parts: {
      q20i: 'Neither',
      q20ii: 'Agrees',
      q20iii: 'Agrees',
      q20iv: 'Agrees'
    }
  },
  q21: {
    type: 'multi-text',
    parts: {
      q21i: ['6'],
      q21ii: ['8'],
      q21iii: ['10'],
      q21iv: ['14'],
      q21v: ['11'],
      q21vi: ['12']
    }
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3i', 'q3ii'] },
  { id: 'q4', fields: ['q4'] },
  { id: 'q5', fields: ['q5i', 'q5ii'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7i', 'q7ii', 'q7iii', 'q7iv', 'q7v'] },
  { id: 'q8', fields: ['q8i', 'q8ii', 'q8iii', 'q8iv'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10'] },
  { id: 'q11', fields: ['q11'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13'] },
  { id: 'q14', fields: ['q14i', 'q14ii', 'q14iii', 'q14iv', 'q14v'] },
  { id: 'q15', fields: ['q15'] },
  { id: 'q16', fields: ['q16'] },
  { id: 'q17', fields: ['q17'] },
  { id: 'q18', fields: ['q18'] },
  { id: 'q19', fields: ['q19'] },
  { id: 'q20', fields: ['q20i', 'q20ii', 'q20iii', 'q20iv'] },
  { id: 'q21', fields: ['q21i', 'q21ii', 'q21iii', 'q21iv', 'q21v', 'q21vi'] }
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
