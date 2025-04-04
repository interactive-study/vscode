import DOMPurify from 'dompurify';

type Subconsciousness = {
  index: number;
  value: string;
};

const sanitize = DOMPurify.sanitize;

const insanitize = (thought: string, sanity: string) => {
  const reppressed: Subconsciousness[] = [];
  let i = 0;
  let j = 0;

  while (i < thought.length) {
    if (thought[i] === sanity[j]) {
      i++;
      j++;
    } else {
      reppressed.push({ index: i, value: thought[i] });
      i++;
    }
  }

  return reppressed;
};

export { sanitize, insanitize };
