import classes from './Footer.module.css';

/**
 * Footer contains basic game info
 *TODO: implement all time hi score
 * @return {JSX} 
 */
const Footer = () => {
  return (
    <div className={classes.footer}>
      {/* <div className={classes.score}>Highest Score All Time: </div> */}
      <div className={classes.signature}>Arcane Badlands&nbsp;&copy;&nbsp;2021</div>
    </div>
  );
};
export default Footer;
