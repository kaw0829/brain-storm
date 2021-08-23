const buildQuestions = (arr) => {
  let questions = [];
  let answers = [];
  arr.forEach((element) => {
    arr.forEach((el) => {
      questions.push(`${element} + ${el} = ?`);
      answers.push(element + el);
      questions.push(`${element} - ${el} = ?`);
      answers.push(element - el);
    });
  });
  return {
    questions: questions,
    answers: answers,
  };
};
//Durstenfeld's algorithm  using ES6 to assing two variables at once in place shuffle
export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const questionArray = buildQuestions([1, 2, 3, 4, 5, 6, 7, 8, 9]);

export default questionArray;
