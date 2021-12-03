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
    }

    create(){

        this.video = this.add.video(450,350, 'video');
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        var PlayButton = this.add.image(400, 230, 'play').setScale(2);
        PlayButton.setInteractive();
        PlayButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });

        var OptionsButton = this.add.image(400, 360, 'options').setScale(2);
        OptionsButton.setInteractive();
        OptionsButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });

        var ExitButton = this.add.image(400, 490, 'exit').setScale(2);
        ExitButton.setInteractive();
        ExitButton.on("pointerup",()=>{
            this.scene.start('MainScene');
        });



    }

    update(){

    }

};
