import Phaser from 'phaser';
import bg from './assets/bg.png';
import WebFontFile from '../WebFontFile';

class Preload extends Phaser.Scene
{

    constructor() 
    {
        super('Preload');
    } 
    
    preload() 
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
        this.load.image('bg', bg);

    }

    create()
    {
        this.scene.start('WelcomeMenu');
    }
}

export default Preload;