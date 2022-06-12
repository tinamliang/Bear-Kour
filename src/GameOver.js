import Phaser from 'phaser';

var graphics;
class GameOver extends Phaser.Scene {

    constructor()
    {
        super('GameOver')
    }

    init(data)
    {
        this.myScore = data.myscore;
        this.firstName = data.names;
        this.firstScore = data.scores;
    }

    create()
    {
        //console.log(this.firstName)
        graphics = this.add.graphics();

        graphics.fillStyle(0xD4B37F, 1);

        graphics.fillRoundedRect(240, 50, 500, 500, 32);
        this.add.text(310, 80, 'GAME OVER!', { fill: '#000', fontSize: '40px', fontFamily: '"Press Start 2P' });

        this.add.text(310, 135, 'Leaderboard: ', { fill: "#000", fontSize: '20px', fontFamily: '"Press Start 2P'});

        this.add.text(350, 190, "Your score: " + this.myScore, { fill: "#000", fontSize: '17px', fontFamily: '"Press Start 2P'});
        this.add.text(380, 240, "-  " + this.firstName[0] + ": " + String(this.firstScore[0]), {fontSize: '15px', fontFamily: '"Press Start 2P', fill: "#000"})
        this.add.text(380, 290, "-  " + this.firstName[1] + ": " + String(this.firstScore[1]), {fontSize: '15px', fontFamily: '"Press Start 2P', fill: "#000"})
        this.add.text(380, 340, "-  " + this.firstName[2] + ": " + String(this.firstScore[2]), {fontSize: '15px', fontFamily: '"Press Start 2P', fill: "#000"})
        this.add.text(380, 390, "-  " + this.firstName[3] + ": " + String(this.firstScore[3]), {fontSize: '15px', fontFamily: '"Press Start 2P', fill: "#000"})
        this.add.text(380, 440, "-  " + this.firstName[4] + ": " + String(this.firstScore[4]), {fontSize: '15px', fontFamily: '"Press Start 2P', fill: "#000"})

        this.add.text(310, 500, 'Play Again?', { fill: "#000", fontSize: '15px', fontFamily: '"Press Start 2P'});

        this.yes = this.add.text(550, 505, 'YES', {fill: '#000000', fontSize: '15px', fontFamily: '"Press Start 2P"'}).setOrigin(0.5, 0.5);

        this.yes.setInteractive().on('pointerdown', 
        () => { this.scene.start('Game') });
        

    }
    
}

export default GameOver;