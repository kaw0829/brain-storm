import React from 'react';
import styles from './Window.module.css';
import window from '../../../../../resources/wdw.png';
import char from '../../../../../resources/workerman-standing-fitted-animate.gif';
import charWorking from '../../../../../resources/workerman-standing-fitted-animate-working.gif';
import cloudy from '../../../../../resources/cloudy.gif';
import { useDispatch, useSelector } from 'react-redux';
import {
  setWindowClicked,
  setDisplayQuestion,
  setOneWindowInArray,
  setPlayerPosition,
  selectDisplayQuestion,
  selectEnemyPosition,
} from '../../../../../app/playerScoreSlice';
import { selectWindowById, selectPlayerPosition } from '../../../../../app/playerScoreSlice';
import { useEffect } from 'react';

//TODO: add image as prop so different windows can be used
let backGround = styles.dark;
const Window = ({ id }) => {
  const dispatch = useDispatch();
  const questionStatus = useSelector(selectDisplayQuestion);
  const currentPos = useSelector(selectPlayerPosition);
  const litup = useSelector((state) => selectWindowById(state, id));
  const character = !questionStatus ? char : charWorking;
  // instead of using selectWindowById, can select directly from state
  // const trySelecting = useSelector((state) => state.playerScore.windowArray[id]);

  const windowHandler = (e) => {
    //player must move before question is displayed or character will not move to window square
    if (currentPos === id && currentPos % 2 === 1) {
      dispatch(setDisplayQuestion(true));
      dispatch(setWindowClicked(id));
    }
    // dispatch(setPlayerPosition(id));
  };
  // const emptyWindowHandler = (e) => {
  //   dispatch(setWindowClicked(id));
  //   dispatch(setPlayerPosition(id));
  // };

  const charcterImg = (
    <img className={styles.character} src={character} onClick={windowHandler} alt='Mr. Workerman' />
  );
  const enemyImg = <img className={styles.character} src={cloudy} alt='mr. Cloudy' />;
  const windowDisplay = (
    <React.Fragment>
      <div className={`${styles.windowBackDrop} ${backGround}`}></div>
      <img
        src={window}
        className={styles.windowImg}
        // onClick={windowHandler}
        alt='pixelated window'
        id={id}
      />
    </React.Fragment>
  );

  let windowRender = id % 2 === 1 ? windowDisplay : <div className={styles.character}></div>;
  const characterRender = useSelector(selectPlayerPosition) === id ? charcterImg : null;
  const enemyArray = useSelector(selectEnemyPosition);
  const enemyRender = enemyArray.includes(id) ? enemyImg : null;

  useEffect(() => {
    const downHandler = (e) => {
      if (e.key === 's') {
        if (id + 12 <= 58) {
          dispatch(setPlayerPosition(id + 12));
        }
      } else if (e.key === 'w') {
        if (id - 12 >= 0) {
          dispatch(setPlayerPosition(id - 12));
        }
      } else if (e.key === 'a') {
        const endRows = [11, 23, 35, 47];
        if (!endRows.includes(id - 1) && id - 1 >= 0) {
          dispatch(setPlayerPosition(id - 1));
        }
      } else if (e.key === 'd') {
        const endRows = [11, 23, 35, 47];
        if (!endRows.includes(id + 1) && id + 1 <= 58) {
          dispatch(setPlayerPosition(id + 1));
        }
      } else if (e.key === ' ') {
        windowHandler();
      }
    };

    if (characterRender) {
      document.body.addEventListener('keydown', downHandler);
    }
    return () => document.body.removeEventListener('keydown', downHandler);
  }, [characterRender, dispatch, id]);

  // if (characterRender) {
  //   document.addEventListener('keydown', downHandler);
  // }

  if (litup) {
    backGround = styles.light;
    setTimeout(() => {
      let payload = {
        windowId: id,
        bool: false,
      };
      dispatch(setOneWindowInArray(payload));
    }, 30000);
  } else {
    backGround = styles.light;
    backGround = `${styles.animated} ${styles.dark}`;
  }

  return (
    <div className={styles.container}>
      {windowRender}
      {characterRender}
      {enemyRender}
    </div>
  );
};

export default Window;
