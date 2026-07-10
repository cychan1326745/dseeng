/* Answer key and checking logic for DSE Reading Part A - Should we eat ultra-processed food? */

const ANSWERS = {
  q1: {
    type: 'text',
    answers: [
      'home-cooked meals',
      'made from scratch',
      'home-cooked',
      'home-cooked meals made from scratch'
    ]
  },
  q2: {
    type: 'text',
    answers: [
      'ultra-processed food',
      'ultra-processed products',
      'ready meals',
      'ready meals, packaged snacks or frozen dishes from supermarkets'
    ]
  },
  q3: {
    type: 'mc',
    answer: 'B'
  },
  q4: {
    type: 'multi-mc',
    parts: {
      q4i: 'NG',
      q4ii: 'T',
      q4iii: 'F'
    }
  },
  q5: {
    type: 'text',
    answers: [
      'multinational food and beverage corporations',
      'large multinational food companies',
      'top 25 global food and beverage companies that own mass market brands'
    ]
  },
  q6: {
    type: 'text',
    answers: [
      'power',
      'influence',
      'strong influence',
      'marketing power',
      'influence over consumers'
    ]
  },
  q7: {
    type: 'multi-text',
    parts: {
      q7i: ['all age groups', 'teenagers']
    }
  },
  q8: {
    type: 'text',
    answers: [
      'more shoppers are choosing fresh organic locally grown alternatives',
      'consumer attitudes are shifting towards healthier options',
      'consumers prefer fresh organic food instead of ultra-processed products'
    ]
  },
  q9: {
    type: 'text',
    answers: [
      'disdain'
    ]
  },
  q10: {
    type: 'multi-text',
    parts: {
      q10i: ['prevent food poisoning', 'to prevent food poisoning', 'make food safe'],
      q10ii: ['make crops last longer through cold winters', 'extend shelf life', 'prevent food spoilage']
    }
  },
  q11: {
    type: 'text',
    answers: [
      'natural toxins',
      'food poisoning',
      'natural toxins that can make people sick'
    ]
  },
  q12: {
    type: 'text',
    answers: [
      'because ultra-processed snacks are empty calories with little nutritional value',
      'they know they are empty calories and harmful to health with regular consumption',
      'they feel regret because they know it is unhealthy'
    ]
  },
  q13: {
    type: 'text',
    answers: [
      'moreish',
      'yummy',
      'moreish and yummy'
    ]
  },
  q14: {
    type: 'text',
    answers: [
      'a casual local restaurant serving healthy unprocessed balanced meals',
      'a new casual eatery serving balanced unprocessed meals to young people',
      'a restaurant that serves healthy fresh unprocessed food'
    ]
  },
  q15: {
    type: 'multi-text',
    parts: {
      q15i: ['Food Garage serves fresh healthy unprocessed food while classic fast food is ultra-processed', 'difference in processing: Food Garage is unprocessed, classic fast food is ultra-processed'],
      q15ii: ['both are convenient for people in a rush', 'both cater to young people wanting quick tasty meals']
    }
  },
  q16: {
    type: 'text',
    answers: [
      'it is acceptable to eat small amounts occasionally but daily constant consumption is unhealthy',
      'eat it sometimes but not every day',
      'moderation is okay, avoid daily reliance'
    ]
  },
  q17: {
    type: 'multi-text',
    parts: {
      q17i: ['locally', 'locally grown'],
      q17ii: ['poisoning', 'food poisoning'],
      q17iii: ['consortiums', 'buyer consortiums'],
      q17iv: ['innovation', 'product innovation']
    }
  },
  q18: {
    type: 'text',
    answers: [
      'buyer consortiums for certified eco-friendly materials',
      'on-site herb farms',
      'staff training',
      'customer reward schemes',
      'product innovation with fewer artificial additives'
    ]
  },
  q19: {
    type: 'text',
    answers: [
      'Big Food companies',
      'multinational food corporations',
      'the Big Food firms'
    ]
  },
  q20: {
    type: 'text',
    answers: [
      'ancient basic processing protected human health but modern ultra-processing damages long-term health',
      'early processing was useful for food safety but modern ultra-processing causes health problems',
      'ancient processing helped people but modern ultra-processing harms them'
    ]
  },
  q21: {
    type: 'text',
    answers: [
      'they will continue losing market share to fresh local organic food suppliers',
      'they will keep losing customers',
      'they will lose more market share'
    ]
  },
  q22: {
    type: 'mc',
    answer: 'B'
  },
  q23: {
    type: 'text',
    answers: [
      'organic',
      'locally grown',
      'fresh',
      'organic locally grown'
    ]
  },
  q24: {
    type: 'text',
    answers: [
      'to provide scientific evidence linking regular ultra-processed food consumption to higher health risks',
      'to prove that eating lots of ultra-processed food increases risk of heart disease and early death',
      'to show scientific research that ultra-processed food is harmful'
    ]
  },
  q25: {
    type: 'text',
    answers: [
      'many people regularly eat ultra-processed food even though they know it is unhealthy',
      'it is a common question about modern eating habits',
      'it reflects that ultra-processed food is widely consumed today despite health risks'
    ]
  },
  q26: {
    type: 'text',
    answers: [
      'chicken nuggets',
      'mass-produced pizza',
      'ice cream',
      'fizzy soft drinks',
      'flavoured breakfast cereals'
    ]
  },
  q27: {
    type: 'text',
    answers: [
      'they deliberately make food addictive and tasty to attract customers but consumers are increasingly rejecting these unhealthy products',
      'their addictive products attract buyers but then those same buyers switch to healthier alternatives so they lose customers'
    ]
  }
};

