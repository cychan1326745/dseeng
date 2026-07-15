const ANSWERS = {
  q1: {
    type: "text",
    answers: [
      '16 students.'
    ]
  },
  q2: { type: "mc", answer: "B" },
  q3: {
    type: "text",
    answers: [
      '"It" refers to the song "Below the Lion Rock".'
    ]
  },
  q4: {
    type: "multi-mc",
    parts: {
      "q4_a": "F",
      "q4_b": "F",
      "q4_c": "T",
    }
  },
  q5: {
    type: "text",
    answers: [
      '(1) They prepared clips of their past performances to show the audience the scale of the band. (2) They also performed at the US Independence Day Reception at Hong Kong\'s Ocean Park Marriott Hotel.'
    ]
  },
  q6: {
    type: "text",
    answers: [
      '"Mirrors" means reflects / is similar to / corresponds to.'
    ]
  },
  q7: {
    type: "text",
    answers: [
      '(a) 250th / 250 (b) curated / calculated (c) pride (d) culture'
    ]
  },
  q8: {
    type: "text",
    answers: [
      'The band was invited to commemorate the 250th anniversary of American independence.'
    ]
  },
  q9: {
    type: "text",
    answers: [
      'The secret is to ensure that you give the audience a little bit of everything – to present a broad picture of American culture.'
    ]
  },
  q10: {
    type: "text",
    answers: [
      'Similarity: Marching bands have a military history in many European countries. Difference: Modern marching bands in the US have become a key part of parades and sports events (rather than military functions).'
    ]
  },
  q11: {
    type: "text",
    answers: [
      'Mann was impressed by the scale of the city – how many people there are and how tall the buildings are. He also found the people nice and welcoming.'
    ]
  },
  q12: {
    type: "text",
    answers: [
      '(1) Visit the Hong Kong Palace Museum (2) Visit Man Mo Temple'
    ]
  },
  q13: {
    type: "text",
    answers: [
      'Monville says both ceramics and music take a lot of time and practice to perfect. Both involve putting hours of rehearsal into something that will be seen by people.'
    ]
  },
  q14: { type: "mc", answer: "B" },
  q15: {
    type: "text",
    answers: [
      'The title suggests the article focuses on how the EMU Marching Band combined American musical traditions with Hong Kong\'s local culture (by performing Cantopop alongside American classics) to create a one-of-a-kind performance.'
    ]
  },
};

const QUESTION_GROUPS = [
  { id: "q1", fields: ["q1"] },
  { id: "q2", fields: ["q2"] },
  { id: "q3", fields: ["q3"] },
  { id: "q4", fields: ["q4_a", "q4_b", "q4_c"] },
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
