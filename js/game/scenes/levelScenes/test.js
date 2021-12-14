class Test extends Phaser.Scene {

    constructor() {
        super('Test');
    };

    preload ()
    {
        // load all assets tile sprites
        this.load.image("bg_1", "gameAssets/imageAssets/levelImages/forestSet/bg-1.png");
        this.load.image("bg_2", "gameAssets/imageAssets/levelImages/forestSet/bg-2.png");
        // load tiled
        this.load.tilemapTiledJSON('map', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.json');
        this.load.image('tiles', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png');

/*        // load spritesheet
        this.load.spritesheet('player', 'gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png',{ frameWidth: 33, frameHeight: 32 });*/
    }

    create ()
    {

        /* Different key bindings for player options / local play */
        playerControls[0] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'sprint': Phaser.Input.Keyboard.KeyCodes.P,
            'ability': Phaser.Input.Keyboard.KeyCodes.L
        });
        playerControls[1] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'sprint': Phaser.Input.Keyboard.KeyCodes.G,
            'ability': Phaser.Input.Keyboard.KeyCodes.H
        });

        // ---------------background ----------------

        // create an tiled sprite with the size of our game screen
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width * 3.0, game.config.height, "bg_1").setScale(2.5);
        // Set its pivot to the top left corner
        this.bg_1.setOrigin(0, 0.4);
        // fixe it so it won't move when the camera moves.
        // Instead we are moving its texture on the update
        this.bg_1.setScrollFactor(0);

        // Add a second background layer. Repeat as in bg_1
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width * 3.0, game.config.height, "bg_2").setScale(2.5);
        this.bg_2.setOrigin(0, 0.4);
        this.bg_2.setScrollFactor(0);

        //---------tiledmaps------------
        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage("PlatformForrest" , "tiles");
        var layer = map.createLayer('Ground', tileset, 0, 85);

        //--------Collisions-------------

        // Set up the layer to have matter bodies. Any colliding tiles will be given a Matter body.
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);
        const spawnPoint = map.findObject("Objects", obj=> obj.name === "Spawn Point");

        /*this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);*/
        this.matter.world.setBounds(0, 0, map.widthInPixels, 600);
        this.matter.world.createDebugGraphic();
        this.matter.world.drawDebug = false;

        //cursors = this.input.keyboard.createCursorKeys();
        cursors = playerControls[0]; // Set controls to players chosen set
        smoothedControls = new SmoothedHorionztalControl(1);

        // The player is a collection of bodies and sensorsl;

        playerController = {
            matterSprite: this.matter.add.sprite(0, 0, 'player', 4),
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
        cam = this.cameras.main;
        cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        smoothMoveCameraTowards(playerController.matterSprite);
        // making the camera follow the player
        cam.startFollow(playerController.matterSprite);

        /* Create player animations */

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 17 }),
            /*frameRate: 16,*/
            frameRate: 16,
            repeat: -1
        });

        // Use matter events to detect whether the player is touching a surface to the left, right or
        // bottom.

        // Before matter's update, reset the player's count of what surfaces it is touching.
        this.matter.world.on('beforeupdate', function (event) {
            playerController.numTouching.left = 0;
            playerController.numTouching.right = 0;
            playerController.numTouching.bottom = 0;
        });

        // Loop over the active colliding pairs and count the surfaces the player is touching.
        this.matter.world.on('collisionactive', function (event)
        {
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

        // Update over, so now we can determine if any direction is blocked
        this.matter.world.on('afterupdate', function (event) {
            playerController.blocked.right = playerController.numTouching.right > 0 ? true : false;
            playerController.blocked.left = playerController.numTouching.left > 0 ? true : false;
            playerController.blocked.bottom = playerController.numTouching.bottom > 0 ? true : false;
        });

        this.input.on('pointerdown', function () {
            this.matter.world.drawDebug = !this.matter.world.drawDebug;
            this.matter.world.debugGraphic.visible = this.matter.world.drawDebug;
        }, this);

        text = this.add.text(16, 16, '', {
            fontSize: '20px',
            padding: { x: 20, y: 10 },
            backgroundColor: '#ffffff',
            fill: '#000000'
        });
        text.setScrollFactor(0);
        updateText();


        /* UI Components */

        /* Placeholder Values */
        const scoreValue = 0;
        this.scoreValue = scoreValue;

        /* Time Trigger */
        this.start = this.getTime();
        //this.input.on('pointerdown', this.getRaceTime.bind(this));


        /* Timer UI */
        const timeText = this.add.text(600 , 10, "Time: " + raceTime, {
            font: "25px",
            align: "center",
            color: "red",
        });
        timeText.scrollFactorX = 0;
        timeText.scrollFactorY = 0;
        this.timeText = timeText;

        /* Score UI */

        const scoreText = this.add.text(600, 50, "Score: " + scoreValue, {
            font: "25px",
            align: "center",
            color: "white",
        });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;
        this.scoreText = scoreText;

        /* Temp placeholder for player identifier */
        this.playerName = playerUsername;
        this.playerName = this.add.text(
            playerController.matterSprite.x - 20,
            playerController.matterSprite.y - 25,
            'Player',{
                font: '15px',
                align: 'centre',
                color: 'white',
            });


        /* Temp Finish Line */
        let finishLine = this.add.graphics({lineStyle: {width: 30, color: '0x00FF05', alpha: 0.3}});
        this.lineShape = new Phaser.Geom.Line(2575, 0, 2575, 600);
        finishLine.strokeLineShape(this.lineShape);
        this.matter.add.gameObject(finishLine).setStatic(true).setSensor(true);



        // this will be the death of me, everything seems to be about preventing overlap with matter physics not causing it.
        //this.matter.overlap(boxShape, playerController.matterSprite, this.finishRace, this);




    }

    update (time, delta)
    {
        var matterSprite = playerController.matterSprite;

        /* Updates to have player name follow player */
        this.playerName.x = matterSprite.x - 20;
        this.playerName.y = matterSprite.y - 25;

        let elapsed = this.getTime()-this.start;
        raceTime = elapsed;
        this.raceTime = raceTime;



        /* Update UI Components */
        this.scoreText.setText("Score: " + this.scoreValue);
        this.timeText.setText("Time: " + this.raceTime);



        /* Speed up run/sprint */
        if(cursors.sprint.isDown){
            // modify player run speed for x seconds
            console.log('Player is sprinting');
        }


        /* Use power-up ability */
        if(cursors.ability.isDown){
            // if player has power up, can use & activate power up
            console.log('Player used power-up');
            this.getRaceTime();
            //this.restartLevel(); // Temp debug line
        }


        // Horizontal movement

        var oldVelocityX;
        var targetVelocityX;
        var newVelocityX;

        if (cursors.left.isDown && !playerController.blocked.left)
        {
            smoothedControls.moveLeft(delta);
            matterSprite.anims.play('left', true);

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
            matterSprite.anims.play('right', true);

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
            matterSprite.anims.play('idle', true);
        }

        // Jumping & wall jumping

        // Add a slight delay between jumps since the sensors will still collide for a few frames after
        // a jump is initiated
        var canJump = (time - playerController.lastJumpedAt) > 250;
        if (cursors.up.isDown & canJump)
        {
            //matterSprite.anims.play('jump', true);
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
        updateText();

        //-----------Scrolling Background-------------
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = cam.scrollX * .1;
        this.bg_2.tilePositionX = cam.scrollX * .3;

        }

    restartLevel(){
        console.log('restart level');
        this.scene.start('Test');
    }

    finishRace(){

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

function updateText ()
{
    text.setText([
        'Arrow keys to move. Press "Up" to jump.',
        'You can wall jump!',
        'Click to toggle rendering Matter debug.'
        // 'Debug:',
        // '\tBottom blocked: ' + playerController.blocked.bottom,
        // '\tLeft blocked: ' + playerController.blocked.left,
        // '\tRight blocked: ' + playerController.blocked.right
    ]);
}