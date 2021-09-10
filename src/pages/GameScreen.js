import styles from './GameScreen.module.css';
import GameHeader from '../features/gameBoard/gameHeader/GameHeader';
import Footer from '../features/gameBoard/footer/Footer';
import PlayWindow from '../features/gameBoard/playWindow/PlayWindow';
import Modal from '../ui/modal/Modal';
import {
  selectPlayerLevel,
  selectGameOver,
  selectPlayerHiScore,
  setInitalVals,
  selectHighestScore,
} from '../app/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateHiScore } from '../features/scoreBoard/scoreBoardSlice';
import { useEffect, useState } from 'react';

/**
 *GameEnd updates hiScore for current player upon game end and displays the gameOver message
 *
 * @param {*} { message, player, playerId, hiScore } - the gameover message to display and user Info.
 * @return {JSX}  - modal that displays message.
 */
const GameEnd = ({ message, player, playerId, hiScore }) => {
  const dispatch = useDispatch();
  const allTimeHiScore = useSelector((state) => selectHighestScore(state));
  const handleStart = () => {
    const currentUser = {
      initials: player,
      hiScore: hiScore,
      id: playerId,
      allTimeHiScore: allTimeHiScore,
    };
    dispatch(setInitalVals(currentUser));
  };
  return (
    <div className={styles.backdrop}>
      <Modal>
        <div className={styles.gameOver}>{message}</div>

        <button onClick={handleStart} className={`nes-btn is-primary nes-pointer`}>
          START
        </button>
      </Modal>
    </div>
  );
};

/**
 *GameScreen accesses much of the data from the game from Redux store including wether the game is over
 *
 * @return {JSX} displays the three major components that make up the gamescreen the header, the playWindow and footer
 */
const GameScreen = () => {
  const gameOver = useSelector(selectGameOver);
  const level = useSelector(selectPlayerLevel);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('GAME OVER!!!');
  const hiScore = useSelector(selectPlayerHiScore);
  const playerId = useSelector((state) => state.game.id);
  const player = useSelector((state) => state.game.initials);
  const content = gameOver ? (
    <GameEnd message={message} player={player} playerId={playerId} hiScore={hiScore} />
  ) : null;

  useEffect(() => {
    if (gameOver) {
      console.log(hiScore, 'scores');
      setMessage(`GAMEOVER, you made it to level ${level + 1} try again?`);
      {
        const userScore = {
          id: playerId,
          hiScore: hiScore,
          initials: player,
        };
        dispatch(updateHiScore(userScore));
      }
      if (level > 5) {
        setMessage('You Win!!!');
        // return (
        //   <div className={styles.backdrop}>
        //     <Modal>
        //       <div className={styles.gameOver}>{message}</div>
        //     </Modal>
        //   </div>
        // );
      }
    }
  }, [dispatch, gameOver, hiScore, level, player, playerId]);
  return (
    <div className={styles.box}>
      {content}
      <div className={styles.header}>
        <GameHeader />
      </div>
      <div className={styles.content}>
        <PlayWindow />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default GameScreen;
