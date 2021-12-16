var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    /*transparent: true,*/
    physics: {
        default: 'matter',
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
        matter: {
            gravity: { y: 1 },
            enableSleep: false,
            debug: {
                showBody: true,
                showStaticBody: true
            }
        },
    },
    inputManager: Phaser.Input.InputManager,
/*    scene: [Forest]*/  // Used to test specific scene. Swap with other.
    scene: [startScreen, startUp, mainMenu, mainMenuButtons, playerProfile, playModeSelect, gameSettings,Controls, multiplayerModeSelect,
        characterSelect, levelSelect, multiplayerLevelSelect, Forest, City, resultsScreen], // Comment in/out with above for testing specific scene vs testing game as whole.

}
    /* Can declare universal variables here */

var playerController;
var cursors;
var text;
var cam;
var smoothedControls;
var smoothMoveCameraTowards;


let previousScene;
let timedEvent;
let bgRNG;

let use3Layers = false;
let use5Layers = false;

let playerControls = [];

let isSinglePlayer = true;
let isOnlinePlay = false;

let playerManager;
let playerUsername = 'Guest';
let playerCharacter;
let playerScore;
let raceTime = [];
let deltaRaceTime;

// For Local Play
let playerManager2;
let playerUsername2 = 'Guest';
let playerCharacter2;
let playerScore2;
let raceTime2;


let activePlayers = [];

/* Declare global functions */

// Smoothed horizontal controls helper. This gives us a value between -1 and 1 depending on how long
// the player has been pressing left or right, respectively.
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
})

function smoothMoveCameraTowards (target, smoothFactor)
{
    if (smoothFactor === undefined) { smoothFactor = 0; }
    cam.scrollX = smoothFactor * cam.scrollX + (1 - smoothFactor) * (target.x - cam.width * 0.5);
    cam.scrollY = smoothFactor * cam.scrollY + (1 - smoothFactor) * (target.y - cam.height * 0.5);
}

let game = new Phaser.Game(config);




