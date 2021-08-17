import React from 'react';

import styles from './Window.module.css';
import window from '../../../../../resources/wdw.png';

const Window = () => {
  return (
    <div className={styles.container}>
      <div className={styles.windowBackDrop}></div>
      <img src={window} className={styles.windowImg} alt='pixelated window' />
    </div>
  );
};
export default Window;
