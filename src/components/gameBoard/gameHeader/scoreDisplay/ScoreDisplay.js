import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  selectPlayerScore,
  selectPlayerCurrentScore,
  selectPlayerHiScore,
} from '../../../../app/playerScoreSlice';
import classes from './ScoreDisplay.module.css';

const ScoreDisplay = () => {
  const currentScore = useSelector(selectPlayerCurrentScore);
  const hiScore = useSelector(selectPlayerHiScore);

  return (
    <div className={classes.scoreboard}>
      <div className={classes.scoreGroup}>
        <div className={classes.title}>Current Score</div>
        <div className={classes.score}>{currentScore}</div>
      </div>
      <div className={classes.scoreGroup}>
        <div className={classes.title}>Hi-Score</div>
        <div className={classes.score}>{hiScore}</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
