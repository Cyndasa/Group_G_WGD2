class PlayerManager extends Phaser.Physics.Matter.Sprite{
/* Player prefab which should be useful for later version(s) of game*/

    /* Declare Variables */


    /* Constructor for placing player character into a scene */
    constructor(scene, x, y,) {
        super(scene, x, y, );


    };

    create(){
        console.log("The Player Lives"); // Debug Line, comment out or delete
    };

    update(){
        console.log("The Player Thinks & Acts"); // Debug Line, comment out or delete

    };

    /* Update sprite animation of player character */
    updateAnimation(){

    };

    /* Use collected power-up ability */
    useAbility(){
        console.log('The Player Uses A Power'); // Debug Line, comment out or delete

    }

    /* Set collision function for collision with Collectible */
    collectItem(player, collectObj){
        console.log('Collected' + collectObj + ' '); // Debug Line, comment out or delete
    };


    /* Calculate final score for player */
    finalScoreCalculation(){
    };

}