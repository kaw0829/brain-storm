import { useState, useEffect } from 'react';

import classes from './PlayWindow.module.css';
import WindowsOverLay from './windowsOverlay/WindowsOverLay';
import Questions from './questions/Questions';
import cloudy from '../../../resources/cloudy.gif';
import Buffer from './buffer/Buffer';

// Hooks
// function useRecordKeyPress() {
//   const [keyPressed, setKeyPressed] = useState('');

//   function downHandler({ key }) {
//     console.log('key1', key);
//     if (key === 'w') {
//       console.log('key2', key);
//       setKeyPressed(key);
//     } else {
//       key = '';
//     }
//   }
//   const upHandler = ({ key }) => {
//     if (key === 'w') {
//       setKeyPressed('');
//       console.log('keyup', keyPressed);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', downHandler);
//     window.addEventListener('keyup', upHandler);
//     return () => {
//       window.removeEventListener('keydown', downHandler);
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, []);
//   return keyPressed;
// }

// function useKeyPress(targetKey) {
//   // State for keeping track of whether key is pressed
//   const [keyPressed, setKeyPressed] = useState(false);
//   // If pressed key is our target key then set to true
//   function downHandler({ key }) {
//     if (key === targetKey) {
//       setKeyPressed(true);
//     }
//   }
//   // If released key is our target key then set to false
//   const upHandler = ({ key }) => {
//     if (key === targetKey) {
//       setKeyPressed(false);
//     }
//   };
//   // Add event listeners
//   useEffect(() => {
//     window.addEventListener('keydown', downHandler);
//     window.addEventListener('keyup', upHandler);
//     // Remove event listeners on cleanup
//     return () => {
//       window.removeEventListener('keydown', downHandler);
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, []); // Empty array ensures that effect is only run on mount and unmount
//   return keyPressed;
// }

const PlayWindow = () => {
  // const cloudCharacter = <img src={cloudy} className={classes.cloudy} alt='cloudy' />;
  // const [enemyStartPos, setEnemyPos] = useState();

  // useEffect(() => {
  //   const generateEnemySprite = () => {
  //     const startRow = Math.floor(Math.random() * 10);
  //     setEnemyPos(startRow);
  //     console.log(startRow);
  //   };
  //   const interval = setInterval(() => {
  //     generateEnemySprite();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={classes.playWindow}>
      <Buffer displayCharacter={false} char={cloudy} />
      <div className={classes.building}>
        <WindowsOverLay />
      </div>
      <Buffer displayCharacter={true} char={cloudy} />
      <Questions />
    </div>
  );
};

export default PlayWindow;
