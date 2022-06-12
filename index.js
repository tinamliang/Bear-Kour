import Phaser from 'phaser';
import FirstLevel from './src/FirstLevel';
import SecondLevel from './src/SecondLevel';
import ThirdLevel from './src/ThirdLevel';
import FinalScene from './src/FinalScene';
import Leaderboard from './src/Leaderboard';
import GameOver from './src/GameOver';
import FetchScore from './src/FetchScore';
import Preload from './src/Preload';
import WelcomeMenu from './src/WelcomeMenu';
import Instructions from './src/Instructions';

var config = 
{
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    autoCenter: true,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [Preload, WelcomeMenu, Instructions, FirstLevel, GameOver, SecondLevel, ThirdLevel, Leaderboard, FetchScore, FinalScene]
};

new Phaser.Game(config);