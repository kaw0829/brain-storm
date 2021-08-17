import { firebase } from '../../app/firebaseConfig';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  nanoid,
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
  console.log('userscore inside hi score  ', userScore);
  let db = firebase.firestore();
  console.log('inside updateHiScore');
  const response = db.collection('userScore').doc();
  await response.set(userScore);
  let datawithid = db.collection('userScore').doc();
  let d = await datawithid.get().where(userScore.userName);
  console.log('d');
});

export const addUser = createAsyncThunk('userScores/addUser', async (user) => {
  firebase
    .database()
    .ref('userScores/' + user)
    .set({
      initials: user,
      hiScore: 0,
      id: nanoid(),
    });
});
// console.log('response', response);
// const data = await response.get();
// console.log('data', data);
// let highScore;
// if (data) {
//   highScore = data.hiScore > score ? data.hiScore : score;
// }

// return data.set({
//   hiScore: highScore,
//   userName: userName,
// });

//for firebase database
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
// for firestore
// export const fetchUserScores = createAsyncThunk('userScore/fetchUserScores', async () => {
//   let db = firebase.firestore();
//   const response = db.collection('userScores');
//   console.log('response', response);
//   const data = await response.get();
//   console.log(data, 'data');
//   let extractedData = [];
//   data.docs.forEach((item) => {
//     let val = item.data();
//     extractedData.push(val);
//   });
//   console.log('extracted data', extractedData);
//   return extractedData;
// });

// const initialState ={

// }

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
      // Add any fetched users to the array
      // state.posts = state.posts.concat(action.payload)
      // Use the `upsertMany` reducer as a mutating update utility
      usersAdapter.upsertMany(state, action.payload);
    },
    [fetchScores.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // [addNewPost.fulfilled]: (state, action) => {
    // We can directly add the new post object to our posts array
    // state.posts.push(action.payload)
    // Use the `addOne` reducer for the fulfilled case
    [updateHiScore.fulfilled]: usersAdapter.upsertOne,
    [addUser.fulfilled]: usersAdapter.upsertOne,
  },
});

// class userScore {
//   constructor(userName, hiScore) {
//     this.userName = userName;
//     this.hiSCore = hiScore;
//   }
//   toString() {
//     return this.userName + ' HI-SCORE: ' + this.hiScore;
//   }
// }

// // Firestore data converter
// const userScoreConverter = {
//   toFirestore: function (user) {
//     return {
//       userName: user.userName,
//       hiScore: user.hiScore,
//     };
//   },
//   fromFireStore: function (snapshot, options) {
//     const data = snapshot.data(options);
//     return new userScore(data.userName, data.hiScore);
//   },
// };

// db.collection("cities").doc("LA")
// .withConverter(cityConverter)
// .get().then((doc) => {
//   if (doc.exists){
//     // Convert to City object
//     var city = doc.data();
//     // Use a City instance method
//     console.log(city.toString());
//   } else {
//     console.log("No such document!");
//   }}).catch((error) => {
//     console.log("Error getting document:", error);
//   });
// const userScoreRef = db.ref('userScores');
// const newUserScoreRef = userScoreRef.push();
// newUserScoreRef.set({
//   initials: 'kaw',
//   hiScore: 232342,
// });

//retrieves data
export const test = async () => {
  let db = firebase.firestore();
  db.collection('userScore')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    });
};
const retrieveUserScores = () => {
  let db = firebase.firestore();
  db.collection('userScore')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  // .collection("userScore")
  // .orderBy("hiScore", "desc")
};
// const retrieveAndUpdateScore = (userInitials, score) => {
//   let db = firebase.firestore();
//   let userScoreRef = db.collection('userScore').doc(userInitials);
//   console.log(userScoreRef);
//   let highScore = userScoreRef.hiScore > score ? userScoreRef.hiScore : score;
//   return userScoreRef
//     .update({
//       hiScore: highScore,
//     })
//     .then(() => {
//       console.log('Document successfully updated!');
//     })
//     .catch((error) => {
//       // The document probably doesn't exist.
//       console.error('Error updating document: ', error);
//     });
// };
// Create an initial document to update.
// var frankDocRef = db.collection("users").doc("frank");
// frankDocRef.set({
//     name: "Frank",
//     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
//     age: 12
// });

// // To update age and favorite color:
// db.collection("users").doc("frank").update({
//     "age": 13,
//     "favorites.color": "Red"
// })
// .then(() => {
//     console.log("Document successfully updated!");
// });

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
