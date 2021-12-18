class actorChars extends Phaser.Physics.Matter.Sprite{

    /* Create a Matter Sprite that will follow the player at a random speed within a random distance */
    // This class will serve as the basis for creating NPC rivals for single player races

    followDistance;
    followSpeed;

    constructor(scene, x, y) {
        super(scene.matter.world, x, y);
        scene.add.existing(this);
        this.followDistance = Phaser.Math.Between(10,25);
        this.followSpeed = Phaser.Math.Between(1,4);
    }

    create(){

    }

    update(){

    }

    followPlayer(){

    }
}