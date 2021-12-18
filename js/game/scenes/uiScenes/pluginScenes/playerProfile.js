class playerProfile extends Phaser.Scene{
    constructor() {
        super('PlayerProfile');
    }

    init(){

    }

    preload(){

    }

    create(){

        this.add.rectangle(400, 325, 800, 300, 0x000000, 0.4); // Create an semi-transparent box for controls


        /* Add title image */
        const titleHeader = this.add.image(400, 75, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        const titleText = this.add.bitmapText(400, 165, 'arcade', '', 14);
        titleText.setOrigin(0.5);
        titleText.setCenterAlign();
        titleText.setTint('0xFFFFFF');
        titleText.setText(['Player Profile']);

        /* Create menu buttons */

        /* Player username */
/*        this.viewPlayerName = this.add.text (200, 225, '   Username: ' + playerUsername + '    ', {
            font: '30px',
            color: 'white',
            backgroundColor: 'darkblue',
        })*/

        /* Player username */
        const playerUsernameText = this.add.bitmapText(400, 200, 'arcade', '', 22);
        playerUsernameText.setOrigin(0.5);
        playerUsernameText.setCenterAlign();
        playerUsernameText.setTint('0xFFFFFF');
        playerUsernameText.setText([
            'Username: ' + playerUsername,
        ]);
        this.playerUsernameText = playerUsernameText;

        /* Change username */
        /* Text input field */
        /* Small confirmation button next to */


        /* Character selection */
        /* This could show the character sprite with it's idle animation,
        option to include a buttons to cycle through/select other characters.*/


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
            this.scene.stop('PlayerProfile');
        });

        /* Temporary timed event function for changing player username */
        timedEvent = this.time.delayedCall(3000, this.onEvent, this);

    }

    update(){

        this.playerUsernameText.setText(['Username: ' + playerUsername]);

    }

    /* Temporary function for testing player username change */
    onEvent(){
        playerUsername = 'Heads The Fox';
    }

}
