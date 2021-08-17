import styles from './WindowsOverLay.module.css';
import Window from './window/Window';

const WindowsOverLay = () => {
  return (
    <div className={styles.transparency}>
      <div className={styles.windowRow}>
        <Window />
        <Window />
        <Window />
        <Window />
        <Window />
      </div>
      <div className={styles.windowRow}>
        <Window />
        <Window />
        <Window />
        <Window />
        <Window />
      </div>
      <div className={styles.windowRow}>
        <Window />
        <Window />
        <Window />
        <Window />
        <Window />
      </div>
      <div className={styles.windowRow}>
        <Window />
        <Window />
        <Window />
        <Window />
        <Window />
      </div>
      <div className={styles.windowRow}>
        <Window />
        <Window />
        <Window />
        <Window />
        <Window />
      </div>
    </div>
  );
};

export default WindowsOverLay;
