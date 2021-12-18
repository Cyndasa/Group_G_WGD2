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

            const titleSPText = this.add.bitmapText(400, 165, 'arcade', '', 14);
            titleSPText.setOrigin(0.5);
            titleSPText.setCenterAlign();
            titleSPText.setTint('0xFFFFFF');
            titleSPText.setText(['Character Select (Single Player)']);

        }
        else if (isSinglePlayer === false && isOnlinePlay === false){

            const titleLPText = this.add.bitmapText(400, 165, 'arcade', '', 14);
            titleLPText.setOrigin(0.5);
            titleLPText.setCenterAlign();
            titleLPText.setTint('0xFFFFFF');
            titleLPText.setText(['Character Select (Local Multiplayer)']);


        }
        else if(isSinglePlayer === false && isOnlinePlay === true){

            const titleLPText = this.add.bitmapText(400, 165, 'arcade', '', 14);
            titleLPText.setOrigin(0.5);
            titleLPText.setCenterAlign();
            titleLPText.setTint('0xFFFFFF');
            titleLPText.setText(['Character Select (Online Multiplayer)']);

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
        this.add.rectangle(525, 280, 160, 128, 0xFF00F5, 0.4); // Temp Marker for sprite display section


        /* Section that displays the stats of selected character */
        this.add.rectangle(675, 280, 114, 128, 0xF967FF, 0.4); // Temp Marker for stats display section


        /* Section that displays the flavour text of selected character */
        this.add.rectangle(560, 385, 350, 75, 0x000000, 0.4); // Temp Marker for flavour text section


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
            const playerOneSelectButton = this.add.image(480, 455, 'p1Button');
            playerOneSelectButton.setScale(1.25, 0.85);
            playerOneSelectButton.setInteractive();
            playerOneSelectButton.setScrollFactor(0);

            /* Apply tint to image when hovered over/ off */
            playerOneSelectButton.on('pointerover', ()=>{
                playerOneSelectButton.setTint('0xFF00F5');
            });
            playerOneSelectButton.on('pointerout', ()=>{
                playerOneSelectButton.clearTint();
            });

            /* Player One Chooses character  */
            playerOneSelectButton.on('pointerup', ()=>{

            });

            /* Player 2 Select Button */
            const playerTwoSelectButton = this.add.image(620, 455, 'p2Button');
            playerTwoSelectButton.setScale(1.25, 0.85);
            playerTwoSelectButton.setInteractive();
            playerTwoSelectButton.setScrollFactor(0);

            /* Apply tint to image when hovered over/ off */
            playerTwoSelectButton.on('pointerover', ()=>{
                playerTwoSelectButton.setTint('0xFF00F5');
            });
            playerTwoSelectButton.on('pointerout', ()=>{
                playerTwoSelectButton.clearTint();
            });

            /* Player Two Chooses character  */
            playerTwoSelectButton.on('pointerup', ()=>{

            });


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