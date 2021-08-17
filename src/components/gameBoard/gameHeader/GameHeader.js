import classes from './GameHeader.module.css';
import ScoreBoard from './scoreDisplay/ScoreDisplay';

const GameHeader = () => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>Brain-Storm</div>
      <ScoreBoard />
    </div>
  );
};

export default GameHeader;
