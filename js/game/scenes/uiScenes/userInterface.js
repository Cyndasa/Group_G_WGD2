class userInterface extends Phaser.Scene{
    constructor() {
        super();
    }

    init(){

    }

    preload(){

    }

    create(){

        /* Full Screen */

        /* UI Components */
        // if statement to check if player is in a game level scene

        /* Placeholder Values */
        const scoreValue = 0;
        this.scoreValue = scoreValue;

        const raceTime = 0;
        this.raceTime = raceTime;

        /* Doesn't work as intended but does display somewhat as intended */
        timedEvent = new Phaser.Time.TimerEvent({delay: 6000 , duration: 60000, loop: true });
        this.time.addEvent(timedEvent);

        /* Timer UI */
        const timeText = this.add.text(625 , 10, "Time: " + raceTime, {
            font: "25px",
            align: "center",
            color: "red",
        });
        timeText.scrollFactorX = 0;
        timeText.scrollFactorY = 0;
        this.timeText = timeText;

        /* Score UI */

        const scoreText = this.add.text(625, 50, "Score: " + scoreValue, {
            font: "25px",
            align: "center",
            color: "white",
        });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;
        this.scoreText = scoreText;

        /* Temp placeholder for player identifier */
        this.playerName = playerUsername;
        this.playerName = this.add.text(
            playerController.matterSprite.x - 20,
            playerController.matterSprite.y - 25,
            'Player',{
                font: '15px',
                align: 'centre',
                color: 'white',
            });

    }

    update(){

        /* Updates to have player name follow player */
        this.playerName.x = matterSprite.x - 20;
        this.playerName.y = matterSprite.y - 25;

        let lapTime = time * 0.001;

        let timeElapsed = timedEvent.getProgress();

        /* Update UI Components */
        this.scoreText.setText("Score: " + this.scoreValue);
        /*
                this.timeText.setText("Time: " + timeElapsed.toString().substr(0,4));
        */
        this.timeText.setText("Time: " + Math.round(lapTime));

    }
}