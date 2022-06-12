import Phaser from 'phaser';
import { addDoc, collection, getFirestore } from "firebase/firestore";

import finallevel from './assets/tiles3.json';
import spike from './assets/spike.png';
import coin from './assets/coin.png';
import sheet from './assets/sheet.png';
import bg from './assets/bg.png';
import bullet from './assets/bullet.png';
import flag from './assets/flippedFlag.png';
import player from './assets/boySpritesheet.png';
import beeRight from './assets/beeRight.png';
import beeLeft from './assets/beeLeft.png';
import explosion from './assets/explosion.png';
import gun from './assets/gun.png';
import leftGun from './assets/leftGun.png';
import leftwasp from './assets/leftwasp.png';
import rightwasp from './assets/rightwasp.png';
import spotlight from './assets/mask1.png';
import explosive from 'url:./assets/explosion.mp3';
import losing from 'url:./assets/losing.mp3';
import win from 'url:./assets/complete.mp3';
import Timer from './Timer';

var flags, character, cursors, coins, coin1, coin2, coin3, coin4, coin5, coin6, coin7, spikes, FOV;
var beeSpeed = 50;
var spikes1, spikes2, spikes3, spikes4, spikes5, spikes6, spikes7;

class ThirdLevel extends Phaser.Scene
{

    
    constructor()
    {
        super('ThirdLevel')
    }

    init(data)
    {
        this.score = data.score;
        this.name = data.name;
        this.numBullets = 3;
    }

    preload()
    {

        this.load.spritesheet('rightFly', beeRight, {frameWidth: 30, frameHeight: 30});
        this.load.spritesheet('leftFly', beeLeft, {frameWidth: 29, frameHeight: 30});
        this.load.spritesheet('leftwasp', leftwasp, {frameWidth: 37, frameHeight: 26});
        this.load.spritesheet('rightwasp', rightwasp, {frameWidth: 37, frameHeight: 26});
        this.load.tilemapTiledJSON('lastlevel', finallevel);
        this.load.image('spotlight', spotlight);
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

    
        const backg = this.add.image(500, 300, 'bg');
        flags = this.physics.add.sprite(643, 255, 'flag');

    
        FOV = this.add.sprite(400, 300, 'spotlight');
        this.wasp = this.physics.add.sprite(190, 172, 'rightwasp');
        this.otherwasp = this.physics.add.sprite(725, 112, 'leftwasp');
        
        this.bee = this.physics.add.sprite(680, 520, 'rightFly');

        coins = this.physics.add.sprite(415, 276, 'coins');
        coin1 = this.physics.add.sprite(836, 212, 'coins');
        coin2 = this.physics.add.sprite(222, 175, 'coins');
        coin3 = this.physics.add.sprite(115, 369, 'coins');
        coin4 = this.physics.add.sprite(650, 115, 'coins');
        coin5 = this.physics.add.sprite(910, 370, 'coins');
        coin6 = this.physics.add.sprite(850, 530, 'coins');
        coin7 = this.physics.add.sprite(525, 435, 'coins');

        this.wasp.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        this.otherwasp.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        this.bee.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        flags.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        
        coins.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin1.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin2.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin3.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin4.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin5.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin6.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        coin7.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);

        spikes = this.physics.add.sprite(48, 304, 'spike');
        spikes1 = this.physics.add.sprite(250, 399, 'spike');
        spikes2 = this.physics.add.sprite(840, 399, 'spike');

        spikes3 = this.physics.add.sprite(465, 463, 'spike');
        spikes4 = this.physics.add.sprite(433, 495, 'spike');
        spikes5 = this.physics.add.sprite(623, 495, 'spike');
        spikes6 = this.physics.add.sprite(592, 465, 'spike');

        spikes7 = this.physics.add.sprite(540, 239, 'spike');

