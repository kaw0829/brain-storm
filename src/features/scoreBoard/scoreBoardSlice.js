import { firebase } from '../../app/firebaseConfig';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

// uses standard array.sort syntax
const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.hiScore - a.hiScore,
});

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const updateHiScore = createAsyncThunk('userScore/updateHiScore', async (userScore) => {
  let db = firebase.database();
  const response = await db.ref('userScores/' + userScore.id).set({
    initials: userScore.initials,
    hiScore: userScore.hiScore,
    id: userScore.id,
  });
  console.log('response', response);
  return userScore;
});

export const fetchScores = createAsyncThunk('userScores/fetchScores', async () => {
  let db = firebase.database();
  let ref = db.ref('userScores');
  const data = await ref.get();
  console.log('data out of loop', data);
  let extractedData = [];
  data.forEach((item) => {
    extractedData.push(item.val());
  });
  console.log('extracted', extractedData);
  return extractedData;
});

export const scoreBoardSlice = createSlice({
  name: 'scoreBoard',
  initialState,
  reducers: {
    getUserHiScore(state, action) {
      const { userName } = action.payload;
      const userScore = state.entities[userName];
      const hiScore = userScore ? userScore.hiScore : 0;
      return hiScore;
    },
    getAllTimeHiScore(state) {
      console.log('state entities', state.entities[0]);

      const hiScore = state.entities.reduce((a, b) =>
        a.hiScore > b.hiScore ? a.hiScore : b.hiScore
      );
      console.log(hiScore, 'hiscore');
      return hiScore;
    },
  },
  extraReducers: {
    [fetchScores.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchScores.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log('action.payload', action.payload);
      usersAdapter.upsertMany(state, action.payload);
    },
    [fetchScores.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [updateHiScore.rejected]: (state, action) => {
      state.status = 'failed to update score';
      state.error = action.error.message;
    },
    [updateHiScore.fulfilled]: (state, action) => {
      state.status = 'update succeeded';
      console.log('action.payload for update', action.payload);
      usersAdapter.upsertOne(state, action.payload);
    },
  },
});

export const { getUserHiScore, getAllTimeHiScore } = scoreBoardSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`  these are built in prewritten selectors/ using es6 destructuring to rename the imports
export const {
  selectAll: selectAllUserScores,
  // selectById: selectUserScoreById,
  // selectIds: selectUserScoreIds
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors((state) => state.scoreBoard);

// maps the highscores to an array and then uses reduce to find the highest score
export const selectHighestScore = createSelector([selectAllUserScores], (userScores) =>
  userScores.map((userScore) => userScore.hiScore).reduce((a, b) => (a > b ? a : b))
);
// createSelector will prevent unneccessary rendering it take input functions as first arg and uses the results of those in output function

export default scoreBoardSlice.reducer;
