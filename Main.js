class mainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload() {
        // load all assets tile sprites
        this.load.image("bg_1", "assets/bg-1.png");
        this.load.image("bg_2", "assets/bg-2.png");
        this.load.image("ground", "assets/ground.png");
        // load spritesheet
        this.load.spritesheet("player", "assets/player-Movement.png",{
            frameWidth: 33,
            frameHeight: 32
        });
    };

    create() {

        // ---------------background ----------------
        // create an tiled sprite with the size of our game screen
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
        // Set its pivot to the top left corner
        this.bg_1.setOrigin(0, 0);
        // fixe it so it won't move when the camera moves.
        // Instead we are moving its texture on the update
        this.bg_1.setScrollFactor(0);

        // Add a second background layer. Repeat as in bg_1
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);

        // add the ground layer which is only 48 pixels tall
        this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        // sinc this tile is shorter I positioned it at the bottom of he screen
        this.ground.y = 12 * 16;


        //-------------------Player ---------------------
        // add player
        this.player = this.add.sprite( game.config.width * 1.5, game.config.height / 1.25, "player");
        //this.physics.add.collider(this.player,this.ground);
        // create an animation for the player

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player",{start:0, end: 3}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: "Movement",
            frames: this.anims.generateFrameNumbers("player",{start:7, end: 11}),
            frameRate: 16,
            repeat: -1
        });



        // allow key inputs to control the player
        this.cursors = this.input.keyboard.createCursorKeys();


        // set workd bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.player);

    };

    update() {

        // move the player when the arrow keys are pressed
        if (this.cursors.left.isDown && this.player.x > 0) {
            this.player.x -= 3;
            this.player.scaleX = -1;
            this.player.anims.stop('idle',true);
            this.player.anims.play('Movement',true);

        } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3) {
            this.player.x += 3;
            this.player.scaleX = 1;
            this.player.anims.stop('idle',true);
            this.player.anims.play('Movement',true);

        }
        if (this.cursors.right.isUp && this.cursors.left.isUp ) {
            this.player.anims.play('idle',true);

        }



        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = this.myCam.scrollX * .3;
        this.bg_2.tilePositionX = this.myCam.scrollX * .6;
        this.ground.tilePositionX = this.myCam.scrollX;


    };

}
