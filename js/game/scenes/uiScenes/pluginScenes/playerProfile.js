class playerProfile extends Phaser.Scene{
    constructor() {
        super('PlayerProfile');
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
        this.add.text(250, 150, '----Player Profile----',{
            font: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /* Create menu buttons */

        /* Player username */
        this.viewPlayerName = this.add.text (200, 225, '   Username: ' + playerUsername + '    ', {
            font: '30px',
            color: 'white',
            backgroundColor: 'darkblue',
        })

        /* Change username */
        /* Text input field */
        /* Small confirmation button next to */



        /* Character selection */
        /* This could show the character sprite with it's idle animation,
        option to include a buttons to cycle through/select other characters.*/


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
            this.scene.stop('PlayerProfile');
        });

        /* Temporary timed event function for changing player username */
        timedEvent = this.time.delayedCall(3000, this.onEvent, this);

    }

    update(){

        this.viewPlayerName.setText('   Username: ' + playerUsername + '    ');

    }

    /* Temporary function for testing player username change */
    onEvent(){
        playerUsername = 'Player';
    }

}
