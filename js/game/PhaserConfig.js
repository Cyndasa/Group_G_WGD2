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
/*    scene: [Test]*/  // Use to test specific scene. Swap with other.
    scene: [staticScene,AudioScene, startUp, Menu, playScene, optionsMenu, LvlSelect, Test, City, LobbySelect, ], // Used for full game

}
    /* Can declare universal variables here */

var playerController;
var cursors;
var text;
var cam;
var smoothedControls;
var smoothMoveCameraTowards;

/*
let playerScore;
let activePlayers = [playerController];
let activePlayers = ['player1', 'player2', 'player3', 'player4']
*/
let playerName;
let timedEvent;

let game = new Phaser.Game(config);




