class trailerScene extends Phaser.Scene {

    /* Scene for creating some trailer clips
    * Use mountain dusk assets for environment
    * Create a completely long & flat tileset for running on (basic ground layer, 3200 long?)
    * create a bunch of 'different' sprites that will follow player character at various distances/speeds
    * close up camera view on player, maybe expand outwards using key input?
    * Added Player 2 so that there is someone who can overtake player if desired
    * No need for audio in scene unless SFX specific
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


        /*  Key Bindings */
        /* Different key bindings for player options / local play */
        // Default key bindings
        this.playerControls = [];
        this.playerControls[0] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'sprint': Phaser.Input.Keyboard.KeyCodes.K,
            'ability': Phaser.Input.Keyboard.KeyCodes.L,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        // Alt key bindings
        this.playerControls[1] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'sprint': Phaser.Input.Keyboard.KeyCodes.R,
            'ability': Phaser.Input.Keyboard.KeyCodes.T,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        cursors = this.playerControls[0];

        /* Player */
        this.player = new PlayerManager(this, 0,0, 'HeadsTheFox', 0);
        let playerOne = this.player;
        this.player2 = new PlayerManager(this, 0,0, 'AztecOne', 1);
        let playerTwo = this.player2;

        /* Player 1 Collisions */
        // Use matter events to detect whether the player is touching a surface to the left, right or bottom.
        // Before matter's update, reset the player's count of what surfaces it is touching.
        this.matter.world.on('beforeupdate', function(event){
            playerOne.numTouching.left = 0;
            playerOne.numTouching.right = 0;
            playerOne.numTouching.bottom = 0;
        });

        // Loop over the active colliding pairs and count the surfaces the player is touching.
        this.matter.world.on('collisionactive', function (event){
            let playerBody = playerOne.myBody;
            let playerLeft = playerOne.sensors.left;
            let playerRight = playerOne.sensors.right;
            let playerBottom = playerOne.sensors.bottom;

            for (let i=0; i < event.pairs.length; i++){

                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if(bodyA === playerBody || bodyB === playerBody){

                }
                // Standing on any surface counts (e.g. jumping off of a non-static crate).
                else if ( bodyA === playerBottom || bodyB === playerBottom){
                    playerOne.numTouching.bottom += 1;
                }
                    // Only static objects count since we don't want to be blocked by an object that we
                // can push around.
                else if ((bodyA === playerLeft && bodyB.isStatic) || (bodyB === playerLeft && bodyA.isStatic)){
                    playerOne.numTouching.left += 1;
                }
                else if ((bodyA === playerRight && bodyB.isStatic) || (bodyB === playerRight && bodyA.isStatic)){
                    playerOne.numTouching.right += 1;
                }
            }
        });

        // Update over, so now we can determine if any direction is blocked
        this.matter.world.on('afterupdate', function(event){
            playerOne.blocked.right = playerOne.numTouching.right > 0 ? true : false;
            playerOne.blocked.left = playerOne.numTouching.left > 0 ? true : false;
            playerOne.blocked.bottom = playerOne.numTouching.bottom > 0 ? true : false;
        });

        // Show/Hide Physics Debug - Comment out for submission
        this.input.on('pointerdown', function () {
            this.matter.world.drawDebug = !this.matter.world.drawDebug;
            this.matter.world.debugGraphic.visible = this.matter.world.drawDebug;
        }, this);

        /* Player 2 Collisions */
        this.matter.world.on('beforeupdate', function(event){
            playerTwo.numTouching.left = 0;
            playerTwo.numTouching.right = 0;
            playerTwo.numTouching.bottom = 0;
        });

        // Loop over the active colliding pairs and count the surfaces the player is touching.
        this.matter.world.on('collisionactive', function (event){
            let playerBody2 = playerTwo.myBody;
            let playerLeft2 = playerTwo.sensors.left;
            let playerRight2 = playerTwo.sensors.right;
            let playerBottom2 = playerTwo.sensors.bottom;

            for (let i=0; i < event.pairs.length; i++){

                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if(bodyA === playerBody2 || bodyB === playerBody2){

                }
                // Standing on any surface counts (e.g. jumping off of a non-static crate).
                else if ( bodyA === playerBottom2 || bodyB === playerBottom2){
                    playerTwo.numTouching.bottom += 1;
                }
                    // Only static objects count since we don't want to be blocked by an object that we
                // can push around.
                else if ((bodyA === playerLeft2 && bodyB.isStatic) || (bodyB === playerLeft2 && bodyA.isStatic)){
                    playerTwo.numTouching.left += 1;
                }
                else if ((bodyA === playerRight2 && bodyB.isStatic) || (bodyB === playerRight2 && bodyA.isStatic)){
                    playerTwo.numTouching.right += 1;
                }
            }
        });

        // Update over, so now we can determine if any direction is blocked
        this.matter.world.on('afterupdate', function(event){
            playerTwo.blocked.right = playerTwo.numTouching.right > 0 ? true : false;
            playerTwo.blocked.left = playerTwo.numTouching.left > 0 ? true : false;
            playerTwo.blocked.bottom = playerTwo.numTouching.bottom > 0 ? true : false;
        });

        /* Other 'characters' */
        this.actors = this.add.group({});
        this.actors.add(this.actorOne = new actorChars(this, 0,0));
        this.actors.add(this.actorTwo = new actorChars(this, 0,0));
        this.actors.add(this.actorThree = new actorChars(this, 0,0));
        this.actors.add(this.actorFour = new actorChars(this, 0,0));
        this.actors.add(this.actorFive = new actorChars(this, 0,0));
        this.actors.add(this.actorSix = new actorChars(this, 0,0));
        this.actors.add(this.actorSeven = new actorChars(this, 0,0));




        /* Camera */
        cam = this.cameras.main;
        cam.setBounds(0,0, 3200, game.config.height);
        cam.startFollow(this.player);



        /*  Additional Collisions */


        /* If Konami code easter egg implemented, create text saying how to return to Main Menu */


    };

    update(){

        this.player.playerMovement();
        this.player.useAbility();

        this.player2.playerMovement();
        this.player2.useAbility();


        if(cursors.space.isDown){
            this.returnToMainMenu();
        }


        /* Parallax effect */
        this.bgImage.tilePositionX = cam.scrollX * .1;
        this.mgImage.tilePositionX = cam.scrollX * .3;
        this.mgImage2.tilePositionX = cam.scrollX * .5;
        this.fgImage.tilePositionX = cam.scrollX * .7;
        this.fgImage2.tilePositionX = cam.scrollX * .9;

    };

    returnToMainMenu(){
        this.scene.start('MainMenu');
        this.scene.stop('TrailerScene');
    }

}