class Collectible extends Phaser.Physics.Matter.Sprite{

    //Similar to playerManager comment

/* Collectible Prefab */

    /* Declare Variables */

    /* Constructor for placing object in scene */
    constructor(scene, x, y,) {
        super(scene.matter.world, x, y);
        scene.add.existing(this);
        this.setStatic(true);
        this.setTexture('powerUpsSheet');
        this.anims.play('powerUps');


    }

    create(){
        console.log("The Collectible Exists"); // Debug Line, comment out or delete
    }

    update(){
    }

}