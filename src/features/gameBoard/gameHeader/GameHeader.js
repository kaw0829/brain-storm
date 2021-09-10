import classes from './GameHeader.module.css';
import ScoreBoard from './scoreDisplay/ScoreDisplay';


/**
 * GameHeader contains the title for the game and scoreboard as a seperate component
 *
 * @return {JSX} 
 */
const GameHeader = () => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>Brain-Storm</div>
      <ScoreBoard />
    </div>
  );
};

export default GameHeader;
