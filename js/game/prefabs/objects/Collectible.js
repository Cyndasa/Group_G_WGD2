class Collectible extends Phaser.Physics.Arcade.Sprite{

/* Collectible Prefab */

    /* Declare Variables */

    /* Constructor for placing object in scene */
    constructor(scene, x, y,) {
        super(scene, x, y, "collectible");

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);

    }

    create(){
        console.log("The Collectible Exists"); // Debug Line, comment out or delete
    }

    update(){
    }

}