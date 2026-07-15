const ANSWERS = {
  q1: {
    type: "text",
    answers: [
      'Low-paid, precarious work.'
    ]
  },
  q2: { type: "mc", answer: "B" },
  q3: {
    type: "text",
    answers: [
      'The stark rate of poverty among ethnic minority groups in Hong Kong becoming intergenerational.'
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
      'Any two: (i) racial discrimination / extreme racism, (ii) discriminatory hiring practices, (iii) racial microaggressions, (iv) language requirements and internal biases during recruitment, (v) discrimination over ethnic traditions / clothing.'
    ]
  },
  q6: {
    type: "text",
    answers: [
      'Microaggressions are subtle, indirect, or unintentional acts of discrimination against members of a minority group in everyday workplace interactions.'
    ]
  },
  q7: {
    type: "text",
    answers: [
      '(i) limited (ii) delivery (iii) discrimination (iv) narrative'
    ]
  },
  q8: {
    type: "text",
    answers: [
      'Because a 2016 Oxfam report showed that poverty among ethnic minorities is becoming intergenerational, with minority children being denied education opportunities.'
    ]
  },
  q9: {
    type: "text",
    answers: [
      'It refers to US President Donald Trump\'s campaign to arrest and deport people living in the US without legal authorisation, with over US$160 billion allocated to strengthen ICE.'
    ]
  },
  q10: {
    type: "text",
    answers: [
      'Difference: Under Trump, arrests and detentions significantly rose (100,000 in less than five months of 2025), while under Biden there were about 113,431 operations in all of 2024. Similarity: Both administrations carried out ICE enforcement operations.'
    ]
  },
  q11: {
    type: "text",
    answers: [
      'They were concerned that the situation had become extreme and targeted marginalised groups without reason, and about the inhumane treatment faced by immigrants.'
    ]
  },
  q12: {
    type: "text",
    answers: [
      'Any two: (i) rallies and protests nationwide, (ii) protests supported by celebrities and lawmakers, (iii) some protests escalated into violent clashes.'
    ]
  },
  q13: {
    type: "text",
    answers: [
      'ICE is a US agency that detains and deports people living in the US without legal authorisation, investigates crimes like human trafficking and drug dealing, and manages administrative operations.'
    ]
  },
  q14: { type: "mc", answer: "B" },
  q15: {
    type: "text",
    answers: [
      'The title suggests that the article contains letters advocating for ethnic minorities in Hong Kong and criticising unlawful arrests by ICE in the US, giving a voice to those who are marginalised.'
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
