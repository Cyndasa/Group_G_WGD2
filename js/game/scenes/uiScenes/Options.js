class optionsMenu extends Phaser.Scene {
    constructor() {
        super('OptionsMenu');
    };

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){
        this.load.video('video', '../videos/MenuVideo.webm');
        this.load.image('exit', '../../../../gameAssets/imageAssets/uiImages/Buttons/Exit/Exit-Unclicked.png');
        this.load.image('title', '../../../../gameAssets/imageAssets/uiImages/Title/Title.png');
    }

    create(){

        this.video = this.add.video(450,350, 'video');
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        /* Mute all sounds button */
/*        const muteButton = this.add.image(400, 300, '');
        muteButton.setInteractive();
        muteButton.setScale(1.5);
        muteButton.on('pointerover', ()=>{
            if(!this.sound.mute){
                this.sound.mute = true;
            }
            else{
                this.sound.mute = false;
            }
        });*/

        /* Apply tint when hovered over */
/*        muteButton.on('pointerover', ()=>{
            mute.setTint('');
        });*/

        /* Remove tint when no longer hovering over */
/*        muteButton.on('pointerout', ()=>{
            mute.clearTint();
        });*/


        var ExitButton = this.add.image(400, 430, 'exit').setScale(1.5);
        ExitButton.setInteractive();
        ExitButton.on("pointerup",()=>{
            this.scene.start('Menu');
        });



    }

    update(){

    }

};
