import Phaser from 'phaser';
import { addDoc, collection, getFirestore } from "firebase/firestore";

import level2 from './assets/tiles2.json';
import spike from './assets/spike.png';
import coin from './assets/coin.png';
import sheet from './assets/sheet.png';
import bg from './assets/bg.png';
import bullet from './assets/bullet.png';
import flag from './assets/flag.png';
import player from './assets/boySpritesheet.png';
import beeRight from './assets/beeRight.png';
import beeLeft from './assets/beeLeft.png';
import explosion from './assets/explosion.png';
import gun from './assets/gun.png';
import leftGun from './assets/leftGun.png';
import leftwasp from './assets/leftwasp.png';
import rightwasp from './assets/rightwasp.png';
import Timer from './Timer';
import explosive from 'url:./assets/explosion.mp3';
import losing from 'url:./assets/losing.mp3';
import win from 'url:./assets/complete.mp3';

var beeSpeed = 50;
var cursors, character, spikes, coins, flags;

class SecondLevel extends Phaser.Scene
{
    countdown

    constructor()
    {
        super('SecondLevel');
    }

    init(data)
    {
        //console.log('init', data.secondScore, data.secondName);
        this.score = data.secondScore;
        this.name = data.secondName;
    }

    preload()
    {
        this.load.spritesheet('rightFly', beeRight, {frameWidth: 30, frameHeight: 30});
        this.load.spritesheet('leftFly', beeLeft, {frameWidth: 29, frameHeight: 30});
        this.load.spritesheet('leftwasp', leftwasp, {frameWidth: 37, frameHeight: 26});
        this.load.spritesheet('rightwasp', rightwasp, {frameWidth: 37, frameHeight: 26});
        this.load.tilemapTiledJSON('level2', level2);
        this.load.image('spike', spike);
        this.load.image('bg', bg);
        this.load.spritesheet('p1', player, {frameWidth: 48.4, frameHeight: 67});
        this.load.image('coins', coin);
        this.load.image('tiles', sheet);
        this.load.image('spike', spike);
        this.load.image('flag', flag);
        this.load.image('bullet', bullet);
        this.load.image('bee', beeRight);
        this.load.image('gun', gun);
        this.load.image('pointleft', leftGun);
        this.load.spritesheet('explosion', explosion, {frameWidth: 32, frameHeight: 31});
        this.load.audio('soundExplode', explosive, true);
        this.load.audio('deadSound', losing, true);
        this.load.audio('passed', win, true);
    }

