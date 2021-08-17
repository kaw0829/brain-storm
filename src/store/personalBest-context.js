import { createContext, useState } from 'react';

//wrap with component and then use useContext imported from react to access

// createContext sets initialState
const PersonalBestContext = createContext({
  personalHiScore: 0,
  userScores: [],
// addUserScore here is an empty function, it does not do anything but provide info for autocomplete
  addUserScore: (currentScore) => {},
});

export const PersonalBestContextProvider = (props) => {
  const [userHiScore, setUserHiScore] = useState(0);
  const [userScores, setUserScores] = useState([]);


  // updates list of scores for one user  setUserScores is passed a function that will auto receive previous state as a parameter to ensure the latest state is used
  const addUserScoreHandler = (currentScore) => {
    setUserScores((prevUserScores) => {
      return prevUserScores.concat(currentScore);
    });
    if(currentScore > userHiScore) {
      setUserHiScore(currentScore)
    }
  };
// contains the context to pass to other components {hiscore, userScores: list of scores for player, addUserScore: passes the addUserScoreHandler}
  const context = {
    personalHiScore: userHiScore,
    userScores: userScores,
    addUserScore: addUserScoreHandler,
  };

  return (
    <PersonalBestContext.Provider value={context}>{props.children}</PersonalBestContext.Provider>
  );
};

//To use context
//wrap with PersonalBestContextProvider you can wrap the entire app if needed many places

//import { useContext } from 'react'
// import PersonalBestContext
//
// const personalBestCtx = useContext(PersonalBestContext)
//personalBestCtx.addUserScore(score)

export default PersonalBestContext;
