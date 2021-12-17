class PlayerManager extends Phaser.Physics.Matter.Sprite {

    // Create variables
    selectedChar;
    cursors;
    runSpeed;
    sprintSpeed;
    jumpHeight;
    staminaDuration;


    constructor(scene, x, y, character, controlScheme) {
        super(scene.matter.world, x, y, playerCharacter, playerControls);
        scene.add.existing(this);
        this.selectedChar = character;
        this.cursors = playerControls[controlScheme];

        switch(character){
            case 'HeadsTheFox':

                break;
            case 'otherChar':

                break;
            default:


        }

    }

    create(){
        console.log('the player is born');
    };

    update(){

    };


}