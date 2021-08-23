import { createSlice, createSelector } from '@reduxjs/toolkit';

// store slice for current players game info should update to firebase and upsert to scoreBoardSlice at gameOver
export const playerScoreSlice = createSlice({
  name: 'playerScore',
  initialState: {
    initials: '',
    playerHiScore: 0,
    id: '',
    currentScore: 0,
    allTimeHiScore: 0,
    displayQuestion: false,
    windowArray: Array(25).fill(false),
    windowClicked: 0,
    playerPosition: 0,
    enemyPosition: [],
    itemPosition: 0,
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
    setDisplayQuestion: (state, action) => {
      const bool = action.payload;
      state.displayQuestion = bool;
    },
    setWindowClicked: (state, action) => {
      const windowId = action.payload;
      if (windowId === state.playerPosition) {
        state.windowClicked = windowId;
      }
    },
    setPlayerPosition: (state, action) => {
      const pos = action.payload;
      if (state.displayQuestion === false) {
        state.playerPosition = pos;
      }
    },
    setEnemyPosition: (state, action) => {
      let pos = action.payload;
      const endRows = [11, 23, 35, 47, 58];
      if (pos > 58) {
        console.log('pos', pos);
        pos = ((pos % 10) * 2 + 2) % 10;
        console.log('pos2', pos);
        for (let i = 0; i < 59; i++) {
          if (i % 10 === pos && (i + 2) % 12 === 0) {
            console.log(i, 'solved');
            state.enemyPosition.push(i);
          }
        }
      }
    },
    setAdvanceEnemies: (state) => {
      const endRows = [11, 23, 35, 47, 58];
      state.enemyPosition.forEach((pos) => {
        if (endRows.includes(pos - 1)) {
          const index = state.enemyPosition.indexOf(pos);
          state.enemyPosition.splice(index, 1);
        } else {
          const index = state.enemyPosition.indexOf(pos);
          const rand = Math.floor(Math.random() * 2);
          if (rand === 0 && pos > 12) {
            console.log('move up');
            state.enemyPosition[index] = pos - 13;
          } else if (rand === 1 && pos < 48) {
            console.log('move down');
            state.enemyPosition[index] = pos + 10;
          } else {
            state.enemyPosition[index] = pos - 1;
            console.log('move left');
          }
        }
      });
    },

    setOneWindowInArray: (state, action) => {
      const { bool, windowId } = action.payload;
      state.windowArray[windowId] = bool;
    },
    setMultiWindowInArray: (state, action) => {
      const bool = action.payload;
      state.windowArray[state.windowClicked] = bool;
      state.windowArray[state.windowClicked + 2] = bool;
      state.windowArray[state.windowClicked - 2] = bool;
      if (state.windowClicked - 12 >= 0) {
        state.windowArray[state.windowClicked - 12] = bool;
      }
      if (state.windowClicked + 12 <= 58) {
        state.windowArray[state.windowClicked + 12] = bool;
      }
    },
    flipMultiWindowInArray: (state) => {
      state.windowArray[state.windowClicked] = !state.windowArray[state.windowClicked];
      state.windowArray[state.windowClicked + 1] = !state.windowArray[state.windowClicked + 1];
      state.windowArray[state.windowClicked - 1] = !state.windowArray[state.windowClicked - 1];
      if (state.windowClicked - 5 >= 0) {
        state.windowArray[state.windowClicked - 5] = !state.windowArray[state.windowClicked - 5];
      }
      if (state.windowClicked + 5 <= 24) {
        state.windowArray[state.windowClicked + 5] = !state.windowArray[state.windowClicked + 5];
      }
    },
  },
});

export const {
  setEnemyPosition,
  setInitalVals,
  setDisplayQuestion,
  setOneWindowInArray,
  setMultiWindowInArray,
  setWindowClicked,
  setPlayerPosition,
  setAdvanceEnemies,
} = playerScoreSlice.actions;

// selctors
export const selectPlayerScore = (state) => state.playerScore;
export const selectWindowClicked = (state) => state.playerScore.windowClicked;
export const selectPlayerPosition = (state) => state.playerScore.playerPosition;
export const selectEnemyPosition = (state) => state.playerScore.enemyPosition;
export const selectDisplayQuestion = createSelector(
  selectPlayerScore,
  (playerScore) => playerScore.displayQuestion
);
export const selectWindowArray = createSelector(
  selectPlayerScore,
  (playerScore) => playerScore.windowArray
);
export const selectWindowById = createSelector(
  [selectWindowArray, (state, windowId) => windowId],
  (windowArray, windowId) => windowArray[windowId]
);

export default playerScoreSlice.reducer;
