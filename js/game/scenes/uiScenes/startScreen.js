class startScreen extends Phaser.Scene {

    /* Semi-static initial scene */

    constructor(){
        super('StartScreen');
    }

    init(){

    }

    preload(){

        /* Load necessary files for scene */
        this.load.image('startButton', 'gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');

    }

    create(){

        /* Add informative text to scene */
        const infoText = this.add.text(140, 150, '--- Click Button To Start ---', {
            font: '30px',
            color: 'white',
            align: 'center',
        });
        infoText.setAlpha(0);

        /* Add blinking effect to text */
        this.tweens.add({
            targets: infoText,
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
            // Change to Main Menu
            this.scene.start('StartUp');
        });

    }

    update(){

    }
}