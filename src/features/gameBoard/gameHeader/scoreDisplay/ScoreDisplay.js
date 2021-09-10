import { useSelector } from 'react-redux';

import { selectPlayerCurrentScore, selectPlayerHiScore } from '../../../../app/gameSlice';
import classes from './ScoreDisplay.module.css';

/**
 * ScoreDisplay retrieves scores from redux store and displays them
 *
 * @return {JSX}
 */
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
