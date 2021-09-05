import classes from './Questions.module.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import questionArray from '../../../../utilites/helpers';
import { shuffleArray } from '../../../../utilites/helpers';
import {
  setDisplayQuestion,
  selectHasCoffee,
  selectDisplayQuestion,
  setMultiWindowInArray,
  setNineWindowsInArray,
} from '../../../../app/playerScoreSlice';

//generates an array of questions and answers, index value will match question to answer.
let questionsArray = questionArray.questions;
let answersArray = questionArray.answers;
// let randomIndex = Math.floor(Math.random() * questionsArray.length);

const Questions = () => {
  const dispatch = useDispatch();
  const coffee = useSelector(selectHasCoffee);
  /**
   *  helper funcion for selecting random index of passed array
   *
   * @param {Array} arr
   * @return {int} - returns random index of array
   */
  const randomSelection = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(randomSelection(answersArray));
  const [correct, setCorrect] = useState(0);
  const [message, setMessage] = useState('');

  /**
   *  creates a bank of answers, one correct and three incorrect - includes checks for unique values
   *
   * @return {Array}  - returns Array of answers from answerArray
   */
  const buildAnswerBank = useCallback(() => {
    //using set to prevent duplicate values
    let answers = new Set();

    while (answers.size < 4) {
      // add correct answer
      answers.add(answersArray[index]);
      // add random answers from answer array
      answers.add(answersArray[randomSelection(answersArray)]);
    }
    // convert from set to array using spread operator
    answers = [...answers];
    // shuffle in place
    shuffleArray(answers);
    return answers;
  }, [index]);

  useEffect(() => {
    const answerBank = buildAnswerBank();

    setAnswers([answerBank[0], answerBank[1], answerBank[2], answerBank[3]]);
    setQuestion(questionsArray[index]);
    setCorrect(answersArray[index]);
  }, [buildAnswerBank, index]);

  /**
   * Handles selection of answer buttons, checks if correct and changes the question by updating index.
   *
   * @param {event} e  event used to get target.value
   */
  const handleChooseAnswer = (e) => {
    if (parseInt(e.target.value) === correct) {
      setMessage('Correct');
      if (coffee) {
        dispatch(setNineWindowsInArray(true));
      } else {
        dispatch(setMultiWindowInArray(true));
      }

      setTimeout(() => {
        dispatch(setDisplayQuestion(false));
        setIndex(Math.floor(Math.random() * questionsArray.length));
      }, 300);
    } else {
      setMessage('Incorrect');
      // dispatch(flipMultiWindowInArray)
    }
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };
  if (useSelector(selectDisplayQuestion)) {
    return (
      <div className={classes.questions}>
        <div>{question}</div>
        <div className={classes.answer}>
          <button
            className={`nes-btn ${classes.answerText}`}
            value={answers[0]}
            onClick={handleChooseAnswer}
          >
            {answers[0]}
          </button>
          <button
            className={`nes-btn ${classes.answerText}`}
            value={answers[1]}
            onClick={handleChooseAnswer}
          >
            {answers[1]}
          </button>
          <button
            className={`nes-btn ${classes.answerText}`}
            value={answers[2]}
            onClick={handleChooseAnswer}
          >
            {answers[2]}
          </button>
          <button
            className={`nes-btn ${classes.answerText}`}
            value={answers[3]}
            onClick={handleChooseAnswer}
          >
            {answers[3]}
          </button>
          <div>{message}</div>
        </div>
      </div>
    );
  } else {
    return <div className={classes.questions}></div>;
  }
};

export default Questions;
