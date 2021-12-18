class PlayerManager extends Phaser.Physics.Matter.Sprite {
    // Class for creating a player character in game level.

    // Create variables
    selectedChar;
    cursors;
    runSpeed;
    sprintSpeed;
    jumpHeight;
    canJump;
    lastJumpedAt = 0;
    staminaDuration;
    hasPowerUp = false;
    matterSprite;
    isDefault = false;
    blocked = {
        left: false,
        right: false,
        bottom: false
    };
    numTouching = {
        left: 0,
        right: 0,
        bottom: 0,
    };
    sensors = {
        left: null,
        right: null,
        bottom: null
    };
    myMatter = Phaser.Physics.Matter.Matter;
    myWidth = this.width;
    myHeight = this.height;
    sx = this.myWidth/2; // Move sensor to player center
    sy = this.myHeight/2; // Move sensor to player center
    myBody;
    myCompoundBody;


    constructor(scene, x, y, character, playerControls) {
        super(scene.matter.world, x, y, playerCharacter);
        scene.add.existing(this);
        this.selectedChar = character;
        this.cursors = scene.playerControls[playerControls];

        /* Use switch statement that uses player's selection to create character and set stats. */
        switch(character){
            case 'HeadsTheFox':
                // Stats
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 7;
                this.staminaDuration = 8;
                // Display/Animation
                this.char = 'headsFox';
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';

                break;
            case 'AztecOne':
                // Stats
                this.runSpeed = 4;
                this.sprintSpeed = 5;
                this.jumpHeight = 5;
                this.staminaDuration = 2;
                // Display/Animation
                this.char = 'aztecOne';
                this.charKeyIdle = 'aztec1Idle';
                this.charKeyRun = 'aztec1Run';
                this.charKeyJump = 'aztec1Jump';

                break;
            case 'AztecTwo':
                // Stats
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 6;
                this.staminaDuration = 3;
                // Display/Animation
                this.char = 'aztecTwo';
                this.charKeyIdle = 'aztec2Idle';
                this.charKeyRun = 'aztec2Run';
                this.charKeyJump = 'aztec2Jump';

                break;
            case 'AztecThree':
                // Stats
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 7;
                this.staminaDuration = 7;
                // Display/Animation
                this.char = 'aztecThree';
                this.charKeyIdle = 'aztec3Idle';
                this.charKeyRun = 'aztec3Run';
                this.charKeyJump = 'aztec3Jump';

                break;
            case 'AztecFour':
                // Stats
                this.runSpeed = 5;
                this.sprintSpeed = 6;
                this.jumpHeight = 5;
                this.staminaDuration = 1;
                // Display/Animation
                this.char = 'aztecFour';
                this.charKeyIdle = 'aztec4Idle';
                this.charKeyRun = 'aztec4Run';
                this.charKeyJump = 'aztec4Jump';

                break;
            case 'TheDude':
                // Stats
                this.runSpeed = 2;
                this.sprintSpeed = 7;
                this.jumpHeight = 8;
                this.staminaDuration = 5;
                // Display/Animation
                this.char = 'theDude';
                this.charKeyIdle = 'theDudeIdle';
                this.charKeyRun = 'theDudeRun';
                this.charKeyJump = 'theDudeJump';

                break;
            case 'TheOwlet':
                // Stats
                this.runSpeed = 4;
                this.sprintSpeed = 6;
                this.jumpHeight = 9;
                this.staminaDuration = 4;
                // Display/Animation
                this.char = 'theOwlet';
                this.charKeyIdle = 'theOwletIdle';
                this.charKeyRun = 'theOwletRun';
                this.charKeyJump = 'theOwletJump';

                break;
            case 'ThePinkMon':
                // Stats
                this.runSpeed = 6;
                this.sprintSpeed = 7;
                this.jumpHeight = 8;
                this.staminaDuration = 5;
                // Display/Animation
                this.char = 'thePinkMon';
                this.charKeyIdle = 'thePinkMonIdle';
                this.charKeyRun = 'thePinkMonRun';
                this.charKeyJump = 'thePinkMonJump';

                break;
            default:
                // Stats
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 7;
                this.staminaDuration = 8;
                // Display/Animation
                this.char = 'headsFox';
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';
                // Other
                this.isDefault = true;
        }

        /* If player has not selected a character/ or has been fault resulting in switch being default, create tinted character */
        if (this.isDefault === true){
            this.setTexture(this.char).setTint('0x00F4FF');
        }
        else{
            this.setTexture(this.char);
        }

        //console.log('Player ' + playerCharacter + ' is here!');

        this.anims.play(this.charKeyIdle, true); // Play idle animation on load

        /* Create player compound body */
        //  - playerBody is the solid body that will physically interact with the world. It has a
        //    chamfer (rounded edges) to avoid the problem of ghost vertices: http://www.iforce2d.net/b2dtut/ghost-vertices
        //  - Left/right/bottom sensors that will not interact physically but will allow us to check if
        //    the player is standing on solid ground or pushed up against a solid object.

        this.myBody = this.myMatter.Bodies.rectangle(this.sx, this.sy, this.myWidth * 0.75, this.myHeight, {
            chamfer: {
                radius: 10}}
        );
        this.sensors.bottom = this.myMatter.Bodies.rectangle(this.sx, this.myHeight, this.sy, 5, {
            isSensor: true
        });
        this.sensors.left = this.myMatter.Bodies.rectangle(this.sx - this.myWidth * 0.45, this.sy, 5, this.myHeight * 0.25, {
            isSensor: true
        });
        this.sensors.right = this.myMatter.Bodies.rectangle(this.sx + this.myWidth * 0.45, this.sy, 5, this.myHeight * 0.25, {
            isSensor: true
        });

        this.myCompoundBody = this.myMatter.Body.create({
            parts: [
                this.myBody, this.sensors.bottom, this.sensors.left, this.sensors.right
            ],
            friction: 0.1,
            restitution: 0.05 // Prevent body from sticking against walls
        });

        this.setExistingBody(this.myCompoundBody);
        this.setFixedRotation(); // Sets max inertia to prevent rotation
        this.setPosition(x, y);


    };

    update(){

    };

    playerMovement(time){

        /* Move Left */
        if(this.cursors.left.isDown && !this.blocked.left){

            this.flipX = true; // Make character face left

            /* Sprint while player has stamina and is touching the ground */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0 && this.blocked.bottom === true){
                //console.log('Sprinting left');
                this.setVelocityX(-this.sprintSpeed);
                this.anims.play(this.charKeyRun, true);
                this.reduceStamina(); // Reduce stamina while sprinting
            }
            /* If player has no stamina or isn't touching the ground, can't sprint */
            else if((this.cursors.sprint.isDown && this.staminaDuration <= 0) ||
                (this.cursors.sprint.isDown && this.blocked.bottom === false)){
                //console.log('You have no stamina you cant sprint');
                this.setVelocityX(-this.runSpeed);
                this.anims.play(this.charKeyRun, true);
            }
            /* If player isn't attempting to sprint, recover stamina while moving */
            else{
                //console.log('Running left');
                this.setVelocityX(-this.runSpeed);
                this.anims.play(this.charKeyRun, true);
                this.recoverStamina(); // Recover player stamina while not sprinting
            }
        }

        /* Move Right */
        else if(this.cursors.right.isDown && !this.blocked.right){

            this.flipX = false; // Make character face right

            /* Sprint while player has stamina */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0 && this.blocked.bottom === true){
                //console.log('Sprinting right');
                this.setVelocityX(this.sprintSpeed);
                this.anims.play(this.charKeyRun, true);
                this.reduceStamina(); // Reduce stamina while sprinting
            }
            /* If player has no stamina, or isn't touching ground can't sprint */
            else if((this.cursors.sprint.isDown && this.staminaDuration <= 0) ||
                (this.cursors.sprint.isDown && this.blocked.bottom === false)){
                //console.log('You have no stamina you cant sprint');
                this.setVelocityX(this.runSpeed);
                this.anims.play(this.charKeyRun, true);
            }
            else{
                //console.log('Running right');
                this.setVelocityX(this.runSpeed);
                this.anims.play(this.charKeyRun, true);
                this.recoverStamina(); // Recover player stamina while not sprinting
            }
        }

        /* Set idle animation */
        else{
            this.anims.play(this.charKeyIdle, true);
        }

        /* Player Jump */
        this.canJump = (time - this.lastJumpedAt) > 300;
        if (this.cursors.up.isDown && this.canJump) {

            this.anims.play(this.charKeyJump, true);
            if (this.blocked.bottom === true) {
                this.setVelocityY(-this.jumpHeight);
                this.lastJumpedAt = time;
                //this.anims.play(this.charKeyJump, true);
            }

            else if (this.blocked.left === true) {
                this.setVelocityY(-this.jumpHeight);
                this.setVelocityX(this.runSpeed);
                this.lastJumpedAt = time
                //this.anims.play(this.charKeyJump, true);
                this.flipX = false;
            }

            else if (this.blocked.right === true) {
                this.setVelocityY(-this.jumpHeight);
                this.setVelocityX(-this.runSpeed);
                this.lastJumpedAt = time
                //this.anims.play(this.charKeyJump, true);
                this.flipX = true;
            }
        }

    };

    collectPowerUp(player, collectable){
        console.log('player has ollided with a power up');
        player.hasPowerUp += 1; // Debug check
        collectable.disableBody(true, true);

        if(player.hasPowerUp === true){
            collectable.disableBody(true, true);
        }
        else if(player.hasPowerUp === false){
            player.hasPowerUp = true;
            collectable.disableBody(true, true);
        }

        //play collect sound

    }

    useAbility(){
        // If player has ability use it
        if (this.cursors.ability.isDown && this.hasPowerUp === true){
            console.log('Player used power-up');
            // remove power up
            // this.hasPowerUp = false
        }
        else if(this.cursors.ability.isDown && this.hasPowerUp === false){
            console.log('You dont have a power-up to use');
        }
    };

    reduceStamina(){
        // Reduce player stamina until it reaches zero
    };

    recoverStamina(){
        // Recover player stamina to max value while not trying to sprint
    };


}