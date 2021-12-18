class multiplayerModeSelect extends Phaser.Scene{
    constructor() {
        super('MultiplayerModeSelect');
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
        this.add.text(250, 150, '----Multiplayer Mode----',{
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /* Create menu buttons */

        /* Local play button */
        const localPlayButton = this.add.image(400, 340, 'localButton');
        localPlayButton.setInteractive();
        localPlayButton.setScale(1.5);
        localPlayButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        localPlayButton.on('pointerover', ()=>{
            localPlayButton.setTint('0xFF00F5');
        });
        localPlayButton.on('pointerout', ()=>{
            localPlayButton.clearTint();
        });

        /* Change scene */
        localPlayButton.on('pointerup', ()=>{
            isOnlinePlay = false;
            previousScene = 'MultiplayerModeSelect'; // Set current scene name to previous scene variable
            this.scene.launch('CharacterSelect');
            this.scene.stop('MultiplayerModeSelect');
        });

        /* Online play button */
        const onlinePlayButton = this.add.image(400, 440, 'onlinePlay');
        onlinePlayButton.setInteractive();
        onlinePlayButton.setScale(1.5);
        onlinePlayButton.setScrollFactor(0);

        /* Apply tint to image when hovered over/ off */
        onlinePlayButton.on('pointerover', ()=>{
            onlinePlayButton.setTint('0xFF00F5');
        });
        onlinePlayButton.on('pointerout', ()=>{
            onlinePlayButton.clearTint();
        });

        /* Change scene */
        onlinePlayButton.on('pointerup', ()=>{
            isOnlinePlay = true;
            previousScene = 'MultiplayerModeSelect'; // Set current scene name to previous scene variable
            this.scene.launch('CharacterSelect');
            this.scene.stop('MultiplayerModeSelect');
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
            this.scene.launch('PlayModeSelect');
            this.scene.stop('MultiplayerModeSelect');
        });

    }
    update(){

    }
}