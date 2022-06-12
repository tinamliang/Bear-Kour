import Phaser from 'phaser';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import player from './assets/boySpritesheet.png';
//import player2 from './assets/girlSpritesheet.png';
import Timer from './Timer';
import coin from './assets/coin.png';
import sheet from './assets/sheet.png';
import bg from './assets/bg.png';
import tiles from './assets/tiles1.json';
import spike from './assets/spike.png';
import flag from './assets/flag.png';
import explosive from 'url:./assets/explosion.mp3';
import losing from 'url:./assets/losing.mp3';
import win from 'url:./assets/complete.mp3';

var cursors, character, coins, spikes, flagImg;

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

class FirstLevel extends Phaser.Scene {

    constructor()
    {
        super('Game')
        const app = initializeApp(config);
    }

    init()
    {
    }

    preload()
    {
        this.load.image('bg', bg);
        this.load.spritesheet('p1', player, {frameWidth: 48.4, frameHeight: 67});
        //this.load.spritesheet('p2', player2, {frameWidth: 48.4, frameHeight: 67});
        this.load.image('coins', coin);
        this.load.image('tiles', sheet);
        this.load.image('spike', spike);
        this.load.image('flag', flag);
        this.load.tilemapTiledJSON('tilemap', tiles);
        this.load.audio('soundExplode', explosive, true);
        this.load.audio('deadSound', losing, true);
        this.load.audio('passed', win, true);


    }


    create() {

        this.score = 0
        this.name = prompt("Input first and last name: ")

        while (this.name == null || this.name == "" || (this.name.split(" ")).length < 2) {
            this.name = prompt("Please enter a valid first and last name: ")
        }

        this.add.image(500, 300, 'bg');
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('caveWorld', 'tiles');
        const platforms = map.createLayer('backgroundImage', tileset);
        platforms.setCollisionByExclusion(-1, true);

        flagImg = this.physics.add.sprite(950, 95, 'flag');
        
        character = this.physics.add.sprite(120, 450, 'p1');
        character.setGravityY(300);
        character.setBounce(0.2);
        character.setCollideWorldBounds(true);
        this.collider = this.physics.add.collider(character, platforms);

        coins = this.physics.add.group();

        coins.create(50, 145, 'coins');
        coins.create(140, 145, 'coins');

        coins.create(60, 405, 'coins');
        coins.create(300, 405, 'coins');
        coins.create(500, 405, 'coins');

        coins.create(945, 342, 'coins');
        coins.create(980, 306, 'coins');

        coins.create(415, 215, 'coins');
        coins.create(650, 115, 'coins');

        coins.create(750, 435, 'coins');

        coins.create(575, 525, 'coins');
        coins.create(908, 525, 'coins');
        coins.create(980, 465, 'coins');

        spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        spikes.create(650, 526, 'spike');
        spikes.create(352, 244, 'spike');
        spikes.create(478, 244, 'spike');

        this.physics.add.overlap(character, coins, collectCoins, null, this);
        this.physics.add.collider(character, flagImg, nextLevel, null, this);

        this.scoreText = this.add.text(12, 12, 'Score: 0', {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#ffffff', padding: {left: 5, top: 10}});

        function collectCoins(character, coins)
        {
            coins.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

        }

        function nextLevel()
        {
            this.sound.play('passed');
            this.next()
        }

        this.point = this.physics.add.collider(character, spikes, hitObstacle, null, this);

        function hitObstacle(character, spikes) 
        {
            this.sound.play('deadSound');
            character.anims.play('turn');
            character.body.setGravityY(800);
            this.physics.world.removeCollider(this.collider);
            this.physics.world.removeCollider(this.point);
            character.setCollideWorldBounds(false);
            this.countdown.stop();
            this.gameOver();
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
            });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'p1', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('p1', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        const timerLabel = this.add.text(500, 17, '30', {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#f7e4d7', padding: {left: 5, top: 5}});

        this.countdown = new Timer(this, timerLabel)
        this.countdown.start(this.handleCountdownFinished.bind(this));

    }


    handleCountdownFinished()
	{
        this.sound.play('deadSound');
        this.gameOver();
	}



    gameOver() {

        this.sendInfoToDB();
        this.scene.start('Leaderboard', {
            name: this.name,
            score: this.score,
        })

    }

    next() {
        
        this.scene.start('SecondLevel', {
            secondName: this.name,
            secondScore: this.score,
        })
    }

    async sendInfoToDB(){
        await addDoc(collection(getFirestore(), 'game_scores'), {
            name: this.name,
            score: this.score,
        });
    }

    update()
    {

        if (cursors.left.isDown)
        {
            character.setVelocityX(-160);
            character.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            character.setVelocityX(160);
            character.anims.play('right', true);
        } 
        else {
            character.setVelocityX(0);
            character.anims.play('turn');
        }

        if (cursors.up.isDown && character.body.onFloor())
        {
            character.body.setVelocityY(-302);
        }
        this.countdown.update()
    }

}
    


export default FirstLevel;