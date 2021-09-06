import styles from './Timer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setGameOver, selectTimeLeft, setTimeLeft } from '../../../../app/playerScoreSlice';

const Timer = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector(selectTimeLeft);
  // timeOut over interval as interval will load multiple instances
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setTimeLeft(timeLeft - 1));
    }, 1000);
    if (timeLeft <= 0) {
      clearTimeout(timer);
      dispatch(setGameOver(true));
    }

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [dispatch, timeLeft]);
  return <div className={styles.timer}>{timeLeft}</div>;
};
export default Timer;
