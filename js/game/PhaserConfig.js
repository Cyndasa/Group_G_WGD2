var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
        matter: {
            gravity: { y: 1 },
            enableSleep: false,
            debug: true
        },
    },
    inputManager: Phaser.Input.InputManager,
    scene: [Menu,optionsMenu,playScene,Test],
}
    /* Can declare universal variables here */
var game = new Phaser.Game(config)
var playerController;
var cursors;
var text;
var cam;
var smoothedControls;
var smoothMoveCameraTowards;

var SmoothedHorionztalControl = new Phaser.Class({

    initialize:
        function SmoothedHorionztalControl (speed)
        {
            this.msSpeed = speed;
            this.value = 0;
        },

    moveLeft: function (delta)
    {
        if (this.value > 0) { this.reset(); }
        this.value -= this.msSpeed * delta;
        if (this.value < -1) { this.value = -1; }
        playerController.time.rightDown += delta;
    },

    moveRight: function (delta)
    {
        if (this.value < 0) { this.reset(); }
        this.value += this.msSpeed * delta;
        if (this.value > 1) { this.value = 1; }
    },

    reset: function ()
    {
        this.value = 0;
    }


});

