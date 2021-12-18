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
                this.jumpHeight = 6;
                this.staminaDuration = 2;
                // Display/Animation
                this.char = 'aztecOne';
                this.charKeyIdle = 'aztec1Idle';
                this.charKeyRun = 'aztec1Run';
                this.charKeyJump = 'aztec1Jump';

                break;
            default:
                // Stats
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 6;
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
            friction: 0.01,
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
        if(this.cursors.left.isDown){

            this.flipX = true; // Make character face left

            /* Sprint while player has stamina */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0){
                //console.log('Sprinting left');
                this.setVelocityX(-this.sprintSpeed);
                this.anims.play(this.charKeyRun, true);
                this.reduceStamina(); // Reduce stamina while sprinting
            }

            /* If player has no stamina, can't sprint */
            else if(this.cursors.sprint.isDown && this.staminaDuration <= 0){
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
        else if(this.cursors.right.isDown){

            this.flipX = false; // Make character face right

            /* Sprint while player has stamina */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0){
                //console.log('Sprinting right');
                this.setVelocityX(this.sprintSpeed);
                this.anims.play(this.charKeyRun, true);
                this.reduceStamina(); // Reduce stamina while sprinting
            }
            /* If player has no stamina, can't sprint */
            else if(this.cursors.sprint.isDown && this.staminaDuration <= 0){
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

            if (this.blocked.bottom === true) {
                this.setVelocityY(-this.jumpHeight);
                this.lastJumpedAt = time;
                this.anims.play(this.charKeyJump, true);
            }

            else if (this.blocked.left === true) {
                this.setVelocityY(-this.jumpHeight);
                this.setVelocityX(this.runSpeed);
                this.lastJumpedAt = time
                this.anims.play(this.charKeyJump, true);
                this.flipX = false;
            }

            else if (this.blocked.right === true) {
                this.setVelocityY(-this.jumpHeight);
                this.setVelocityX(-this.runSpeed);
                this.lastJumpedAt = time
                this.anims.play(this.charKeyJump, true);
                this.flipX = true;
            }
        }

    };

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