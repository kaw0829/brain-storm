import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './HiScore.module.css';
import {selectAllUserScores} from '../features/scoreBoard/scoreBoardSlice';


/**
 * ScoreExcerpt takes an individual record and displays it in correct format
 *
 * @param {Object} { userScore } - each individual record containing params hiScore and initals
 * @return {JSX} 
 */
const ScoreExcerpt = ({ userScore }) => {
  return <div className={classes.score}>{`${userScore.initials} SCORE: ${userScore.hiScore}`}</div>;
};


/**
 * HiScore  retrieves all userScores and displays them from hi to low.  Contains error handling for request.
 *
 * @return {JSX}  returns a map of ScoreExcerpts for each record.
 */
const HiScore = () => {
  const userScores = useSelector(selectAllUserScores);
  const userScoreStatus = useSelector((state) => state.scoreBoard.status);
  const error = useSelector((state) => state.scoreBoard.error);

  let content;

  if (userScoreStatus === 'loading') {
    content = <div className={classes.loading}>loading....</div>;
  } else if (userScoreStatus === 'succeeded') {
    content = userScores.map((userScore) => {
      return <ScoreExcerpt key={userScore.id} userScore={userScore} />;
    });
  } else if (userScoreStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <h1> HI-SCORE </h1>
        <div>{content}</div>
        <Link to='/'><button type='button' className='nes-btn is-error'>
          GO BACK
        </button>
        </Link>

        
      </div>
    </div>
  );
};

export default HiScore;
