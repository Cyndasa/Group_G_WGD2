class startUp extends Phaser.Scene{

    constructor(){
        super('StartUp');
    }

    preload(){

        /* Preloading Graphic */

        /* Progress Bar */
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.3);
        progressBox.fillRect(240, 270, 320, 50);

        /* Text */
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading Level',
            style: {
                font: '30px',
                fill: '#ffffff',
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        /* Display Progress */

        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0x7FFF00, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileProgress', function(file){});

        this.load.on('complete', function(){
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        /* Load all assets required for menus */

        /* Level asset images & tile-maps */

        /* Forest */
        this.load.image('forestBG', 'gameAssets/imageAssets/levelImages/forestSet/bg-1.png');
        this.load.image('forestMG', 'gameAssets/imageAssets/levelImages/forestSet/bg-2.png');
        // Tile Map files
        this.load.tilemapTiledJSON('forestMap', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.json');
        this.load.image('forestTiles', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png');


        /* City */
        this.load.image('cityBG', 'gameAssets/imageAssets/City/Environmet/background/back.png');
        this.load.image('cityMG', 'gameAssets/imageAssets/City/Environmet/background/middle.png');
        this.load.image('cityFG', 'gameAssets/imageAssets/City/Environmet/background/front.png')
        // Tilemap


        /* Mountains dusk */
        this.load.image('mountainBG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-bg.png');
        this.load.image('mountainMG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-montain-far.png');
        this.load.image('mountainMG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-mountains.png');
        this.load.image('mountainFG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-trees.png');
        this.load.image('mountainFG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-foreground-trees.png');
        // Tilemap


        /* UI buttons */
        this.load.image('playButton', 'gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');
        this.load.image('optionsButton', 'gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('exitButton', 'gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('muteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Mute.png');
        this.load.image('unMuteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Unmute.png');
        this.load.image('singlePlayer', 'gameAssets/imageAssets/uiImages/Buttons/Single/Single-Unclicked.png');
        this.load.image('onlinePlay', 'gameAssets/imageAssets/uiImages/Buttons/Online/Online-Unclicked.png');
        this.load.image('controlButton', 'gameAssets/imageAssets/uiImages/Buttons/Controls/Controls-Unclicked.png')
        this.load.image('localButton', 'gameAssets/imageAssets/uiImages/Buttons/Local/Local-Unclicked.png');
        // Start
        // Profile
        // Return
        // Local
        // Multiplayer
        // Confirm
        // Continue
        // Select


        /* Fonts */
        this.load.bitmapFont('arcade', 'gameAssets/imageAssets/fonts/arcade.png', 'gameAssets/imageAssets/fonts/arcade.xml');


        /* Level select images */
        this.load.image('forestLevelSelect', 'gameAssets/imageAssets/uiImages/levelSelect/forestLevelImage.png');
        this.load.image('cityLevelSelect', 'gameAssets/imageAssets/City/Environmet/background/cyberpunk-city-2-back-preview.png');
        this.load.image('mountainLevelSelect', 'gameAssets/imageAssets/uiImages/levelSelect/mountainLevelSelect.png');
        // Frame to go on top of above images

        /* Character assets */

        /* Heads the Fox */
        this.load.image('headsTheFoxCharSelect', 'gameAssets/imageAssets/uiImages/charSelect/headsTheFoxCharSel.png');
        this.load.spritesheet('headsFox', 'gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png',{ frameWidth: 33, frameHeight: 32 });

        /* Team Aztec */
       this.load.image('aztec1CharSelect', 'gameAssets/imageAssets/uiImages/charSelect/aztec1CharSel.png');
       this.load.spritesheet('aztecOne', 'gameAssets/imageAssets/characterSprites/teamAztec/aztec1_sheet.png',{frameWidth: 32, frameHeight: 32});
/*        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});
        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});
        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});*/

        /* Team Monster */
/*        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});
        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});
        this.load.image('CharSelect', '');
        this.load.spritesheet('', '', {frameWidth: 32, frameHeight: 32});*/

        /* Props */
        this.load.spritesheet('finishTorch', 'gameAssets/imageAssets/props/fireTorch.png', {frameWidth: 32, frameHeight: 32});

        /* Power-ups */


        /* Music assets */

        /* BGM assets */

        // Menu Music
        this.load.audio('theme', [
            'gameAssets/audioAssets/bgm/Menu_Music.ogg',
            'gameAssets/audioAssets/bgm/Menu_Music.mp3'
        ]);

        // Forest Level BGM
        // City Level BGM
        // Results BGM(?)

        /* SFX assets */
        // Button Click
        // Collect Power Up
        // Use Power Up (could be different for each power up)


        /* Other assets */
        this.load.image('titleHeader', 'gameAssets/imageAssets/uiImages/Title/Title.png');

    }

    create(){

        /* Create any necessary assets */



        /* Character sprite animations */

        /* Heads the Fox */
/*        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('headsFox', { start: 0, end: 5 }),
            /!*frameRate: 16,*!/
            frameRate: 12,
            repeat: -1
        });*/
        this.anims.create({
            key: 'headsRun',
            frames: this.anims.generateFrameNumbers('headsFox', { start: 6, end: 11 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'headsIdle',
            frames: this.anims.generateFrameNumbers('headsFox', { start: 12, end: 15 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'headsJump',
            frames: this.anims.generateFrameNumbers('headsFox', { start: 16, end: 17 }),
            frameRate: 24,
            repeat: -1
        });

        /* Aztec 1 */
        this.anims.create({
            key: 'aztec1Idle',
            frames: this.anims.generateFrameNumbers('aztecOne', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec1Run',
            frames: this.anims.generateFrameNumbers('aztecOne', { start: 6, end: 13 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec1Jump',
            frames: this.anims.generateFrameNumbers('aztecOne', { start: 13, end: 14 }),
            frameRate: 24,
            repeat: -1
        });


        /* Props */
        this.anims.create({
            key: 'finishMarker',
            frames: this.anims.generateFrameNumbers('finishTorch', {start: 0, end: 5}),
            frameRate: 12,
            repeat: -1
        });



        /* Start next scene */
        this.scene.start('MainMenu');

    };

}