class gameSettings extends Phaser.Scene{
    constructor() {
        super('GameSettings');
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

        const titleText = this.add.bitmapText(400, 165, 'arcade', '', 14);
        titleText.setOrigin(0.5);
        titleText.setCenterAlign();
        titleText.setTint('0xFFFFFF');
        titleText.setText(['Game Settings']);

        /* Create menu buttons */

        /* Mute button */
        const muteButton = this.add.image(400, 340, 'muteButton');
        muteButton.setInteractive();
        muteButton.setScale(1.5);
        muteButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        muteButton.on('pointerover', ()=>{
            muteButton.setTint('0xFF00F5');
        });
        muteButton.on('pointerout', ()=>{
            muteButton.clearTint();
        });

        /* Mute all sounds */
        muteButton.on('pointerup', ()=>{
            if(!this.sound.mute){
                this.sound.mute = true;
            }
            else{
                this.sound.mute = false;
            }
        });

        /* Controls button */
        const controlsButton = this.add.image(400, 440, 'controlButton');
        controlsButton.setInteractive();
        controlsButton.setScale(1.5);
        controlsButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        controlsButton.on('pointerover', ()=>{
            controlsButton.setTint('0xFF00F5');
        });
        controlsButton.on('pointerout', ()=>{
            controlsButton.clearTint();
        });

        /* functionality  */
        controlsButton.on('pointerup', ()=>{
            this.scene.launch('Controls');
            this.scene.stop('GameSettings');
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
            this.scene.stop('GameSettings');
        });
    }

    update(){

        /* Change mute button image when game audio is set to mute */

    }

}