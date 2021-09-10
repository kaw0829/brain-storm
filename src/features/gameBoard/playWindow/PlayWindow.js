import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './PlayWindow.module.css';
import WindowsOverLay from './windowsOverlay/WindowsOverLay';
import Questions from './questions/Questions';
import levels from '../../../utilites/levels';
import Buffer from './buffer/Buffer';
import {
  selectPlayerLevel,
  selectPlayerPosition,
  setPlayerPosition,
  setDisplayQuestion,
  setWindowClicked,
  selectRainyPos,
  setRainyPos,
} from '../../../app/gameSlice';
import Timer from './timer/Timer';

/**
 * Rainy  generates a lightning cloud moving from left to right on gamescreen.
 * The component also has a chance to generate the enemy Rainy who moves from straight down.
 *
 * @param {gif} { lightning, cloud }  animated gifs
 * @return {JSX}
 */
const Rainy = ({ lightning, cloud }) => {
  const dispatch = useDispatch();
  const cloudi = <img src={cloud} className={classes.cloud} alt='cloudy' />;
  const lightningObj = <img src={lightning} className={classes.lightning} alt='rainy' />;
  const cloudObj = (
    <div>
      {cloudi}
      {lightningObj}
    </div>
  );
  const rainyPos = useSelector(selectRainyPos);
  const [cloudPos, setCloudPos] = useState(12);
  const playerLevel = useSelector(selectPlayerLevel);
  const playerPos = useSelector(selectPlayerPosition);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (cloudPos <= 0) {
        setCloudPos(12);
      } else {
        setCloudPos(cloudPos - 1);
      }
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [cloudPos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerLevel >= 1) {
        if (rainyPos === null) {
          const rand = Math.floor(Math.random() * 5);
          console.log('rand', rand);
          if (rand === 0) {
            dispatch(setRainyPos(cloudPos));
          }
        } else {
          if (rainyPos > 58) {
            dispatch(setRainyPos(null));
          } else {
            if (playerPos === rainyPos) {
              dispatch(setRainyPos(rainyPos + 12));
              dispatch(setPlayerPosition(rainyPos + 12));
            } else {
              dispatch(setRainyPos(rainyPos + 12));
            }
          }
        }
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [rainyPos, cloudPos, dispatch, playerLevel, playerPos]);
  return (
    <div className={classes.rainyContainer}>
      <div className={classes.cloudContainer}>{cloudPos === 0 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 1 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 2 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 3 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 4 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 5 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 6 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 7 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 8 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 9 ? cloudObj : ''}</div>
      <div className={classes.cloudContainer}>{cloudPos === 10 ? cloudObj : ''}</div>
    </div>
  );
};

/**
 * PlayWindow contains the eventhandlers for the keyboard controls, listens for w a s d and space
 *  the level object is retrieved from utilites,
 *   it is an array of objects that contain all the level assets and difficulty settings
 * @return {JSX} returns empty buffers on the left and right of the building, the building {windowsOverlay}component,
 *  timer and the question area.
 */
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
  const lightning = levelObject.assets.lightning;
  const cloud = levelObject.assets.stormCloud;
  useEffect(() => {});
  return (
    <div className={classes.playWindow}>
      <Buffer displayCharacter={false} levelObj={levelObject} />
      <div className={classes.buildingContainer}>
        {/* <div className={classes.rainyContainer}></div> */}
        <Rainy lightning={lightning} cloud={cloud} />
        <div className={classes.building} style={{ backgroundImage: `url(${background})` }}>
          <WindowsOverLay levelObj={levelObject} />
        </div>
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