const QUESTION_GROUPS = [
  { id: 'q1', fields: ['q1'] },
  { id: 'q2', fields: ['q2'] },
  { id: 'q3', fields: ['q3'] },
  { id: 'q4', fields: ['q4i', 'q4ii', 'q4iii'] },
  { id: 'q5', fields: ['q5'] },
  { id: 'q6', fields: ['q6'] },
  { id: 'q7', fields: ['q7i'] },
  { id: 'q8', fields: ['q8'] },
  { id: 'q9', fields: ['q9'] },
  { id: 'q10', fields: ['q10i', 'q10ii'] },
  { id: 'q11', fields: ['q11'] },
  { id: 'q12', fields: ['q12'] },
  { id: 'q13', fields: ['q13'] },
  { id: 'q14', fields: ['q14'] },
  { id: 'q15', fields: ['q15i', 'q15ii'] },
  { id: 'q16', fields: ['q16'] },
  { id: 'q17', fields: ['q17i', 'q17ii', 'q17iii', 'q17iv'] },
  { id: 'q18', fields: ['q18'] },
  { id: 'q19', fields: ['q19'] },
  { id: 'q20', fields: ['q20'] },
  { id: 'q21', fields: ['q21'] },
  { id: 'q22', fields: ['q22'] },
  { id: 'q23', fields: ['q23'] },
  { id: 'q24', fields: ['q24'] },
  { id: 'q25', fields: ['q25'] },
  { id: 'q26', fields: ['q26'] },
  { id: 'q27', fields: ['q27'] }
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
      // If this is a radio group but nothing is checked → return empty string, DO NOT return first option's value
      if (document.querySelector(`input[name="${name}"][type="radio"]`)) {
        answers[name] = '';
      } else {
        // Only for text inputs
        const text = document.querySelector(`input[name="${name}"]`);
        if (text) {
          answers[name] = text.value;
        }
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
  return val && val.trim().length > 0;
}

function isQuestionAnswered(qid) {
  const q = ANSWERS[qid];
  if (q.type === 'mc') {
    return isFieldAnswered(qid);
  } else if (q.type === 'text') {
    return isFieldAnswered(qid);
  } else if (q.type === 'multi-text') {
    return Object.keys(q.parts).every(part => isFieldAnswered(qid + part));
  } else if (q.type === 'multi-mc') {
    return Object.keys(q.parts).every(part => isFieldAnswered(qid + part));
  }
  return false;
}

function checkQuestion(qid) {
  const q = ANSWERS[qid];
  let correct = true;
  
  if (q.type === 'mc') {
    const user = getFieldValue(qid);
    correct = user === q.answer;
  } else if (q.type === 'text') {
    const user = getFieldValue(qid);
    correct = textMatches(user, q.answers);
  } else if (q.type === 'multi-text') {
    Object.keys(q.parts).forEach(part => {
      const user = getFieldValue(qid + part);
      if (!textMatches(user, q.parts[part])) {
        correct = false;
      }
    });
  } else if (q.type === 'multi-mc') {
    Object.keys(q.parts).forEach(part => {
      const user = getFieldValue(qid + part);
      if (user !== q.parts[part]) {
        correct = false;
      }
    });
  }
  
  const block = document.getElementById(qid);
  block.classList.remove('correct', 'incorrect');
  block.classList.add(correct ? 'correct' : 'incorrect');
  
  // Show inline solution if it exists
  const solution = block.querySelector('.inline-solution');
  if (solution) {
    solution.style.display = 'block';
  }
  
  return correct;
}

function updatePalette() {
  const palette = document.getElementById('questionPalette');
  palette.innerHTML = '';
  QUESTION_GROUPS.forEach((g, idx) => {
    const btn = document.createElement('button');
    btn.className = 'palette-btn';
    btn.textContent = idx + 1;
    if (isQuestionAnswered(g.id)) {
      btn.classList.add('answered');
    }
    btn.addEventListener('click', () => {
      document.getElementById(g.id).scrollIntoView({ behavior: 'smooth' });
      setCurrentQuestion(g.id);
    });
    palette.appendChild(btn);
  });
}

function setCurrentQuestion(qid) {
  document.querySelectorAll('.question-block').forEach((el) => {
    el.classList.remove('active');
  });
  document.getElementById(qid).classList.add('active');
}

function updateAnsweredCount() {
  let unanswered = 0;
  QUESTION_GROUPS.forEach(g => {
    if (!isQuestionAnswered(g.id)) unanswered++;
  });
  document.getElementById('unansweredCount').textContent = unanswered;
}

function submitTest() {
  let score = 0;
  let total = QUESTION_GROUPS.length;
  
  QUESTION_GROUPS.forEach(g => {
    const qid = g.id;
    const correct = checkQuestion(qid);
    if (correct) score++;
    // Update palette marking
    const paletteBtn = document.querySelectorAll('.palette-btn')[QUESTION_GROUPS.findIndex(x => x.id === qid)];
    paletteBtn.classList.add(correct ? 'correct-result' : 'incorrect-result');
  });
  
  // Show score modal
  document.getElementById('finalScore').textContent = score;
  document.getElementById('totalPoints').textContent = total;
  const percent = Math.round((score / total) * 100);
  document.getElementById('scorePercent').textContent = `${percent}%`;
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

// Draggable divider
function initDivider() {
  const divider = document.getElementById('divider');
  const container = document.getElementById('mainContainer');
  let isDragging = false;
  
  divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    divider.classList.add('dragging');
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left;
    const min = containerRect.width * 0.2;
    const max = containerRect.width * 0.8;
    x = Math.max(min, Math.min(max, x));
    const percent = (x / containerRect.width) * 100;
    document.querySelector('.passage-panel').style.flex = `none`;
    document.querySelector('.passage-panel').style.width = `${percent}%`;
    document.querySelector('.questions-panel').style.flex = `none`;
    document.querySelector('.questions-panel').style.width = `${100 - percent - 1}%`;
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      divider.classList.remove('dragging');
    }
  });
}

// Timer
let timerInterval;
let startTime;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  document.getElementById('timer').textContent = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Check if there are saved answers and ask user what to do
document.addEventListener('DOMContentLoaded', () => {
  // Check if there are saved answers and ask user what to do
  const storageKey = getStorageKey();
  const saved = localStorage.getItem(storageKey);
  if (saved && saved !== '{}') {
    const restore = confirm('Found previously saved answers from your last visit.\n\nDo you want to RESTORE your previous answers?\n• OK = Restore previous answers\n• Cancel = Start with ALL BLANK answers');
    if (restore) {
      loadSavedAnswers();
    } else {
      // User wants blank slate, clear saved answers
      localStorage.removeItem(storageKey);
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
