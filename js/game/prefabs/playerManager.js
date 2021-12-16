class PlayerManager extends Phaser.Physics.Matter.Sprite(){
/* Player prefab which should be useful for later version(s) of game*/

    /* Declare Variables */
    // Selected Character
    // Score
    // Race Time
    // Selected Player Controls
    // Use Power Up
    //

    matterSprite;
    blocked;
    numTouching;
    sensors;
    time;
    lastJumpedAt;
    moveSpeed;
    jumpHeight;
    selectedCharacter;


    /* Constructor for placing player character into a scene */
    constructor(scene, x, y, character, controlScheme) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        this.cursors = playerControls[controlScheme];



        switch(character){
            case 'headsFox':
                this.moveSpeed = 3;
                this.jumpHeight = 6;

                break;
            case 'newChar':
                this.moveSpeed = 4;
                this.jumpHeight = 4;

                break;
            default:
                this.selectedCharacter = 'headsFox';
                this.moveSpeed = 3;
                this.jumpHeight = 6;
                // Add a tint to character sprite


        }




    };

    create(){
    };

    update(){

        if (this.cursors.right.isDown){
            this.setVelocityX(this.moveSpeed);
            this.anims.play('right');
        }
        else if(this.cursors.left.isDown){
            this.setVelocityX(this.moveSpeed);
            this.anims.play('left');
        }
        else{
            this.anims.play('idle');
        }

        if(this.cursors.up.isDown){
            this.setVelocityY(-this.jumpHeight);
            this.anims.play('jump');
        }

        if(this.cursors.sprint.isDown){
            this.moveSpeed *= 2;
        }

    };

    /* Update sprite animation of player character */
    updateAnimation(){

    };

    /* Smooth Movement */

    /* Use collected power-up ability */
    useAbility(){

    }

    /* Set collision function for collision with Collectible */
    collectItem(player, collectObj){
        console.log('Collected' + collectObj + ' '); // Debug Line, comment out or delete

    };


    /* Calculate final score for player */
    finalScoreCalculation(){

    };

}