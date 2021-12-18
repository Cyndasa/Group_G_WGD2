class startScreen extends Phaser.Scene {

    /* Semi-static initial scene */

    constructor(){
        super('StartScreen');
    };

    init(){

    };

    preload(){

        /* Load necessary files for scene */
        this.load.image('startButton', 'gameAssets/imageAssets/uiImages/Buttons/Start/Start-Unclicked.png');
        this.load.bitmapFont('arcade', 'gameAssets/imageAssets/fonts/arcade.png', 'gameAssets/imageAssets/fonts/arcade.xml');

    };

    create(){

        /* Add informative text to scene */
        const startText = this.add.bitmapText(400, 145, 'arcade', '', 24);
        startText.setOrigin(0.5);
        startText.setCenterAlign();
        startText.setTint('0xFFFFFF');
        startText.setText(['--- Click Button To Start ---']);
        startText.setAlpha(0);

        /* Add blinking effect to text */
        this.tweens.add({
            targets: startText,
            alpha: {value: 1, duration: 1500, ease: 'Power1', delay: 1000},
            yoyo: true,
            loop: -1,
        });

        /* Create button to move to next scene */
        const startButton = this.add.image(400, 350, 'startButton');
        startButton.setInteractive();
        startButton.setScale(2);

        /* Change colour of image when hovered over/ off */
        startButton.on('pointerover', ()=>{
            startButton.setTint('0xFF00F5');
        });
        startButton.on('pointerout', ()=>{
            startButton.clearTint();
        })

        /* Change scene when clicked */
        startButton.on("pointerup",()=>{
            this.scene.start('StartUp');
            this.scene.stop('StartScreen');
        });

    };

    update(){

    };
}