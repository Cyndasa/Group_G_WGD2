class Collectible extends Phaser.Physics.Matter.Sprite{

/* Collectible Prefab, serves as basis to Power Ups */

    /* Declare Variables */


    /* Constructor for placing object in scene */
    constructor(scene, x, y,) {
        super(scene.matter.world, x, y);
        scene.add.existing(this);
        this.setStatic(true);
        this.setTexture('powerUpsSheet');
        this.anims.play('powerUps');
        this.setFixedRotation(); // Sets max inertia to prevent rotation
        this.setPosition(x, y);


    }

    create(){
        console.log("The Collectible Exists"); // Debug Line, comment out or delete
    }

    update(){
        if(this.body.disabled){
            // Set timer for 5 seconds
            this.body.enable();
        }


    }

}