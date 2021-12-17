class Forest extends Phaser.Scene {

    constructor() {
        super('Forest');
    };

    init(){

    }

    preload ()
    {
/*
        // Uncomment when testing level on it's own
        // load all assets tile sprites
        this.load.image("forestBG", "gameAssets/imageAssets/levelImages/forestSet/bg-1.png");
        this.load.image("forestMG", "gameAssets/imageAssets/levelImages/forestSet/bg-2.png");
        // load tiled
        this.load.tilemapTiledJSON('forestMap', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.json');
        this.load.image('forestTiles', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png');
        // load spritesheet
        this.load.spritesheet('headsFox', 'gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png',{ frameWidth: 33, frameHeight: 32 });
   */
    }

    create ()
    {

        /* Different key bindings for player options / local play */
        // Default key bindings
        this.playerControls = [];
        this.playerControls[0] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'sprint': Phaser.Input.Keyboard.KeyCodes.P,
            'ability': Phaser.Input.Keyboard.KeyCodes.L,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        // Alt key bindings
        this.playerControls[1] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'sprint': Phaser.Input.Keyboard.KeyCodes.G,
            'ability': Phaser.Input.Keyboard.KeyCodes.H,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        // --------------- background ----------------

        // create an tiled sprite with the size of our game screen
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width * 3.0, game.config.height, "forestBG").setScale(2.5);
        // Set its pivot to the top left corner
        this.bg_1.setOrigin(0, 0.4);
        // fixe it so it won't move when the camera moves.
        // Instead we are moving its texture on the update
        this.bg_1.setScrollFactor(0);

        // Add a second background layer. Repeat as in bg_1
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width * 3.0, game.config.height, "forestMG").setScale(2.5);
        this.bg_2.setOrigin(0, 0.4);
        this.bg_2.setScrollFactor(0);

        //--------- tiledmaps ------------
        var map = this.make.tilemap({ key: 'forestMap' });
        var tileset = map.addTilesetImage("PlatformForrest" , "forestTiles");
        var layer = map.createLayer('Ground', tileset, 0, 85);


        //-------- Collisions -------------

        // Set up the layer to have matter bodies. Any colliding tiles will be given a Matter body.
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);
        const spawnPoint = map.findObject("Objects", obj=> obj.name === "Spawn Point");

        /*this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);*/
        this.matter.world.setBounds(0, 0, map.widthInPixels, 600);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;

        //cursors = this.input.keyboard.createCursorKeys();
        cursors = this.playerControls[0]; // Set controls to players chosen set
        smoothedControls = new SmoothedHorionztalControl(1);


        /* Create Player(s) */
        this.player = new PlayerManager(this, spawnPoint.x,spawnPoint.y, playerCharacter, 1);
        let playerOne = this.player; // Used for defining player elsewhere in create()
