class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
/*        this.load.video('video', '../videos/MenuVideo.webm');
        this.load.image('play', '../../../../gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');
        this.load.image('options', '../../../../gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');*/


    }

    create(){
        //---------Music-------------
        this.menuMusic = this.sound.add("theme");
        var musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: false, //DEBUG. Change back to true for final build
            delay: 0
        }
        this.menuMusic.play(musicConfig); // Start Playing the menu bg music

        //----------Video-------------
        this.video = this.add.video(450,350, 'video').setLoop(true);
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        const PlayButton = this.add.image(400, 230, 'play').setScale(1.5);
        PlayButton.setInteractive();
        PlayButton.on("pointerup",()=>{
            this.scene.start('PlayScene');
        });

        PlayButton.on('pointerover', ()=>{
            PlayButton.setTint('0xFF00F5');
        });

        PlayButton.on('pointerout', ()=>{
            PlayButton.clearTint();
        });

        const OptionsButton = this.add.image(400, 330, 'options').setScale(1.5);
        OptionsButton.setInteractive();
        OptionsButton.on("pointerup",()=>{
            this.scene.start('OptionsMenu');
        });

        OptionsButton.on('pointerover', ()=>{
            OptionsButton.setTint('0xFF00F5');
        });

        OptionsButton.on('pointerout', ()=>{
            OptionsButton.clearTint();
        });

        const ExitButton = this.add.image(400, 430, 'exit').setScale(1.5);
        ExitButton.setInteractive();
        ExitButton.on("pointerup",()=>{
            this.scene.start('StaticScene');
        });

        ExitButton.on('pointerover', ()=>{
            ExitButton.setTint('0xFF00F5');
        });

        ExitButton.on('pointerout', ()=>{
            ExitButton.clearTint();
        });

    }

    update(){

    }

}
