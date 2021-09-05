import classes from './PlayWindow.module.css';
import WindowsOverLay from './windowsOverlay/WindowsOverLay';
import Questions from './questions/Questions';
import { useEffect } from 'react';
import levels from '../../../utilites/levels';
import Buffer from './buffer/Buffer';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayerLevel,
  selectPlayerPosition,
  setPlayerPosition,
  setDisplayQuestion,
  setWindowClicked,
} from '../../../app/playerScoreSlice';
import Timer from './timer/Timer';

const PlayWindow = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectPlayerPosition);

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
        if (id % 2 === 1) {
          dispatch(setDisplayQuestion(true));
          dispatch(setWindowClicked(id));
        }
      }
    };
    document.body.addEventListener('keydown', downHandler);
    return () => document.body.removeEventListener('keydown', downHandler);
  }, [dispatch, id]);

  const level = useSelector(selectPlayerLevel);
  const levelObject = levels[level];
  const background = levelObject.assets.bricks;

  return (
    <div className={classes.playWindow}>
      <Buffer displayCharacter={false} levelObj={levelObject} />
      <div className={classes.building} style={{ backgroundImage: `url(${background})` }}>
        <WindowsOverLay levelObj={levelObject} />
      </div>
      <Buffer displayCharacter={true} levelObj={levelObject} />
      <div className={classes.rightContainer}>
        <Timer />
        <Questions />
      </div>
    </div>
  );
};

export default PlayWindow;
