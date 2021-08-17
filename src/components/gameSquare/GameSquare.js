import { useState } from 'react';

import classes from './GameSquare.module.css';
/**
 *one square/window for the gameboard/building should light off/on
 *styling can be used to slowly turn the lights off on gameSquare
 *
 * @param {boolean} props.correct [off or on,  changing css properties]
 * @param 
 */
//TODO: add css effects
//      handle incorrect answer possibly by switching lightUp
const GameSquare = (props) => {
  const [lightUp, setLightUp] = useState(false);

  if(props.correct) {
    setLightUp(true)
  }
  const classList = lightUp ? `${classes.gameSquare} ${classes.lightUp}` : `${classes.gameSquare}`;

  return (
    <div className={classList}></div>
  )
  
};

export default GameSquare;
