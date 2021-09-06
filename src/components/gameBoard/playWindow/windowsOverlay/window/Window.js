import React, { useEffect, useState } from 'react';
import styles from './Window.module.css';
import { useDispatch, useSelector } from 'react-redux';
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
  setPlayerPosition,
} from '../../../../../app/playerScoreSlice';
import { selectWindowById, selectPlayerPosition } from '../../../../../app/playerScoreSlice';

const CoffeeRender = React.memo(({ levelObj, pos }) => {
  const dispatch = useDispatch();
  // const characterPos = useSelector((state) => selectIsCharacterHere(state, id));

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

const Window = React.memo(({ id, levelObj }) => {
  const lightOn = styles.light;
  const lightOff = `${styles.animated} ${styles.dark}`;
  const coffeePos = useSelector(selectItemPosition);
  const dispatch = useDispatch();
  const pos = useSelector((state) => selectCharacterHere(state, id));
  const litup = useSelector((state) => selectWindowById(state, id));
  // const [isLitUp, setIsLitUp] = useState(useSelector((state) => selectWindowById(state, id)));
  const [backGround, setBackGround] = useState(lightOff);
  const regCharacter = !useSelector(selectDisplayQuestion)
    ? levelObj.assets.workerman.standing
    : levelObj.assets.workerman.working;

  const coffeeCharacter = !useSelector(selectDisplayQuestion)
    ? levelObj.assets.workerman.standingCoffee
    : levelObj.assets.workerman.workingCoffee;

  const character = useSelector(selectHasCoffee) ? coffeeCharacter : regCharacter;

  useEffect(() => {
    const ignoreList = [11, 23, 35, 47, 58];

    if (id % 2 === 1) {
      if (!ignoreList.includes(id)) {
        if (litup) {
          setBackGround(lightOn);
          // backGround = styles.light;
          const timer = () =>
            setTimeout(() => {
              console.log('time', id);
              let payload = {
                windowId: id,
                bool: false,
              };
              dispatch(setOneWindowInArray(payload));
              // setIsLitUp(false);
            }, levelObj.difficulty.lightTime);
          timer();
          return clearTimeout(timer);
        } else {
          setBackGround(lightOn);
          setBackGround(lightOff);
          // backGround = styles.light;
          // backGround = `${styles.animated} ${styles.dark}`;
        }
      }
    }
  }, [dispatch, id, levelObj.difficulty.lightTime, lightOff, lightOn, backGround, litup]);

  // console.log(
  //   'here?',
  //   useSelector((state) => selectCharacterHere(state, id))
  // );

  // const pos = position === id ? true : false;
  // const pos = useSelector(selectIsCharacterHere(id));

  const enemyImg = (
    <img className={styles.character} src={levelObj.assets.cloudy} alt='mr. Cloudy' />
  );
  const rainyImg = <img className={styles.character} src={levelObj.assets.rainy} alt='mr. Rainy' />;

  const windowDisplay = (
    <React.Fragment>
      <div className={`${styles.windowBackDrop} ${backGround}`}></div>
      <img
        src={levelObj.assets.windows}
        className={styles.windowImg}
        // onClick={windowHandler}
        alt='pixelated window'
      />
      {coffeePos === id ? <CoffeeRender id={id} levelObj={levelObj} pos={pos} /> : null}
    </React.Fragment>
  );
  // const charId = useSelector(selectPlayerPosition);
  const enemyArray = useSelector(selectEnemyPosition);
  const rainyPos = useSelector(selectRainyPos);
  const charStyle = enemyArray.includes(useSelector(selectPlayerPosition))
    ? `${styles.character} ${styles.spin}`
    : styles.character;

  let windowRender = id % 2 === 1 ? windowDisplay : <div className={styles.character}></div>;
  const charcterImg = <img className={charStyle} src={character} alt='Mr. Workerman' />;
  const characterRender = pos ? charcterImg : null;

  const enemyRender = enemyArray.includes(id) ? enemyImg : null;
  const rainyRender = rainyPos === id ? rainyImg : null;

  // useEffect(() => {
  //     const timer = () => {
  //       console.log(rainyPos, id)
  //       if (rainyPos === id) {
  //       setTimeout(() => {
  //         dispatch(setPlayerPosition(id + 12));
  //       }, 790);
  //     };

  //   }
  //    return () => clearTimeout(timer);
  // }, [dispatch, rainyPos, id]);

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
