import Phaser from 'phaser';
import bee from './assets/bee.png';
import wasp from './assets/rightwasp.png';

var graphics;

class Instructions extends Phaser.Scene
{
    constructor()
    {
        super('Instructions');
    }

    preload()
    {
        this.load.image('bee', bee);
        this.load.image('wasp', wasp);
    }

    create()
    {
        //this.add.image(500, 300, 'bg');

        graphics = this.add.graphics();

        graphics.fillStyle(0xD4B37F, 1);

        graphics.fillRoundedRect(100, 60, 800, 500, 16);

        this.add.text(120, 90, 'INSTRUCTIONS', { fill: '#000', fontSize: '20px', fontFamily: '"Press Start 2P' });

        this.add.text(150, 130, 'There are three levels to this game, each with increasing difficulty', { fill: '#000', fontSize: '18px', fontFamily: '"Courier' });
        this.add.text(150, 160, 'CONTROLS: \n\n', { fill: "#000", font: "bolder 20px Courier"});

        this.add.text(150, 140, '\n\n\n\t\t\t Use the keypad to control the bear\'s movement\n\n', { fill: "#000", font: "18px Courier"});

        this.add.text(150, 170, '\n\n\n\t\t\t Use the spacebar to release a bullet. \n\n\t\t\t\tIn Lvl 3: use the mouse to be able to change your field of view \n\n', { fill: "#000", font: "18px Courier"});

        this.add.text(150, 250, '\n\nOBJECTIVE: \n\n', { fill: "#000", font: "bolder 20px Courier"});

        this.add.text(150, 270, '\n\n\n\t\t\t Try to collect as many coins as possible in the allotted time \n\n\t\t\t limit', { fill: "#000", font: "18px Courier"});

        this.add.text(150, 350, '\n\nBEEWARE: \n\n', { fill: "#000", font: "bolder 20px Courier"});

        this.add.image(315, 425, 'bee');
        this.add.image(650, 425, 'wasp');
        this.add.text(150, 370, '\n\n\n\t\t\tIn Lvl 2:      can only be shot down and      can only be killed \n\n\t\t\tif you jump on it. But in Lvl 3: both can be shot at.', { fill: "#000", font: "18px Courier"});
        //this.add.text(150, 350, '\n\nGOOD LUCK!! \n\n', { fill: "#000", font: "bolder 20px Courier"});

        this.beginnerBtn = this.add.text(450, 510, 'START', { fill: '#000', fontSize: '20px', fontFamily: '"Press Start 2P' });
        this.beginnerBtn.setInteractive()
        .on('pointerdown', () => { this.scene.start('Game') });
    }
}

export default Instructions;