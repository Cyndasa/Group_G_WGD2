class startUp extends Phaser.Scene {

    /* This can be used for either loading assets prior to starting scene or while/for conducting matchmaking. */

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

        /* Load assets for scene below */

        /* Backgrounds */

        /* Forest */
/*        this.load.image("bg_1", "gameAssets/imageAssets/levelImages/forestSet/bg-1.png");
        this.load.image("bg_2", "gameAssets/imageAssets/levelImages/forestSet/bg-2.png");
        this.load.tilemapTiledJSON('map', '../gameAssets/imageAssets/Forrest/environment/layers/Forest-Map.json');
        this.load.image('tiles', '../gameAssets/imageAssets/Forrest/environment/layers/tileset.png');*/

        /* City */
/*        this.load.image("bg_1", "../../../../gameAssets/imageAssets/City/Environmet/background/back.png");
        this.load.image("bg_2", "../../../../gameAssets/imageAssets/City/Environmet/background/middle.png");
        this.load.image("bg_3", "../../../../gameAssets/imageAssets/City/Environmet/background/front.png");
        this.load.tilemapTiledJSON('map', '../gameAssets/imageAssets/City/Worldfiles/City.json');
        this.load.image('tiles', '../../../../gameAssets/imageAssets/City/Environmet/tileset.png');*/

        /* Button images */
        this.load.image('options', '../../../../gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');
        this.load.image('muteButton', '../../../../gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Mute.png')
        this.load.image('controls', '../../../../gameAssets/imageAssets/uiImages/Buttons/Controls/Controls.png')
        this.load.image('Forest', '../../../../gameAssets/imageAssets/uiImages/Buttons/Forest/Forest-Unclicked.png');
        this.load.image('City', '../../../../gameAssets/imageAssets/uiImages/Buttons/City/City-Unclicked.png');
        this.load.image('online', '../../../../gameAssets/imageAssets/uiImages/Buttons/Online/Online-Unclicked.png');
        this.load.image('single', '../../../../gameAssets/imageAssets/uiImages/Buttons/Single/Single-Unclicked.png');
        this.load.image('ForestButton', 'gameAssets/imageAssets/uiImages/Buttons/forestLevelImage.png');
        this.load.image('CityButton', 'gameAssets/imageAssets/City/Environmet/background/cyberpunk-city-2-back-preview.png');

        /* Player sprites */
        this.load.spritesheet('player', 'gameAssets/imageAssets/characterSprites/foxSprite/Player-Movement.png',{ frameWidth: 33, frameHeight: 32 });


        /* Item sprites */


        /* Music files */
        this.load.audio('theme', [
            /*'Music/Menu_Music.ogg',*/
            'Music/Menu_Music.mp3'
        ]);

        /* Other */
        this.load.video('video', '../videos/MenuVideo.webm');

    }

    create(){
        this.sound.mute = true;
        /* Create necessary assets or functions for scene */
        /* Start next scene */
        this.scene.start("AudioScene");
        this.scene.start('Menu');

    };

}