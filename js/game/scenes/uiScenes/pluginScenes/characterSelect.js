class characterSelect extends Phaser.Scene{

    isSelected = false;
    playerOneSelecting = true;
    playerTwoSelecting = false;
    currentCharacter = false;

    constructor() {
        super('CharacterSelect');
    };

    init(){
    };

    preload(){

    };

    create(){

        /* Add title image */
        const titleHeader = this.add.image(400, 75, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement

        /* Temporary text to mark scene - COMMENT OUT OR REMOVE FOR SUBMISSION */
        if(isSinglePlayer === true){

            this.add.text(250, 150, '----Character Select (Single Player)----',{
                font: '20px',
                color: 'white',
                backgroundColor: 'darkblue',
            });

        }
        else if (isSinglePlayer === false && isOnlinePlay === false){

            this.add.text(10, 180, '----Character Select (Local Multiplayer)----',{
                font: '20px',
                color: 'white',
                backgroundColor: 'darkblue',
            });

        }
        else if(isSinglePlayer === false && isOnlinePlay === true){

            this.add.text(10, 180, '----Character Select (Online Multiplayer)----',{
                font: '20px',
                color: 'white',
                backgroundColor: 'darkblue',
            });

        }

        /* Character sprites */
        // Display possible characters for player to choose with row(s) of images with a headshot image of character
        // Have character that player currently has selected appear below in idle animation
        // Text with character name and brief flavour text
        // If implemented display stats (run speed, sprint speed, health etc) beside flavour text
        // If local play is implemented will need to ensure player 2 can select/display character


        /* Create Character Select buttons */

        /* Heads the Fox select */
        let headsSelect = this.add.image(75, 250, 'headsTheFoxCharSelect').setScale(0.275);
        headsSelect.setTint('0x404040');
        headsSelect.setInteractive();

        headsSelect.on("pointerup",()=>{
            if(this.isSelected === true){
                this.isSelected = false;
                playerCharacter = null;
                console.log('player has currently selected ' + playerCharacter);
            }
            else{
                this.isSelected = true;
                headsSelect.clearTint();
                playerCharacter = 'HeadsTheFox';
                console.log('player has currently selected ' + playerCharacter);
                // set character to display in section
            }
        });

        headsSelect.on('pointerover', ()=>{
            if(this.isSelected === false){
                headsSelect.clearTint();
            }
        });

        headsSelect.on('pointerout', ()=>{
            if(this.isSelected === false){
                headsSelect.setTint('0x404040');
            }
        });

        /* Aztec 1 select */
        let aztec1Select = this.add.image(175, 250, 'aztec1CharSelect').setScale(0.275);
        aztec1Select.setTint('0x404040');
        aztec1Select.setInteractive();

        aztec1Select.on("pointerup",()=>{
            if(this.isSelected === true){
                this.isSelected = false;
                playerCharacter = null;
                console.log('player has currently selected ' + playerCharacter);
            }
            else{
                this.isSelected = true;
                aztec1Select.clearTint();
                playerCharacter = 'AztecOne';
                console.log('player has currently selected ' + playerCharacter);
                // set character to display in section
            }
        });

        aztec1Select.on('pointerover', ()=>{
            if(this.isSelected === false){
                aztec1Select.clearTint();
            }
        });

        aztec1Select.on('pointerout', ()=>{
            if(this.isSelected === false){
                aztec1Select.setTint('0x404040');
            }
        });

        /* The Dude select */
        let theDudeSelect = this.add.image(275, 250, 'theDudeCharSelect').setScale(0.275);
        theDudeSelect.setTint('0x404040');
        theDudeSelect.setInteractive();

        theDudeSelect.on("pointerup",()=>{
            if(this.isSelected === true){
                this.isSelected = false;
                playerCharacter = null;
                console.log('player has currently selected ' + playerCharacter);
            }
            else{
                this.isSelected = true;
                theDudeSelect.clearTint();
                playerCharacter = 'TheDude';
                console.log('player has currently selected ' + playerCharacter);
                // set character to display in section
            }
        });

        theDudeSelect.on('pointerover', ()=>{
            if(this.isSelected === false){
                theDudeSelect.clearTint();
            }
        });

        theDudeSelect.on('pointerout', ()=>{
            if(this.isSelected === false){
                theDudeSelect.setTint('0x404040');
            }
        });


        /* Section that displays the idle animation of selected character */

        /* Section that displays the stats of selected character */

        /* Section that displays the flavour text of selected character */

        /* Confirm selection button ?
        * Add if statement for displaying local multiplayer option so player 2 can confirm selection */


        /* Create menu buttons depending on previous scene */

        if(isSinglePlayer === true){

            /* Select Button */

            /* Level select button */
            const levelSelectButton = this.add.image(250, 540, 'continueButton');
            levelSelectButton.setInteractive();
            levelSelectButton.setScale(1.5);
            levelSelectButton.setScrollFactor(0);

            /* Apply tint to image when hovered over/ off */
            levelSelectButton.on('pointerover', ()=>{
                levelSelectButton.setTint('0xFF00F5');
            });
            levelSelectButton.on('pointerout', ()=>{
                levelSelectButton.clearTint();
            });

            /* Change scene */
            levelSelectButton.on('pointerup', ()=>{
                this.scene.launch('LevelSelect');
                this.scene.stop('CharacterSelect');
            });

        }
        else if(isSinglePlayer === false && isOnlinePlay === false){

            /* Player 1 Select Button */
            const playerOneSelectButton = this.add.image(475, 430, 'p1Button');
            playerOneSelectButton.setInteractive();
            playerOneSelectButton.setScale(1.5);
            playerOneSelectButton.setScrollFactor(0);

            /* Player 2 Select Button */
            const playerTwoButton = this.add.image(625, 430, 'p2Button');
            playerTwoButton.setInteractive();
            playerTwoButton.setScale(1.5);
            playerTwoButton.setScrollFactor(0);


            /* Level Select button */
            const playGameButton = this.add.image(250, 540, 'continueButton');
            playGameButton.setInteractive();
            playGameButton.setScale(1.5);
            playGameButton.setScrollFactor(0);

            /* Apply tint to image when hovered over/ off */
            playGameButton.on('pointerover', ()=>{
                playGameButton.setTint('0xFF00F5');
            });
            playGameButton.on('pointerout', ()=>{
                playGameButton.clearTint();
            });

            /* Change scene */
            playGameButton.on('pointerup', ()=>{
                this.scene.launch('LevelSelect');
                this.scene.stop('CharacterSelect');
            });

        }
        else if(isSinglePlayer === false && isOnlinePlay === true){

            /* Select Button */

            /* Begin game button */
            const playGameButton = this.add.image(250, 540, 'playButton');
            playGameButton.setInteractive();
            playGameButton.setScale(1.5);
            playGameButton.setScrollFactor(0);

            /* Apply tint to image when hovered over/ off */
            playGameButton.on('pointerover', ()=>{
                playGameButton.setTint('0xFF00F5');
            });
            playGameButton.on('pointerout', ()=>{
                playGameButton.clearTint();
            });

            /* Change scene */

/*            playGameButton.on('pointerup', ()=>{
                this.scene.launch(''); // Launch either into a lobby scene or a scene that will randomly select a level for multiple players to race on
                this.scene.stop('CharacterSelect');
            });*/
        }

        /* Return button */
        const returnButton = this.add.image(550, 540, 'returnButton');
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
            this.scene.launch(previousScene); // Return to previously loaded scene
            this.scene.stop('CharacterSelect');
        });

    };

    update(){

    };

}