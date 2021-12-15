class resultsScreen extends Phaser.Scene{
    constructor() {
        super('ResultsScreen');
    }

    init(){
        cursors = this.input.keyboard.createCursorKeys();
    }

    preload(){

    }

    create(){

        const resultsText = this.add.bitmapText(400, 300, 'arcade', '', 16)
            .setOrigin(0.5)
            .setCenterAlign();

        resultsText.setText([
            'Player: ' + playerUsername,
            'Race Time: ' + raceTime,
            'Score: ' + playerScore,
            'Position: ',
        ]);

        /* Add informative text to scene */
        const infoText = this.add.text(50, 150, '---Press Space To Return to Main Menu---', {
            font: '30px',
            color: 'white',
            align: 'center',
            backgroundColor: 'black',
        });
        infoText.setAlpha(0);

        /* Add blinking effect to text */
        this.tweens.add({
            targets: infoText,
            alpha: {value: 1, duration: 1500, ease: 'Power1', delay: 1000},
            yoyo: true,
            loop: -1,
        });

    }

    update(){

        if(cursors.space.isDown){
            this.scene.start('MainMenu');
        }

    }
}