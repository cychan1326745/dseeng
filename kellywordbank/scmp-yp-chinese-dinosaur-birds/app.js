const ANSWERS = {
  q1: {
    type: "text",
    answers: [
      'In northwestern China / Gansu Province.'
    ]
  },
  q2: { type: "mc", answer: "C" },
  q3: {
    type: "text",
    answers: [
      'The forelimbs (the front limbs, as opposed to the hindlimbs).'
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
      'Any two: (i) covered with feathers, (ii) about the size of a barn owl, (iii) had long feathers on both forelimbs and hindlimbs, (iv) could glide like a flying squirrel.'
    ]
  },
  q6: {
    type: "text",
    answers: [
      '"Fit the bill" means to be suitable or exactly right for a particular situation. In this context, it means the dinosaur was the right kind of predator to eat the many birds in the area.'
    ]
  },
  q7: {
    type: "text",
    answers: [
      '(i) Cretaceous (ii) feathers (iii) bird (iv) ambush'
    ]
  },
  q8: {
    type: "text",
    answers: [
      '(i) Jian\'s bones were found in an area with broken bird bones crushed into pellets. (ii) Jian was the correct size and had the right ecology to have been the pellet maker.'
    ]
  },
  q9: {
    type: "text",
    answers: [
      'A theropod is a group of meat-eating dinosaurs.'
    ]
  },
  q10: {
    type: "text",
    answers: [
      'Difference: Jian\'s shoulder and arm bones are sufficiently different from Microraptor\'s. / Jian is known from five bones while Microraptor is more completely known. Similarity: Both had feather-covered arms and legs that gave the appearance of four wings. / Both were opportunistic predators.'
    ]
  },
  q11: {
    type: "text",
    answers: [
      'She was concerned that dense bird populations may have been seasonal, forcing Jian to have a diverse diet.'
    ]
  },
  q12: {
    type: "text",
    answers: [
      'Birds and lizards (also accepted: mammals, fish).'
    ]
  },
  q13: {
    type: "text",
    answers: [
      'An ambush predator is an animal that stalks and pounces on distracted prey by surprise.'
    ]
  },
  q14: { type: "mc", answer: "B" },
  q15: {
    type: "text",
    answers: [
      'The title suggests that Jian\'s diet consisted mainly of birds, implying that it hunted and ate them regularly.'
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
