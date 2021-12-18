class creditsScene extends Phaser.Scene{
    constructor() {
        super('CreditsScene');
    };

    init(){
        cursors = this.input.keyboard.createCursorKeys();
    };

    preload(){

    };

    create(){

        this.rncBGM = this.sound.add('resultsAndCreditsBGM');
        const musicConfig = {
            mute: 0,
            volume: 0.6,
            seek: 0,
            loop: false, //DEBUG. Change back to true for final build
            delay: 0
        }
        this.rncBGM.play(musicConfig);

        //Insert a vertical parallax if possible
        this.add.rectangle(400,300,800,600, 0x000000, 0.6); // Depending on colour of vert background create this as a mask

        /* Create Credits Text */

        const creditsText = this.add.bitmapText(400, 650, 'arcade', '', 16);
        creditsText.setOrigin(0.5);
        creditsText.setCenterAlign();
        creditsText.setTint('0xFFFFFF');
        creditsText.setText([
            '',
            '',
            '',
            '16-Bit Retro Racing',
            '',
            '',
            'Game Developers',
            '',
            '',
            'Name Here',
            '',
            'Name Here',
            '',
            'Name Here',
            '',
            '',
            '',
            'Game Assets',
            '',
            '',
            'Credit 1 Start',
            '',
            '',
            'Credit 2 start',
            '',
            '',
            'ETC',
            '',
            '',
            '',
            'Music Assets',
            '',
            '',
            'Credit 1 Start',
            '',
            '',
            'Credit 2 start',
            '',
            '',
            '',
            'SFX Assets',
            '',
            '',
            'Credit 1 Start',
            '',
            '',
            'Credit 2 start',
            '',
            '',
            '',
            'Created Using',
            'Phaser 3',
            'Webstorm',
            '',
            '',
            '',
            '',
            'Thank you for playing',
            '',
            '',
            '',
        ]);

        let graphics = this.make.graphics();
        graphics.fillRect(0, 100, 800, 500,);

        let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        let creditsBox = this.add.zone(0, 0, 800, 400);
        creditsBox.setOrigin(0);
        creditsBox.setInteractive();
        creditsBox.on('pointermove', function(pointer){
            if(pointer.isDown){
            creditsText.y += (pointer.velocity.y / 10);
            creditsText.y = Phaser.Math.Clamp(creditsText.y, -800, 300);
            }
        });

        creditsText.setMask(mask);
        this.CreditsText = creditsText;

        const skipText = this.add.bitmapText(400, 500, 'arcade', '', 16);
        skipText.setOrigin(0.5);
        skipText.setCenterAlign();
        skipText.setTint('0xFFFFFF');
        skipText.setText([
            'Press Space To Return To Main Menu',
        ]);
        skipText.setAlpha(0);

        /* Add blinking effect to text */
        this.tweens.add({
            targets: skipText,
            alpha: {value: 1, duration: 1500, ease: 'Power1', delay: 1000},
            yoyo: true,
            loop: -1,
        });




    };

    update(){

        if(cursors.space.isDown){
            this.sound.stopByKey('resultsAndCreditsBGM'); // Stop BGM
            this.scene.start('MainMenu');
            this.scene.stop('CreditsScene');
        }

        // Move credits text
        this.CreditsText.y = this.CreditsText.y - 0.3;

        /* If applied Parallax code here */

    };

}