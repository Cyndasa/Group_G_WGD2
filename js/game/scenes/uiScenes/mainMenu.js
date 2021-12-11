class mainMenu extends Phaser.Scene{

    constructor() {
        super('MainMenu');
    }

    init(){
        /* Add cursor key controls */
        this.cursors = this.input.keyboard.createCursorKeys();
        bgRNG = Phaser.Math.Between(1,3); //Rng for getting random background grouping.
        console.log(bgRNG); // DEBUG, CAN REMOVE FOR SUBMISSION
    }

    preload(){

    }

    create(){

        /* Use rng result  & switch statement to cycle between different background groupings*/
        switch (bgRNG){
            case 1:
                /* Create forest background if = 1 */
                this.bgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'forestBG').setScale(2.5);
                this.bgImage.setOrigin(0, 0); // Set origin to top left
                this.bgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.mgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'forestMG').setScale(2.5);
                this.mgImage.setOrigin(0, 0); // Set origin to top left
                this.mgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement
                break;
            case 2:
                /* Create city background if = 2 */
                this.bgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'cityBG').setScale(3.75);
                this.bgImage.setOrigin(0, 0); // Set origin to top left
                this.bgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.mgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'cityMG').setScale(3.75);
                this.mgImage.setOrigin(0, 0); // Set origin to top left
                this.mgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.fgImage = this.add.tileSprite(0, 0, game.config.width* 3, game.config.height, 'cityFG').setScale(3.75);
                this.fgImage.setOrigin(0, 0); // Set origin to top left
                this.fgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                use3Layers = true;
                break;
            case 3:
                /* Create mountain background if = 3 */
                /* The speeds for this feel off so could probably cut 1 or 2 layers */
                this.bgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'mountainBG').setScale(3.75);
                this.bgImage.setOrigin(0, 0); // Set origin to top left
                this.bgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.mgImage = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'mountainMG').setScale(3.75);
                this.mgImage.setOrigin(0, 0); // Set origin to top left
                this.mgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.mgImage2 = this.add.tileSprite(0, 0, game.config.width * 3, game.config.height, 'mountainMG2').setScale(3.75);
                this.mgImage2.setOrigin(0, 0); // Set origin to top left
                this.mgImage2.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.fgImage = this.add.tileSprite(0, 0, game.config.width* 3, game.config.height, 'mountainFG').setScale(3.75);
                this.fgImage.setOrigin(0, 0); // Set origin to top left
                this.fgImage.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                this.fgImage2 = this.add.tileSprite(0, 0, game.config.width* 3, game.config.height, 'mountainFG2').setScale(3.75);
                this.fgImage2.setOrigin(0, 0); // Set origin to top left
                this.fgImage2.setScrollFactor(0); // Set scroll factor to zero to prevent movement

                use5Layers = true;
                break;

            default:
                console.log('There was an error. Reloading scene');
                this.scene.start('MainMenu')

        }

        /* Add title image */
/*        const titleHeader = this.add.image(400, 100, 'titleHeader');
        titleHeader.setScale(3); // Enlarge title header image
        titleHeader.setScrollFactor(0); // Set scroll factor to zero to prevent movement*/

        /* Launch main menu button scene */
        this.scene.launch('MainMenuButtons')

        /* Start BGM music */
        this.menuMusic = this.sound.add("theme");
        const musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: false, //DEBUG. Change back to true for final build
            delay: 0
        }
        this.menuMusic.play(musicConfig); // Start Playing the menu bg music

    }

    update(){

        /* Parallax Background */
        this.bgImage.tilePositionX += 0.1;
        this.mgImage.tilePositionX += 0.3;
        if(use3Layers === true){
            this.fgImage.tilePositionX += 0.5;
        }
        if(use5Layers === true){
            /* These speeds feel slightly off but can't get the right balance */
            this.mgImage2.tilePositionX += 0.5;
            this.fgImage.tilePositionX += 0.7;
            this.fgImage2.tilePositionX += 0.9;
        }

    }

}