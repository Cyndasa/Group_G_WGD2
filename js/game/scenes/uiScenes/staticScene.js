class staticScene extends Phaser.Scene {

    /* Semi-static initial scene */

    constructor(){
        super('StaticScene');
    }

    init(){

    }

    preload(){

        /* Load necessary files for scene */

    }

    create(){

        /* Add informative text to scene */
        const infoText = this.add.text(190, 150, '--- Click Button To Start ---', {
            font: '25px',
            align: 'centre',
            color: 'white',
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
        const startButton = this.add.image(400, 300, 'play');
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
            this.scene.start('Menu');
        });

    }

    update(){

    }

}

