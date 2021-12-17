class PlayerManager extends Phaser.Physics.Matter.Sprite {

    // Not sure if this should maybe be Phaser.Class and the matter sprite a part of it

    // Create variables
    selectedChar;
    cursors;
    runSpeed;
    sprintSpeed;
    jumpHeight;
    staminaDuration;
    hasPowerUp = false;
    matterSprite;
    isDefault = false;


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
                this.jumpHeight = 6;
                this.staminaDuration = 8;
                // Display/Animation
                this.char = 'headsFox';
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';

                break;
            case 'otherChar':
                // Stats
                this.runSpeed = 4;
                this.sprintSpeed = 5;
                this.jumpHeight = 4;
                this.staminaDuration = 2;
                // Display/Animation
                this.char = 'headsFox';
                this.charKeyIdle = 'headsIdle';
                this.charKeyRun = 'headsRun';
                this.charKeyJump = 'headsJump';

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

        console.log('Player ' + playerCharacter + ' is here!');

        this.anims.play(this.charKeyIdle, true); // Play idle animation on load

        /* Create player compound body */


    }

    update(){

    };

    playerMovement(){

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

        /* Player Jump */
        if (this.cursors.up.isDown){
            this.setVelocityY(-this.jumpHeight);
            this.anims.play(this.charKeyJump, true);
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
    }

    reduceStamina(){
        // Reduce player stamina until it reaches zero
    };

    recoverStamina(){
        // Recover player stamina to max value while not trying to sprint
    };


}