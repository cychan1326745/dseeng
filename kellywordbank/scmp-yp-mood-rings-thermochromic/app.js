const ANSWERS = {
  q1: {
    type: "text",
    answers: [
      'Colour-changing mugs and mood rings.'
    ]
  },
  q2: { type: "mc", answer: "C" },
  q3: {
    type: "text",
    answers: [
      'The colour of thermochromic materials being affected by changes in temperature.'
    ]
  },
  q4: {
    type: "multi-mc",
    parts: {
      "q4_a": "T",
      "q4_b": "F",
      "q4_c": "F",
    }
  },
  q5: {
    type: "text",
    answers: [
      'Any two: (i) a dye, (ii) a colour developer (organic acid), (iii) an organic solvent.'
    ]
  },
  q6: {
    type: "text",
    answers: [
      'Thermochromic materials are substances whose colour changes in response to temperature changes, and this effect is usually reversible.'
    ]
  },
  q7: {
    type: "text",
    answers: [
      '(i) leuco (ii) solid (iii) transparent (iv) crystals'
    ]
  },
  q8: {
    type: "text",
    answers: [
      'Because the heat causes the solvent to melt into liquid state, dissolving the colour developer, which causes the dye to separate and become transparent.'
    ]
  },
  q9: {
    type: "text",
    answers: [
      'The activation region is the temperature range within which liquid crystals change colour.'
    ]
  },
  q10: {
    type: "text",
    answers: [
      'Difference: Leuco dyes use chemical reactions between dye and colour developer, while liquid crystals change colour based on molecular arrangement and light reflection. / Leuco dyes are used in mugs, liquid crystals in mood rings. Similarity: Both are thermochromic materials that change colour with temperature.'
    ]
  },
  q11: {
    type: "text",
    answers: [
      'People think mood rings reflect their feelings/emotions, but they actually reflect heat/temperature.'
    ]
  },
  q12: {
    type: "text",
    answers: [
      '(i) temperature / heat, (ii) the arrangement of liquid crystal molecules / the spacing between layers of molecules.'
    ]
  },
  q13: {
    type: "text",
    answers: [
      'Constructive interference is when reflected light waves combine to produce a wave with a larger amplitude, creating the colour we see.'
    ]
  },
  q14: { type: "mc", answer: "B" },
  q15: {
    type: "text",
    answers: [
      'The title suggests that the article explains the scientific principles behind how heat causes colour changes in objects like mood rings and mugs.'
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
