import styles from './WindowsOverLay.module.css';
import Window from './window/Window';



/**
 *  WindowOverlay is a component that holds all the window Components
 *
 * @param {Object} { levelObj }  contains level assets
 * @return {JSX} 
 */
const WindowsOverLay = ({ levelObj }) => {
  const background = levelObj.assets.ledge
  
  return (
    <div className={styles.transparency}>
      {/* {generateRows(5, 5)} */}
      <div className={styles.windowRow}>
        <Window id={0} levelObj={levelObj} />
        <Window id={1} levelObj={levelObj} />
        <Window id={2} levelObj={levelObj} />
        <Window id={3} levelObj={levelObj} />
        <Window id={4} levelObj={levelObj} />
        <Window id={5} levelObj={levelObj} />
        <Window id={6} levelObj={levelObj} />
        <Window id={7} levelObj={levelObj} />
        <Window id={8} levelObj={levelObj} />
        <Window id={9} levelObj={levelObj} />
        <Window id={10} levelObj={levelObj} />
      </div>
      {/*{{background-image: url({background})}}  */}
      <div className={styles.ledge} style={{backgroundImage: `url(${background})`}} ></div>
      <div className={styles.windowRow}>
        <Window id={12} levelObj={levelObj} />
        <Window id={13} levelObj={levelObj} />
        <Window id={14} levelObj={levelObj} />
        <Window id={15} levelObj={levelObj} />
        <Window id={16} levelObj={levelObj} />
        <Window id={17} levelObj={levelObj} />
        <Window id={18} levelObj={levelObj} />
        <Window id={19} levelObj={levelObj} />
        <Window id={20} levelObj={levelObj} />
        <Window id={21} levelObj={levelObj} />
        <Window id={22} levelObj={levelObj} />
      </div>
      <div className={styles.ledge} style={{backgroundImage: `url(${background})`}} ></div>
      <div className={styles.windowRow}>
        <Window id={24} levelObj={levelObj} />
        <Window id={25} levelObj={levelObj} />
        <Window id={26} levelObj={levelObj} />
        <Window id={27} levelObj={levelObj} />
        <Window id={28} levelObj={levelObj} />
        <Window id={29} levelObj={levelObj} />
        <Window id={30} levelObj={levelObj} />
        <Window id={31} levelObj={levelObj} />
        <Window id={32} levelObj={levelObj} />
        <Window id={33} levelObj={levelObj} />
        <Window id={34} levelObj={levelObj} />
      </div>
      <div className={styles.ledge} style={{backgroundImage: `url(${background})`}} ></div>
      <div className={styles.windowRow}>
        <Window id={36} levelObj={levelObj} />
        <Window id={37} levelObj={levelObj} />
        <Window id={38} levelObj={levelObj} />
        <Window id={39} levelObj={levelObj} />
        <Window id={40} levelObj={levelObj} />
        <Window id={41} levelObj={levelObj} />
        <Window id={42} levelObj={levelObj} />
        <Window id={43} levelObj={levelObj} />
        <Window id={44} levelObj={levelObj} />
        <Window id={45} levelObj={levelObj} />
        <Window id={46} levelObj={levelObj} />
      </div>
      <div className={styles.ledge} style={{backgroundImage: `url(${background})`}} ></div>
      <div className={styles.windowRow}>
        <Window id={48} levelObj={levelObj} />
        <Window id={49} levelObj={levelObj} />
        <Window id={50} levelObj={levelObj} />
        <Window id={51} levelObj={levelObj} />
        <Window id={52} levelObj={levelObj} />
        <Window id={53} levelObj={levelObj} />
        <Window id={54} levelObj={levelObj} />
        <Window id={55} levelObj={levelObj} />
        <Window id={56} levelObj={levelObj} />
        <Window id={57} levelObj={levelObj} />
        <Window id={58} levelObj={levelObj} />
      </div>
    </div>
  );
};

export default WindowsOverLay;
