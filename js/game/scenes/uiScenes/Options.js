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
        this.load.image('muteButton', '../../../../gameAssets/imageAssets/uiImages/Buttons/MuteButtons/Mute.png')
        this.load.image('controls', '../../../../gameAssets/imageAssets/uiImages/Buttons/Controls/Controls.png')
       /* this.load.image('muteButton', '../../../../gameAssets/imageAssets/uiImages/Buttons/MuteButtons/ButtonsSpriteSheet.png');*/
    }

    create(){

        this.video = this.add.video(450,350, 'video').setLoop(true);
        this.video.play();
        this.video.height = -1000 ;
        this.video.width = -1000;

        this.add.image (400, 100 , 'title').setScale(3);

        /* Mute all sounds button */

       const muteButton = this.add.image(400, 230, 'muteButton');
        muteButton.setInteractive();
        muteButton.setScale(1.5);
        muteButton.on('pointerup', ()=>{
            if(!this.sound.mute){
                this.sound.mute = true;

            }
            else{
                this.sound.mute = false;

            }
        });
        /* Apply tint when hovered over */
       muteButton.on('pointerup', ()=>{
            muteButton.setTint('0xFF00F5');
        });

        /* Remove tint when no longer hovering over */
      muteButton.on('pointerout', ()=>{
            muteButton.clearTint();
        });

        const ControlButton = this.add.image(400, 330, 'controls');
        ControlButton .setInteractive();
        ControlButton .setScale(1.5);
        ControlButton .on('pointerup', ()=>{
            this.scene.start('Menu');
        });
        /* Apply tint when hovered over */
        ControlButton .on('pointerover', ()=>{
            ControlButton .setTint('0xFF00F5');
        });

        /* Remove tint when no longer hovering over */
        ControlButton .on('pointerout', ()=>{
            ControlButton .clearTint();
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
