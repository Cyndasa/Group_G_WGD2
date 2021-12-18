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
                font: '24px',
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

        /* Trailer */
        // Tile Map files
        this.load.tilemapTiledJSON('trailerMap', '../gameAssets/imageAssets/Forrest/environment/layers/Trailer-Map.json');
        this.load.image('tileset', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png');

        /* City */
        this.load.image('cityBG', 'gameAssets/imageAssets/City/Environmet/background/back.png');
        this.load.image('cityMG', 'gameAssets/imageAssets/City/Environmet/background/middle.png');
        this.load.image('cityFG', 'gameAssets/imageAssets/City/Environmet/background/front.png')
        // Tile Map files
        this.load.tilemapTiledJSON('cityMap', '../gameAssets/imageAssets/City/Worldfiles/City.json');
        this.load.image('cityTiles', '../../../../gameAssets/imageAssets/City/Environmet/tileset.png');



        /* Mountains dusk  */
        this.load.image('mountainBG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-bg.png');
        this.load.image('mountainMG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-montain-far.png');
        this.load.image('mountainMG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-mountains.png');
        this.load.image('mountainFG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-trees.png');
        this.load.image('mountainFG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-foreground-trees.png');
        // Tile Map for Trailer Scene



        /* UI buttons */
        this.load.image('optionsButton', 'gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('muteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Mute.png');
        this.load.image('unMuteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Unmute.png');
        this.load.image('singlePlayer', 'gameAssets/imageAssets/uiImages/Buttons/Single/Single-Unclicked.png');
        this.load.image('onlinePlay', 'gameAssets/imageAssets/uiImages/Buttons/Online/Online-Unclicked.png');
        this.load.image('controlButton', 'gameAssets/imageAssets/uiImages/Buttons/Controls/Controls-Unclicked.png')
        this.load.image('localButton', 'gameAssets/imageAssets/uiImages/Buttons/Local/Local-Unclicked.png');
        this.load.image('confirmButton', 'gameAssets/imageAssets/uiImages/Buttons/Confirm/Confirm-Unclicked.png');
        this.load.image('continueButton', 'gameAssets/imageAssets/uiImages/Buttons/Continue/Continue-Unclicked.png');
        this.load.image('exitButton', 'gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('multiButton', 'gameAssets/imageAssets/uiImages/Buttons/Multi/Multi-Unclicked.png');
        this.load.image('playButton', 'gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');
        this.load.image('profileButton', 'gameAssets/imageAssets/uiImages/Buttons/Profile/Profile-Unclicked.png');
        this.load.image('restartButton', 'gameAssets/imageAssets/uiImages/Buttons/Restart/Restart-Unclicked.png');
        this.load.image('resumeButton', 'gameAssets/imageAssets/uiImages/Buttons/Resume/Resume-Unclicked.png');
        this.load.image('returnButton', 'gameAssets/imageAssets/uiImages/Buttons/Return/Return-Unclicked.png');
        this.load.image('selectButton', 'gameAssets/imageAssets/uiImages/Buttons/Select/Select-Unclicked.png');
        this.load.image('p1Button', 'gameAssets/imageAssets/uiImages/Buttons/Select/P1-Unclicked.png');
        this.load.image('p2Button', 'gameAssets/imageAssets/uiImages/Buttons/Select/P2-Unclicked.png');
        this.load.image('startButton', 'gameAssets/imageAssets/uiImages/Buttons/Start/Start-Unclicked.png');
        // Credits Button
        this.load.image('creditButton', 'gameAssets/imageAssets/uiImages/Buttons/Credits/Credits-Unclicked.png');

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
        this.load.image('aztec2CharSelect', 'gameAssets/imageAssets/uiImages/charSelect/aztec2CharSel.png');
        this.load.spritesheet('aztecTwo', 'gameAssets/imageAssets/characterSprites/teamAztec/aztec2_sheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('aztec3CharSelect', 'gameAssets/imageAssets/uiImages/charSelect/aztec3CharSel.png');
        this.load.spritesheet('aztecThree', 'gameAssets/imageAssets/characterSprites/teamAztec/aztec3_sheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('aztec4CharSelect', 'gameAssets/imageAssets/uiImages/charSelect/aztec4CharSel.png');
        this.load.spritesheet('aztecFour', 'gameAssets/imageAssets/characterSprites/teamAztec/aztec4_sheet.png', {frameWidth: 32, frameHeight: 32});

        /* Team Monster */
        this.load.image('theDudeCharSelect', 'gameAssets/imageAssets/uiImages/charSelect/theDudeCharSel.png');
        this.load.spritesheet('theDude', 'gameAssets/imageAssets/characterSprites/teamMonster/dude_monster_sheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('theOwletCharSelect', 'gameAssets/imageAssets/uiImages/charSelect/theOwletCharSel.png');
        this.load.spritesheet('theOwlet', 'gameAssets/imageAssets/characterSprites/teamMonster/owlet_monster_sheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('thePinkMonCharSelect', 'gameAssets/imageAssets/uiImages/charSelect/thePinkMonCharSel.png');
        this.load.spritesheet('thePinkMon', 'gameAssets/imageAssets/characterSprites/teamMonster/pink_monster_sheet.png', {frameWidth: 32, frameHeight: 32});

        /* Props */
        this.load.spritesheet('finishTorch', 'gameAssets/imageAssets/props/fireTorch.png', {frameWidth: 16, frameHeight: 32});

        /* Power-ups */
        this.load.spritesheet('powerUpsSheet', 'gameAssets/imageAssets/props/power_up_sheet.png',{frameWidth: 16, frameHeight: 16 });

        /* Music assets */

        /* BGM assets */

        // Menu Music
        this.load.audio('menuTheme', [
            'gameAssets/audioAssets/bgm/Menu_Music.ogg',
            'gameAssets/audioAssets/bgm/Menu_Music.mp3'
        ]);

        // Credits Music
        this.load.audio('creditsMusic', 'gameAssets/audioAssets/bgm/canon-in-d-for-8-bit-synths-by-kevin-macleod-from-filmmusic-io.mp3');

        // Forest Level BGM
        this.load.audio('forestLevelBGM', 'gameAssets/audioAssets/bgm/kawai-kitsune-by-kevin-macleod-from-filmmusic-io.mp3');

        // City Level BGM
        this.load.audio('cityLevelBGM', 'gameAssets/audioAssets/bgm/voxel-revolution-by-kevin-macleod-from-filmmusic-io.mp3');

        // Results & Credits BGM
        this.load.audio('resultsAndCreditsBGM', 'gameAssets/audioAssets/bgm/canon-in-d-for-8-bit-synths-by-kevin-macleod-from-filmmusic-io.mp3');


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
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('headsFox', { start: 0, end: 5 }),
            /*frameRate: 16,*/
            frameRate: 12,
            repeat: -1
        });
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
            frameRate: 3,
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
            frameRate: 3,
            repeat: -1
        });


        /* Aztec 2 */
        this.anims.create({
            key: 'aztec2Idle',
            frames: this.anims.generateFrameNumbers('aztecTwo', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec2Run',
            frames: this.anims.generateFrameNumbers('aztecTwo', { start: 6, end: 13 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec2Jump',
            frames: this.anims.generateFrameNumbers('aztecTwo', { start: 13, end: 14 }),
            frameRate: 3,
            repeat: -1
        });

        /* Aztec 3 */
        this.anims.create({
            key: 'aztec3Idle',
            frames: this.anims.generateFrameNumbers('aztecThree', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec3Run',
            frames: this.anims.generateFrameNumbers('aztecThree', { start: 6, end: 13 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec3Jump',
            frames: this.anims.generateFrameNumbers('aztecThree', { start: 13, end: 14 }),
            frameRate: 3,
            repeat: -1
        });

        /* Aztec 4 */
        this.anims.create({
            key: 'aztec4Idle',
            frames: this.anims.generateFrameNumbers('aztecFour', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec4Run',
            frames: this.anims.generateFrameNumbers('aztecFour', { start: 6, end: 13 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'aztec4Jump',
            frames: this.anims.generateFrameNumbers('aztecFour', { start: 13, end: 14 }),
            frameRate: 3,
            repeat: -1
        });

        /* The Dude */
        this.anims.create({
            key: 'theDudeIdle',
            frames: this.anims.generateFrameNumbers('theDude', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'theDudeRun',
            frames: this.anims.generateFrameNumbers('theDude', { start: 4, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'theDudeJump',
            frames: this.anims.generateFrameNumbers('theDude', { start: 10, end: 17 }),
            frameRate: 24,
            repeat: -1
        });

        /* The Owlet */
        this.anims.create({
            key: 'theOwletIdle',
            frames: this.anims.generateFrameNumbers('theOwlet', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'theOwletRun',
            frames: this.anims.generateFrameNumbers('theOwlet', { start: 4, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'theOwletJump',
            frames: this.anims.generateFrameNumbers('theOwlet', { start: 10, end: 17 }),
            frameRate: 12,
            repeat: -1
        });

        /* The Pink Mon */
        this.anims.create({
            key: 'thePinkMonIdle',
            frames: this.anims.generateFrameNumbers('thePinkMon', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'thePinkMonRun',
            frames: this.anims.generateFrameNumbers('thePinkMon', { start: 4, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'thePinkMonJump',
            frames: this.anims.generateFrameNumbers('thePinkMon', { start: 10, end: 17 }),
            frameRate: 12,
            repeat: -1
        });


        /* Props & Other */

        // Finish Marker
        this.anims.create({
            key: 'finishMarker',
            frames: this.anims.generateFrameNumbers('finishTorch', {start: 0, end: 5}),
            frameRate: 12,
            repeat: -1
        });

        // Power Ups
        this.anims.create({
            key: 'powerUps',
            frames: this.anims.generateFrameNumbers('powerUpsSheet', {start: 0, end: 3}),
            frameRate: 16,
            repeat: -1
        });



        /* Start next scene */
        this.scene.start('MainMenu');
        this.scene.stop('StartUp');

    };

}