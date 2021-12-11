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

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        this.add.text(250, 150, '----Game Settings----',{
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

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

        /* TBD button */
        const tbdButton = this.add.image(400, 440, 'unMuteButton');
        tbdButton.setInteractive();
        tbdButton.setScale(1.5);
        tbdButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        tbdButton.on('pointerover', ()=>{
            tbdButton.setTint('0xFF00F5');
        });
        tbdButton.on('pointerout', ()=>{
            tbdButton.clearTint();
        });

        /* functionality  */
        tbdButton.on('pointerup', ()=>{

        });

        /* Return button */
        const returnButton = this.add.image(400, 540, 'exitButton');
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