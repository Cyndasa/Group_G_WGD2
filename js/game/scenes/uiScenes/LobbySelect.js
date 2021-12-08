class LobbySelect extends Phaser.Scene {
    constructor() {
        super('LobbySelect');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
/*        this.load.video('video', '../videos/MenuVideo.webm');
        this.load.image('Forest', '../../../../gameAssets/imageAssets/uiImages/Buttons/Forest/Forest-Unclicked.png');
        this.load.image('City', '../../../../gameAssets/imageAssets/uiImages/Buttons/City/City-Unclicked.png');
        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');*/
    }

    create(){

        this.video = this.add.video(450,350, 'video').setLoop(true);
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        var CityButton = this.add.image(400, 230, 'City').setScale(1.5);
        CityButton.setInteractive();
        CityButton.on("pointerup",()=>{
            this.scene.start('City');
        });

        CityButton.on('pointerover', ()=>{
            CityButton.setTint('0xFF00F5');
        });

        CityButton.on('pointerout', ()=>{
            CityButton.clearTint();
        });

        var ForestButton = this.add.image(400, 330, 'Forest').setScale(1.5);
        ForestButton.setInteractive();
        ForestButton.on("pointerup",()=>{
            this.scene.start('Test');
        });

        ForestButton.on('pointerover', ()=>{
            ForestButton.setTint('0xFF00F5');
        });

        ForestButton.on('pointerout', ()=>{
            ForestButton.clearTint();
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
