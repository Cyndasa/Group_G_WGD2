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

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        this.add.text(250, 150, '----Main Menu----',{
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /* Create menu buttons */

        /* Profile button */
        const profileButton = this.add.image(400, 240, 'playButton');
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
            this.scene.start('StartScreen');
        });

        console.log(playerUsername); // DEBUG, CAN REMOVE FOR SUBMISSION

    }
}