import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Buffer.module.css';
import {
  setItemPosition,
  setEnemyPosition,
  setAdvanceEnemies,
} from '../../../../app/playerScoreSlice';
import { div } from 'prelude-ls';

const Buffer = ({ displayCharacter, levelObj }) => {
  const cloudCharacter = (
    <img src={levelObj.assets.cloudy} className={classes.cloudy} alt='cloudy' />
  );
  const [enemyStartPos, setEnemyPos] = useState(61);
  const dispatch = useDispatch();
  useEffect(() => {
    const generateEnemySprite = () => {
      dispatch(setAdvanceEnemies());
      if (enemyStartPos > 58 && enemyStartPos < 64) {
        dispatch(setEnemyPosition(enemyStartPos));
      }
      const startRow = Math.floor(Math.random() * levelObj.difficulty.oddsOfEnemy + 58);
      setEnemyPos(startRow);
    };
    const generateItem = () => {
      const rand = Math.floor((Math.random() * 59 * 30) / levelObj.difficulty.itemOdds);
      if (rand % 2 === 1 && rand <= 58) {
        dispatch(setItemPosition(rand));
      }
    };
    if (displayCharacter === true) {
      const interval = setInterval(() => {
        generateEnemySprite();
        generateItem();
      }, levelObj.difficulty.speedOfEnemy);
      return () => clearInterval(interval);
    }
  }, [
    dispatch,
    displayCharacter,
    enemyStartPos,
    levelObj.difficulty.itemOdds,
    levelObj.difficulty.oddsOfEnemy,
    levelObj.difficulty.speedOfEnemy,
  ]);
  if (displayCharacter === true) {
    return (
      <div className={classes.buffer}>
        <div className={classes.bufferBox}>{enemyStartPos === 59 ? cloudCharacter : ''}</div>
        <div className={classes.bufferBox}>{enemyStartPos === 60 ? cloudCharacter : ''}</div>
        <div className={classes.bufferBox}>{enemyStartPos === 61 ? cloudCharacter : ''}</div>
        <div className={classes.bufferBox}>{enemyStartPos === 62 ? cloudCharacter : ''}</div>
        <div className={classes.bufferBox}>{enemyStartPos === 63 ? cloudCharacter : ''}</div>
      </div>
    );
  } else {
    return (
      <div className={classes.buffer}>
        <div className={classes.bufferBox}></div>
        <div className={classes.bufferBox}></div>
        <div className={classes.bufferBox}></div>
        <div className={classes.bufferBox}></div>
        <div className={classes.bufferBox}></div>
      </div>
    );
  }
};

export default Buffer;
