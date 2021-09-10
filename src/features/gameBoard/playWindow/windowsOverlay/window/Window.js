import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Window.module.css';
import {
  setHasCoffee,
  setOneWindowInArray,
  selectDisplayQuestion,
  selectEnemyPosition,
  selectItemPosition,
  selectHasCoffee,
  setItemPosition,
  selectCharacterHere,
  selectRainyPos,
  selectWindowById,
  selectPlayerPosition,
} from '../../../../../app/gameSlice';

const /**
   * CoffeeRender handles rendering of items, the coffee item speeds up the character animation for a short time and
   * increases the number of windows lit up by character.Object
   *
   * @param {*} { levelObj, pos } pos checks to see if the player is in this window square using the selector
   *                              and rewards the player with coffee if true.
   *
   * @return {JSX} displays the coffee for 15 seconds
   */
  CoffeeRender = React.memo(({ levelObj, pos }) => {
    const dispatch = useDispatch();

    if (pos) {
      dispatch(setHasCoffee(true));
      dispatch(setItemPosition(11));
      const timeOut = () =>
        setTimeout(() => {
          dispatch(setHasCoffee(false));
        }, 15000);
      timeOut();
    }
    return <img src={levelObj.assets.items[0].coffee} alt='coffee' className={styles.coffeeImg} />;
  });

const /**
 * Window is the most complicated component handling wether to display the 
characters (workerman, rainy, cloudy, superWorkerman(if hasCoffee))
 *  window handles the window light status and uses a timer to make the window slowly turn off upon lighting up.
 * @param {*} { id, levelObj }  id uniquely identifies the window
 * @return {JSX} 
 */

  Window = React.memo(({ id, levelObj }) => {
    const lightOn = styles.light;
    const lightOff = `${styles.animated} ${styles.dark}`;
    const coffeePos = useSelector(selectItemPosition);
    const dispatch = useDispatch();
    const pos = useSelector((state) => selectCharacterHere(state, id));
    const litup = useSelector((state) => selectWindowById(state, id));
    const [backGround, setBackGround] = useState(lightOff);

    /**
     * the below three variables decide wether to display a character and wether he should be standing or working
     */
    const regCharacter = !useSelector(selectDisplayQuestion)
      ? levelObj.assets.workerman.standing
      : levelObj.assets.workerman.working;

    const coffeeCharacter = !useSelector(selectDisplayQuestion)
      ? levelObj.assets.workerman.standingCoffee
      : levelObj.assets.workerman.workingCoffee;

    const character = useSelector(selectHasCoffee) ? coffeeCharacter : regCharacter;

    /**
     * useEffect determines first if the square should have a window.jpg using modelo and
     * ignorelist(these are empty squares skipped to keep the even and odd windows the same between rows)
     * then it checks if the window should be litup in the state using selectWindowById
     * if it is litup a timer is set to turn it off using the difficulty level(difficulty.lightime)
     *  to determine how long.
     * The windows lit is turned off/on using css styling classes which are assigned with the background useState
     *
     * the window is first turned to on then off to trigger the transition css effect.
     */
    useEffect(() => {
      const ignoreList = [11, 23, 35, 47, 58];

      if (id % 2 === 1) {
        if (!ignoreList.includes(id)) {
          if (litup) {
            setBackGround(lightOn);
            const timer = () =>
              setTimeout(() => {
                let payload = {
                  windowId: id,
                  bool: false,
                };
                dispatch(setOneWindowInArray(payload));
              }, levelObj.difficulty.lightTime);
            timer();
            return clearTimeout(timer);
          } else {
            setBackGround(lightOn);
            setBackGround(lightOff);
          }
        }
      }
    }, [dispatch, id, levelObj.difficulty.lightTime, lightOff, lightOn, backGround, litup]);

    // enemy images
    const enemyImg = (
      <img className={styles.character} src={levelObj.assets.cloudy} alt='mr. Cloudy' />
    );
    const rainyImg = (
      <img className={styles.character} src={levelObj.assets.rainy} alt='mr. Rainy' />
    );

    const windowDisplay = (
      <React.Fragment>
        <div className={`${styles.windowBackDrop} ${backGround}`}></div>
        <img
          src={levelObj.assets.windows}
          className={styles.windowImg}
          // onClick={windowHandler}
          alt='pixelated window'
        />
        {coffeePos === id ? <CoffeeRender levelObj={levelObj} pos={pos} /> : null}
      </React.Fragment>
    );
    // enemy positions
    const enemyArray = useSelector(selectEnemyPosition);
    const rainyPos = useSelector(selectRainyPos);

    // if enemy position matches character position animate the character spinning and controls are locked in the stateSlice reducer
    const charStyle = enemyArray.includes(useSelector(selectPlayerPosition))
      ? `${styles.character} ${styles.spin}`
      : styles.character;

    // wether to display window.img in this window component
    let windowRender = id % 2 === 1 ? windowDisplay : <div className={styles.character}></div>;
    // ? to display character in this window component
    const charcterImg = <img className={charStyle} src={character} alt='Mr. Workerman' />;
    const characterRender = pos ? charcterImg : null;
    // ? to display enemy in this window component
    const enemyRender = enemyArray.includes(id) ? enemyImg : null;
    const rainyRender = rainyPos === id ? rainyImg : null;

    return (
      <div className={styles.container}>
        {windowRender}
        {characterRender}
        {enemyRender}
        {rainyRender}
      </div>
    );
  });

export default Window;
