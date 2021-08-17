import styles from './GameScreen.module.css';
import GameHeader from '../components/gameBoard/gameHeader/GameHeader';
import Footer from '../components/gameBoard/footer/Footer';
import PlayWindow from '../components/gameBoard/playWindow/PlayWindow';
const GameScreen = () => {
  return (
    <div className={styles.box}>
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
