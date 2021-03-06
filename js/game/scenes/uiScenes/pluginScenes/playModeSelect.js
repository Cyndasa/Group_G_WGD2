class playModeSelect extends Phaser.Scene{
    constructor() {
        super('PlayModeSelect');
    }

    init(){

    }

    preload(){

    }

    create(){

        /* Add title image */
        const titleHeader = this.add.image(400, 75, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        const titleText = this.add.bitmapText(400, 165, 'arcade', '', 14);
        titleText.setOrigin(0.5);
        titleText.setCenterAlign();
        titleText.setTint('0xFFFFFF');
        titleText.setText(['Select Play Mode']);

        /* Create menu buttons */

        /* Single Player button */
        const singlePlayerButton = this.add.image(400, 340, 'singlePlayer');
        singlePlayerButton.setInteractive();
        singlePlayerButton.setScale(1.5);
        singlePlayerButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        singlePlayerButton.on('pointerover', ()=>{
            singlePlayerButton.setTint('0xFF00F5');
        });
        singlePlayerButton.on('pointerout', ()=>{
            singlePlayerButton.clearTint();
        });

        /* Change scene */
        singlePlayerButton.on('pointerup', ()=>{
            isSinglePlayer = true;
            isOnlinePlay = false;
            previousScene = 'PlayModeSelect'; // Set current scene name to previous scene variable
            this.scene.launch('CharacterSelect');
            this.scene.stop('PlayModeSelect');
        });

        /* Multiplayer button */
        const multiPlayerButton = this.add.image(400, 440, 'multiButton');
        multiPlayerButton.setInteractive();
        multiPlayerButton.setScale(1.5);
        multiPlayerButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        multiPlayerButton.on('pointerover', ()=>{
            multiPlayerButton.setTint('0xFF00F5');
        });
        multiPlayerButton.on('pointerout', ()=>{
            multiPlayerButton.clearTint();
        });

        /* Change scene */
        multiPlayerButton.on('pointerup', ()=>{
            isSinglePlayer = false;
            this.scene.launch('MultiplayerModeSelect');
            this.scene.stop('PlayModeSelect');
        });

        /* Return button */
        const returnButton = this.add.image(400, 540, 'returnButton');
        returnButton.setInteractive();
        returnButton.setScale(1.5);
        returnButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        returnButton.on('pointerover', ()=>{
            returnButton.setTint('0xFF00F5');
        });
        returnButton.on('pointerout', ()=>{
            returnButton.clearTint();
        });

        /* Change scene */
        returnButton.on('pointerup', ()=>{
            /*this.scene.launch(previousScene);*/ // Use this if scene can return to multiple scenes
            this.scene.launch('MainMenuButtons');
            this.scene.stop('PlayModeSelect');
        });

    }

    update(){

    }

}