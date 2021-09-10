import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SplashScreen from '../../pages/SplashScreen';
import GameScreen from '../../pages/GameScreen';
import Instructions from '../../pages/Instructions';
import HiScore from '../../pages/HiScore';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/brain-storm' exact={true}>
          <SplashScreen />
        </Route>
        <Route path='/play' exact={true}>
          <GameScreen />
        </Route>
        <Route path='/instructions' exact={true}>
          <Instructions />
        </Route>
        <Route path='/hiScores' exact={true}>
          <HiScore />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
