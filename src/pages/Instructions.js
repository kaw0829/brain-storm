import React, { useState } from 'react';
import 'nes.css/css/nes.min.css';
import MrRobo from '../resources/robo-sprite2.svg';
import classes from './Instructions.module.css';
import { Link } from 'react-router-dom';

//TODO: add conditiional rendering to slowly add bubbles and have mr robo move his mouth.
// useEffect and setInterval?
const Instructions = () => {
  const [page, setPage] = useState(false);
  const leftArrow = '<';
  const rightArrow = '>';
  const instructions = [
    'Hello, I am Mr. Robo! Allow me to explain the rules to Brain-Storm.',
    'In the game you will take on the role of Mr. Workman the handyman.',
    'A storm has hit and the apartments are losing power.',
    'You must move quickly and be sure to provide just the right amount.',
  ];
  const controls = [
    'Use the W, S, A, D, keys to move Mr Workman to where power is needed',
    'Click on the apartment window to bring up a question',
    'Answer the question corrrectly to restore power using the number keys',
    'Proceed quickly before the apartment losses power again',
  ];

  const arrowHandler = () => {
    page ? setDisplayText(instructions) : setDisplayText(controls);
    setPage(!page);
  };

  const [displayText, setDisplayText] = useState(instructions);
  return (
    <div className={classes.backGround}>
      <div className={classes.container}>
        <section className='nes-container is-dark'>
          <section className='message-list'></section>
          <section className='message -right'>
            <div className='nes-balloon from-right is-dark'>
              <p>{displayText[0]}</p>
            </div>
            <img src={MrRobo} className={classes.mrRobo} alt='robot' />
            <section className='message -left'>
              <img src={MrRobo} className={classes.mrRobo} alt='robot' />
              <div className='nes-balloon from-left is-dark'>
                <p>{displayText[1]}</p>
              </div>
              <section className='message -right'>
                <div className='nes-balloon from-right is-dark'>
                  <p>{displayText[2]}</p>
                </div>
                <img src={MrRobo} className={classes.mrRobo} alt='robot' />
                <section className='message -left'>
                  <img src={MrRobo} className={classes.mrRobo} alt='robot' />
                  <div className='nes-balloon from-left is-dark'>
                    <p>{displayText[3]}</p>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </section>
        <div className={classes.row}>
          <button
            type='button'
            className={`nes-btn is-error ${classes.button}`}
            onClick={arrowHandler}
          >
            {leftArrow}
          </button>
          <Link to='/'>
            <button type='button' className={`nes-btn is-error ${classes.button}`}>
              Go Back
            </button>
          </Link>
          <button
            type='button'
            className={`nes-btn is-error ${classes.button}`}
            onClick={arrowHandler}
          >
            {rightArrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
