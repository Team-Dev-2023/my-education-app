export const lecturesCalculator = (sections) =>
  sections.reduce((acu, cur) => (acu += cur.lectures.length), 0);
