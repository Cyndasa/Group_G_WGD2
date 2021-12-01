class mainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        //Treat as initial/testing scene
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload() {
        // load all assets tile sprites
        this.load.image("bg_1", "gameAssets/imageAssets/levelImages/forestSet/bg-1.png");
        this.load.image("bg_2", "gameAssets/imageAssets/levelImages/forestSet/bg-2.png");
        this.load.image("ground", "gameAssets/imageAssets/levelImages/forestSet/ground.png");
        // load spritesheet
        this.load.spritesheet("player", "gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png", {
            frameWidth: 33,
            frameHeight: 32
        });

        /* Temporary Collectible */
        this.load.image("collectible", "gameAssets/imageAssets/Forrest/sprites/misc/star/star-1.png")

        // load the PNG file
        this.load.image('tiles', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png')
        this.load.image ('level', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.png')
        // load the JSON file
        this.load.tilemapTiledJSON('map', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.json')
    };

    create() {

        // 👌 sanity check by displaying the entire tileset image


        const map = this.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16 });

        const tileset = map.addTilesetImage("PlatformForrest" , "tiles")
        this.worldlayer = map.createLayer("Ground",tileset, 0,0 );

        this.worldlayer.setCollisionByProperty({ Collides: true });
        this.worldlayer.setDepth(10);
        this.worldlayer.setOrigin(0,0);

        const spawnPoint = map.findObject("Objects", obj=> obj.name === "Spawn Point");



        // ---------------background ----------------
        // create an tiled sprite with the size of our game screen
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1")/*.setScale(2.5)*/;
        // Set its pivot to the top left corner
        this.bg_1.setOrigin(0, 0);
        // fixe it so it won't move when the camera moves.
        // Instead we are moving its texture on the update
        this.bg_1.setScrollFactor(0);

        // Add a second background layer. Repeat as in bg_1
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2")/*.setScale(2.5)*/;
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);
/*
        // add the ground layer which is only 48 pixels tall
        this.ground = this.add.tileSprite(0, 0, game.config.width * 3, 32, "ground");
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        // since this tile is shorter I positioned it at the bottom of he screen
        this.ground.y = 12 * 16;
        // Temporary physics for ground sprite
        this.physics.world.enableBody(this.ground);
        this.ground.body.setCollideWorldBounds(true);
*/

        //-------------------Player ---------------------
        // add player
        this.player = this.add.sprite(spawnPoint.x,spawnPoint.y, game.config.width * 1.5, 0, "player")/*.setScale(2.5)*/;
        this.physics.world.enableBody(this.player);
/*
// enabling this causes issue with game world
        this.player.body.setCollideWorldBounds(true);
*/
        // create an animation for the player
        this.physics.add.collider(this.player, this.worldlayer);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", {start: 0, end: 3}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: "Movement",
            frames: this.anims.generateFrameNumbers("player", {start: 7, end: 11}),
            frameRate: 16,
            repeat: -1
        });


        // allow key inputs to control the player
        this.cursors = this.input.keyboard.createCursorKeys();


        // set world bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3.0, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.player);

        /* Temporary Collectible & Player/Collectible Collision */
        this.collectible = this.add.group({});

        this.collectible.add(this.colItem1 = new Collectible(this, 50, 0));
        this.collectible.add(this.colItem2 = new Collectible(this, 150, 0));
        this.collectible.add(this.colItem3 = new Collectible(this, 300, 0));

        this.physics.add.overlap(this.player, this.collectible, this.collectItem, null, this)
        this.physics.add.collider(this.collectible, this.worldlayer);

        /* Simple UI set-up */
        const scoreValue = 0;
        this.scoreValue = scoreValue;

        const raceTime = 0;
        this.raceTime = raceTime;

        /* Timer UI */
        const timeText = this.add.text(10 , 5, "Time: " + raceTime, {
            font: "20px",
            align: "center",
            color: "red",
        });
        timeText.scrollFactorX = 0;
        timeText.scrollFactorY = 0;
        this.timeText = timeText;

        /* Score UI */

        const scoreText = this.add.text(150, 5, "Score: " + scoreValue, {
            font: "20px",
            align: "center",
            color: "white",
        });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;
        this.scoreText = scoreText;

    };

    update(time, delta) {

        /* UI Update */
        this.scoreText.setText("Score:" + this.scoreValue);
        this.timeText.setText("Time: " + this.raceTime);


        // move the player when the arrow keys are pressed
        if (this.cursors.left.isDown && this.player.x > 0) {
            this.player.x -= 3;
            this.player.scaleX = -1;
/*            this.player.anims.stop('idle', true);
            this.player.anims.play('Movement', true);*/
            this.updateAnimation();

        } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
            this.player.x += 3;
            this.player.scaleX = 1;
/*            this.player.anims.stop('idle', true);
            this.player.anims.play('Movement', true);*/
            this.updateAnimation();
        }

        if (this.cursors.right.isUp && this.cursors.left.isUp) {
            this.player.anims.play('idle', true);
        }

        /* Player jump */
        if (this.cursors.space.isDown && this.player.body.onFloor()){
            this.player.body.setVelocityY(-400);
        }


        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = this.myCam.scrollX * .3;
        this.bg_2.tilePositionX = this.myCam.scrollX * .6;
        //this.ground.tilePositionX = this.myCam.scrollX;


    };

    updateAnimation(){
        if(this.player.scaleX === -1 || this.player.scaleX === 1){
            this.player.anims.play('Movement', true);
        }
        else {
            this.player.anims.stop('Movement', true);
        }

    }

    /* Temporary Item Collection Function */
    collectItem(player, collectObj){
        this.scoreValue += 5;
        collectObj.disableBody(true, true);
    };


}