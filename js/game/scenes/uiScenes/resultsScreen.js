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

        // Reset finished booleans to false
        //playerFinished = false;
        //player2Finished = false;

        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.4); // Create an overlay mask

        /*  Informative text */
        const infoText = this.add.bitmapText(400, 145, 'arcade', '', 16);
        infoText.setOrigin(0.5);
        infoText.setCenterAlign();
        infoText.setTint('0xFFFFFF');
        infoText.setText(['--- Press Space Bar To Return To Main Menu ---']);
        infoText.setAlpha(0);

        /* Add blinking effect to text */
        this.tweens.add({
            targets: infoText,
            alpha: {value: 1, duration: 1500, ease: 'Power1', delay: 1000},
            yoyo: true,
            loop: -1,
        });

        const resultsText = this.add.bitmapText(400, 250, 'arcade', '', 16)
        resultsText.setOrigin(0.5);
        resultsText.setCenterAlign();

        // Use deltaTime to sort Position
        // Try present as table instead of list
        resultsText.setText([
            'Player: ' + playerUsername,
            'Race Time: ' + raceTimeMinutes + ':' + raceTimeSeconds + ':' + raceTimeHSeconds,
            'Delta Time: ' + deltaRaceTime,
            'Position: ',
        ]);

        raceTime = [raceTimeMinutes, raceTimeSeconds, raceTimeHSeconds];
        console.log(raceTime);

        if(isSinglePlayer === false && isOnlinePlay === false){

            // If table can be implemented add this to table instead
            const resultsText2 = this.add.bitmapText(400, 350, 'arcade', '', 16)
            resultsText2.setOrigin(0.5);
            resultsText2.setCenterAlign();

            // Use deltaTime to sort Position
            resultsText2.setText([
                'Player: ' + playerUsername2,
                'Race Time: ' + raceTimeMinutes2 + ':' + raceTimeSeconds2 + ':' + raceTimeHSeconds2,
                'Delta Time: ' + deltaRaceTime2,
                'Position: ',
            ]);

            raceTime2 = [raceTimeMinutes2, raceTimeSeconds2, raceTimeHSeconds2];
            console.log(raceTime2);

        }


    }

    update(){

        if(cursors.space.isDown){
            this.scene.start('MainMenu');
        }

    }
}