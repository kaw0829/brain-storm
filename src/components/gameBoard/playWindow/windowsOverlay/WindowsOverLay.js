import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWindowArray } from '../../../../app/playerScoreSlice';
import styles from './WindowsOverLay.module.css';
import Window from './window/Window';

const WindowsOverLay = () => {


  return (
    <div className={styles.transparency}>
      {/* {generateRows(5, 5)} */}
      <div className={styles.windowRow}>
        <Window id={0} />
        <Window id={1} />
        <Window id={2} />
        <Window id={3} />
        <Window id={4} />
        <Window id={5} />
        <Window id={6} />
        <Window id={7} />
        <Window id={8} />
        <Window id={9} />
        <Window id={10} />
      </div>
      <div className={styles.ledge}></div>
      <div className={styles.windowRow}>
        <Window id={12} />
        <Window id={13} />
        <Window id={14} />
        <Window id={15} />
        <Window id={16} />
        <Window id={17} />
        <Window id={18} />
        <Window id={19} />
        <Window id={20} />
        <Window id={21} />
        <Window id={22} />
      </div>
      <div className={styles.ledge}></div>
      <div className={styles.windowRow}>
        <Window id={24} />
        <Window id={25} />
        <Window id={26} />
        <Window id={27} />
        <Window id={28} />
        <Window id={29} />
        <Window id={30} />
        <Window id={31} />
        <Window id={32} />
        <Window id={33} />
        <Window id={34} />
      </div>
      <div className={styles.ledge}></div>
      <div className={styles.windowRow}>
        <Window id={36} />
        <Window id={37} />
        <Window id={38} />
        <Window id={39} />
        <Window id={40} />
        <Window id={41} />
        <Window id={42} />
        <Window id={43} />
        <Window id={44} />
        <Window id={45} />
        <Window id={46} />
      </div>
      <div className={styles.ledge}></div>
      <div className={styles.windowRow}>
        <Window id={48} />
        <Window id={49} />
        <Window id={50} />
        <Window id={51} />
        <Window id={52} />
        <Window id={53} />
        <Window id={54} />
        <Window id={55} />
        <Window id={56} />
        <Window id={57} />
        <Window id={58} />
      </div>
    </div>
  );
};

export default WindowsOverLay;
