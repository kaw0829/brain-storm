import { configureStore } from '@reduxjs/toolkit';
import scoreBoardReducer from '../components/scoreBoard/scoreBoardSlice';
import playerScoreReducer from './playerScoreSlice';

export const store = configureStore({
  reducer: {
    scoreBoard: scoreBoardReducer,
    playerScore: playerScoreReducer,
  },
});
