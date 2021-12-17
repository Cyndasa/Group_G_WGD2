class trailerScene extends Phaser.Scene {

    /* Scene for creating some trailer clips
    * Use mountain dusk assets for environment
    * Create a completely long & flat tileset for running on (basic ground layer, 3200 long?)
    * create a bunch of 'different' sprites that will follow player character at various distances/speeds
    * close up camera view on player, maybe expand outwards using key input?
    *
    * */

    constructor() {
        super('TrailerScene');

    }

    preload(){

    }

    create(){

        /* Environment */
        this.bgImage = this.add.tileSprite(0, 0, game.config.width * 4, game.config.height, 'mountainBG').setScale(3.75);
        this.bgImage.setOrigin(0, 0); // Set origin to top left
        this.bgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        this.mgImage = this.add.tileSprite(0, 0, game.config.width * 4, game.config.height, 'mountainMG').setScale(3.75);
        this.mgImage.setOrigin(0, 0); // Set origin to top left
        this.mgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        this.mgImage2 = this.add.tileSprite(0, 0, game.config.width * 4, game.config.height, 'mountainMG2').setScale(3.75);
        this.mgImage2.setOrigin(0, 0); // Set origin to top left
        this.mgImage2.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        this.fgImage = this.add.tileSprite(0, 0, game.config.width* 4, game.config.height, 'mountainFG').setScale(3.75);
        this.fgImage.setOrigin(0, 0); // Set origin to top left
        this.fgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        this.fgImage2 = this.add.tileSprite(0, 0, game.config.width* 4, game.config.height, 'mountainFG2').setScale(3.75);
        this.fgImage2.setOrigin(0, 0); // Set origin to top left
        this.fgImage2.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* TileSet */


        /* Player */
        this.player = new PlayerManager(this, 0,0, 'HeadsTheFox', 0);

        /* Other 'characters' */
        // Create 10+ using group creation (if matter has it)



        /* Camera */
        cam = this.cameras.main;
        cam.setBounds(0,0, 3200, game.config.height);
        cam.startFollow(this.player);



        /* Collisions */


    }

    update(){



        /* Parallax effect */
        this.bgImage.tilePositionX = cam.scrollX * .1;
        this.mgImage.tilePositionX = cam.scrollX * .3;
        this.mgImage2.tilePositionX = cam.scrollX * .5;
        this.fgImage.tilePositionX = cam.scrollX * .7;
        this.fgImage2.tilePositionX = cam.scrollX * .9;

    }

}