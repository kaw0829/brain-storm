import { useSelector } from 'react-redux';

import { selectPlayerScore } from '../../../../app/playerScoreSlice';
import classes from './ScoreDisplay.module.css';

const ScoreDisplay = () => {
  const userStats = useSelector(selectPlayerScore);
  return (
    <div className={classes.scoreboard}>
      <div className={classes.scoreGroup}>
        <div className={classes.title}>Current Score</div>
        <div className={classes.score}>{userStats.currentScore}</div>
      </div>
      <div className={classes.scoreGroup}>
        <div className={classes.title}>Hi-Score</div>
        <div className={classes.score}>{userStats.playerHiScore}</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
