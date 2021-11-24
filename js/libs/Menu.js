class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
        this.load.video('video', '../videos/MenuVideo.webm');
        this.load.image('play', './gameAssets/imageAssets/uiImages/blue/normal.png)');
    }

    create(){
        this.video = this.add.video(450,350, 'video');
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;
        var PlayButton = this.add.image(400, 300, 'play');


    }

    update(){

    }

};
