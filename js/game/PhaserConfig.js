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
            debug: true
        },
    },
    inputManager: Phaser.Input.InputManager,
/*    scene: [Test]*/  // Used to test specific scene. Swap with other.
    scene: [startScreen, startUp, mainMenu, mainMenuButtons, playerProfile, playModeSelect, gameSettings,Controls, multiplayerModeSelect,
        characterSelect, levelSelect, multiplayerLevelSelect, Test, City, LobbySelect], // Comment in/out with above for testing specific scene vs testing game as whole.

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

let isSinglePlayer = true;
let isOnlinePlay = false;

let playerManager;
let playerUsername = 'Guest';
let playerCharacter;
let playerScore;
let raceTime;

let activePlayers = [];

/* Declare global functions */

let game = new Phaser.Game(config);




