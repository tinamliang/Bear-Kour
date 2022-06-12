import Phaser from 'phaser';

class WelcomeMenu extends Phaser.Scene
{

    constructor()
    {
        super('WelcomeMenu');
    }


    preload()
    {
        
    }

    create()
    {

        this.add.image(500, 300, 'bg');
        this.add.text(500, 300, 'BEAR-KOUR', { fill: "#000000", fontSize: '65px', fontFamily: '"Press Start 2P'}).setOrigin(0.45, 0.5);
        this.add.text(500, 400, 'Press Space to start the Game',  { fill: "#000000", fontSize: '15px', fontFamily: '"Press Start 2P'}).setOrigin(0.5, 0.5);
        
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Instructions');
        });
    }
}

export default WelcomeMenu;