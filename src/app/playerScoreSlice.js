import { createSlice } from '@reduxjs/toolkit';

// store slice for current players game info should update to firebase and upsert to scoreBoardSlice at gameOver
export const playerScoreSlice = createSlice({
  name: 'playerScore',
  initialState: {
    initials: '',
    playerHiScore: 0,
    id: '',
    currentScore: 0,
    allTimeHiScore: 0,
  },
  reducers: {
    setInitalVals: (state, action) => {
      const { initials, hiScore, id, allTimeHiScore } = action.payload;

      state.initials = initials;
      state.playerHiScore = hiScore;
      state.allTimeHiScore = allTimeHiScore;
      state.currentScore = 0;
      state.id = id;
    },
  },
});

export const { setInitalVals } = playerScoreSlice.actions;

export const selectPlayerScore = (state) => state.playerScore;

export default playerScoreSlice.reducer;
