class Controls extends Phaser.Scene {
    constructor() {
        super('Controls');
    }

    init() {

    }

    preload() {

    }

    create() {

        /* Add title image */
        const titleHeader = this.add.image(400, 75, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        this.add.text(250, 150, '----Game Settings----', {
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })
        /*    Text for controls    */

        const text = this.add.bitmapText(400, 300, 'arcade', '', 16 )
            .setOrigin(0.5)
            .setCenterAlign()


        text.setTint('0x438DD0');


        text.setText([
            'Up Arrow - Jump',
            'Right Arrow - Move Right',
            'Left Arrow - Move Left',
            'Spacebar - Use Power Ups',
            'Esc - Escape'
        ]);
        /* Create menu buttons */
        /* Return button */
        const returnButton = this.add.image(400, 540, 'exitButton');
        returnButton.setInteractive();
        returnButton.setScale(1.5);
        returnButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        returnButton.on('pointerover', () => {
            returnButton.setTint('0xFF00F5');
        });
        returnButton.on('pointerout', () => {
            returnButton.clearTint();
        });

        /* Change scene */
        returnButton.on('pointerup', () => {
            /*this.scene.launch(previousScene);*/ // Use this if scene can return to multiple scenes
            this.scene.launch('GameSettings');
            this.scene.stop('Controls');
        });
    }

    update() {

        /* Change mute button image when game audio is set to mute */

    }
}

