class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
        this.load.video('video', '../videos/MenuVideo.webm');
        this.load.image('play', '../../../../gameAssets/imageAssets/uiImages/Buttons/Play/Play-Unclicked.png');
        this.load.image('options', '../../../../gameAssets/imageAssets/uiImages/Buttons/Options/Options-Unclicked.png');
        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');
    }

    create(){

        this.video = this.add.video(450,350, 'video');
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        var PlayButton = this.add.image(400, 230, 'play').setScale(1.5);
        PlayButton.setInteractive();
        PlayButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });

        var OptionsButton = this.add.image(400, 330, 'options').setScale(1.5);
        OptionsButton.setInteractive();
        OptionsButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });

        var ExitButton = this.add.image(400, 430, 'exit').setScale(1.5);
        ExitButton.setInteractive();
        ExitButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });



    }

    update(){

    }

};
