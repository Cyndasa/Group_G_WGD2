class actorChars extends Phaser.Physics.Matter.Sprite{

    /* Create a Matter Sprite that will follow the player at a random speed within a random distance */
    // This class will serve as the basis for creating NPC rivals for single player races

    followDistance;
    followSpeed;
    target;
    chooseSprite;
    mySprite;
    animKeyIdle;
    animKeyRun;
    animKeyJump;
    isDefault;

    /* Copied from Player Manager */
    matterSprite;
    isDefault = false;
    blocked = {
        left: false,
        right: false,
        bottom: false
    };
    numTouching = {
        left: 0,
        right: 0,
        bottom: 0,
    };
    sensors = {
        left: null,
        right: null,
        bottom: null
    };
    myMatter = Phaser.Physics.Matter.Matter;
    myWidth = this.width;
    myHeight = this.height;
    sx = this.myWidth/2; // Move sensor to player center
    sy = this.myHeight/2; // Move sensor to player center
    myBody;
    myCompoundBody;

    constructor(scene, x, y) {
        super(scene.matter.world, x, y);
        scene.add.existing(this);
        this.followDistance = Phaser.Math.Between(5,25);
        this.followSpeed = Phaser.Math.Between(1,6);
        this.chooseSprite = Phaser.Math.Between(1, 8)
        switch(this.chooseSprite){
            case 1:
                this.mySprite = 'headsFox';
                this.animKeyIdle = 'headsIdle';
                this.animKeyRun = 'headsRun';
                this.animKeyJump = 'headsJump';
                break;

            case 2:
                this.mySprite = 'aztecOne';
                this.animKeyIdle = 'aztec1Idle';
                this.animKeyRun = 'aztec2Run';
                this.animKeyJump = 'aztec3Jump';
                break;

            case 3:
                this.mySprite = 'aztecTwi';
                this.animKeyIdle = 'aztec2Idle';
                this.animKeyRun = 'aztec2Run';
                this.animKeyJump = 'aztec2Jump';
                break;

            case 4:
                this.mySprite = 'aztecThree';
                this.animKeyIdle = 'aztec3Idle';
                this.animKeyRun = 'aztec3Run';
                this.animKeyJump = 'aztec3Jump';
                break;

            case 5:
                this.mySprite = 'aztecFour';
                this.animKeyIdle = 'aztec4Idle';
                this.animKeyRun = 'aztec4Run';
                this.animKeyJump = 'aztec4Jump';
                break;

            case 6:
                this.mySprite = 'theDude';
                this.animKeyIdle = 'theDudeIdle';
                this.animKeyRun = 'theDudeRun';
                this.animKeyJump = 'theDudeJump';
                break;

            case 7:
                this.mySprite = 'theOwlet';
                this.animKeyIdle = 'theOwletIdle';
                this.animKeyRun = 'theOwletRun';
                this.animKeyJump = 'theOwletJump';
                break;

            case 8:
                this.mySprite = 'thePinkMon';
                this.animKeyIdle = 'thePinkMonIdle';
                this.animKeyRun = 'thePinkMonRun';
                this.animKeyJump = 'thePinkMonJump';
                break;

            default:
                this.isDefault = true;
        }
        if(this.isDefault === true){
            this.setTexture('headsFox').setTint('0x00F4FF');
        }
        else{
            this.setTexture(this.mySprite)
        }

        this.anims.play(this.animKeyIdle, true); // Play idle by default

        /* Create compound body - copied from Player Manager */
        this.myBody = this.myMatter.Bodies.rectangle(this.sx, this.sy, this.myWidth * 0.75, this.myHeight, {
            chamfer: {
                radius: 10}}
        );
        this.sensors.bottom = this.myMatter.Bodies.rectangle(this.sx, this.myHeight, this.sy, 5, {
            isSensor: true
        });
        this.sensors.left = this.myMatter.Bodies.rectangle(this.sx - this.myWidth * 0.45, this.sy, 5, this.myHeight * 0.25, {
            isSensor: true
        });
        this.sensors.right = this.myMatter.Bodies.rectangle(this.sx + this.myWidth * 0.45, this.sy, 5, this.myHeight * 0.25, {
            isSensor: true
        });

        this.myCompoundBody = this.myMatter.Body.create({
            parts: [
                this.myBody, this.sensors.bottom, this.sensors.left, this.sensors.right
            ],
            friction: 0.1,
            restitution: 0.05 // Prevent body from sticking against walls
        });

        this.setExistingBody(this.myCompoundBody);
        this.setFixedRotation(); // Sets max inertia to prevent rotation
        this.setPosition(x, y);


    };

    create(){

    };

    update(){

    };

    chasePlayer(){
        if(this.target.body.x - this.myBody.x <= this.followDistance){
            this.setVelocityX(this.followSpeed);
            this.setFlipX(false);
        }
        else if (this.target.body.x - this.myBody.x >= this.followDistance){
            this.setVelocityX(-this.followSpeed);
            this.setFlipX(true)
        }
    };


}