class Collectible extends Phaser.Physics.Matter.Sprite{

/* Collectible Prefab */

    /* Declare Variables */

    /* Constructor for placing object in scene */
    constructor(scene, x, y,) {
        super(scene.matter.world, x, y, "collectible");
        scene.add.existing(this);

    }

    create(){
        console.log("The Collectible Exists"); // Debug Line, comment out or delete
    }

    update(){
    }

}