import { createSlice, createSelector } from '@reduxjs/toolkit';

let windows = Array(58).fill(false);
windows = windows.map((window, index) => (index % 2 === 1 ? window : true));
windows[11] = true;
windows[23] = true;
windows[35] = true;
windows[47] = true;
windows[58] = true;

// store slice for current players game info should update to firebase and upsert to scoreBoardSlice at gameOver
export const playerScoreSlice = createSlice({
  name: 'playerScore',
  initialState: {
    initials: 'AAA',
    playerHiScore: 0,
    id: '1',
    currentScore: 0,
    allTimeHiScore: 0,
    displayQuestion: false,
    windowArray: windows,
    windowClicked: 0,
    playerPosition: 0,
    enemyPosition: [],
    hasCoffee: false,
    itemPosition: 11,
    playerLevel: 0,
    timeLeft: 20,
    gameOver: false,
  },
  reducers: {
    setGameOver: (state, action) => {
      if (state.playerHiScore < state.currentScore) {
        state.playerHiScore = state.currentScore;
      }
      state.gameOver = action.payload;
    },
    setInitalVals: (state, action) => {
      const { initials, hiScore, id, allTimeHiScore } = action.payload;

      state.initials = initials;
      state.playerHiScore = hiScore;
      state.allTimeHiScore = allTimeHiScore;
      state.currentScore = 0;
      state.id = id;
      state.displayQuestion = false;
      state.windowArray = windows;
      state.windowClicked = 0;
      state.playerPosition = 0;
      state.enemyPosition = [];
      state.hasCoffee = false;
      state.itemPosition = 11;
      state.playerLevel = 0;
      state.timeLeft = 20;
      state.gameOver = false;
    },
    setPlayerLevel: (state, action) => {
      const playerLevel = action.payload;
      state.playerLevel = playerLevel;
    },
    setItemPosition: (state, action) => {
      const itemPosition = action.payload;

      state.itemPosition = itemPosition;
    },
    setHasCoffee: (state, action) => {
      const bool = action.payload;
      if (bool) {
        state.coffeePosition = null;
      }
      state.hasCoffee = bool;
    },
    setDisplayQuestion: (state, action) => {
      const bool = action.payload;
      if (!state.enemyPosition.includes(state.playerPosition)) {
        state.displayQuestion = bool;
      }
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
        if (!state.enemyPosition.includes(state.playerPosition)) {
          state.playerPosition = pos;
        }
      }
    },
    setEnemyPosition: (state, action) => {
      let pos = action.payload;
      const endRows = [11, 23, 35, 47, 58];
      if (pos > 58) {
        pos = ((pos % 10) * 2 + 2) % 10;

        for (let i = 0; i < 59; i++) {
          if (i % 10 === pos && (i + 2) % 12 === 0) {
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
          const rand = Math.floor(Math.random() * 3);
          if (rand === 0 && pos > 12) {
            state.enemyPosition[index] = pos - 13;
          } else if (rand === 1 && pos < 48) {
            state.enemyPosition[index] = pos + 11;
          } else {
            state.enemyPosition[index] = pos - 1;
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
      let windowFlipped = 0;
      state.windowArray[state.windowClicked] = bool;
      windowFlipped += 1;
      state.windowArray[state.windowClicked + 2] = bool;
      windowFlipped += 1;
      state.windowArray[state.windowClicked - 2] = bool;
      windowFlipped += 1;
      if (state.windowClicked - 12 >= 0) {
        state.windowArray[state.windowClicked - 12] = bool;
        windowFlipped += 1;
      }
      if (state.windowClicked + 12 <= 58) {
        state.windowArray[state.windowClicked + 12] = bool;
        windowFlipped += 1;
      }
      state.currentScore += windowFlipped *= 5;

      if (!state.windowArray.includes(false)) {
        state.playerLevel = state.playerLevel + 1;
        state.currentScore = Math.floor(
          state.currentScore + ((200 + state.timeLeft) / 200) * state.timeLeft * state.playerLevel
        );
        if (state.playerLevel >= 6) {
          if (state.playerHiScore < state.currentScore) {
            state.playerHiScore = state.currentScore;
            state.gameOver = true;
          }
        } else {
          state.windowArray = [...windows];
        }
      }
    },
    setNineWindowsInArray: (state, action) => {
      const bool = action.payload;
      let windowFlipped = 0;
      state.windowArray[state.windowClicked] = bool;
      state.windowArray[state.windowClicked + 2] = bool;
      state.windowArray[state.windowClicked - 2] = bool;
      windowFlipped += 3;
      if (state.windowClicked - 14) {
        if (Math.floor(Math.random() * 2) === 0) {
          state.windowArray[state.windowClicked - 14] = bool;
          windowFlipped += 1;
        }

        if (state.windowClicked - 12 >= 0) {
          state.windowArray[state.windowClicked - 12] = bool;
          windowFlipped += 1;
          if (state.windowClicked - 10) {
            if (Math.floor(Math.random() * 2) === 0) {
              state.windowArray[state.windowClicked - 10] = bool;
              windowFlipped += 1;
            }
          }
        }
      }
      if (state.windowClicked + 14 <= 58) {
        if (Math.floor(Math.random() * 2) === 0) {
          state.windowArray[state.windowClicked + 14] = bool;
          windowFlipped += 1;
        }

        if (state.windowClicked + 12 <= 58) {
          state.windowArray[state.windowClicked + 12] = bool;
          windowFlipped += 1;
          if (state.windowClicked + 10 <= 58) {
            if (Math.floor(Math.random() * 2) === 0) {
              state.windowArray[state.windowClicked + 10] = bool;
              windowFlipped += 1;
            }
          }
        }
      }
      windowFlipped *= 5;
      state.currentScore += windowFlipped;
      if (!state.windowArray.includes(false)) {
        state.playerLevel = state.playerLevel + 1;
        state.currentScore = Math.floor(
          state.currentScore + ((200 + state.timeLeft) / 200) * state.timeLeft * state.playerLevel
        );

        if (state.playerLevel >= 6) {
          if (state.playerHiScore < state.currentScore) {
            state.playerHiScore = state.currentScore;
            state.gameOver = true;
          }
        } else {
          state.windowArray = [...windows];
        }
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
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
  },
});

export const {
  setHiScore,
  setTimeLeft,
  setPlayerLevel,
  setItemPosition,
  setHasCoffee,
  setEnemyPosition,
  setInitalVals,
  setDisplayQuestion,
  setOneWindowInArray,
  setMultiWindowInArray,
  setNineWindowsInArray,
  setWindowClicked,
  setPlayerPosition,
  setAdvanceEnemies,
  setGameOver,
} = playerScoreSlice.actions;

// selctors
export const selectHighestScore = (state) => state.playerScore.playerHiScore;
export const selectGameOver = (state) => state.playerScore.gameOver;
export const selectPlayerLevel = (state) => state.playerScore.playerLevel;
export const selectTimeLeft = (state) => state.playerScore.timeLeft;
export const selectPlayerScore = (state) => state.playerScore;
export const selectItemPosition = (state) => state.playerScore.itemPosition;
export const selectWindowClicked = (state) => state.playerScore.windowClicked;
export const selectPlayerPosition = (state) => state.playerScore.playerPosition;
export const selectEnemyPosition = (state) => state.playerScore.enemyPosition;
export const selectHasCoffee = (state) => state.playerScore.hasCoffee;
export const selectPlayerHiScore = (state) => state.playerScore.playerHiScore;
export const selectPlayerCurrentScore = (state) => state.playerScore.currentScore;
export const selectDisplayQuestion = createSelector(
  selectPlayerScore,
  (playerScore) => playerScore.displayQuestion
);
export const selectWindowArray = createSelector(
  selectPlayerScore,
  (playerScore) => playerScore.windowArray
);
export const selectPlayer = createSelector(
  selectPlayerScore,
  (playerScore) => playerScore.playerPosition
);

export const selectWindowById = createSelector(
  [selectWindowArray, (state, windowId) => windowId],
  (windowArray, windowId) => windowArray[windowId]
);
export const selectIsCharacterHere = (state, windowId) =>
  state.playerScore.playerPosition === windowId;
// state.playerScore.playerPosition === windowId ? true : false;)

export const selectCharacterHere = createSelector(
  [selectPlayer, (state, windowId) => windowId],
  (playerPosition, windowId) => (playerPosition === windowId ? true : false)
);

export default playerScoreSlice.reducer;
