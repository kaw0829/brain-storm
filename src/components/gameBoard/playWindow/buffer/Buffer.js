import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Buffer.module.css';
import { setEnemyPosition, setAdvanceEnemies } from '../../../../app/playerScoreSlice';

const Buffer = ({ displayCharacter, char }) => {
  const cloudCharacter = <img src={char} className={classes.cloudy} alt='cloudy' />;
  const [enemyStartPos, setEnemyPos] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const generateEnemySprite = () => {
      dispatch(setAdvanceEnemies());
      if (enemyStartPos > 58 && enemyStartPos < 64) {
        dispatch(setEnemyPosition(enemyStartPos));
      }
      const startRow = Math.floor(Math.random() * 20 + 58);
      setEnemyPos(startRow);
      console.log(startRow);
    };

    if (displayCharacter === true) {
      const interval = setInterval(() => {
        generateEnemySprite();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, displayCharacter, enemyStartPos]);
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