        spikes.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes1.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes2.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes3.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes4.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes5.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes6.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        spikes7.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);

        backg.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);
        
        const map = this.make.tilemap({ key: 'lastlevel' });
        const tileset = map.addTilesetImage('levelthreetiles', 'tiles');
        const platforms = map.createLayer('ground', tileset);
        platforms.setCollisionByExclusion(-1, true);

        platforms.mask = new Phaser.Display.Masks.BitmapMask(this, FOV);

        character = this.physics.add.sprite(120, 450, 'p1');
        character.setGravityY(300);
        character.setBounce(0.2);
        character.setCollideWorldBounds(true);

        this.input.on('pointermove', function (pointer) {
            FOV.x = pointer.x;
            FOV.y = pointer.y;
        });

        this.physics.add.overlap(character, flags, nextLevel, null, this);

        function nextLevel()
        {
            this.sound.play('passed');
            this.physics.pause();
            this.scene.start("FinalScene", {
                score: this.score,
            });
        }

        this.gun = this.add.sprite(character.x, character.y, 'gun');
        this.gun.visible = false;

        this.leftGun = this.add.sprite(character.x, character.y, 'pointleft');
        this.leftGun.visible = false;
        this.collider = this.physics.add.collider(character, platforms);

        this.physics.add.collider(character, this.wasp, this.dead, null, this);
        this.physics.add.collider(character, this.otherwasp, this.dead, null, this);
        this.physics.add.collider(character, this.bee, this.dead, null, this);

        this.physics.add.overlap(character, coins, this.collectCoins, null, this);
        this.physics.add.overlap(character, coin1, this.collectCoin1, null, this);
        this.physics.add.overlap(character, coin2, this.collectCoin2, null, this);
        this.physics.add.overlap(character, coin3, this.collectCoin3, null, this);
        
        this.physics.add.overlap(character, coin4, this.collectCoin4, null, this);
        this.physics.add.overlap(character, coin5, this.collectCoin5, null, this);
        this.physics.add.overlap(character, coin6, this.collectCoin6, null, this);
        this.physics.add.overlap(character, coin7, this.collectCoin7, null, this);
        this.scoreText = this.add.text(12, 12, 'Score: ' + this.score, {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#ffffff', padding: {left: 5, top: 10}});

        this.point = this.physics.add.collider(character, spikes, this.hitObstacle, null, this);
        this.point = this.physics.add.collider(character, spikes1, this.hitObstacle1, null, this);
        this.point = this.physics.add.collider(character, spikes2, this.hitObstacle2, null, this);
        this.point = this.physics.add.collider(character, spikes3, this.hitObstacle3, null, this);
        this.point = this.physics.add.collider(character, spikes4, this.hitObstacle4, null, this);
        this.point = this.physics.add.collider(character, spikes5, this.hitObstacle5, null, this);
        this.point = this.physics.add.collider(character, spikes6, this.hitObstacle6, null, this);
        this.point = this.physics.add.collider(character, spikes7, this.hitObstacle7, null, this);


        

        this.bulletPool = this.physics.add.group();

        this.bulletPool.enableBody = true;

        this.bulletPool.createMultiple(3, 'bullet');
 
        this.bulletPool.outOfBoundsKill = true;
        this.bulletPool.checkWorldBounds = true;

        this.nextShotAt = 0;
        this.shotDelay = 2000;

        this.numBulletsText = this.add.text(750, 12, 'Bullets Left: 3', {fill: "#000000", fontSize: '15px', fontFamily: '"Press Start 2P"', backgroundColor: '#ffffff', padding: {left: 5, top: 10}});


       this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0,
        hideOnComplete: true
        });

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


        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        cursors = this.input.keyboard.createCursorKeys();

        this.bee.body.velocity.x = beeSpeed;
        this.wasp.body.velocity.x = beeSpeed;
        this.otherwasp.body.velocity.x = -beeSpeed;

        // const timerLabel = this.add.text(500, 17, '30', {fill: "#000000", fontSize: '25px', fontFamily: '"Press Start 2P"', backgroundColor: '#f7e4d7', padding: {left: 5, top: 5}});

        // this.countdown = new Timer(this, timerLabel)
        // this.countdown.start(this.handleCountdownFinished.bind(this));
    }

    // handleCountdownFinished()
	// {
    //     this.gameOver();
	// }

    update()
    {

        //spikes.visible = false;
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

        if (this.bee.body.x > 930)
        {
            this.bee.body.velocity.x = -beeSpeed;
            this.bee.anims.play('buzzleft', true);
        }

        if (this.bee.body.x < 680)
        {
            this.bee.body.velocity.x = beeSpeed;
            this.bee.anims.play('buzzright', true);
        }

        if (this.wasp.body.x > 320)
        {
            this.wasp.body.velocity.x = -beeSpeed;
            this.wasp.anims.play('flyLeft', true);
        }

        if (this.wasp.body.x < 160)
        {
            this.wasp.body.velocity.x = beeSpeed;
            this.wasp.anims.play('flyRight', true);
        }

        if (this.otherwasp.body.x <= 600)
        {
            this.otherwasp.body.velocity.x = beeSpeed;
            this.otherwasp.anims.play('flyRight', true);
        }

        if (this.otherwasp.body.x > 720)
        {
            this.otherwasp.body.velocity.x = -beeSpeed;
            this.otherwasp.anims.play('flyLeft', true);
        }

        this.physics.overlap(this.bulletPool, this.otherwasp, this.hit, null, this);
        this.physics.overlap(this.bulletPool, this.wasp, this.enemyHit, null, this);
        this.physics.overlap(this.bulletPool, this.bee, this.hitAgain, null, this);

        //this.countdown.update()

    }

    dead()
    {
        this.sound.play('deadSound');
        //this.bulletPool.disableBody(true, true);
        this.physics.pause();
        character.anims.play('turn');
        //this.countdown.stop();
        this.gameOver();
    }


    fireright()
    {

        if (this.nextShotAt > this.time.now)
        {
            return;
        }

        this.nextShotAt = this.time.now + this.shotDelay;


        var bullet = this.bulletPool.get(character.x + 20, character.y + 15, 'bullet');
        
        if (bullet)
        {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = 400;
            if (this.numBullets > 0)
            {
                this.numBullets -= 1;
            }
            else {
                this.numBullets = 0;
            }
        }

        this.numBulletsText.setText('Bullets Left: ' + this.numBullets);

    }

    fireleft()
    {

        if (this.nextShotAt > this.time.now)
        {
            return;
        }

        this.nextShotAt = this.time.now + this.shotDelay;

        var bullet = this.bulletPool.get(character.x - 20, character.y + 15, 'bullet');
        
        if (bullet)
        {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.x = -400;
            if (this.numBullets > 0)
            {
                this.numBullets -= 1;
            }
            else {
                this.numBullets = 0;
            }
        }

        this.numBulletsText.setText('Bullets Left: ' + this.numBullets);
    }

    hit()
    {
        var explosive = this.add.sprite(this.otherwasp.x, this.otherwasp.y, 'explosion');
        this.sound.play('soundExplode');
        explosive.anims.play('explode');
        explosive.setOrigin(0.5, 0.5);
        this.otherwasp.disableBody(true, true);
        
    }

    hitAgain()
    {

        var explosive = this.add.sprite(this.bee.x, this.bee.y, 'explosion');
        explosive.anims.play('explode');
        this.sound.play('soundExplode');
        explosive.setOrigin(0.5, 0.5);
        this.bee.disableBody(true, true);

    }

    enemyHit()
    {

        var explosion = this.add.sprite(this.wasp.x, this.wasp.y, 'explosion');
        explosion.anims.play('explode');
        this.sound.play('soundExplode');
        explosion.setOrigin(0.5, 0.5);
        this.wasp.disableBody(true, true);
    }

    gameOver()
    {
        this.sound.play('deadSound')
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

    collectCoins(character, coins)
    {
        coins.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin1(character, coin1)
    {
        coin1.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin2(character, coin2)
    {
        coin2.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin3(character, coin3)
    {
        coin3.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin4(character, coin4)
    {
        coin4.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin5(character, coin5)
    {
        coin5.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin6(character, coin6)
    {
        coin6.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    collectCoin7(character, coin7)
    {
        coin7.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    hitObstacle(character, spikes) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }

    hitObstacle1(character, spikes1) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }

    hitObstacle2(character, spikes2) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }
    hitObstacle3(character, spikes3) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }
    hitObstacle4(character, spikes4) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }
    hitObstacle5(character, spikes5) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }
    hitObstacle6(character, spikes6) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }
    hitObstacle7(character, spikes7) 
    {
        this.sound.play('deadSound');
        character.anims.play('turn');
        character.body.setGravityY(800);
        this.physics.world.removeCollider(this.collider);
        this.physics.world.removeCollider(this.point);
        character.setCollideWorldBounds(false);
        //this.countdown.stop();
        this.gameOver();
    }

}

export default ThirdLevel;