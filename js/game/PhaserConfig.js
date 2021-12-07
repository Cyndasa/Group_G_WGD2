var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    transparent: true,
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
    scene: [AudioScene,Menu, optionsMenu, playScene, Test, staticScene,LvlSelect,City,loadingScene,LobbySelect],
}
    /* Can declare universal variables here */
var game = new Phaser.Game(config)
var playerController;
var cursors;
var text;
var cam;
var smoothedControls;
var smoothMoveCameraTowards;

let playerName;
let activePlayers;
let playerScore;

let timedEvent;




