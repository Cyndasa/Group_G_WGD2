class playScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
/*
        this.load.video('video', '../videos/MenuVideo.webm');
*/
        this.load.image('single', '../../../../gameAssets/imageAssets/uiImages/Buttons/Online/Online-Unclicked.png');
        this.load.image('online', '../../../../gameAssets/imageAssets/uiImages/Buttons/Single/Single-Unclicked.png');
/*        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');*/
    }

    create(){

        this.video = this.add.video(450,350, 'video').setLoop(true);
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        var SingleButton = this.add.image(400, 230, 'single').setScale(1.5);
        SingleButton.setInteractive();
        SingleButton.on("pointerup",()=>{
            this.scene.start('Test');
        });

        SingleButton.on('pointerover', ()=>{
            SingleButton.setTint('0xFF00F5');
        });

        SingleButton.on('pointerout', ()=>{
            SingleButton.clearTint();
        });

        var OnlineButton = this.add.image(400, 330, 'online').setScale(1.5);
        OnlineButton.setInteractive();
        OnlineButton.on("pointerup",()=>{
            this.scene.start('Test');
        });

        OnlineButton.on('pointerover', ()=>{
            OnlineButton.setTint('0xFF00F5');
        });

        OnlineButton.on('pointerout', ()=>{
            OnlineButton.clearTint();
        });

        var ExitButton = this.add.image(400, 430, 'exit').setScale(1.5);
        ExitButton.setInteractive();
        ExitButton.on("pointerup",()=>{
            this.scene.start('Menu');
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