/*
        if(isSinglePlayer === false && isOnlinePlay === false){
            this.player2 = new PlayerManager(this, spawnPoint.x, spawnPoint.y, playerCharacter2, 1);
        }
*/
/*

        if(isSinglePlayer === false && isOnlinePlay === true){
            // Create list/array of between 2 - 4 players who have joined game
        }
*/

        switch(playerCharacter){
            case 'HeadsTheFox':
                this.thisChar = this.matter.add.sprite(0, 0, 'headsFox', 4);
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';
                break;
            case 'AztecOne':
                this.thisChar = this.matter.add.sprite(0, 0, 'aztecOne', 4);
                this.charKeyIdle = 'aztec1Idle';
                this.charKeyRun = 'aztec1Run';
                this.charKeyJump = 'aztec1Jump';
                break;
            default:
                this.thisChar = this.matter.add.sprite(0, 0, 'headsFox', 4).setTint('0x00F4FF');
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';
        }

        // The player is a collection of bodies and sensors;
        playerController = {
            matterSprite: this.thisChar,
            blocked: {
                left: false,
                right: false,
                bottom: false
            },
            numTouching: {
                left: 0,
                right: 0,
                bottom: 0
            },
            sensors: {
                bottom: null,
                left: null,
                right: null
            },
            time: {
                leftDown: 0,
                rightDown: 0
            },
            lastJumpedAt: 0,
            speed: {
                /*run: 6,*/
                run: 3,
                jump: 7
            }
        };

        var M = Phaser.Physics.Matter.Matter;
        var w = playerController.matterSprite.width;
        var h = playerController.matterSprite.height;

        // The player's body is going to be a compound body:
        //  - playerBody is the solid body that will physically interact with the world. It has a
        //    chamfer (rounded edges) to avoid the problem of ghost vertices: http://www.iforce2d.net/b2dtut/ghost-vertices
        //  - Left/right/bottom sensors that will not interact physically but will allow us to check if
        //    the player is standing on solid ground or pushed up against a solid object.

        // Move the sensor to player center
        var sx = w / 2;
        var sy = h / 2;

        // The player's body is going to be a compound body.
        var playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
        playerController.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
        playerController.sensors.left = M.Bodies.rectangle(sx - w * 0.45, sy, 5, h * 0.25, { isSensor: true });
        playerController.sensors.right = M.Bodies.rectangle(sx + w * 0.45, sy, 5, h * 0.25, { isSensor: true });
        var compoundBody = M.Body.create({
            parts: [
                playerBody, playerController.sensors.bottom, playerController.sensors.left,
                playerController.sensors.right
            ],
            friction: 0.01,
            restitution: 0.05 // Prevent body from sticking against a wall
        });

        playerController.matterSprite
            .setExistingBody(compoundBody)
            .setFixedRotation() // Sets max inertia to prevent rotation
            .setPosition(spawnPoint.x,spawnPoint.y);


        /* Set up scene camera */
        // Where local play is concerned
        // We either want it to extend out to always include both players (keep the same height expand the width?)
        // Or
        // Always follows player in the lead and it will drag/push player behind
        cam = this.cameras.main;
        cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        smoothMoveCameraTowards(playerController.matterSprite);
        // making the camera follow the player
        cam.startFollow(playerController.matterSprite);

        /* For constructed player */
        //smoothMoveCameraTowards(playerOne);
        //cam.startFollow(playerOne);


        // Use matter events to detect whether the player is touching a surface to the left, right or
        // bottom.

        // Before matter's update, reset the player's count of what surfaces it is touching.
        this.matter.world.on('beforeupdate', function (event) {
            playerController.numTouching.left = 0;
            playerController.numTouching.right = 0;
            playerController.numTouching.bottom = 0;
        });

        // For constructed player
        this.matter.world.on('beforeupdate', function(event){
            playerOne.numTouching.left = 0;
            playerOne.numTouching.left = 0;
            playerOne.numTouching.right = 0;
            playerOne.numTouching.bottom = 0;
        })

        // For constructed player
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
                else if ( bodyA === playerBottom || bodyB === playerBottom){
                    playerOne.numTouching.bottom += 1;
                }
                else if ((bodyA === playerLeft && bodyB.isStatic) || (bodyB === playerLeft && bodyA.isStatic)){
                    playerOne.numTouching.left += 1;
                }
                else if ((bodyA === playerRight && bodyB.isStatic) || (bodyB === playerRight && bodyA.isStatic)){
                    playerOne.numTouching.right += 1;
                }
            }
        })

        // Loop over the active colliding pairs and count the surfaces the player is touching.
        this.matter.world.on('collisionactive', function (event) {
            var playerBody = playerController.body;
            var left = playerController.sensors.left;
            var right = playerController.sensors.right;
            var bottom = playerController.sensors.bottom;

            for (var i = 0; i < event.pairs.length; i++)
            {
                var bodyA = event.pairs[i].bodyA;
                var bodyB = event.pairs[i].bodyB;

                if (bodyA === playerBody || bodyB === playerBody)
                {
                    continue;
                }
                else if (bodyA === bottom || bodyB === bottom)
                {
                    // Standing on any surface counts (e.g. jumping off of a non-static crate).
                    playerController.numTouching.bottom += 1;
                }
                else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic))
                {
                    // Only static objects count since we don't want to be blocked by an object that we
                    // can push around.
                    playerController.numTouching.left += 1;
                }
                else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic))
                {
                    playerController.numTouching.right += 1;
                }
            }
        });

        // For constructed player
        this.matter.world.on('afterupdate', function(event){
            playerOne.blocked.right = playerOne.numTouching.right > 0;
            playerOne.blocked.left = playerOne.numTouching.left > 0;
            playerOne.blocked.left = playerOne.numTouching.bottom > 0;

        })

        // Update over, so now we can determine if any direction is blocked
        this.matter.world.on('afterupdate', function (event) {
            playerController.blocked.right = playerController.numTouching.right > 0 ? true : false;
            playerController.blocked.left = playerController.numTouching.left > 0 ? true : false;
            playerController.blocked.bottom = playerController.numTouching.bottom > 0 ? true : false;
        });

        // Show/Hide Physics Debug - Comment out fully for submission
        this.input.on('pointerdown', function () {
            this.matter.world.drawDebug = !this.matter.world.drawDebug;
            this.matter.world.debugGraphic.visible = this.matter.world.drawDebug;
        }, this);

        /* UI Components */

        /* Start Score Value */
        const scoreValue = 50000;

        /* Time Trigger */
        this.start = this.getTime();

        /* Timer UI */
        const timeText = this.add.text(25 , 10, 'Time: 00:00:00',{
            font: '30px',
            align: 'center',
            color: 'white',
            backgroundColor: 'black',
        });
        timeText.scrollFactorX = 0;
        timeText.scrollFactorY = 0;
        this.timeText = timeText;

        /* Score UI */

        const scoreText = this.add.text(25, 50, "Score: " + scoreValue, {
            font: "30px",
            align: "center",
            color: "white",
            backgroundColor: 'black',
        });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;
        this.scoreText = scoreText;

        /* Temp placeholder for player identifier */
        this.playerName = playerUsername;
        this.playerName = this.add.text(
            playerController.matterSprite.x - 20,
            playerController.matterSprite.y - 25,
            'NAME-HERE',{
                font: '15px',
                align: 'centre',
                color: 'white',
            });

        /* Finish Line */
        let lineShape = this.add.line(2580, 300, 2570, 0, 2650, 600);
        let finishLine = this.matter.add.gameObject(lineShape, {lineStyle: {width: 30, color: '0x00FF05', alpha: 0.3}});
        finishLine.setStatic(true);
        finishLine.setSensor(true);

        /* Set Collision for Player and Finish Line */
        finishLine.setOnCollideWith(playerBody, pair =>{
            this.finishRace();
        });

    }


    update (time, delta)
    {
        var matterSprite = playerController.matterSprite;

        // Allow player to move in scene
        this.player.playerMovement();
        this.player.useAbility();

        /* Updates to have player name follow player */
        this.playerName.x = matterSprite.x - 20;
        this.playerName.y = matterSprite.y - 25;

        /* Set up elapsed time */
        let elapsed = this.getTime()-this.start;
        raceTime = elapsed;

        /* Create race time components */
        let minutes = Math.floor(elapsed / 60000);
        const maxSeconds = 60;
        let seconds = Math.floor(elapsed / 1000);
        let hSeconds = elapsed % 60;

        /* Reset seconds value to 0 when equal to or greater than 60 - DOESN'T CURRENTLY WORK AS EXPECTED */
        if (seconds >= maxSeconds){
            seconds -= 60;
        }

        /* Display 0 in front of seconds value if less than 10 */
        if (seconds < 10){
            seconds = '0' + seconds;
        }

        /* Make race time components accessible */
        this.minutes = minutes;
        this.seconds = seconds;
        this.hSeconds = hSeconds;
        this.elapsed = elapsed;

        // Calculate score as it's subtracted by elapsed time
        this.scoreValue = 50000 - (Math.floor(elapsed/5));


        /* Update UI Components */
        this.scoreText.setText("Score: " + this.scoreValue);
        this.timeText.setText('Time: 0' + minutes + ':' + seconds + ':' + hSeconds);
        this.playerName.setText(playerUsername);

        /* Speed up run/sprint */
        if(cursors.sprint.isDown){
            // modify player run speed for x seconds
            // console.log('Player is sprinting');
        }

        /* Use power-up ability */
        if(cursors.ability.isDown){
            this.getRaceTime();
        }

        /* Fail condition / Timed out connection */
        if(this.scoreValue<= 0){
            console.log('Game Over, your connection timed out or you took too long');
            this.scene.start('MainMenu');
        }

        if(cursors.space.isDown){
            this.restartLevel();
        }


        // Horizontal movement

        var oldVelocityX;
        var targetVelocityX;
        var newVelocityX;

        if (cursors.left.isDown && !playerController.blocked.left)
        {
            smoothedControls.moveLeft(delta);
            matterSprite.flipX = true;
            matterSprite.anims.play(this.charKeyRun, true);

            // Lerp the velocity towards the max run using the smoothed controls. This simulates a
            // player controlled acceleration.
            oldVelocityX = matterSprite.body.velocity.x;
            targetVelocityX = -playerController.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, -smoothedControls.value);

            matterSprite.setVelocityX(newVelocityX);
        }
        else if (cursors.right.isDown && !playerController.blocked.right)
        {
            smoothedControls.moveRight(delta);
            matterSprite.flipX = false;
            matterSprite.anims.play(this.charKeyRun, true);

            // Lerp the velocity towards the max run using the smoothed controls. This simulates a
            // player controlled acceleration.
            oldVelocityX = matterSprite.body.velocity.x;
            targetVelocityX = playerController.speed.run;
            newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, smoothedControls.value);

            matterSprite.setVelocityX(newVelocityX);
        }
        else
        {
            smoothedControls.reset();
            matterSprite.anims.play(this.charKeyIdle, true);
        }

        // Jumping & wall jumping

        // Add a slight delay between jumps since the sensors will still collide for a few frames after
        // a jump is initiated
        var canJump = (time - playerController.lastJumpedAt) > 250;
        if (cursors.up.isDown & canJump)
        {
            matterSprite.anims.play(this.charKeyJump, true);
            if (playerController.blocked.bottom)
            {
                matterSprite.setVelocityY(-playerController.speed.jump);
                playerController.lastJumpedAt = time;
            }
            else if (playerController.blocked.left)
            {
                // Jump up and away from the wall
                matterSprite.setVelocityY(-playerController.speed.jump);
                matterSprite.setVelocityX(playerController.speed.run);
                playerController.lastJumpedAt = time;
            }
            else if (playerController.blocked.right)
            {
                // Jump up and away from the wall
                matterSprite.setVelocityY(-playerController.speed.jump);
                matterSprite.setVelocityX(-playerController.speed.run);
                playerController.lastJumpedAt = time;
            }
            /*matterSprite.anims.play('right', true);*/
        }

        smoothMoveCameraTowards(matterSprite, 1);

        //-----------Scrolling Background-------------
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = cam.scrollX * .1;
        this.bg_2.tilePositionX = cam.scrollX * .3;

        }

    restartLevel(){
        console.log('restart level');
        this.scene.start('Forest');
    }

    finishRace(){
        console.log('Race Finished');
        console.log('Lap Time: ' + this.minutes + ':' + this.seconds + ':' + this.hSeconds);
        console.log('Delta Race Time: ' + this.elapsed);
        console.log('Score: ' + this.scoreValue);

        playerScore = this.scoreValue;
        raceTime = ([this.minutes, this.seconds, this.hSeconds]); // Not currently working right
        deltaRaceTime = this.elapsed;

        this.scene.start('ResultsScreen');

    }

    getTime() {
        let d = new Date();
        return d.getTime();
    }

    getRaceTime(){
        let elapsed = this.getTime()-this.start;
        raceTime = elapsed;
        console.log('delta time = ' + elapsed);
    }
}