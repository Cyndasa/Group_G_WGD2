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


    constructor(scene, x, y, character, playerControls) {
        super(scene.matter.world, x, y, playerCharacter);
        scene.add.existing(this);
        this.selectedChar = character;
        this.cursors = scene.playerControls[playerControls];

        switch(character){
            case 'HeadsTheFox':
                this.runSpeed = 3;
                this.sprintSpeed = 6;
                this.jumpHeight = 6;
                this.staminaDuration = 8;

                break;
            case 'otherChar':
                this.runSpeed = 4;
                this.sprintSpeed = 6;
                this.jumpHeight = 4;
                this.staminaDuration = 2;

                break;
            default:
                this.runSpeed = 3;
                this.sprintSpeed = 5;
                this.jumpHeight = 6;
                this.staminaDuration = 8;

        }

        console.log('Player ' + playerCharacter + ' is here!');

    }

    create(){

    }

    update(){

    };

    playerMovement(){

        /* Move Left */
        if(this.cursors.left.isDown){
            /* Sprint while player has stamina */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0){
                console.log('Sprinting left');
                this.setVelocityX(-this.sprintSpeed);
                this.reduceStamina(); // Reduce stamina while sprinting
            }
            /* If player has no stamina, can't sprint */
            else if(this.cursors.sprint.isDown && this.staminaDuration <= 0){
                console.log('You have no stamina you cant sprint');
                this.setVelocityX(-this.runSpeed);
            }
            else{
                console.log('Running left');
                this.setVelocityX(-this.runSpeed);
                this.recoverStamina(); // Recover player stamina while not sprinting
            }
        }
        /* Move Right */
        else if(this.cursors.right.isDown){
            /* Sprint while player has stamina */
            if(this.cursors.sprint.isDown && this.staminaDuration > 0){
                console.log('Sprinting right');
                this.setVelocityX(this.sprintSpeed);
                this.reduceStamina(); // Reduce stamina while sprinting
            }
            /* If player has no stamina, can't sprint */
            else if(this.cursors.sprint.isDown && this.staminaDuration <= 0){
                console.log('You have no stamina you cant sprint');
                this.setVelocityX(this.runSpeed);
            }
            else{
                console.log('Running right');
                this.setVelocityX(this.runSpeed);
                this.recoverStamina(); // Recover player stamina while not sprinting
            }
        }

        /* Player Jump */
        if (this.cursors.up.isDown){
            this.setVelocityY(-this.jumpHeight);
        }
    };

    useAbility(){
        // If player has ability use it
    }

    reduceStamina(){
        // Reduce player stamina until it reaches zero
    };

    recoverStamina(){
        // Recover player stamina to max value while not trying to sprint
    };


}