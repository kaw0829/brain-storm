import { configureStore } from '@reduxjs/toolkit';
import scoreBoardReducer from '../features/scoreBoard/scoreBoardSlice';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    scoreBoard: scoreBoardReducer,
    game: gameReducer,
  },
});
