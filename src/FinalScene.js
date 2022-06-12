import Phaser from 'phaser';
import balloon from './assets/balloon.png';
import redballoon from './assets/redballoon.png';
import purpleballoon from './assets/purpleballoon.png';

var graphics;

class FinalScene extends Phaser.Scene
{
    constructor()
    {
        super('FinalScene')
    }

    init(data) {
        this.score = data.score;
    }

    preload()
    {
        this.load.image('balloon', balloon);
        this.load.image('redballoon', redballoon);
        this.load.image('purpleballoon', purpleballoon);
    }

    create()
    {


        graphics = this.add.graphics();

        graphics.fillStyle(0xD4B37F, 1);

        graphics.fillRoundedRect(240, 200, 500, 250, 32);
        this.add.text(400, 240, 'YOU WON!', { fill: '#000', fontSize: '30px', fontFamily: '"Press Start 2P' });

        this.add.text(380, 300, 'FINAL SCORE: ' + this.score, { fill: '#000', fontSize: '20px', fontFamily: '"Press Start 2P' });

        this.returntohome = this.add.text(490, 400, 'RETURN HOME', {fill: '#000000', fontSize: '15px', fontFamily: '"Press Start 2P"'}).setOrigin(0.5, 0.5);

        this.returntohome.setInteractive().on('pointerdown', 
        () => { 
            this.scene.start('WelcomeMenu');
            this.scene.stop('FinalScene');
        });

        this.balloon = this.physics.add.sprite(500, 600, 'balloon');
        this.redb = this.physics.add.sprite(300, 700, 'redballoon');
        this.purpleb = this.physics.add.sprite(700, 700, 'purpleballoon');

    }

    update()
    {

        this.balloon.y -= 2;

        if (this.balloon.y < 0)
        {
            this.balloon.y = 600;
        }

        this.redb.y -= 2;

        if (this.redb.y < 0)
        {
            this.redb.y = 600;
        }

        this.purpleb.y -= 2;

        if (this.purpleb.y < 0)
        {
            this.purpleb.y = 600;
        }

    }

    
}



export default FinalScene;