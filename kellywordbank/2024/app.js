/* Answer key and checking logic for DSE 2024 Reading Part A - Banyan Trees */

const ANSWERS = {
  q1: {
    type: 'multi-mc',
    parts: { q1i: 'D', q1ii: 'B' }
  },
  q2: {
    type: 'text',
    answers: [
      'because the government cut down four century-old banyans without consulting the expert panel advising on tree management',
      'because experts expressed anger over the felling without consultation',
      'because it was done without consulting the expert panel'
    ]
  },
  q3: {
    type: 'text',
    answers: [
      'cracks were found in the wall behind the trees and they worsened',
      'after the collapse cracks were found and they got worse',
      'the cracks in the wall worsened making it unstable'
    ]
  },
  q4: {
    type: 'text',
    answers: [
      'the four chopped down banyan trees',
      'the banyan trees',
      'the severed banyan roots',
      'the fallen banyan trees'
    ]
  },
  q5: {
    type: 'multi-mc',
    parts: { q5i: 'T', q5ii: 'F', q5iii: 'NG' }
  },
  q6: { type: 'mc', answer: 'A' },
  q7: {
    type: 'text',
    answers: [
      'transformed into a temple',
      'transformed by government permission into a temple',
      'changed into a temple after world war II'
    ]
  },
  q8: {
    type: 'text',
    answers: [
      'banyan trees in hong kong',
      'the banyan trees',
      'banyan trees',
      'these behemoths are the banyan trees'
    ]
  },
  q9: {
    type: 'text',
    answers: [
      'banyan trees are very adaptable and good at surviving and spreading in hong kong',
      'banyan trees can survive easily even without human help',
      'banyan trees spread quickly in hong kong environment'
    ]
  },
  q10: {
    type: 'multi-text',
    parts: {
      q10i: ['ubiquitous'],
      q10ii: ['imposing', 'prominent']
    }
  },
  q11: {
    type: 'multi-text',
    parts: {
      q11i: ['aerial roots', 'aerial'],
      q11ii: ['✓', 'tick', 'correct', ''],
      q11iii: ['thick', 'thick woody'],
      q11iv: ['varied', 'different']
    }
  },
  q12: {
    type: 'multi-text',
    parts: {
      q12i: ['traditional hakka', 'traditional'],
      q12ii: ['mortar'],
      q12iii: ['seeds'],
      q12iv: ['plunge', 'grow']
    }
  },
  q13: {
    type: 'multi-mc',
    parts: { q13i: 'C', q13ii: 'A', q13iii: 'B' }
  },
  q14: {
    type: 'text',
    answers: [
      'concreting over the root to stop it growing',
      'covering the root with concrete',
      'the concreting over of the root'
    ]
  },
  q15: {
    type: 'multi-text',
    parts: {
      q15attitude: ['negative', 'Negative'],
      q15reason: [
        'he says they are defacing heritage',
        'he thinks people who do this dont understand trees',
        'he criticises them for damaging heritage'
      ]
    }
  },
  q16: {
    type: 'text',
    answers: [
      'the chopping down of four healthy banyans after a tree collapse',
      'the secret felling of four healthy banyans on bonham road',
      'the highways departments felling of four healthy trees'
    ]
  },
  q17: {
    type: 'text',
    answers: [
      'to show support for the trees and oppose the felling',
      'because they were angry at the unnecessary cutting down of the trees',
      'to protest against the government cutting down healthy old trees'
    ]
  },
  q18: {
    type: 'multi-mc',
    parts: { q18i: 'F', q18ii: 'NG', q18iii: 'F' }
  },
  q19: {
    type: 'text',
    answers: [
      'because they cannot be used for timber or firewood so people dont cut them down',
      'their wood is useless for timber and fuel so there is no reason to cut them',
      'they have no useful properties so people leave them alone'
    ]
  },
  q20: {
    type: 'text',
    answers: [
      'a banyan wraps its branches around a smaller tree and they grow together inseparably like two lovers',
      'the banyan embraces another tree and they cannot be separated which is like love',
      'when a smaller tree grows nearby the banyan embraces it and they become one tree'
    ]
  },
  q21: {
    type: 'text',
    answers: [
      'they register valuable old banyans on the Register of Old and Valuable Trees',
      'they maintain 29000 banyans in parks and streets',
      'they have planted 3491 new banyans since 2011',
      'they redesign streets to go around existing large banyans'
    ]
  },
  q22: {
    type: 'text',
    answers: [
      'their ability to survive even in difficult conditions and after being cut',
      'they can survive and grow even when cut down because new sprouts grow',
      'their extraordinary perseverance and survival ability'
    ]
  },
  q23: {
    type: 'multi-text',
    parts: {
      q23i: ['D', 'd'],
      q23ii: ['F', 'f'],
      q23iii: ['G', 'g'],
      q23iv: ['E', 'e'],
      q23v: ['C', 'c']
    }
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1i', 'q1ii'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3'] },
  { id: 'q4', fields: ['q4'] },
  { id: 'q5', fields: ['q5i', 'q5ii', 'q5iii'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7'] },
  { id: 'q8', fields: ['q8'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10i', 'q10ii'] },
  { id: 'q11', fields: ['q11i', 'q11ii', 'q11iii', 'q11iv'] },
  { id: 'q12', fields: ['q12i', 'q12ii', 'q12iii', 'q12iv'] },
  { id: 'q13', fields: ['q13i', 'q13ii', 'q13iii'] },
  { id: 'q14', fields: ['q14'] },
  { id: 'q15', fields: ['q15attitude', 'q15reason'] },
  { id: 'q16', fields: ['q16'] },
  { id: 'q17', fields: ['q17'] },
  { id: 'q18', fields: ['q18i', 'q18ii', 'q18iii'] },
  { id: 'q19', fields: ['q19'] },
  { id: 'q20', fields: ['q20'] },
  { id: 'q21', fields: ['q21'] },
  { id: 'q22', fields: ['q22'] },
  { id: 'q23', fields: ['q23i', 'q23ii', 'q23iii', 'q23iv', 'q23v'] }
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
