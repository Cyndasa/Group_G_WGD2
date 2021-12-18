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
        this.add.text(250, 150, '----Game Controls----', {
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /*   Original Text for controls    */
/*        const text = this.add.bitmapText(400, 300, 'arcade', '', 16 )
            .setOrigin(0.5)
            .setCenterAlign()
        text.setTint('0x438DD0');
        text.setText([
            'Up Arrow - Jump',
            'Right Arrow - Move Right',
            'Left Arrow - Move Left',
            'Spacebar - Use Power Ups',
            'Esc - Escape'
        ]);*/

        this.add.rectangle(400, 300, 800, 250, 0x000000, 0.4); // Create an semi-transparent box for controls

        /* Control Set 1 */
        const playerOneControls = this.add.bitmapText(200, 300, 'arcade', '', 16);
        playerOneControls.setOrigin(0.5);
        playerOneControls.setCenterAlign();
        playerOneControls.setTint('0xFFFFFF');
        playerOneControls.setText([
            'Player One',
            ' ',
            'Up Arrow - Jump',
            'Left Arrow - Move Left',
            'Right Arrow - Move Right',
            'K Key - Sprint',
            'L Key - Use Power-Up',
            'Space Bar - Pause Game'
        ]);

        /* Control Set 2 */
        const playerTwoControls = this.add.bitmapText(600, 300, 'arcade', '', 16);
        playerTwoControls.setOrigin(0.5);
        playerTwoControls.setCenterAlign();
        playerTwoControls.setTint('0xFFFFFF');
        playerTwoControls.setText([
            'Player Two',
            ' ',
            'W Key - Jump',
            'A Key - Move Left',
            'D Key - Move Right',
            'R Key - Sprint',
            'T Key - Use Power-Up',
            'Space Bar - Pause Game'
        ]);

/*
       // Different key bindings for player options - 0 is default
       // Eventually make it possible for single players to select preferred control scheme
       playerControls[0] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'sprint': Phaser.Input.Keyboard.KeyCodes.K,
            'ability': Phaser.Input.Keyboard.KeyCodes.L
        });
        playerControls[1] = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'sprint': Phaser.Input.Keyboard.KeyCodes.R,
            'ability': Phaser.Input.Keyboard.KeyCodes.T
        });
*/

        /* Create menu buttons */
        /* Return button */
        const returnButton = this.add.image(400, 540, 'returnButton');
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

