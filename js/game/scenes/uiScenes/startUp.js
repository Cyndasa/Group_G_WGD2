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

        /* City */
        this.load.image('cityBG', 'gameAssets/imageAssets/City/Environmet/background/back.png');
        this.load.image('cityMG', 'gameAssets/imageAssets/City/Environmet/background/middle.png');
        this.load.image('cityFG', 'gameAssets/imageAssets/City/Environmet/background/front.png')

        /* Mountains dusk */
        this.load.image('mountainBG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-bg.png');
        this.load.image('mountainMG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-montain-far.png');
        this.load.image('mountainMG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-mountains.png');
        this.load.image('mountainFG', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-trees.png');
        this.load.image('mountainFG2', 'gameAssets/imageAssets/levelImages/mountainSet/parallax-mountain-foreground-trees.png');


        /* UI buttons */
        this.load.image('playButton', 'gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');
        this.load.image('optionsButton', 'gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('exitButton', 'gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('muteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Mute.png');
        this.load.image('unMuteButton', 'gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Unmute.png');
        this.load.image('singlePlayer', 'gameAssets/imageAssets/uiImages/Buttons/Single/Single-Unclicked.png');
        this.load.image('onlinePlay', 'gameAssets/imageAssets/uiImages/Buttons/Online/Online-Unclicked.png');
        // Start
        // Profile
        // Return
        // Local
        // Multiplayer
        // Confirm
        // Continue


        /* Level select images */
        this.load.image('forestLevelSelect', 'gameAssets/imageAssets/uiImages/Buttons/forestLevelImage.png');
        this.load.image('cityLevelSelect', 'gameAssets/imageAssets/City/Environmet/background/cyberpunk-city-2-back-preview.png');
        // Frame to accompany above images (?)

        /* Character assets */
        this.load.spritesheet('player', 'gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png',{ frameWidth: 33, frameHeight: 32 });

        /* Music assets */

        /* BGM assets */
        this.load.audio('theme', [
            'gameAssets/audioAssets/bgm/Menu_Music.ogg',
            'gameAssets/audioAssets/bgm/Menu_Music.mp3'
        ]);

        /* SFX assets */

        /* Other assets */
        this.load.image('titleHeader', 'gameAssets/imageAssets/uiImages/Title/Title.png');

    }

    create(){

        /* Create any necessary assets */

        /* Character sprite animations */

        /* Fox Character */


        /* Start next scene */
        this.scene.start('MainMenu');

    };

}