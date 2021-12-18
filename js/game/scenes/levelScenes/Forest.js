class Forest extends Phaser.Scene {

    constructor() {
        super('Forest');
    };

    init(){
    };

    preload (){
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
    };

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

        cursors = this.playerControls[0]; // Set controls to players chosen set
        // smoothedControls = new SmoothedHorionztalControl(1);

        /* Create Player Character(s) */

        // Single player
        this.player = new PlayerManager(this, spawnPoint.x,spawnPoint.y, playerCharacter, 0);
        let playerOne = this.player; // Used for defining player elsewhere in create()

        // Local Multiplayer
        if(isSinglePlayer === false && isOnlinePlay === false){
            this.player2 = new PlayerManager(this, spawnPoint.x, spawnPoint.y, playerCharacter2, 1);
            let playerTwo = this.player2; // Used for defining player elsewhere in create()

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



        }

        // Online Multiplayer
/*

        if(isSinglePlayer === false && isOnlinePlay === true){
            // Create list/array of between 2 - 4 players who have joined game
        }
*/

        /* Set up camera  */
        cam = this.cameras.main;
        cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // We either want it to extend out to always include both players (keep the same height expand the width?)
        // Or
        // Always follows player in the lead and it will drag/push player behind

        // Set camera to follow player
        cam.startFollow(playerOne);
        smoothMoveCameraTowards(playerOne);

        /* Player World Collisions */

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
            playerOne.x - 20,
            playerOne.y - 25,
            'NAME-HERE',{
                font: '15px',
                align: 'centre',
                color: 'white',
            });

        /* Finish Line */
        let lineShape = this.add.line(2590, 300, 2570, 0, 2650, 600);
        let finishLine = this.matter.add.gameObject(lineShape, {lineStyle: {width: 20, color: '0x00FF05', alpha: 0.3}});
        finishLine.setStatic(true);
        finishLine.setSensor(true);

        // Create animated sprite marker for finish line
        let finishMarker  = this.matter.add.sprite(2535, 458, 'finishTorch')
        finishMarker.anims.play('finishMarker', true);
        finishMarker.setStatic(true);
        finishMarker.setSensor(true);

        /* Set Collision for Player and Finish Line */
        finishLine.setOnCollideWith(playerOne.myBody, pair =>{
            this.finishRace();
        });

    };


    update (time, delta)
    {

        // Allow player to move in scene
        this.player.playerMovement(time);
        this.player.useAbility();

        /* Updates to have player name follow player */
        this.playerName.x = this.player.x - 20;
        this.playerName.y = this.player.y - 25;

        /* Set up elapsed time */
        let elapsed = this.getTime()-this.start;
        raceTime = elapsed;

        /* Create race time components */
        let minutes = Math.floor(elapsed / 60000);
        let seconds = Math.floor(elapsed / 1000);
        const maxSeconds = 60;
        let hSeconds = elapsed % 60;

        /* Make race time components accessible */
        this.minutes = minutes;
        this.seconds = seconds;
        this.hSeconds = hSeconds;
        this.elapsed = elapsed;

        /* Reset seconds value to 0 when equal to or greater than 60 - DOESN'T CURRENTLY WORK AS EXPECTED, only works once */
        if (seconds >= maxSeconds){
            seconds -= 60;
        }

        /* Display 0 in front of seconds value if less than 10 */
        if (seconds < 10){
            seconds = '0' + seconds;
        }

        // Calculate score as it's subtracted by elapsed time
        this.scoreValue = 50000 - (Math.floor(elapsed/5));

        /* Update UI Components */
        this.scoreText.setText("Score: " + this.scoreValue);
        this.timeText.setText('Time: 0' + minutes + ':' + seconds + ':' + hSeconds);
        this.playerName.setText(playerUsername);

        // Check for is local play is active, if true apply above for player 2
        if(isSinglePlayer === false && isOnlinePlay === false){
            this.player2.playerMovement(time);
            this.player2.useAbility();


        }

        /* Fail condition / Timed out connection */
        if(this.scoreValue<= 0){
            console.log('Game Over, your connection timed out or you took too long');
            this.scene.start('MainMenu');
        }

        /* Pause Function */
        if(cursors.space.isDown){
            //this.restartLevel();
            this.pauseGame();
        }

        //-----------Scrolling Background-------------
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = cam.scrollX * .1;
        this.bg_2.tilePositionX = cam.scrollX * .3;

        };

    pauseGame(){
        curGameScene = 'Forest';
        this.scene.pause();
        this.scene.launch('PauseMenu');
    }

    // Used for quick debug restart
/*    restartLevel(){
        console.log('restart level');
        this.scene.start('Forest');
    };*/

    finishRace(){
        console.log('Race Finished');
        console.log('Lap Time: ' + this.minutes + ':' + this.seconds + ':' + this.hSeconds);
        console.log('Delta Race Time: ' + this.elapsed);
        console.log('Score: ' + this.scoreValue);

        playerScore = this.scoreValue;
        raceTimeMinutes = this.minutes;
        raceTimeSeconds = this.seconds;
        raceTimeHSeconds = this.hSeconds;
        deltaRaceTime = this.elapsed;

        playerFinished = true;

        if(isSinglePlayer === false && isOnlinePlay === false){
/*

            console.log('Race Finished');
            console.log('Lap Time: ' + this.minutes2 + ':' + this.seconds2 + ':' + this.hSeconds2);
            console.log('Delta Race Time: ' + this.elapsed2);
            console.log('Score: ' + this.scoreValue2);

            playerScore2 = this.scoreValue2;
            raceTimeMinutes2 = this.minutes2;
            raceTimeSeconds2 = this.seconds2;
            raceTimeHSeconds2 = this.hSeconds2;
            deltaRaceTime2 = this.elapsed2;
*/

            player2Finished = true;

            if(playerFinished === true && player2Finished === true){
                // Add Delay to call
                this.scene.start('resultsScreen');
            }
            else if(playerFinished === true && player2Finished === false){
                // Stop player one's time counter/decrease
                // Remove player 1's ability to control character
                // Wait until player 2 has finished/timed out
            }
            else if(playerFinished === false && player2Finished === true){
                // Stop player two's time counter/decrease
                // Remove player 2's ability to control character
                // Wait until player 1 has finished/timed out
            }
        }
        else{
            // Add some sort of delay to this call
            // Stop time counter/decease
            this.scene.start('ResultsScreen');
        }

    };

    getTime() {
        let d = new Date();
        return d.getTime();
    };

    getRaceTime(){
        let elapsed = this.getTime()-this.start;
        raceTime = elapsed;

        if(isSinglePlayer === false && isOnlinePlay === true){
            let elapsed2 = this.getTime()-this.start;
            raceTime2 = elapsed2;
        }

        console.log('delta time = ' + elapsed);
    };

}