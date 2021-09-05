import styles from './GameScreen.module.css';
import GameHeader from '../components/gameBoard/gameHeader/GameHeader';
import Footer from '../components/gameBoard/footer/Footer';
import PlayWindow from '../components/gameBoard/playWindow/PlayWindow';
import Modal from '../ui/modal/Modal';
import {
  selectPlayerLevel,
  selectGameOver,
  selectPlayerHiScore,
  setInitalVals,
  selectHighestScore,
} from '../app/playerScoreSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateHiScore } from '../components/scoreBoard/scoreBoardSlice';
import { useEffect, useState } from 'react';

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
    console.log('current user in gameend', currentUser);

    dispatch(setInitalVals(currentUser));

    // const user = {player, playerId, hiScore}
    // // const { initials, hiScore, id, allTimeHiScore } = action.payload;
    // dispatch(setInitalVals(user));
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

const GameScreen = () => {
  const gameOver = useSelector(selectGameOver);
  const level = useSelector(selectPlayerLevel);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('GAME OVER!!!');
  const hiScore = useSelector(selectPlayerHiScore);
  const playerId = useSelector((state) => state.playerScore.id);
  const player = useSelector((state) => state.playerScore.initials);
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
