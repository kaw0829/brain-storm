import classes from './PlayWindow.module.css';
import WindowsOverLay from './windowsOverlay/WindowsOverLay';
const PlayWindow = () => {
  return (
    <div className={classes.playWindow}>
      <div className={classes.building}>
        <WindowsOverLay />
      </div>
      {/* TODO: create question component */}
      <div className={classes.questions}>10 + 10 = ?</div>
    </div>
  );
};

export default PlayWindow;
