import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './HiScore.module.css';
import {
  addUser,
  fetchUserScores,
  selectAllUserScores,
  updateHiScore,
  fetchScores,
} from '../components/scoreBoard/scoreBoardSlice';

const ScoreExcerpt = ({ userScore }) => {
  console.log('userscore', userScore);
  return <div className={classes.score}>{`${userScore.initials} SCORE: ${userScore.hiScore}`}</div>;
};
const HiScore = () => {
  const dispatch = useDispatch();
  // dispatch(updateHiScore('KAW', 100));
  let name = 'CAW';
  let score = 2;
  // dispatch(addUser(name));
  const userScores = useSelector(selectAllUserScores);
  console.log('userscores in hiscore', userScores);
  const userScoreStatus = useSelector((state) => state.scoreBoard.status);
  console.log(userScoreStatus, 'status');
  const error = useSelector((state) => state.scoreBoard.error);
  console.log('error in hiscore', error);
  // useEffect(() => {
  //   if (userScoreStatus === 'idle') {
  //     dispatch(fetchScores());
  //   }
  // }, [dispatch, userScoreStatus]);

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
