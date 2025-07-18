// faqData.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
    {
    id: 1,
    question: "Who is ALTAF Developments?",
    answer:
      "ALTAF Developments is a visionary real estate development company committed to building trust-driven communities and high-value projects. With a deep focus on transparency, purpose, and long-term growth, we aim to transform the real estate landscape of Pakistan one project at a time.",
  },
  {
    id: 2,
    question: "What makes ALTAF Developments different from other developers?",
    answer:
      "We don’t just sell buildings we build legacies. Our commitment lies in transparent dealings, investor focused planning, secure and scalable real estate investments, ethical sales practices and a strong emphasis on overseas Pakistani trust-building.",
  },
  {
    id: 3,
    question: "Is ALTAF Developments officially approved?",
    answer:
      "Yes, all our projects are initiated only after proper legal approvals and verification from relevant authorities. We prioritize legal transparency to ensure our clients’ investments are fully protected.",
  },
  {
    id: 4,
    question: "Is this a good time to invest in Faisal Hills?",
    answer:
      "Yes, Faisal Hills is currently one of the most promising investment locations in the Islamabad region. With major infrastructure development underway and increasing demand, early investments can offer high returns in both residential and commercial sectors.",
  },
];