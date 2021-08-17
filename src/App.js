import Routes from './ui/routes/Routes';
import './App.css';
// import { updateHiScore } from './components/scoreBoard/scoreBoardSlice';
// import { useDispatch } from 'react-redux';

function App() {
  require('dotenv').config();
  return (
    <div id='App' className='App'>
      <Routes />
    </div>
  );
}

export default App;
