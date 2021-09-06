import cloud1 from '../resources/cloud-day.png';
import lightning1 from '../resources/lightning.gif';
import bricks1 from '../resources/brick-texture.bmp';
import bricks2 from '../resources/brick-texture2.bmp';
import bricks3 from '../resources/brick-texture3.bmp';

import window1 from '../resources/wdw.png';
import window2 from '../resources/wdw2.png';
import window3 from '../resources/wdw3.png';

import ledge1 from '../resources/ledge.png';

import workermanStanding from '../resources/workerman-standing-fitted-animate.gif';
import workermanWorking from '../resources/workerman-standing-fitted-animate-working.gif';
import workermanStandingCoffee from '../resources/workerman-standing-fitted-animate-coffee.gif';
import workermanWorkingCoffee from '../resources/workerman-standing-fitted-animate-working-coffee.gif';

import workermanStanding2 from '../resources/workerman-standing-fitted-animate2.gif';
import workermanWorking2 from '../resources/workerman-standing-fitted-animate-working2.gif';
import workermanStandingCoffee2 from '../resources/workerman-standing-fitted-animate2-coffee.gif';
import workermanWorkingCoffee2 from '../resources/workerman-standing-fitted-animate-working2-coffee.gif';

import coffee1 from '../resources/coffee.gif';

import cloudy1 from '../resources/cloudy.gif';
import cloudy2 from '../resources/cloudy2.gif';
import rainy1 from '../resources/rainy.gif';

const levels = [
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks1,
      windows: window1,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding,
        working: workermanWorking,
        standingCoffee: workermanStandingCoffee,
        workingCoffee: workermanWorkingCoffee,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy1,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 45,
      speedOfEnemy: 5000,
      lightTime: 60000,
      itemOdds: 30,
    },
  },
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks2,
      windows: window2,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding,
        working: workermanWorking,
        standingCoffee: workermanStandingCoffee,
        workingCoffee: workermanWorkingCoffee,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy1,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 40,
      speedOfEnemy: 4500,
      lightTime: 55000,
      itemOdds: 28,
    },
  },
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks3,
      windows: window3,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding,
        working: workermanWorking,
        standingCoffee: workermanStandingCoffee,
        workingCoffee: workermanWorkingCoffee,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy2,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 35,
      speedOfEnemy: 4200,
      lightTime: 50000,
      itemOdds: 26,
    },
  },
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks1,
      windows: window1,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding2,
        working: workermanWorking2,
        standingCoffee: workermanStandingCoffee2,
        workingCoffee: workermanWorkingCoffee2,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy2,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 30,
      speedOfEnemy: 4000,
      lightTime: 45000,
      itemOdds: 26,
    },
  },
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks2,
      windows: window2,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding2,
        working: workermanWorking2,
        standingCoffee: workermanStandingCoffee2,
        workingCoffee: workermanWorkingCoffee2,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy2,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 25,
      speedOfEnemy: 3800,
      lightTime: 42000,
      itemOdds: 24,
    },
  },
  {
    assets: {
      stormCloud: cloud1,
      lightning: lightning1,
      bricks: bricks3,
      windows: window3,
      flowers: null,
      ledge: ledge1,
      workerman: {
        standing: workermanStanding2,
        working: workermanWorking2,
        standingCoffee: workermanStandingCoffee2,
        workingCoffee: workermanWorkingCoffee2,
      },
      items: [{ coffee: coffee1 }, { donut1: null }, { donut2: null }, { donut3: null }],
      cloudy: cloudy2,
      rainy: rainy1,
    },
    difficulty: {
      oddsOfEnemy: 20,
      speedOfEnemy: 3500,
      lightTime: 40000,
      itemOdds: 24,
    },
  },
];

export default levels;