    create()
    {

        this.add.image(500, 300, 'bg');
        flags = this.physics.add.sprite(65, 127, 'flag');

        this.wasp = this.physics.add.sprite(565, 146, 'rightwasp');
        
        const map = this.make.tilemap({ key: 'level2' });
        const tileset = map.addTilesetImage('levelTwo', 'tiles');
        const platforms = map.createLayer('levelTwoTiles', tileset);
        platforms.setCollisionByExclusion(-1, true);

        character = this.physics.add.sprite(120, 450, 'p1');
        this.gun = this.add.sprite(character.x, character.y, 'gun');
        this.gun.visible = false;

        this.leftGun = this.add.sprite(character.x, character.y, 'pointleft');
        this.leftGun.visible = false;
        character.setGravityY(300);
        character.setBounce(0.2);
        character.setCollideWorldBounds(true);
        this.collider = this.physics.add.collider(character, platforms);

        coins = this.physics.add.group();

        coins.create(978, 436, 'coins');
        coins.create(180, 400, 'coins');
        coins.create(280, 400, 'coins');
        coins.create(945, 240, 'coins');
        coins.create(910, 275, 'coins');

        coins.create(610, 400, 'coins');
        coins.create(710, 400, 'coins');

        coins.create(160, 275, 'coins');
        coins.create(50, 275, 'coins');

        coins.create(565, 148, 'coins');
        coins.create(665, 148, 'coins');
        

        this.bee = this.physics.add.sprite(130, 390, 'rightFly');
        this.otherBee = this.physics.add.sprite(750, 390, 'leftFly');

        this.physics.add.overlap(character, coins, collectCoins, null, this);

        this.scoreText = this.add.text(12, 12, 'Score: ' + this.score, {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#ffffff', padding: {left: 5, top: 10}});
        function collectCoins(character, coins)
        {
            coins.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);

        }

        spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        spikes.create(920, 463, 'spike');
        spikes.create(875, 526, 'spike');
        spikes.create(390, 271, 'spike');
        spikes.create(977, 208, 'spike');


        this.point = this.physics.add.collider(character, spikes, hitObstacle, null, this);

        function hitObstacle(character, spikes) 
        {
            this.sound.play('deadSound');
            character.anims.play('turn');
            character.body.setGravityY(800);
            this.physics.world.removeCollider(this.collider);
            this.physics.world.removeCollider(this.point);
            character.setCollideWorldBounds(false);
            // this.countdown.stop();
            this.gameOver();
        }

        this.anims.create({
            key: 'buzzleft',
            frames: this.anims.generateFrameNumbers('leftFly', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
            });

        this.anims.create({
            key: 'buzzright',
            frames: this.anims.generateFrameNumbers('rightFly', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'facingLeft',
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
            key: 'facingRight',
            frames: this.anims.generateFrameNumbers('p1', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'flyRight',
            frames: this.anims.generateFrameNumbers('rightwasp', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'flyLeft',
            frames: this.anims.generateFrameNumbers('leftwasp', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });



        this.wasp.body.velocity.x = beeSpeed;
        
        this.bee.body.velocity.x = beeSpeed;
        this.otherBee.body.velocity.x = -beeSpeed;

        this.physics.add.overlap(character, this.bee, this.dead, null, this);
        this.physics.add.overlap(character, this.otherBee, this.dead, null, this);
        this.physics.add.overlap(character, this.wasp, this.dead, null, this);
        this.physics.add.collider(character, this.wasp, this.jumpedOn, null, this);

        this.bullets = [];
        this.nextShotAt = 0;
        this.shotDelay = 2000;

        this.physics.add.overlap(character, flags, nextLevel, null, this);

        function nextLevel()
        {
            //console.log('next level starts');
            this.sound.play('passed');
            this.scene.start('ThirdLevel', {
                name: this.name,
                score: this.score,
            })
        }

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        cursors = this.input.keyboard.createCursorKeys();

        const timerLabel = this.add.text(500, 17, '30', {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#f7e4d7', padding: {left: 5, top: 5}});

        this.countdown = new Timer(this, timerLabel)
        this.countdown.start(this.handleCountdownFinished.bind(this));
    }

    handleCountdownFinished()
	{
        this.sound.play('deadSound')
        this.gameOver();
	}
  

    update()
    {

        if (cursors.left.isDown)
        {
            character.setVelocityX(-160);
            character.anims.play('facingLeft', true);
            this.gun.visible = false;
            this.leftGun.visible = true;
            this.leftGun.x = character.x - 15;
            this.leftGun.y = character.y + 15;

            if (this.spaceKey.isDown)
            {
                this.fireleft();
            }
        }
        else if (cursors.right.isDown)
        {
            character.setVelocityX(160);
            character.anims.play('facingRight', true);
            this.leftGun.visible = false;
            this.gun.visible = true;
            this.gun.x = character.x + 15;
            this.gun.y = character.y + 15;

            if (this.spaceKey.isDown)
            {
                this.fireright();
            }
        } 
        else {
            character.setVelocityX(0);
            character.anims.play('turn');
            this.leftGun.visible = false;
            this.gun.visible = false;
        }

        if (cursors.up.isDown && character.body.onFloor())
        {
            character.body.setVelocityY(-302);
        }

        if (this.bee.body.x > 340)
        {
            this.bee.body.velocity.x = -beeSpeed;
            this.bee.anims.play('buzzleft', true);
        }

        if (this.bee.body.x < 130)
        {
            this.bee.body.velocity.x = beeSpeed;
            this.bee.anims.play('buzzright', true);
        }

        if (this.otherBee.body.x > 750)
        {
            this.otherBee.body.velocity.x = -beeSpeed;
            this.otherBee.anims.play('buzzleft', true);
        }

        if (this.otherBee.body.x <= 550)
        {
            this.otherBee.body.velocity.x = beeSpeed;
            this.otherBee.anims.play('buzzright', true);
        }

        if (this.wasp.body.x > 765)
        {
            this.wasp.body.velocity.x = -beeSpeed;
            this.wasp.anims.play('flyLeft', true);
        }

        if (this.wasp.body.x < 565)
        {
            this.wasp.body.velocity.x = beeSpeed;
            this.wasp.anims.play('flyRight', true);
        }

        for (var i = 0; i < this.bullets.length; i++)
        {
            
            this.physics.overlap(this.bullets[i], this.bee, this.enemyHit, null, this);
        }

        for (var i = 0; i < this.bullets.length; i++)
        {
            this.physics.overlap(this.bullets[i], this.otherBee, this.hit, null, this);
        }


        this.countdown.update()
        
    }

    fireright()
    {

        if (this.nextShotAt > this.time.now)
        {
            return;
        }

        this.nextShotAt = this.time.now + this.shotDelay;

        var bullet = this.physics.add.sprite(character.x + 20, character.y + 15, 'bullet');
        bullet.body.velocity.x = 400;
        this.bullets.push(bullet);

    }

    fireleft()
    {

        if (this.nextShotAt > this.time.now)
        {
            return;
        }

        this.nextShotAt = this.time.now + this.shotDelay;

        var bullet = this.physics.add.sprite(character.x - 20, character.y + 15, 'bullet');
        bullet.body.velocity.x = -400;
        this.bullets.push(bullet);

    }

    dead()
    {
        this.physics.pause();
        character.anims.play('turn');
        this.sound.play('deadSound');
        this.countdown.stop();
        this.gameOver();
    }

    jumpedOn()
    {
        if (this.wasp.body.touching.up && character.body.touching.down)
        {
            this.wasp.setGravityY(800);
        }
    }

    enemyHit()
    {
        var explosion = this.add.sprite(this.bee.x, this.bee.y, 'explosion');
        this.sound.play('soundExplode');
        explosion.anims.play('explode');
        explosion.setOrigin(0.5, 0.5);
        this.bee.disableBody(true, true);
        this.bullets[0].disableBody(true, true);
    }

    gameOver()
    {

        this.sendInfoToDB();
        this.scene.start('Leaderboard', {
            name: this.name,
            score: this.score,
        })
    }

    async sendInfoToDB(){
        await addDoc(collection(getFirestore(), 'game_scores'), {
            name: this.name,
            score: this.score,
        });
    }

    hit()
    {
        var explosive = this.add.sprite(this.otherBee.x, this.otherBee.y, 'explosion');
        this.sound.play('soundExplode');
        explosive.anims.play('explode');
        explosive.setOrigin(0.5, 0.5);
        this.otherBee.disableBody(true, true);
        this.bullets[0].disableBody(true, true);
    }


}

export default SecondLevel;

