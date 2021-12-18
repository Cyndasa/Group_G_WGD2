class mainMenuButtons extends Phaser.Scene{
    constructor() {
        super('MainMenuButtons');
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

        /* Temporary text to mark scene - can be commented out for submission if desired */
        const titleText = this.add.bitmapText(400, 165, 'arcade', '', 14);
        titleText.setOrigin(0.5);
        titleText.setCenterAlign();
        titleText.setTint('0xFFFFFF');
        titleText.setText(['Main Menu']);

        /* Create menu buttons */

        /* Profile button */
        const profileButton = this.add.image(400, 240, 'profileButton');
        profileButton.setInteractive();
        profileButton.setScale(1.5);
        profileButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        profileButton.on('pointerover', ()=>{
            profileButton.setTint('0xFF00F5');
        });
        profileButton.on('pointerout', ()=>{
            profileButton.clearTint();
        });

        /* Change scene */
        profileButton.on('pointerup', ()=>{
            this.scene.launch('PlayerProfile');
            this.scene.stop('MainMenuButtons');
        });

        /* Play button */
        const playButton = this.add.image(400, 340, 'playButton');
        playButton.setInteractive();
        playButton.setScale(1.5);
        playButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        playButton.on('pointerover', ()=>{
            playButton.setTint('0xFF00F5');
        });
        playButton.on('pointerout', ()=>{
            playButton.clearTint();
        });

        /* Change scene */
        playButton.on('pointerup', ()=>{
            this.scene.launch('PlayModeSelect');
            this.scene.stop('MainMenuButtons');
        });

        /* Game options button */
        const optionsButton = this.add.image(400, 440, 'optionsButton');
        optionsButton.setInteractive();
        optionsButton.setScale(1.5);
        optionsButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        optionsButton.on('pointerover', ()=>{
            optionsButton.setTint('0xFF00F5');
        });
        optionsButton.on('pointerout', ()=>{
            optionsButton.clearTint();
        });

        /* Change scene */
        optionsButton.on('pointerup', ()=>{
            this.scene.launch('GameSettings');
            this.scene.stop('MainMenuButtons');
        });

        /* Exit button */
        const exitButton = this.add.image(400, 540, 'exitButton');
        exitButton.setInteractive();
        exitButton.setScale(1.5);
        exitButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        exitButton.on('pointerover', ()=>{
            exitButton.setTint('0xFF00F5');
        });
        exitButton.on('pointerout', ()=>{
            exitButton.clearTint();
        });

        /* Change scene */
        exitButton.on('pointerup', ()=>{
            this.sound.stopAll();
            // Possibly include clearing cache/saving user details
            this.scene.stop('MainMenu');
            this.scene.stop('MainMenuButtons');
            this.scene.start('StartScreen');
        });

        /* Small Credits button off to side */

        console.log(playerUsername); // DEBUG, CAN REMOVE FOR SUBMISSION

    }
}