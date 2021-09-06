import { Link } from 'react-router-dom';
import classes from './SplashScreen.module.css';
import 'nes.css/css/nes.min.css';
import React, { useState, useEffect } from 'react';
import Modal from '../ui/modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllUserScores,
  fetchScores,
  selectHighestScore,
} from '../components/scoreBoard/scoreBoardSlice';
import { nanoid } from '@reduxjs/toolkit';
import { setInitalVals } from '../app/playerScoreSlice';

const NavLinks = ({ handlePlay }) => {
  return (
    <div className={classes.col}>
      <button
        className={`nes-btn is-success nes-pointer ${classes.splashButton}`}
        onClick={handlePlay}
      >
        PLAY
      </button>
      <Link to='/instructions'>
        <button className={`nes-btn is-success nes-pointer ${classes.splashButton}`}>
          HOW TO PLAY
        </button>
      </Link>

      <Link to='/hiScores'>
        <button className={`nes-btn is-success nes-pointer ${classes.splashButton}`}>
          HI-SCORES
        </button>
      </Link>
    </div>
  );
};
const EnterUserName = ({ handlePlay, userScores }) => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  let allTimeHiScore = useSelector((state) => selectHighestScore(state));
  const onInitialsChange = (e) => {
    setUser(e.target.value);
  };
  const handleStart = () => {
    let currentUser = userScores.find((player) => player.initials === user);
    
    currentUser = currentUser ? currentUser : { initials: user, hiScore: 0, id: nanoid() };
    console.log('current user', currentUser);
    currentUser = { ...currentUser, allTimeHiScore: allTimeHiScore };
    //const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
    dispatch(setInitalVals(currentUser));

    //TODO: 
    // set up gameplay slice? for those props, would allow for multiplayer by adding real time gamedata
    
  };
  return (
    <React.Fragment>
      <div className={classes.backdrop}></div>
      <Modal>
        <div className={`nes-field ${classes.field}`}>
          <label htmlFor='name_field'>ENTER INITIALS:</label>
          <input
            autoFocus
            autoComplete='off'
            type='text'
            id='name_field'
            maxLength='3'
            size='3'
            value={user}
            onChange={onInitialsChange}
            className={`nes-input ${classes.input}`}
          />
        </div>
        <Link to='/play'>
          <button
            onClick={handleStart}
            className={`nes-btn is-primary nes-pointer ${classes.splashButton}`}
          >
            START
          </button>
        </Link>
        <button
          className={`nes-btn is-error nes-pointer ${classes.splashButton}`}
          onClick={handlePlay}
        >
          GO BACK
        </button>
      </Modal>
    </React.Fragment>
  );
};
const SplashScreen = () => {
  const dispatch = useDispatch();
  const [showLinks, setShowLinks] = useState(true);

  //initializing store values
  const userScores = useSelector(selectAllUserScores);
  const userScoreStatus = useSelector((state) => state.scoreBoard.status);
  useEffect(() => {
    if (userScoreStatus === 'idle') {
      dispatch(fetchScores());
    }
  }, [dispatch, userScoreStatus]);

  // handles wether to show links or username screen.
  const handlePlay = () => {
    setShowLinks(!showLinks);
  };

  let content = showLinks ? (
    <NavLinks handlePlay={handlePlay} />
  ) : (
    <EnterUserName handlePlay={handlePlay} userScores={userScores} />
  );

  return (
    <div className={classes.splashScreen}>
      <div className={classes.container}>
        <div className={classes.logo}>Brain-Storm</div>
        {content}
      </div>
    </div>
  );
};

export default SplashScreen;
